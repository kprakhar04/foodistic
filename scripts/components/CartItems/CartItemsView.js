import { htmlElements as getElement } from "../../constants/htmlElements.js";
import { emptyCartTemplate, cartItemsTemplate } from "./cartItemsTemplate.js";
import { callHandler } from "./cartItemsHelper.js";

export function CartItemsView() {
  this.cartItemsContainer = getElement["cartItemsContainer"];
}

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
