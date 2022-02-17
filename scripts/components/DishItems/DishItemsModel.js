import { apiCall as fetchDishItems } from "../../services/apiCall.js";

const DISH_ITEMS_ENDPOINT = "dishItems.json";

export const DishItemsModel = function () {
  this._dishItems = {};
};

DishItemsModel.prototype.getDishItems = function () {
  return this._dishItems;
};

DishItemsModel.prototype.setDishItems = function (updatedDishItems = {}) {
  this._dishItems = updatedDishItems;
};

DishItemsModel.prototype.getDishItemByIdAndCategory = function (
  dishId,
  dishCategory
) {
  const dishItemsInACategory = this.getDishItems()[dishCategory];
  const dishItem = dishItemsInACategory.find((item) => item.id == dishId);
  if (!dishItem) {
    return;
  }
  return dishItem;
};

DishItemsModel.prototype.loadDishItems = function () {
  return new Promise((resolve, reject) => {
    fetchDishItems(DISH_ITEMS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        this.setDishItems(data);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
