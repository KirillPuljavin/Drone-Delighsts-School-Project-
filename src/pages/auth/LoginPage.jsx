// File: src/pages/auth/LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../utils/userService";
import "../../styles/layout/loginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
    setLoginFailed(false);
  };

  const validate = () => {
    const errs = {};

    const phoneValid =
      /^\+\d{6,15}$/.test(formData.phone.replace(/\s|-/g, "")) ||
      /^07\d{1}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(formData.phone);

    if (!phoneValid) {
      errs.phone = "Enter valid phone: +4670XXXXXXX or 070-XXX XX XX";
    }

    if (!formData.password || formData.password.length < 4) {
      errs.password = "Password must be at least 4 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginFailed(false);
    if (!validate()) return;

    setSubmitting(true);

    // Mocked login logic, simulate delay
    setTimeout(() => {
      if (formData.phone === "+46700000000" && formData.password === "1234") {
        saveUser({ phone: formData.phone });
        navigate("/checkout");
      } else {
        setLoginFailed(true);
        setSubmitting(false);
      }
    }, 800);
  };

  return (
    <main className="login-page flex flex-center h-full">
      <section
        className="login-box bg-white rounded shadow-lg p-8 w-full max-w-full"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
            <label>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <span className="form-error">{errors.phone}</span>
          </div>

          <div className={`form-group ${errors.password ? "has-error" : ""}`}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="form-error">{errors.password}</span>
          </div>

          {loginFailed && (
            <p className="form-error text-center mt-4">
              Incorrect phone or password.
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
