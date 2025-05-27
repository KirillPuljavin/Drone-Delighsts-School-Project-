// File: src/pages/CartPage.jsx

import { Link } from "react-router-dom";

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
    <section>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span> –<span>Qty: {item.quantity}</span> –
                <span>{item.price * item.quantity} kr</span>
              </li>
            ))}
          </ul>

          <div>
            <strong>Total:</strong> {total} kr
          </div>

          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </section>
  );
};

export default CartPage;
