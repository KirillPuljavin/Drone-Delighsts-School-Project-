// File: src/utils/cartService.js

const STORAGE_KEY = "drone-cart";

export const getCart = () => {
  const cart = localStorage.getItem(STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

export const addToCart = (item, quantity = 1) => {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  saveCart(cart);
};

export const updateQuantity = (id, newQty) => {
  let cart = getCart();
  cart = cart
    .map((item) => {
      if (item.id === id) {
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter(Boolean);
  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(STORAGE_KEY);
};
