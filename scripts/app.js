import { DishItemsModel } from "./components/DishItems/DishItemsModel.js";
import { DishItemsView } from "./components/DishItems/DishItemsView.js";
import { DishItemsController } from "./components/DishItems/DishItemsController.js";
import { CartItemsController } from "./components/CartItems/CartItemsController.js";
import { CartItemsModel } from "./components/CartItems/CartItemsModel.js";
import { CartItemsView } from "./components/CartItems/CartItemsView.js";
import {
  centralController,
  controllerNames,
} from "./store/centralController.js";

window.addEventListener("DOMContentLoaded", () => {
  const { model: dishItemsModel, controller: dishItemsController } =
    instantiateMVC(DishItemsModel, DishItemsView, DishItemsController);
  centralController[controllerNames["DISH_ITEMS_CONTROLLER"]] =
    dishItemsController;

  dishItemsModel
    .loadDishItems()
    .then(() => {
      runApp();
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });

  function runApp() {
    dishItemsController.init();
    const { controller: cartItemsController } = instantiateMVC(
      CartItemsModel,
      CartItemsView,
      CartItemsController
    );
    centralController[controllerNames["CART_ITEMS_CONTROLLER"]] =
      cartItemsController;
  }

  function instantiateMVC(Model, View, Controller) {
    const model = new Model();
    const view = new View();
    const controller = new Controller({
      model,
      view,
    });
    return { model, view, controller };
  }
});
