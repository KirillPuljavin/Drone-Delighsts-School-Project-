// File: src/components/Footer.jsx

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark"
  );

  const toggleTheme = () => {
    const nextMode = !darkMode;
    const theme = nextMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    setDarkMode(nextMode);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const defaultTheme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", defaultTheme);
    setDarkMode(defaultTheme === "dark");
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <h6>
            &copy; {new Date().getFullYear()} Drone Delights. All rights
            reserved.
          </h6>
          <p className="author">Author: Kirill P.</p>
          <p className="disclaimer">* Demo footer. No links are functional.</p>

          <div className="theme-toggle-wrap">
            <button
              onClick={toggleTheme}
              className={`theme-toggle ${darkMode ? "dark" : "light"}`}
              aria-label="Toggle theme"
            >
              <span className="emoji moon">🌙</span>
              <span className="emoji sun">☀️</span>
              <span className="thumb" />
            </button>
          </div>
        </div>

        <div className="footer-right">
          <div className="social-icons">
            <span className="icon">
              <FaFacebookF />
            </span>
            <span className="icon">
              <FaInstagram />
            </span>
            <span className="icon">
              <FaTwitter />
            </span>
            <span className="icon">
              <FaLinkedinIn />
            </span>
            <span className="icon">
              <FaYoutube />
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: var(--color-surface);
          color: var(--color-text);
          padding: 2rem 1rem;
          box-shadow: var(--shadow-inner);
          border-top: 1px solid var(--color-border);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-left h6 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .footer-left .author {
          margin-top: 0.25rem;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .footer-left .disclaimer {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
        }

        .theme-toggle-wrap {
          margin-top: 1rem;
        }

        .theme-toggle {
          position: relative;
          width: 60px;
          height: 30px;
          border: none;
          background: var(--color-bg);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: background 0.3s ease;
        }

        .emoji {
          font-size: 1rem;
          pointer-events: none;
          user-select: none;
        }

        .thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 26px;
          height: 26px;
          background: var(--color-primary);
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .theme-toggle.dark .thumb {
          transform: translateX(30px);
        }

        .theme-toggle.light .thumb {
          transform: translateX(0px);
        }

        .footer-right {
          display: flex;
          align-items: center;
        }

        .social-icons {
          display: flex;
          gap: 0.75rem;
        }

        .social-icons .icon {
          font-size: 1.25rem;
          color: var(--color-primary);
          cursor: pointer;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-icons .icon:hover {
          transform: scale(1.2);
          color: var(--color-primary-hover);
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer-right {
            justify-content: center;
          }

          .theme-toggle-wrap {
            display: flex;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
