// File: src/pages/auth/LoginPage.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  registerUser,
  findUserByCredentials,
  cacheUserSession,
} from "../../api/userService";
import "../../styles/layout/loginPage.scss";

const LoginPage = () => {
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
    const phone = formData.phone.trim();

    const phoneValid =
      phone === "user" ||
      /^\+\d{6,15}$/.test(phone.replace(/\s|-/g, "")) ||
      /^07\d{1}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(phone);

    if (!phoneValid) {
      errs.phone = "Use +4670XXXXXXX or 070-XXX XX XX format.";
    }

    if (!formData.password || formData.password.length < 4) {
      errs.password = "Password must be at least 4 characters.";
    }

    if (mode === "register") {
      if (!formData.fullName.trim().includes(" ")) {
        errs.fullName = "Please enter your full name.";
      }
      if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = "Passwords do not match.";
      }
    }

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
          setFeedback("Incorrect phone number or password.");
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
      setFeedback("Something went wrong. Please try again. " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-section">
        <div className="container">
          <h1 className="login-title">
            {mode === "login" ? "Login" : "Create Account"}
          </h1>
          <div className="login-box">
            <form onSubmit={handleSubmit}>
              <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
                <label>Phone Number *</label>
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
                <label>Password *</label>
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
                    <label>Confirm Password *</label>
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
                    <label>Full Name *</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <span className="form-error">{errors.fullName}</span>
                  </div>

                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Apartment / Floor</label>
                    <input
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
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
                    ? "Logging in..."
                    : "Creating..."
                  : mode === "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>

            <div className="text-center mt-4">
              {mode === "login" ? (
                <p className="text-muted">
                  No account?{" "}
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={toggleMode}
                  >
                    Create one
                  </button>
                </p>
              ) : (
                <p className="text-muted">
                  Already registered?{" "}
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={toggleMode}
                  >
                    Login here
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
