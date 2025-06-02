// File: src/pages/HomePage.jsx

import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./../styles/layout/homePage.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productService";
import { useTranslation } from "react-i18next";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const { t } = useTranslation();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      const limited = data.slice(0, 5);
      setTrending(limited);
    });
  }, []);

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
            <strong>{t("home.heroSubtitle")}</strong>
          </p>
          <Link className="btn btn-primary" to="/menu">
            {t("home.viewMenu")}
          </Link>
        </div>
      </section>

      {/* Intro Explanation */}
      <section className="home-intro">
        <div className="container">
          <h2>{t("home.introTitle")}</h2>
          <p>{t("home.introText")}</p>
        </div>
      </section>

      {/* Our Delivery */}
      <section className="home-delivery">
        <div className="container">
          <h2>{t("home.deliveryTitle")}</h2>
          <p>{t("home.deliveryText")}</p>
        </div>
      </section>

      {/* Trending Foods */}
      <section className="home-trending">
        <div className="container">
          <h2>{t("home.trendingTitle")}</h2>

          <div className="carousel-wrapper">
            <Slider {...sliderSettings}>
              {trending.map((item) => (
                <div key={item.id} className="carousel-item">
                  <img src={`/assets/food/${item.image}`} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </Slider>
          </div>

          <Link className="btn btn-secondary" to="/menu">
            {t("home.exploreFullMenu")}
          </Link>
        </div>
      </section>

      {/* Food Statistics */}
      <section className="home-stats">
        <div className="container">
          <h2>{t("home.statsTitle")}</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>
                <strong>120+</strong>
              </h3>
              <span>{t("home.menuItems")}</span>
            </div>
            <div className="stat">
              <h3>
                <strong>58,000+</strong>
              </h3>
              <span>{t("home.deliveriesCompleted")}</span>
            </div>
            <div className="stat">
              <h3>
                <strong>97%</strong>
              </h3>
              <span>{t("home.customerSatisfaction")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-cta">
        <div className="container">
          <h2>{t("home.ctaTitle")}</h2>
          <p>{t("home.ctaText")}</p>
          <Link className="btn btn-primary" to="/menu">
            {t("home.startOrder")}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
