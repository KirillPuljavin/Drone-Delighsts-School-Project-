// File: src/components/Header.jsx

import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo-wrap">
          <img src={logo} alt="Drone Delights logo" className="logo" />
          <span className="brand">Drone Delights</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>
            Menu
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>
          <Link to="/checkout" onClick={() => setMenuOpen(false)}>
            Checkout
          </Link>
          <Link to="/confirmation" onClick={() => setMenuOpen(false)}>
            Confirm
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .site-header {
          background-color: var(--color-surface);
          box-shadow: var(--shadow-sm);
          padding: 1rem 1.5rem;
          position: relative;
          z-index: 10;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .brand {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--color-primary);
        }

        .nav-toggle {
          display: none;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          color: var(--color-text);
          font-weight: 500;
          transition: color 0.2s ease;
          padding: 0.5rem 0.75rem;
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .nav-toggle {
            display: flex;
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            background: none;
            border: none;
            color: var(--color-primary);
            align-items: center;
            justify-content: center;
          }

          .nav-links {
            position: absolute;
            top: 135%;
            left: 0;
            width: 100%;
            background-color: var(--color-surface);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            display: none;
            z-index: 5;
            box-shadow: var(--shadow-sm);
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links a {
            display: block;
            padding: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            text-align: center;
          }

          .nav-links a:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
