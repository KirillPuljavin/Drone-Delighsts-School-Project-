// File: src/pages/MenuPage.jsx

import { useState } from "react";
import "./../styles/layout/menuPage.scss";

const demoItems = [
  {
    id: 1,
    name: "Sky Burger",
    category: "Main",
    price: 99,
    image: "/food/burger.jpg",
    description: "A towering burger launched by our finest drone chefs.",
  },
  {
    id: 2,
    name: "Orbit Salad",
    category: "Salad",
    price: 75,
    image: "/food/salad.jpg",
    description: "Fresh greens assembled with orbital precision.",
  },
  {
    id: 3,
    name: "Tuna Roll",
    category: "Sushi",
    price: 120,
    image: "/food/sushi.jpg",
    description: "Sashimi-grade tuna, rolled for max altitude delivery.",
  },
];

const MenuPage = () => {
  const [sortAsc, setSortAsc] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const sortedItems = [...demoItems]
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <main className="menu-page">
      {/* Filter Block */}
      <section
        className={`menu-filters ${showFilters ? "is-visible" : "is-hidden"}`}
      >
        <div className="container">
          <button className="btn btn-outline">All</button>
          <button className="btn btn-outline">Mains</button>
          <button className="btn btn-outline">Drinks</button>
          <button className="btn btn-outline">Desserts</button>
        </div>
      </section>

      {/* Search + Sort Block */}
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

      {/* Menu Items Grid */}
      <section className="menu-grid">
        <div className="container grid grid-auto grid-gap-md">
          {sortedItems.map((item) => (
            <div
              className="menu-card"
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <img src={item.image} alt={item.name} />
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
            <img src={selectedItem.image} alt={selectedItem.name} />
            <h2>{selectedItem.name}</h2>
            <p className="text-muted">{selectedItem.description}</p>
            <p className="text-bold">{selectedItem.price} SEK</p>

            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="btn btn-primary w-full mt-3">
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MenuPage;
