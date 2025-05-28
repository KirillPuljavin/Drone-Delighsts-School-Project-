// File: src/pages/CartPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, updateQuantity, removeFromCart } from "../utils/cartService";
import "./../styles/layout/cartPage.scss";

const CartPage = () => {
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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <section className="cart-section">
        <div className="container">
          <h1 className="cart-title">In Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <span className="item-name">{item.name}</span>
                      <div className="qty-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
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
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-summary">
                <div className="total-line">
                  <span>Total</span>
                  <strong>{total} kr</strong>
                </div>
                <Link to="/checkout">
                  <button className="btn btn-primary w-full mt-3">
                    Proceed to Checkout
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
