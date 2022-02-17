export const CartItemsController = function (spec) {
  const { model, view } = spec;
  this.model = model;
  this.view = view;
  this.view.renderCartItems();
  this.view.bindUpdateCart(this.handleUpdateCart.bind(this));
};
CartItemsController.prototype.handelNewItemToCart = function (item) {
  const cartData = this.model.addToCart(item);
  this.view.renderCartItems(cartData);
};
CartItemsController.prototype.handleUpdateCart = function (id, quantity) {
  const cartData = this.model.updateCart(id, quantity);
  this.view.renderCartItems(cartData);
};
