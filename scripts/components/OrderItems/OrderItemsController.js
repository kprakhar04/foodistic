export const OrderItemsController = function (spec) {
  const { model, view } = spec;
  this.model = model;
  this.view = view;
};

OrderItemsController.prototype.handleCheckout = function (cartItems, cb) {
  this.model.checkout(cartItems);
  cb();
};
