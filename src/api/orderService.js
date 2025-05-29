// File: src/api/orderService.js

const API_BASE = import.meta.env.VITE_API_URL;
const USE_LOCAL_DB = import.meta.env.VITE_USE_LOCAL === "true";
const LOCAL_ORDER_KEY = "orders";

import { v4 as uuidv4 } from "uuid";

const loadAllOrders = async () => {
  if (USE_LOCAL_DB) {
    return JSON.parse(localStorage.getItem(LOCAL_ORDER_KEY) || "[]");
  }
  const res = await fetch(`${API_BASE}/orders`);
  return await res.json();
};

const saveAllOrders = (orders) => {
  if (USE_LOCAL_DB) {
    localStorage.setItem(LOCAL_ORDER_KEY, JSON.stringify(orders));
  }
};

export const getAllOrders = async () => {
  return await loadAllOrders();
};

export const getOrderByUUID = async (uuid) => {
  const orders = await loadAllOrders();
  return orders.find((o) => o.uuid === uuid) || null;
};

export const createOrder = async (order) => {
  const newOrder = {
    ...order,
    id: USE_LOCAL_DB ? Date.now() : undefined,
    uuid: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  if (USE_LOCAL_DB) {
    const orders = await loadAllOrders();
    orders.push(newOrder);
    saveAllOrders(orders);
    return newOrder;
  }

  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrder),
  });
  return await res.json();
};

export const deleteOrderById = async (id) => {
  if (USE_LOCAL_DB) {
    const orders = await loadAllOrders();
    const updated = orders.filter((o) => o.id !== id);
    saveAllOrders(updated);
    return { deleted: true };
  }

  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
