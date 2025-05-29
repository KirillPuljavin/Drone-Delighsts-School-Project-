// File: src/api/userService.js

const API_BASE = import.meta.env.VITE_API_URL;
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL === "true";

export const loginUser = async (username, password) => {
  if (USE_LOCAL) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return (
      users.find((u) => u.username === username && u.password === password) ||
      null
    );
  }
  const res = await fetch(
    `${API_BASE}/users?username=${username}&password=${password}`
  );
  const users = await res.json();
  return users[0] || null;
};

export const getUser = async (id) => {
  if (USE_LOCAL) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((u) => u.id === id) || null;
  }
  const res = await fetch(`${API_BASE}/users/${id}`);
  return await res.json();
};

export const registerUser = async (user) => {
  if (USE_LOCAL) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return newUser;
  }
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const updateUser = async (id, patchData) => {
  if (USE_LOCAL) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u) => u.id === id);
    if (index >= 0) {
      users[index] = { ...users[index], ...patchData };
      localStorage.setItem("users", JSON.stringify(users));
      return users[index];
    }
    return null;
  }
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patchData),
  });
  return await res.json();
};

export const deleteUser = async (id) => {
  if (USE_LOCAL) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const filtered = users.filter((u) => u.id !== id);
    localStorage.setItem("users", JSON.stringify(filtered));
    return { deleted: true };
  }
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
