// File: src/pages/auth/LoginPage.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../styles/layout/loginPage.scss";
import {
  registerUser,
  findUserByCredentials,
  cacheUserSession,
} from "../../api/userService";
import {
  validatePhoneNumber,
  validatePassword,
  validatePasswordMatch,
  validateFullName,
} from "../../utils/validationService";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/profile";
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
    setFeedback("");
    setFormData({
      phone: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      postalCode: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
    setFeedback("");
  };

  const validate = () => {
    const errs = {};
    errs.phone = validatePhoneNumber(formData.phone, t, {
      allowMockUser: true,
    });
    errs.password = validatePassword(formData.password, t, 4);

    if (mode === "register") {
      errs.confirmPassword = validatePasswordMatch(
        formData.password,
        formData.confirmPassword,
        t
      );
      errs.fullName = validateFullName(formData.fullName, t);
    }

    Object.keys(errs).forEach((key) => {
      if (errs[key] == null) delete errs[key];
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      if (mode === "login") {
        const user = await findUserByCredentials(
          formData.phone,
          formData.password
        );
        if (!user) {
          setFeedback(t("auth.invalidCredentials"));
        } else {
          cacheUserSession(user);
          navigate(redirectTo);
        }
      } else {
        const newUser = await registerUser(formData);
        cacheUserSession(newUser);
        navigate(redirectTo);
      }
    } catch (err) {
      setFeedback(t("auth.genericError") + " " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-section">
        <div className="container">
          <h1 className="login-title">
            {mode === "login" ? t("auth.loginTitle") : t("auth.registerTitle")}
          </h1>
          <div className="login-box">
            <form onSubmit={handleSubmit}>
              <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
                <label>{t("auth.phoneLabel")} *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.phone}</span>
              </div>

              <div
                className={`form-group ${errors.password ? "has-error" : ""}`}
              >
                <label>{t("auth.passwordLabel")} *</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.password}</span>
              </div>

              {mode === "register" && (
                <>
                  <div
                    className={`form-group ${
                      errors.confirmPassword ? "has-error" : ""
                    }`}
                  >
                    <label>{t("auth.confirmPasswordLabel")} *</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="form-error">{errors.confirmPassword}</span>
                  </div>

                  <div
                    className={`form-group ${
                      errors.fullName ? "has-error" : ""
                    }`}
                  >
                    <label>{t("auth.fullNameLabel")} *</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <span className="form-error">{errors.fullName}</span>
                  </div>

                  <div className="form-group">
                    <label>{t("auth.streetAddressLabel")}</label>
                    <input
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("auth.apartmentLabel")}</label>
                    <input
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <div className="form-group">
                      <label>{t("auth.cityLabel")}</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t("auth.postalCodeLabel")}</label>
                      <input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {feedback && (
                <p className="form-error text-center mt-4">{feedback}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={submitting}
              >
                {submitting
                  ? mode === "login"
                    ? t("auth.loggingIn")
                    : t("auth.creating")
                  : mode === "login"
                  ? t("auth.loginButton")
                  : t("auth.createAccountButton")}
              </button>
            </form>

            <div className="text-center mt-4">
              {mode === "login" ? (
                <p className="text-muted">
                  {t("auth.noAccount")}{" "}
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={toggleMode}
                  >
                    {t("auth.createOne")}
                  </button>
                </p>
              ) : (
                <p className="text-muted">
                  {t("auth.alreadyRegistered")}{" "}
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={toggleMode}
                  >
                    {t("auth.loginHere")}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
