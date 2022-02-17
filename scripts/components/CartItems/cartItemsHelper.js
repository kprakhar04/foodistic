import { IMAGE_ROOT_DIR } from "../../constants/properties.js";
import { getCurrencySymbol, getIcon } from "../../services/helper.js";
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

export const cartItemsTemplate = function (cartItems) {
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
    <div class="dish-cart-checkout-btn">
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
             <div class="quantity-change-btn flex justify-content-center align-items-center">
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

// <div class="flex-column justify-content-space-between">
//   <div class="dish-cart-header">
//     <h3>Cart</h3>
//     <p class="sub-title">3 items</p>
//   </div>
//   <div class="dish-cart-items flex-column justify-content-space-between">
//     <div class="dish-cart-item flex justify-content-space-between">
//       <div class="flex">
//         <img src="./assets/icons/veg.svg" class="icon" />
//         <h6>Paneer Tikka</h6>
//       </div>
//       <div class="flex">
//         <div class="quantity-change-btn flex justify-content-space-between align-items-center">
//           <span class="decrement">-</span>
//           <span class="quantity">1</span>
//           <span class="increment">+</span>
//         </div>

//         <p>&#8377; 339</p>
//       </div>
//     </div>
//   </div>
//   <div class="dish-cart-checkout flex-column">
//     <div class="dish-cart-subtotal flex justify-content-space-between">
//       <h4>Subtotal</h4>
//       <span>&#8377; 339</span>
//       <p></p>
//     </div>
//     <div class="dish-cart-checkout-btn">
//       <button class="btn flex justify-content-center">Checkout →</button>
//     </div>
//   </div>
// </div>;
