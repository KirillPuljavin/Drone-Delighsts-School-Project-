// File: src/components/Header.jsx

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { getCart } from "../utils/cartService";

const Header = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Poll cart count every 500ms for simplicity (replace with event-driven if needed)
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount(); // initial load
    const interval = setInterval(updateCartCount, 500);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Drone Delights" />
          <span>Drone Delights</span>
        </Link>

        <nav className="header-actions">
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/cart" className="cart-icon-wrap" aria-label="View Cart">
            <svg
              className="cart-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .site-header {
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .header-logo img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .header-logo span {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-text);
          position: relative;
        }

        .nav-link:hover {
          color: var(--color-primary);
        }

        .cart-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .cart-icon {
          width: 28px;
          height: 28px;
          color: var(--color-primary);
          transition: transform 0.3s ease;
        }

        .cart-icon-wrap:hover .cart-icon {
          transform: scale(1.1);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -10px;
          background-color: var(--color-primary);
          color: var(--color-white);
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          padding: 0.15rem 0.5rem;
          line-height: 1;
          min-width: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .header-actions {
            gap: 1rem;
          }

          .header-logo span {
            font-size: 1.25rem;
          }

          .cart-icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
