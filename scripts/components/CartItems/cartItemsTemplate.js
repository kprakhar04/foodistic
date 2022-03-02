import { IMAGE_ROOT_DIR } from "../../constants/properties.js";
import { getCurrencySymbol, getIcon } from "../../utility/helper.js";
import { dataAttribute } from "../../constants/dataAttributes.js";

export const emptyCartTemplate = function () {
  return `
  <div class='dish-cart-empty'>
            <h3>Cart Empty</h3>
            <div>
              <img src="${IMAGE_ROOT_DIR}/cart_empty.png" alt="No items in the cart" />
              <p>
                Good food is always cooking! Go ahead, order some yummy items from
                the menu.
              </p>
            </div>
          </div>
  `;
};

export const cartItemsTemplate = function (cartItems, elements) {
  return `
    <div class="flex-column justify-content-space-between">
    <div class="dish-cart-header">
    <h3>Cart</h3>
    <p class="sub-title">${cartItems.totalItems} items</p>
    </div>
    <div class="dish-cart-items flex-column justify-content-space-between">
    ${dishCartItemsTemplate(cartItems.items)}
    </div>
    <div class="dish-cart-checkout flex-column">
    <div class="dish-cart-subtotal flex justify-content-space-between">
    <h4>Subtotal</h4>
    <span>&#8377; ${cartItems.total}</span>
    </div>
    <div class="dish-cart-checkout-btn" ${
      dataAttribute["CART_ITEMS_CLICK_LISTENER_KEY"]
    }=${dataAttribute["CHECKOUT_BTN_CLICK_LISTENER_VALUE"]}>
    <button class="btn flex justify-content-center">Checkout →</button>
    </div>
   </div>
 </div>
    `;

  function dishCartItemsTemplate(items) {
    let res = "";
    items.forEach((item) => {
      res += `
            <div class="dish-cart-item flex justify-content-space-between">
            <div class="flex">
            <img src="${getIcon(item.type)}" class="icon" />
            <h6>${item.name}</h6>
            </div>
            <div class="flex align-items-center justify-content-space-between">
             <div class="quantity-change-btn flex justify-content-center align-items-center" ${
               dataAttribute["CART_ITEMS_CLICK_LISTENER_KEY"]
             }="${dataAttribute["CART_BTN_CLICK_LISTENER_VALUE"]}">
             <span class="decrement" data-item-id="${item.id}">-</span>
             <span class="quantity">${item.quantity}</span>
             <span class="increment" data-item-id="${item.id}">+</span>
             </div>
             <p>${getCurrencySymbol(item.currency)} ${item.totalItemPrice}</p>
            </div>
            </div>
            `;
    });
    return res;
  }
};
