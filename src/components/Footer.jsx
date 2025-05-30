// File: src/components/Footer.jsx

import { useEffect, useState } from "react";

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
      <hr />
      <h6>© 2025 Drone Delights</h6>

      <style jsx>{`
        .site-footer {
          text-align: center;
          padding: 1rem 1rem 3rem;
          background-color: var(--color-surface);
          color: var(--color-text);
        }

        .theme-toggle-wrap {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
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
      `}</style>
    </footer>
  );
};

export default Footer;
