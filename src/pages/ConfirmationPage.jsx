// File: src/pages/ConfirmationPage.jsx

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOrderByUUID } from "../api/orderService";
import "../styles/layout/confirmationPage.scss";

const ConfirmationPage = () => {
  const { t } = useTranslation();
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
          <h1>{t("confirmation.thankYouTitle")}</h1>
          <p>{t("confirmation.successMessage")}</p>
          <p className="order-id">
            {t("confirmation.orderIdLabel")} <strong>{orderUUID}</strong>
          </p>

          <section className="summary-section">
            <h2>{t("confirmation.shippingTitle")}</h2>
            <p>{fullName}</p>
            <p>
              {streetAddress}
              {apartment ? `, ${apartment}` : ""}
            </p>
            <p>
              {postalCode} {city}
            </p>
            <p>
              {t("confirmation.phoneLabel")}: {phone}
            </p>
            {deliveryNote && (
              <p>
                {t("confirmation.noteLabel")}: {deliveryNote}
              </p>
            )}
          </section>

          <section className="summary-section">
            <h2>{t("confirmation.orderDetailsTitle")}</h2>
            <ul className="item-list">
              {items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} = {item.price * item.quantity}{" "}
                  SEK
                </li>
              ))}
            </ul>
            <p className="total">
              <strong>{t("confirmation.totalLabel")}:</strong> {totalPrice} SEK
            </p>
          </section>

          <section className="summary-section">
            <h2>{t("confirmation.paymentMethodTitle")}</h2>
            {paymentMethod === "card" ? (
              <p>
                {t("confirmation.cardEndingLabel", {
                  last4: paymentDetails.cardNumber.slice(-4),
                })}
              </p>
            ) : (
              <p>
                {t("confirmation.swishPhoneLabel")}: {paymentDetails.swishPhone}
              </p>
            )}
          </section>

          <div className="actions">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              {t("confirmation.goHome")}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/profile")}
            >
              {t("confirmation.viewOrders")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfirmationPage;
