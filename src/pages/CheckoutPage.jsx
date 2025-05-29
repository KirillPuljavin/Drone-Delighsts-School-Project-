// File: src/pages/CheckoutPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../utils/cartService";
import {
  loadUserSession,
  getUserById,
  clearUserSession,
} from "../api/userService";
import "./../styles/layout/checkoutPage.scss";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    deliveryNote: "",
    coupon: "",
  });
  const [errors, setErrors] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    const session = loadUserSession();
    if (session?.id == null) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    getUserById(session.id).then((data) => {
      if (!data) {
        navigate("/login", { state: { from: "/checkout" } });
        return;
      }

      setUser(data);
      setCartItems(getCart());

      setFormData((prev) => ({
        ...prev,
        fullName: data.fullName || "",
        streetAddress: data.streetAddress || "",
        apartment: data.apartment || "",
        city: data.city || "",
        postalCode: data.postalCode || "",
        phone: data.phone || "",
      }));
    });
  }, [navigate]);

  const handleLogout = () => {
    clearUserSession();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (attemptedSubmit) validate();
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim().includes(" ")) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.streetAddress.match(/\d/)) {
      newErrors.streetAddress = "Street must include a number.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.postalCode.match(/^\d{3}\s?\d{2}$/)) {
      newErrors.postalCode = "Postal code must be 5 digits, optionally spaced.";
    }

    const isIntl = /^\+\d{6,15}$/.test(formData.phone.replace(/\s|-/g, ""));
    const isLocal = /^07\d{1}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(
      formData.phone
    );

    if (!isIntl && !isLocal) {
      newErrors.phone =
        "Phone must be in format +46700111222 or 070-123 45 67.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePurchase = () => {
    setAttemptedSubmit(true);
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    console.log("Purchasing:", { user, cartItems, formData });
    clearCart();
    navigate("/confirmation");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="checkout-page">
      <div className="container checkout-layout">
        <div className="checkout-form">
          <h2>Your Account</h2>
          <div className="user-session">
            <p>
              Logged in as: <strong>{user?.fullName || user?.phone}</strong>
            </p>
            <button
              className="btn btn-secondary logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <h2>Delivery Address</h2>

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
            className={`form-group ${errors.streetAddress ? "has-error" : ""}`}
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

          <h2>Delivery Instructions</h2>
          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              name="deliveryNote"
              value={formData.deliveryNote}
              onChange={handleChange}
            />
          </div>

          <h2>Coupon Code</h2>
          <div className="form-group">
            <label>Discount Code (optional)</label>
            <input
              name="coupon"
              value={formData.coupon}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - {item.price * item.quantity} SEK
              </li>
            ))}
          </ul>
          <div className="total">
            <strong>Total: {total} SEK</strong>
          </div>

          <button className="btn btn-primary mt-3" onClick={handlePurchase}>
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
