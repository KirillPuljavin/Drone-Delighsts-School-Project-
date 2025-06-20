// File: src/components/Header.jsx

import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { getCart } from "../utils/cartService";

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const prevCount = useRef(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const newCount = cart.reduce((acc, item) => acc + item.quantity, 0);

      if (newCount > prevCount.current) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
      }

      prevCount.current = newCount;
      setCartCount(newCount);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 500);
    return () => clearInterval(interval);
  }, [location]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setDropdownOpen(false);
  };

  const currentLanguage = i18n.language;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img src={logo} alt={t("header.logoAlt")} />
          <span>{t("header.title")}</span>
        </Link>

        <nav className="header-actions">
          <Link to="/menu" className="nav-link">
            {t("header.menu")}
          </Link>

          <Link
            to="/cart"
            className="icon-link cart"
            aria-label={t("header.viewCartAria")}
          >
            <svg
              className={`icon ${animate ? "pulse" : ""}`}
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

          <Link
            to="/profile"
            className="icon-link profile"
            aria-label={t("header.profileAria")}
          >
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </Link>

          {/* Language Dropdown */}
          <div
            className="language-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-toggle" aria-label="Language Selector">
              {currentLanguage.toUpperCase()} ▾
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  className={currentLanguage === "en" ? "active" : ""}
                  onClick={() => handleLanguageChange("en")}
                >
                  English
                </li>
                <li
                  className={currentLanguage === "sv" ? "active" : ""}
                  onClick={() => handleLanguageChange("sv")}
                >
                  Svenska
                </li>
              </ul>
            )}
          </div>
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
          gap: 1rem;
        }

        .nav-link {
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-text);
        }

        .nav-link:hover {
          color: var(--color-primary);
        }

        .icon-link {
          position: relative;
          display: flex;
          align-items: center;
        }

        .icon {
          width: 28px;
          height: 28px;
          color: var(--color-primary);
          transition: transform 0.3s ease;
        }

        .icon-link:hover .icon {
          transform: scale(1.1);
        }

        .pulse {
          animation: pulseAnim 0.4s ease-out;
        }

        @keyframes pulseAnim {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.25);
          }
          100% {
            transform: scale(1);
          }
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

        .language-dropdown {
          position: relative;
        }

        .dropdown-toggle {
          background: none;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          transition: background 0.2s ease;
        }

        .dropdown-toggle:hover {
          background: var(--color-primary-light);
        }

        .dropdown-menu {
          position: absolute;
          top: 1.5rem;
          right: 0;
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
          border-radius: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0.5rem 0;
          z-index: 200;
        }

        .dropdown-menu li {
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--color-text);
          white-space: nowrap;
        }

        .dropdown-menu li:hover {
          background: var(--color-primary-light);
        }

        .dropdown-menu li.active {
          font-weight: 700;
          background: var(--color-primary);
          color: var(--color-white);
        }

        @media (max-width: 768px) {
          .header-actions {
            gap: 1rem;
          }

          .header-logo span {
            font-size: 1.25rem;
          }

          .icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
