// File: src/pages/HomePage.jsx

import { Link } from "react-router-dom";
import "./../styles/layout/homePage.scss";

const HomePage = () => (
  <main className="home-page">
    {/* Hero Section */}
    <section className="home-hero">
      <div className="container">
        <h1>Drone Delights</h1>
        <p className="subtitle">Fast food, delivered faster.</p>
        <Link className="btn btn-primary" to="/menu">
          View Menu
        </Link>
      </div>
    </section>

    {/* Intro Explanation */}
    <section className="home-intro">
      <div className="container">
        <h2>What do we mean by "faster"?</h2>
        <p>
          At Drone Delights, your cravings take flight—literally. Our autonomous
          drones dispatch your order the moment it's prepared, bypassing
          traffic, delays, and delivery middlemen. The result? Hot meals
          airborne within minutes and on your table before your hunger gets
          impatient.
        </p>
      </div>
    </section>

    {/* Our Delivery */}
    <section className="home-delivery">
      <div className="container">
        <h2>Our Delivery System</h2>
        <p>
          We're powered by an advanced drone fleet with real-time tracking,
          adaptive routing, and ultra-fast delivery times. It's eco-conscious,
          lightning-quick, and built to deliver happiness at altitude.
        </p>
        <img
          src="/images/drone-delivery.jpg"
          alt="Drone delivering food"
          className="delivery-image"
        />
      </div>
    </section>

    {/* Trending Foods */}
    <section className="home-trending">
      <div className="container">
        <h2>Trending Foods</h2>
        <div className="trending-grid">
          <div className="food-card">
            <img src="/food/sushi.jpg" alt="Sushi" />
            <h3>Spicy Tuna Roll</h3>
            <p>Sea to sky, fresh and fast</p>
          </div>
          <div className="food-card">
            <img src="/food/burger.jpg" alt="Burger" />
            <h3>Sky Burger</h3>
            <p>Char-grilled and delivered via cloud</p>
          </div>
          <div className="food-card">
            <img src="/food/salad.jpg" alt="Salad" />
            <h3>Green Orbit Salad</h3>
            <p>Light, crisp, drone-lifted</p>
          </div>
        </div>
        <Link className="btn btn-secondary" to="/menu">
          Explore the Full Menu
        </Link>
      </div>
    </section>

    {/* Food Statistics */}
    <section className="home-stats">
      <div className="container">
        <h2>Our Mission in Numbers</h2>
        <div className="stats-grid">
          <div className="stat">
            <strong>120+</strong>
            <span>Menu Items</span>
          </div>
          <div className="stat">
            <strong>58,000+</strong>
            <span>Deliveries Completed</span>
          </div>
          <div className="stat">
            <strong>97%</strong>
            <span>Customer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="home-cta">
      <div className="container">
        <h2>Craving something now?</h2>
        <p>Your next meal could be airborne in under 5 minutes.</p>
        <Link className="btn btn-primary" to="/menu">
          Start Your Order
        </Link>
      </div>
    </section>
  </main>
);

export default HomePage;
