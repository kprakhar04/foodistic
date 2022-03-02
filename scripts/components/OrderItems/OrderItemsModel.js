import { saveInLocalStorage } from "../../utility/localStorage.js";

export const OrderItemsModel = function () {};

OrderItemsModel.prototype.checkout = function (items) {
  saveInLocalStorage("CHECKOUT_ITEMS", JSON.stringify(items));
};
