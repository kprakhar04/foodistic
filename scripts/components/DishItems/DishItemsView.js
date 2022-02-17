import { htmlElements as getElement } from "../../constants/htmlElements.js";
import { dataAttribute } from "../../constants/dataAttributes.js";
import { getKeys } from "../../services/helper.js";
import {
  dishItemsTemplate,
  dishNavLinksTemplate,
  dishesTemplate,
} from "./dishItemsHelper.js";

export const DishItemsView = function (spec) {
  this.dishesContainer = getElement["dishItemsContainer"];
  this.controller = null;
};

DishItemsView.prototype.bindAddToCart = function (handler) {
  this.dishesContainer.addEventListener("click", function (event) {
    const targetElement = event.target.closest("button");
    if (!targetElement) {
      return;
    }
    const dishId = targetElement.getAttribute(dataAttribute["DISH_ID"]);
    const dishCategory = targetElement.getAttribute(
      dataAttribute["DISH_CATEGORY"]
    );
    handler({ dishId, dishCategory });
  });
};

DishItemsView.prototype.renderDishItems = function (dishItems) {
  const dishCategories = getKeys(dishItems);
  const dishNavLinks = dishNavLinksTemplate(dishCategories);
  const dishItemsList = dishItemsTemplate(dishCategories, dishItems);
  this.dishesContainer.innerHTML = dishesTemplate(dishNavLinks, dishItemsList);
};
