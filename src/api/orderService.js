// File: src/api/orderService.js

const API_BASE = import.meta.env.VITE_API_URL;
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL === "true";

export const getOrders = async () => {
  if (USE_LOCAL) {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  }
  const res = await fetch(`${API_BASE}/orders`);
  return await res.json();
};

export const getOrder = async (id) => {
  if (USE_LOCAL) {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    return all.find((o) => o.id === id) || null;
  }
  const res = await fetch(`${API_BASE}/orders/${id}`);
  return await res.json();
};

export const createOrder = async (order) => {
  if (USE_LOCAL) {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = { ...order, id: Date.now() };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
  }
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return await res.json();
};

export const deleteOrder = async (id) => {
  if (USE_LOCAL) {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const filtered = orders.filter((o) => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(filtered));
    return { deleted: true };
  }
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
