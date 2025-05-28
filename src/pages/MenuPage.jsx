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
  },
  {
    id: 2,
    name: "Orbit Salad",
    category: "Salad",
    price: 75,
    image: "/food/salad.jpg",
  },
  {
    id: 3,
    name: "Tuna Roll",
    category: "Sushi",
    price: 120,
    image: "/food/sushi.jpg",
  },
];

const MenuPage = () => {
  const [sortAsc, setSortAsc] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedItems = [...demoItems]
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  return (
    <main className="menu-page">
      {/* Filter Block */}
      <section className="menu-filters">
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
        <div className="container grid-auto grid-gap-md">
          {sortedItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price} SEK</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
