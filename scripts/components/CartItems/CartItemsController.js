import {
  centralController,
  controllerNames,
} from "../../store/centralController.js";
export const CartItemsController = function (spec) {
  const { model, view } = spec;
  this.model = model;
  this.view = view;
  this.view.renderCartItems();
  this.view.bindClickHandlers({
    updateCartHandler: this.handleUpdateCart.bind(this),
    checkoutHandler: this.handleCheckout.bind(this),
  });
};
CartItemsController.prototype.handelNewItemToCart = function (item) {
  const cartData = this.model.addToCart(item);
  this.view.renderCartItems(cartData);
};
CartItemsController.prototype.handleUpdateCart = function (id, quantity) {
  const cartData = this.model.updateCart(id, quantity);
  this.view.renderCartItems(cartData);
};
CartItemsController.prototype.handleCheckout = function () {
  const cartItems = this.model.getCart();
  const orderItemsController =
    centralController[controllerNames["ORDER_ITEMS_CONTROLLER"]];
  orderItemsController.handleCheckout(
    cartItems,
    this.handleEmptyCart.bind(this)
  );
  console.log("Called");
};

CartItemsController.prototype.handleEmptyCart = function () {
  this.model.setCart();
  this.view.renderCartItems();
};
