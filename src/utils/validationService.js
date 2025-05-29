// File: src/utils/validationService.js

// === Name Validators ===

export const validateFullName = (value) => {
  if (!value.trim()) return "Full name is required.";
  if (!value.includes(" "))
    return "Please enter your full name (first and last).";
  return null;
};

// === Address Validators ===

export const validateStreetAddress = (value) => {
  if (!value.trim()) return "Street address is required.";
  if (!/\d/.test(value)) return "Street address must include a number.";
  return null;
};

export const validateCity = (value) => {
  if (!value.trim()) return "City is required.";
  return null;
};

export const validatePostalCode = (value) => {
  if (!/^\d{3}\s?\d{2}$/.test(value)) {
    return "Postal code must be 5 digits, optionally with a space.";
  }
  return null;
};

// === Phone Validators ===

export const validatePhoneNumber = (value, { allowMockUser = false } = {}) => {
  const cleaned = value.trim().replace(/\s|-/g, "");

  if (allowMockUser && cleaned === "user") return null;

  const isIntl = /^\+\d{6,15}$/.test(cleaned);
  const isLocal = /^07\d{1}\d{7}$/.test(cleaned);

  if (!isIntl && !isLocal) {
    return "Phone must be in format +46700111222 or 070-123 45 67.";
  }

  return null;
};

// === Password Validators ===

export const validatePassword = (value, minLen = 4) => {
  if (!value || value.length < minLen) {
    return `Password must be at least ${minLen} characters.`;
  }
  return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Passwords do not match.";
  return null;
};

// === Payment Validators ===

export const validateCardNumber = (value) => {
  if (!/^\d{16}$/.test(value)) return "Card number must be exactly 16 digits.";
  return null;
};

export const validateExpiryDate = (value) => {
  const [month, year] = value.split("/").map((v) => v.trim());
  if (!month || !year || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(year)) {
    return "Expiry must be in MM/YY format.";
  }

  const expDate = new Date(`20${year}`, parseInt(month), 0);
  const now = new Date();
  if (expDate <= now) {
    return "Card has expired or date is invalid.";
  }

  return null;
};

export const validateCVV = (value) => {
  if (!/^\d{3}$/.test(value)) return "CVV must be 3 digits.";
  return null;
};

export const validateSwishPhone = (value) => {
  const cleaned = value.trim().replace(/\s|-/g, "");
  const isValid =
    /^\+\d{6,15}$/.test(cleaned) || /^07\d{1}\d{7}$/.test(cleaned);

  if (!isValid) {
    return "Swish number must be a valid Swedish mobile format.";
  }

  return null;
};
