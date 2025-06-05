// File: src/App.jsx

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/auth/ProfilePage";
import { bootstrapLocalData } from "./utils/bootstrapLocalData";

function App() {
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    bootstrapLocalData();
    setDataReady(true);
  }, []);

  if (!dataReady) {
    return null;
  }

  return (
    <div className="react-wrapper">
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
