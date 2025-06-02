// File: src/pages/auth/ProfilePage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../styles/layout/profilePage.scss";
import {
  loadUserSession,
  getUserById,
  updateUserById,
  clearUserSession,
} from "../../api/userService";
import { getAllOrders } from "../../api/orderService";
import {
  validateFullName,
  validateStreetAddress,
  validateCity,
  validatePostalCode,
  validatePhoneNumber,
  validatePassword,
  validatePasswordMatch,
} from "../../utils/validationService";

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    const session = loadUserSession();
    if (!session?.id) {
      navigate("/login", { state: { from: "/profile" } });
      return;
    }

    getUserById(session.id).then((data) => {
      if (!data) {
        navigate("/login", { state: { from: "/profile" } });
        return;
      }

      setUser(data);
      setFormData({
        fullName: data.fullName || "",
        streetAddress: data.streetAddress || "",
        apartment: data.apartment || "",
        city: data.city || "",
        postalCode: data.postalCode || "",
        phone: data.phone || "",
      });
    });

    getAllOrders().then((data) => {
      const userOrders = data.filter((order) => order.userId === session.id);
      setOrders(userOrders);
    });
  }, [navigate]);

  const handleLogout = () => {
    clearUserSession();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const validateProfileForm = () => {
    const newErrors = {
      fullName: validateFullName(formData.fullName, t),
      streetAddress: validateStreetAddress(formData.streetAddress, t),
      city: validateCity(formData.city, t),
      postalCode: validatePostalCode(formData.postalCode, t),
      phone: validatePhoneNumber(formData.phone, t),
    };

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {
      currentPassword: validatePassword(passwordData.currentPassword, t),
      newPassword: validatePassword(passwordData.newPassword, t),
      confirmNewPassword: validatePasswordMatch(
        passwordData.newPassword,
        passwordData.confirmNewPassword,
        t
      ),
    };

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateProfileForm()) return;

    const updatedUser = { ...user, ...formData };

    updateUserById(updatedUser).then((res) => {
      if (res) {
        setUser(updatedUser);
        alert(t("profile.profileUpdated"));
        setErrors({});
      } else {
        alert(t("profile.updateFailed"));
      }
    });
  };

  const handleSavePassword = () => {
    if (!validatePasswordForm()) return;

    alert(t("profile.passwordChangePlaceholder"));
    setPasswordErrors({});
  };

  return (
    <main className="profile-page">
      <div className="container profile-layout">
        <div className="profile-form">
          <h5 className="user-info">
            {t("profile.loggedInAs")}: <strong>{user?.fullName}</strong>
          </h5>
          <button className="btn btn-secondary" onClick={handleLogout}>
            {t("profile.logout")}
          </button>

          <form
            className="details-section"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
          >
            <h3>{t("profile.changeDetailsTitle")}</h3>

            <div className={`form-group ${errors.fullName ? "has-error" : ""}`}>
              <label>{t("profile.fullName")}</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <span className="form-error">{errors.fullName}</span>
            </div>

            <div
              className={`form-group ${
                errors.streetAddress ? "has-error" : ""
              }`}
            >
              <label>{t("profile.streetAddress")}</label>
              <input
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
              />
              <span className="form-error">{errors.streetAddress}</span>
            </div>

            <div className="form-group">
              <label>{t("profile.apartment")}</label>
              <input
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className={`form-group ${errors.city ? "has-error" : ""}`}>
                <label>{t("profile.city")}</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.city}</span>
              </div>

              <div
                className={`form-group ${errors.postalCode ? "has-error" : ""}`}
              >
                <label>{t("profile.postalCode")}</label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.postalCode}</span>
              </div>
            </div>

            <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
              <label>{t("profile.phoneNumber")}</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <span className="form-error">{errors.phone}</span>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              {t("profile.saveChanges")}
            </button>
          </form>

          <form
            className="password-section"
            onSubmit={(e) => {
              e.preventDefault();
              handleSavePassword();
            }}
          >
            <h3>{t("profile.changePasswordTitle")}</h3>

            <div
              className={`form-group ${
                passwordErrors.currentPassword ? "has-error" : ""
              }`}
            >
              <label>{t("profile.currentPassword")}</label>
              <input
                type="password"
                name="currentPassword"
                autoComplete="current-password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
              <span className="form-error">
                {passwordErrors.currentPassword}
              </span>
            </div>

            <div
              className={`form-group ${
                passwordErrors.newPassword ? "has-error" : ""
              }`}
            >
              <label>{t("profile.newPassword")}</label>
              <input
                type="password"
                name="newPassword"
                autoComplete="new-password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
              <span className="form-error">{passwordErrors.newPassword}</span>
            </div>

            <div
              className={`form-group ${
                passwordErrors.confirmNewPassword ? "has-error" : ""
              }`}
            >
              <label>{t("profile.confirmNewPassword")}</label>
              <input
                type="password"
                name="confirmNewPassword"
                autoComplete="new-password"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
              />
              <span className="form-error">
                {passwordErrors.confirmNewPassword}
              </span>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              {t("profile.savePassword")}
            </button>
          </form>

          <button
            className="toggle-orders mt-5"
            onClick={() => setShowOrders(!showOrders)}
          >
            {showOrders
              ? t("profile.hideOrderHistory")
              : t("profile.showOrderHistory")}
          </button>

          {showOrders && (
            <div className="order-history">
              <h3>{t("profile.yourOrders")}</h3>
              {orders.length === 0 ? (
                <p className="text-muted">{t("profile.noOrders")}</p>
              ) : (
                <div className="orders-list">
                  {orders
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((order) => (
                      <div key={order.uuid} className="order-entry">
                        <div className="order-header">
                          <div>
                            <strong>{t("profile.orderId")}:</strong>{" "}
                            {order.uuid}
                          </div>
                          <div>
                            <strong>{t("profile.date")}:</strong>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="order-items">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="item-row">
                              <span className="item-name">{item.name}</span>
                              <span className="item-qty">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div>
                            <strong>{t("profile.total")}:</strong>{" "}
                            {order.totalPrice} SEK
                          </div>
                          <div>
                            <strong>{t("profile.payment")}:</strong>{" "}
                            {order.paymentMethod}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
