// File: src/api/userService.js

const API_BASE = import.meta.env.VITE_API_URL;
const USE_LOCAL_DB = import.meta.env.VITE_USE_LOCAL === "true";

const LOCAL_USER_KEY = "localUsers";
const SESSION_KEY = "userSession";

const loadAllUsers = async () => {
  if (USE_LOCAL_DB) {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY) || "[]");
  }
  const res = await fetch(`${API_BASE}/users`);
  return await res.json();
};

const saveAllUsers = (users) => {
  if (USE_LOCAL_DB) {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(users));
  }
};

export const findUserByCredentials = async (phone, password) => {
  const users = await loadAllUsers();
  return (
    users.find((u) => u.phone === phone && u.password === password) || null
  );
};

export const getUserById = async (id) => {
  const users = await loadAllUsers();
  return users.find((u) => u.id === id) || null;
};

export const registerUser = async (userData) => {
  const newUser = {
    ...userData,
    id: USE_LOCAL_DB ? Date.now() : undefined,
  };

  if (USE_LOCAL_DB) {
    const users = await loadAllUsers();
    users.push(newUser);
    saveAllUsers(users);
    return newUser;
  }

  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return await res.json();
};

export const updateUserById = async (id, patchData) => {
  if (USE_LOCAL_DB) {
    const users = await loadAllUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...patchData };
      saveAllUsers(users);
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

export const deleteUserById = async (id) => {
  if (USE_LOCAL_DB) {
    const users = await loadAllUsers();
    const updated = users.filter((u) => u.id !== id);
    saveAllUsers(updated);
    return { deleted: true };
  }

  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const cacheUserSession = (user) => {
  const sessionData = { id: user.id, phone: user.phone };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const loadUserSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

export const clearUserSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
