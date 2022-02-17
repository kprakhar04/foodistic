export const htmlElements = {
  dishItemsContainer: document.querySelector(".dish-items"),
  cartItemsContainer: document.querySelector(".dish-cart"),
};

/**
 * ! DEPRECATED UNTIL NEXT REFACTORING
 */

// export function htmlElementBySelector(selector, isAll) {
//   const selectionType =
//     selector.type === "class" ? "." : selector.type === "id" ? "#" : "";
//   const finalSelector = selectionType + selector.tag;
//   return !isAll
//     ? document.querySelector(finalSelector)
//     : document.querySelectorAll(finalSelector);
// }

// export const selectorMapping = {
//   DISH_ITEMS_CONTAINER: {
//     tag: "dish-items",
//     type: "class",
//   },
//   ADD_TO_CART_BTN: {
//     tag: "add-to-cart-btn",
//     type: "class",
//   },
// };
