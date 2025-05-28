// File: src/pages/HomePage.jsx

import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./../styles/layout/homePage.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const trendingData = [
  {
    id: 1,
    name: "Spicy Tuna Roll",
    image: "/food/sushi.jpg",
    desc: "Sea to sky, fresh and fast",
  },
  {
    id: 2,
    name: "Sky Burger",
    image: "/food/burger.jpg",
    desc: "Char-grilled and delivered via cloud",
  },
  {
    id: 3,
    name: "Green Orbit Salad",
    image: "/food/salad.jpg",
    desc: "Light, crisp, drone-lifted",
  },
];

const HomePage = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <h1>Drone Delights</h1>
          <p className="subtitle">
            <strong>Fast Food, Delivered Faster</strong>
          </p>
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
            At Drone Delights, your cravings take flight—literally. Our
            autonomous drones dispatch your order the moment it's prepared,
            bypassing traffic, delays, and delivery middlemen. The result? Hot
            meals airborne within minutes and on your table before your hunger
            gets impatient.
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
        </div>
      </section>

      {/* Trending Foods */}
      <section className="home-trending">
        <div className="container">
          <h2>Trending Foods</h2>

          <div className="carousel-wrapper">
            <Slider {...sliderSettings}>
              {trendingData.map((item) => (
                <div key={item.id} className="carousel-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </Slider>
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
              <h3>
                <strong>120+</strong>
              </h3>
              <span>Menu Items</span>
            </div>
            <div className="stat">
              <h3>
                <strong>58,000+</strong>
              </h3>
              <span>Deliveries Completed</span>
            </div>
            <div className="stat">
              <h3>
                <strong>97%</strong>
              </h3>
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
};

export default HomePage;
