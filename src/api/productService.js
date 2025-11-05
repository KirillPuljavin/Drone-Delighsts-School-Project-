// File: src/api/productService.js

const API_BASE = import.meta.env.VITE_API_URL;
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL === "true";

export const getProducts = async () => {
  if (USE_LOCAL) {
    try {
      const local = localStorage.getItem("products");
      return local ? JSON.parse(local) : [];
    } catch (error) {
      console.error("Failed to parse products from localStorage:", error);
      return [];
    }
  }
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }
  return await res.json();
};

export const getProduct = async (id) => {
  if (USE_LOCAL) {
    try {
      const all = localStorage.getItem("products");
      const list = all ? JSON.parse(all) : [];
      return list.find((p) => p.id === id) || null;
    } catch (error) {
      console.error("Failed to parse products from localStorage:", error);
      return null;
    }
  }
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }
  return await res.json();
};
