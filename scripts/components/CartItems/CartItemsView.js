import { htmlElements as getElement } from "../../constants/htmlElements.js";
import { dataAttribute } from "../../constants/dataAttributes.js";
import { emptyCartTemplate, cartItemsTemplate } from "./cartItemsTemplate.js";
import { quantityChangeElements } from "../../constants/properties.js";
import { callHandler, getChangeValue } from "./cartItemsHelper.js";

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

CartItemsView.prototype.bindClickHandlers = function (handlers) {
  this.cartItemsContainer.addEventListener("click", function (event) {
    const targetElement = event.target;
    if (!targetElement) {
      return;
    }
    callHandler(targetElement, handlers);
  });
};

CartItemsView.prototype.renderCartItems = function (cartItems) {
  if (!cartItems || cartItems.items.length === 0) {
    this.cartItemsContainer.innerHTML = emptyCartTemplate();
  } else {
    this.cartItemsContainer.innerHTML = cartItemsTemplate(cartItems);
  }
};
