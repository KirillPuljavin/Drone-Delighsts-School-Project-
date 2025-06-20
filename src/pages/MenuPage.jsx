// File: src/pages/MenuPage.jsx

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./../styles/layout/menuPage.scss";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} from "../utils/cartService";
import { getProducts } from "../api/productService";

const categories = ["all", "starter", "main", "drink", "dessert", "favorites"];

const MenuPage = () => {
  const { t } = useTranslation();
  const [sortAsc, setSortAsc] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [cartItems, setCartItems] = useState([]);

  const refreshCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    getProducts().then(setAllItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleItemClick = (item) => {
    const cartEntry = cartItems.find((ci) => ci.id === item.id);
    setQuantity(cartEntry ? cartEntry.quantity : 1);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleUpdateCart = (item, qty) => {
    if (qty <= 0) {
      removeFromCart(item.id);
    } else {
      const cartEntry = cartItems.find((ci) => ci.id === item.id);
      if (cartEntry) {
        updateQuantity(item.id, qty);
      } else {
        addToCart(item, qty);
      }
    }
    refreshCart();
  };

  const filteredItems = allItems
    .filter((item) => {
      if (activeCategory === "favorites") return favorites.includes(item.id);
      if (activeCategory === "all") return true;
      return item.category === activeCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  return (
    <main className="menu-page">
      <section
        className={`menu-filters ${showFilters ? "is-visible" : "is-hidden"}`}
      >
        <div className="container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-outline ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {t(`menu.categories.${cat}`)}
            </button>
          ))}
        </div>
      </section>

      <section className="menu-search-sort">
        <div className="container search-sort-row">
          <button
            className="filter-toggle"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-label={t("menu.toggleFilters")}
          >
            ☰
          </button>
          <input
            type="text"
            placeholder={t("menu.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="menu-search"
          />
          <button
            className={`sort-toggle ${sortAsc ? "asc" : "desc"}`}
            onClick={() => setSortAsc(!sortAsc)}
            aria-label={t("menu.sortToggle")}
          >
            ▼
          </button>
        </div>
      </section>

      <section className="menu-grid">
        <div className="container">
          {["starter", "main", "drink", "dessert"].map((key) => {
            if (
              activeCategory !== "all" &&
              activeCategory !== "favorites" &&
              activeCategory !== key
            )
              return null;

            const items = filteredItems.filter((item) => item.category === key);

            return (
              <div key={key} className="menu-section">
                <hr />
                <h2>{t(`menu.sectionLabels.${key}`)}</h2>
                {items.length === 0 ? (
                  <p className="no-items">{t("menu.noItems")}</p>
                ) : (
                  <div className="grid grid-auto grid-gap-md">
                    {items.map((item) => {
                      const cartEntry = cartItems.find(
                        (ci) => ci.id === item.id
                      );
                      return (
                        <div
                          className="menu-card"
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                        >
                          <div
                            className={`favorite-icon ${
                              favorites.includes(item.id) ? "liked" : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                            title={t("menu.toggleFavorite")}
                          >
                            ♥
                          </div>
                          {cartEntry && cartEntry.quantity > 0 && (
                            <div
                              className="cart-qty-badge"
                              title={t("menu.inCart")}
                            >
                              {cartEntry.quantity}
                            </div>
                          )}
                          <img
                            src={`/assets/food/${item.image}`}
                            alt={item.name}
                          />
                          <h3>{item.name}</h3>
                          <p>{item.price} SEK</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {selectedItem && (
        <div className="menu-modal-overlay" onClick={handleCloseModal}>
          <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className={`favorite-icon modal-icon ${
                favorites.includes(selectedItem.id) ? "liked" : ""
              }`}
              onClick={() => toggleFavorite(selectedItem.id)}
              title={t("menu.toggleFavorite")}
            >
              ♥
            </div>
            <img
              src={`/assets/food/${selectedItem.image}`}
              alt={selectedItem.name}
            />
            <div className="modal-content">
              <h2>{selectedItem.name}</h2>
              <p className="modal-description">{selectedItem.description}</p>
            </div>
            <div className="modal-footer">
              <div className="footer-row">
                <span className="price">{selectedItem.price} SEK</span>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleUpdateCart(selectedItem, quantity);
                  handleCloseModal();
                }}
              >
                {quantity > 0
                  ? t("menu.setQuantity", { count: quantity })
                  : t("menu.removeFromCart")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MenuPage;
