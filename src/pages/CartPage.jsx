// File: src/pages/CartPage.jsx

import { Link } from "react-router-dom";
import "./../styles/layout/cartPage.scss";

const CartPage = () => {
  const cartItems = [
    { id: 1, name: "Margherita", quantity: 2, price: 89 },
    { id: 2, name: "Cola", quantity: 1, price: 25 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <section className="cart-section">
        <div className="container">
          <h1 className="cart-title">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">Qty: {item.quantity}</span>
                    </div>
                    <div className="item-total">
                      {item.price * item.quantity} kr
                    </div>
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
