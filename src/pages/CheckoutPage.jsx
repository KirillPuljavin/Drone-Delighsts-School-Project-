// File: src/pages/CheckoutPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../utils/cartService";
import "./../styles/layout/checkoutPage.scss";
import {
  loadUserSession,
  getUserById,
  clearUserSession,
} from "../api/userService";
import { createOrder } from "../api/orderService";
import { v4 as uuidv4 } from "uuid";
import {
  validateFullName,
  validateStreetAddress,
  validateCity,
  validatePostalCode,
  validatePhoneNumber,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateSwishPhone,
} from "../utils/validationService";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    deliveryNote: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    swishPhone: "",
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

    newErrors.fullName = validateFullName(formData.fullName);
    newErrors.streetAddress = validateStreetAddress(formData.streetAddress);
    newErrors.city = validateCity(formData.city);
    newErrors.postalCode = validatePostalCode(formData.postalCode);
    newErrors.phone = validatePhoneNumber(formData.phone);

    if (paymentMethod === "card") {
      newErrors.cardNumber = validateCardNumber(formData.cardNumber);
      newErrors.expiryDate = validateExpiryDate(formData.expiryDate);
      newErrors.cvv = validateCVV(formData.cvv);
    }

    if (paymentMethod === "swish") {
      newErrors.swishPhone = validateSwishPhone(formData.swishPhone);
    }

    // Prune nulls
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] == null) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePurchase = async () => {
    setAttemptedSubmit(true);
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const order = {
      id: undefined,
      uuid: uuidv4(),
      userId: user.id,
      fullName: formData.fullName,
      streetAddress: formData.streetAddress,
      apartment: formData.apartment,
      city: formData.city,
      postalCode: formData.postalCode,
      phone: formData.phone,
      deliveryNote: formData.deliveryNote,
      items: cartItems,
      totalPrice: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      createdAt: new Date().toISOString(),
      paymentMethod,
      paymentDetails:
        paymentMethod === "card"
          ? {
              cardNumber: formData.cardNumber,
              expiryDate: formData.expiryDate,
              cvv: formData.cvv,
            }
          : {
              swishPhone: formData.swishPhone,
            },
    };

    const newOrder = await createOrder(order);
    clearCart();
    navigate("/confirmation", { state: { uuid: newOrder.uuid } });
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

          <h2>Payment Method</h2>
          <div className="form-group">
            <label>Choose Payment</label>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="swish"
                  checked={paymentMethod === "swish"}
                  onChange={() => setPaymentMethod("swish")}
                />
                Swish
              </label>
            </div>
          </div>

          {paymentMethod === "card" && (
            <>
              <div
                className={`form-group ${errors.cardNumber ? "has-error" : ""}`}
              >
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength="16"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.cardNumber}</span>
              </div>
              <div
                className={`form-group ${errors.expiryDate ? "has-error" : ""}`}
              >
                <label>Expiry Date (MM/YY)</label>
                <input
                  name="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  pattern="\d{2}/\d{2}"
                  maxLength="5"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
                <span className="form-error">{errors.expiryDate}</span>
              </div>
              <div className={`form-group ${errors.cvv ? "has-error" : ""}`}>
                <label>CVV</label>
                <input
                  type="tel"
                  name="cvv"
                  maxLength="3"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={formData.cvv}
                  onChange={handleChange}
                />

                <span className="form-error">{errors.cvv}</span>
              </div>
            </>
          )}

          {paymentMethod === "swish" && (
            <div
              className={`form-group ${errors.swishPhone ? "has-error" : ""}`}
            >
              <label>Swish Phone Number</label>
              <input
                name="swishPhone"
                value={formData.swishPhone}
                onChange={handleChange}
              />
              <span className="form-error">{errors.swishPhone}</span>
            </div>
          )}
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
