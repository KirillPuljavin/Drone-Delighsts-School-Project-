// File: src/pages/HomePage.jsx

import { Link } from "react-router-dom";

const HomePage = () => (
  <section>
    <h1>Welcome to Drone Delights</h1>
    <p>Fast food, delivered faster.</p>

    <Link to="/menu">
      <button>View Menu</button>
    </Link>
  </section>
);

export default HomePage;
