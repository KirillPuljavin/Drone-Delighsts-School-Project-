// File: src/api/productService.js

const API_BASE = import.meta.env.VITE_API_URL;
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL === "true";

export const getProducts = async () => {
  if (USE_LOCAL) {
    const local = localStorage.getItem("products");
    return local ? JSON.parse(local) : [];
  }
  const res = await fetch(`${API_BASE}/products`);
  return await res.json();
};

export const getProduct = async (id) => {
  if (USE_LOCAL) {
    const all = localStorage.getItem("products");
    const list = all ? JSON.parse(all) : [];
    return list.find((p) => p.id === id) || null;
  }
  const res = await fetch(`${API_BASE}/products/${id}`);
  return await res.json();
};
