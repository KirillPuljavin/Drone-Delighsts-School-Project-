// File: src/utils/userService.js

// LOCAL STORAGE ONLY
const USER_KEY = "user";

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => !!getUser();
