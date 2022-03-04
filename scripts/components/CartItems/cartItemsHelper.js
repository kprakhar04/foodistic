import { quantityChangeElements } from "../../constants/properties.js";
import { dataAttribute } from "../../constants/dataAttributes.js";

quantityChangeElements;
export function callHandler(targetElement, handlers) {
  const closestDiv = targetElement.closest("div");
  const divDataAttribute = closestDiv.getAttribute(
    dataAttribute["CART_ITEMS_CLICK_LISTENER_KEY"]
  );
  switch (divDataAttribute) {
    case dataAttribute["CART_BTN_CLICK_LISTENER_VALUE"]:
      const isValidCartBtn = isQuantityChangeBtn(targetElement);
      if (isValidCartBtn) {
        const id = targetElement.getAttribute(dataAttribute["ITEM_ID"]);
        const change = getChangeValue(targetElement.innerText);

        handlers.updateCartHandler(id, change);
      }
      break;
    case dataAttribute["CHECKOUT_BTN_CLICK_LISTENER_VALUE"]:
      const isValidCheckoutBtn = isCheckoutBtn(targetElement);
      if (isValidCheckoutBtn) {
        handlers.checkoutHandler();
      }
      break;
    default:
      return;
  }
}
function isQuantityChangeBtn(targetElement) {
  const targetElementText = targetElement.innerText;
  if (
    targetElement.tagName !== "SPAN" ||
    !quantityChangeElements.includes(targetElementText)
  ) {
    return false;
  }
  return true;
}

function isCheckoutBtn(targetElement) {
  const closestButton = targetElement.closest("button");
  if (!closestButton) {
    return false;
  }
  return true;
}

export function getChangeValue(targetElementText) {
  switch (targetElementText) {
    case "+":
      return 1;
    case "-":
      return -1;
    default:
      return 0;
  }
}
