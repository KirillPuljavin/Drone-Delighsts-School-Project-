// File: src/utils/bootstrapLocalData.js

import { products } from "../../data/initialData.js";

export function bootstrapLocalData() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
