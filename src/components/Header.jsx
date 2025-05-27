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
          padding: 0.75rem 1.5rem;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
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
          font-size: 1.5rem;
          background: none;
          border: none;
          color: var(--color-primary);
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
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--color-surface);
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
            gap: 1rem;
            display: none;
          }

          .nav-links.open {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
