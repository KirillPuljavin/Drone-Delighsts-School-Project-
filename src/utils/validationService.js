// File: src/utils/validationService.js

// === Name Validators ===
export const validateFullName = (value, t) => {
  if (!value.trim()) return t("validation.fullNameRequired");
  if (!value.includes(" ")) return t("validation.fullNameFormat");
  return null;
};

// === Address Validators ===
export const validateStreetAddress = (value, t) => {
  if (!value.trim()) return t("validation.streetRequired");
  if (!/\d/.test(value)) return t("validation.streetFormat");
  return null;
};

export const validateCity = (value, t) => {
  if (!value.trim()) return t("validation.cityRequired");
  return null;
};

export const validatePostalCode = (value, t) => {
  if (!/^\d{3}\s?\d{2}$/.test(value)) {
    return t("validation.postalCodeFormat");
  }
  return null;
};

// === Phone Validators ===
export const validatePhoneNumber = (
  value,
  t,
  { allowMockUser = false } = {}
) => {
  const cleaned = value.trim().replace(/\s|-/g, "");

  if (allowMockUser && cleaned === "user") return null;

  const isIntl = /^\+\d{6,15}$/.test(cleaned);
  const isLocal = /^07\d{8}$/.test(cleaned);

  if (!isIntl && !isLocal) {
    return t("validation.phoneFormat");
  }

  return null;
};

// === Password Validators ===
export const validatePassword = (value, t, minLen = 4) => {
  if (!value || value.length < minLen) {
    return t("validation.passwordMinLength", { minLen });
  }
  return null;
};

export const validatePasswordMatch = (password, confirmPassword, t) => {
  if (password !== confirmPassword) return t("validation.passwordMismatch");
  return null;
};

// === Payment Validators ===
export const validateCardNumber = (value, t) => {
  if (!/^\d{16}$/.test(value)) return t("validation.cardNumberFormat");
  return null;
};

export const validateExpiryDate = (value, t) => {
  const [month, year] = value.split("/").map((v) => v.trim());
  if (!month || !year || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(year)) {
    return t("validation.expiryFormat");
  }

  const monthNum = parseInt(month);
  if (monthNum < 1 || monthNum > 12) {
    return t("validation.expiryFormat");
  }

  // Get last day of expiry month (day 0 of next month)
  const expDate = new Date(`20${year}`, monthNum, 0);
  const now = new Date();
  if (expDate <= now) {
    return t("validation.cardExpired");
  }

  return null;
};

export const validateCVV = (value, t) => {
  if (!/^\d{3}$/.test(value)) return t("validation.cvvFormat");
  return null;
};

export const validateSwishPhone = (value, t) => {
  const cleaned = value.trim().replace(/\s|-/g, "");
  const isValid =
    /^\+\d{6,15}$/.test(cleaned) || /^07\d{8}$/.test(cleaned);

  if (!isValid) {
    return t("validation.swishPhoneFormat");
  }

  return null;
};
