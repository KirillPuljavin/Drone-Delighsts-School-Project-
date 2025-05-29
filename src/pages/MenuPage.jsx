// File: src/pages/MenuPage.jsx

import { useState, useEffect } from "react";
import "./../styles/layout/menuPage.scss";
import { addToCart } from "../utils/cartService";
import { getProducts } from "../api/productService";

const categories = ["all", "starter", "main", "drink", "dessert", "favorites"];

const MenuPage = () => {
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
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const filteredItems = allItems
    .filter((item) => {
      if (activeCategory === "all") return true;
      if (activeCategory === "favorites") return favorites.includes(item.id);
      return item.category === activeCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  return (
    <main className="menu-page">
      {/* Filter Block */}
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
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Search + Sort */}
      <section className="menu-search-sort">
        <div className="container search-sort-row">
          <button
            className="filter-toggle"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-label="Toggle filters"
          >
            ☰
          </button>
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="menu-search"
          />
          <button
            className={`sort-toggle ${sortAsc ? "asc" : "desc"}`}
            onClick={() => setSortAsc(!sortAsc)}
            aria-label="Sort toggle"
          >
            ▼
          </button>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="menu-grid">
        <div className="container grid grid-auto grid-gap-md">
          {filteredItems.map((item) => (
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
                title="Toggle favorite"
              >
                ♥
              </div>
              <img src={`/assets/food/${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price} SEK</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal View */}
      {selectedItem && (
        <div className="menu-modal-overlay" onClick={handleCloseModal}>
          <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className={`favorite-icon modal-icon ${
                favorites.includes(selectedItem.id) ? "liked" : ""
              }`}
              onClick={() => toggleFavorite(selectedItem.id)}
              title="Toggle favorite"
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                  addToCart(selectedItem, quantity);
                  handleCloseModal();
                }}
              >
                Add {quantity} to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MenuPage;
