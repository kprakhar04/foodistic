import {
  centralController,
  controllerNames,
} from "../../store/centralController.js";
export const DishItemsController = function (spec) {
  const { model, view } = spec;
  this.model = model;
  this.view = view;
  this.view.bindAddToCart(this.handleAddToCart.bind(this));
};
DishItemsController.prototype.handleAddToCart = function ({
  dishId,
  dishCategory,
}) {
  const dishItem = this.model.getDishItemByIdAndCategory(dishId, dishCategory);
  const cartController =
    centralController[controllerNames["CART_ITEMS_CONTROLLER"]];
  cartController.handelNewItemToCart(dishItem);
};
DishItemsController.prototype.init = function () {
  const dishItems = this.model.getDishItems();
  this.view.renderDishItems(dishItems);
};
