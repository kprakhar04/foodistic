import { htmlElements as getElement } from "../../constants/htmlElements.js";
import { dataAttribute } from "../../constants/dataAttributes.js";
import { emptyCartTemplate, cartItemsTemplate } from "./cartItemsHelper.js";
import { quantityChangeElements } from "../../constants/properties.js";

export function CartItemsView() {
  this.cartItemsContainer = getElement["cartItemsContainer"];
}

CartItemsView.prototype.bindUpdateCart = function (handler) {
  this.cartItemsContainer.addEventListener("click", function (event) {
    const targetElement = event.target;
    const targetElementText = targetElement.innerText;
    if (
      !targetElement ||
      targetElement.tagName !== "SPAN" ||
      !quantityChangeElements.includes(targetElementText)
    ) {
      return;
    }
    const id = targetElement.getAttribute(dataAttribute["ITEM_ID"]);
    const change = getChangeValue(targetElementText);
    handler(id, change);
  });
};

CartItemsView.prototype.renderCartItems = function (cartItems) {
  this.cartItemsContainer.innerHTML =
    !cartItems || cartItems.items.length === 0
      ? emptyCartTemplate()
      : cartItemsTemplate(cartItems);
};

function getChangeValue(targetElementText) {
  switch (targetElementText) {
    case "+":
      return 1;
    case "-":
      return -1;
    default:
      return 0;
  }
}
