// File: src/pages/ConfirmationPage.jsx

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderByUUID } from "../api/orderService";
import "../styles/layout/confirmationPage.scss";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const uuid = state?.uuid;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!uuid) {
      navigate("/");
      return;
    }
    getOrderByUUID(uuid).then((data) => {
      if (!data) {
        navigate("/");
        return;
      }

      setOrder(data);
    });
  }, [uuid, navigate]);

  if (!order) return null;

  const {
    fullName,
    streetAddress,
    apartment,
    city,
    postalCode,
    phone,
    deliveryNote,
    items,
    totalPrice,
    paymentMethod,
    paymentDetails,
    uuid: orderUUID,
  } = order;

  return (
    <main className="confirmation-page">
      <div className="container">
        <div className="confirmation-box">
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been successfully placed.</p>
          <p className="order-id">
            Order ID: <strong>{orderUUID}</strong>
          </p>

          <section className="summary-section">
            <h2>Shipping Information</h2>
            <p>{fullName}</p>
            <p>
              {streetAddress}
              {apartment ? `, ${apartment}` : ""}
            </p>
            <p>
              {postalCode} {city}
            </p>
            <p>Phone: {phone}</p>
            {deliveryNote && <p>Note: {deliveryNote}</p>}
          </section>

          <section className="summary-section">
            <h2>Order Details</h2>
            <ul className="item-list">
              {items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} = {item.price * item.quantity}{" "}
                  SEK
                </li>
              ))}
            </ul>
            <p className="total">
              <strong>Total:</strong> {totalPrice} SEK
            </p>
          </section>

          <section className="summary-section">
            <h2>Payment Method</h2>
            {paymentMethod === "card" ? (
              <>
                <p>Card ending in ****{paymentDetails.cardNumber.slice(-4)}</p>
              </>
            ) : (
              <p>Swish Phone: {paymentDetails.swishPhone}</p>
            )}
          </section>

          <div className="actions">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Go to Home
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/profile")}
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfirmationPage;
