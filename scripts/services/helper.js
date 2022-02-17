import {
  ICON_ROOT_DIR,
  CURRENCYNAMETOSYMBOL,
} from "../constants/properties.js";

// HELPER FUNCTIONS

export const getIcon = (key) => {
  return `${ICON_ROOT_DIR}/${key}.svg`;
};

// It does the capitalization of first letter of every word in a line
export const title = (line) => {
  let res = "";
  for (let word of line.trim().split(" ")) {
    res += word[0].toUpperCase() + word.slice(1) + " ";
  }
  res.trim();
  return res;
};

export const getCurrencySymbol = (currencyName) => {
  return CURRENCYNAMETOSYMBOL[currencyName];
};

export const createElement = (elem, payload) => {
  const element = document.createElement(elem);
  if (payload) {
    if (payload.html) {
      element.innerHTML = payload.html;
    }
    if (payload.class) {
      element.classList.add(payload.class);
    }
    if (payload.attrs) {
      const attributes = payload.attrs;
      for (let pair of attributes) {
        element.setAttribute(pair["attr"], pair["value"]);
      }
    }
  }
  return element;
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const getKeys = (obj) => {
  return obj !== undefined && obj !== null && typeof obj === "object"
    ? Object.keys(obj)
    : [];
};
