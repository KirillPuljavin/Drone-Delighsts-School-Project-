// File: src/pages/CheckoutPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../utils/cartService";
import { getUser, saveUser } from "../utils/userService";
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
    deliveryMethod: "Standard (30–45 min)",
    deliveryNote: "",
    coupon: "",
  });

  useEffect(() => {
    let currentUser = getUser();

    if (!currentUser) {
      currentUser = { username: "USER" };
      saveUser(currentUser);
    }

    setUser(currentUser);
    setCartItems(getCart());

    if (currentUser.savedFormData) {
      setFormData(currentUser.savedFormData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurchase = () => {
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
        {/* Left: Form */}
        <div className="checkout-form">
          <h2>Your Account</h2>
          <p>
            Logged in as: <strong>{user?.username}</strong>
          </p>

          <h2>Delivery Address</h2>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
          />
          <input
            name="apartment"
            placeholder="Apartment, Floor, etc. (optional)"
            value={formData.apartment}
            onChange={handleChange}
          />
          <div className="row">
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <h2>Delivery Method</h2>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
          >
            <option>Standard (30–45 min)</option>
            <option>Express (+25 SEK, 15–20 min)</option>
            <option>Scheduled (Choose Time)</option>
          </select>

          <h2>Delivery Instructions</h2>
          <textarea
            name="deliveryNote"
            placeholder="Leave at door, call on arrival, etc."
            value={formData.deliveryNote}
            onChange={handleChange}
          />

          <h2>Coupon Code</h2>
          <input
            name="coupon"
            placeholder="Enter code"
            value={formData.coupon}
            onChange={handleChange}
          />
        </div>

        {/* Right: Summary */}
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
