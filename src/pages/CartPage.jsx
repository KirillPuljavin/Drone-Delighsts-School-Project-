// File: src/pages/CartPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../utils/cartService";
import "./../styles/layout/cartPage.scss";

const CartPage = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleQuantityChange = (id, delta) => {
    const current = cartItems.find((item) => item.id === id);
    const newQty = Math.max(1, current.quantity + delta);
    updateQuantity(id, newQty);
    setCartItems(getCart());
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <section className="cart-section">
        <div className="container">
          <h1 className="cart-title">{t("cart.inCartTitle")}</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p className="text-muted">{t("cart.emptyMessage")}</p>
              <Link to="/menu">
                <button className="btn btn-primary mt-2">
                  {t("cart.goToMenu")}
                </button>
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img
                      src={`/assets/food/${item.image}`}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <span className="item-name">{item.name}</span>
                      <div className="qty-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          aria-label={t("cart.decreaseQuantity")}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          aria-label={t("cart.increaseQuantity")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-price">
                      {item.price * item.quantity} kr
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="remove-item"
                      aria-label={t("cart.removeItem")}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-outline w-full mt-2"
                onClick={handleClearCart}
              >
                {t("cart.clearCart")}
              </button>

              <div className="cart-summary">
                <div className="total-line">
                  <span>{t("cart.totalLabel")}</span>
                  <strong>{total} kr</strong>
                </div>

                <Link to="/checkout">
                  <button className="btn btn-primary w-full mt-3">
                    {t("cart.proceedToCheckout")}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default CartPage;
