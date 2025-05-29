// File: src/pages/auth/ProfilePage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      fullName: validateFullName(formData.fullName),
      streetAddress: validateStreetAddress(formData.streetAddress),
      city: validateCity(formData.city),
      postalCode: validatePostalCode(formData.postalCode),
      phone: validatePhoneNumber(formData.phone),
    };

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {
      currentPassword: validatePassword(passwordData.currentPassword),
      newPassword: validatePassword(passwordData.newPassword),
      confirmNewPassword: validatePasswordMatch(
        passwordData.newPassword,
        passwordData.confirmNewPassword
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
        alert("Profile updated successfully.");
        setErrors({});
      } else {
        alert("Failed to update profile.");
      }
    });
  };

  const handleSavePassword = () => {
    if (!validatePasswordForm()) return;

    alert("Password change logic would go here (not yet wired to backend).");
    setPasswordErrors({});
  };

  return (
    <main className="profile-page">
      <div className="container profile-layout">
        <div className="profile-form">
          <h5 className="user-info">
            Logged in as: <strong>{user?.fullName}</strong>
          </h5>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>

          <form
            className="details-section"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
          >
            <h3>Change Details</h3>

            <div className={`form-group ${errors.fullName ? "has-error" : ""}`}>
              <label>Full Name</label>
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
              <label>Street Address</label>
              <input
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
              />
              <span className="form-error">{errors.streetAddress}</span>
            </div>

            <div className="form-group">
              <label>Apartment / Floor (optional)</label>
              <input
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className={`form-group ${errors.city ? "has-error" : ""}`}>
                <label>City</label>
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
                <label>Postal Code</label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.postalCode}</span>
              </div>
            </div>

            <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
              <label>Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <span className="form-error">{errors.phone}</span>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              Save Changes
            </button>
          </form>

          <form
            className="password-section"
            onSubmit={(e) => {
              e.preventDefault();
              handleSavePassword();
            }}
          >
            <h3>Change Password</h3>

            <div
              className={`form-group ${
                passwordErrors.currentPassword ? "has-error" : ""
              }`}
            >
              <label>Current Password</label>
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
              <label>New Password</label>
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
              <label>Confirm New Password</label>
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
              Save Password
            </button>
          </form>

          <button
            className="toggle-orders mt-5"
            onClick={() => setShowOrders(!showOrders)}
          >
            {showOrders ? "Hide Order History" : "Show Order History"}
          </button>

          {showOrders && (
            <div className="order-history">
              <h3>Your Orders</h3>
              {orders.length === 0 ? (
                <p className="text-muted">You haven’t placed any orders yet.</p>
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
                            <strong>Order ID:</strong> {order.uuid}
                          </div>
                          <div>
                            <strong>Date:</strong>{" "}
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
                            <strong>Total:</strong> {order.totalPrice} SEK
                          </div>
                          <div>
                            <strong>Payment:</strong> {order.paymentMethod}
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
