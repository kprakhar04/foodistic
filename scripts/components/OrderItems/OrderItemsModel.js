import { saveInLocalStorage as saveOrderItems } from "../../utility/localStorage.js";

export const OrderItemsModel = function () {};

OrderItemsModel.prototype.checkout = function (items) {
  saveOrderItems("CHECKOUT_ITEMS", JSON.stringify(items));
};
