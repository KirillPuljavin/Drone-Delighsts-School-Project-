// File: src/pages/HomePage.jsx

import { Link } from "react-router-dom";
import "./../styles/layout/homePage.scss";

const HomePage = () => (
  <section className="home-hero">
    <h1>Welcome to Drone Delights</h1>
    <p>Fast food, delivered faster.</p>

    <Link className="btn btn-primary" to="/menu">
      View Menu
    </Link>

    <div className="feature-grid">
      <div className="feature-card">
        <img src="/food/pizza.jpg" alt="Pizza" />
        <h3>Margherita</h3>
        <p>Classic tomato & cheese</p>
      </div>
      <div className="feature-card">
        <img src="/food/cola.jpg" alt="Cola" />
        <h3>Cola</h3>
        <p>Refreshing and fizzy</p>
      </div>
    </div>
  </section>
);

export default HomePage;
