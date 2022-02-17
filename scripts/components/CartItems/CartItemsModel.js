const MIN_ALLOWED_QUANTITY = 1;
const MAX_ALLOWED_QUANTITY = 10;

export const CartItemsModel = function () {
  this.setCart();
};

CartItemsModel.prototype.setCart = function (updateCartItems) {
  if (!updateCartItems) {
    this._cart = {
      items: [],
      total: 0,
      totalItems: 0,
    };
  } else {
    this._cart = updateCart;
  }
};

CartItemsModel.prototype.getCart = function () {
  return this._cart;
};

CartItemsModel.prototype.addToCart = function (item) {
  const { id } = item;
  const foundItem = this._cart.items.find((item) => item.id === id);
  if (!foundItem) {
    this._cart.items.push({ ...item, quantity: 1, totalItemPrice: item.price });
    updateCartValues(this._cart);
  } else {
    this.updateCart(id, 1);
  }
  return this._cart;
};

CartItemsModel.prototype.updateCart = function (id, quantityChange = 0) {
  id = parseInt(id);
  let updatedCartItems = this._cart.items.map((item) => {
    if (
      item.id === id &&
      !quantityChangeFailCondition(item.quantity, quantityChange)
    ) {
      const newQuantity = item.quantity + quantityChange;
      return {
        ...item,
        quantity: newQuantity,
        totalItemPrice: item.price * newQuantity,
      };
    }
    return item;
  });
  updatedCartItems = updatedCartItems.filter((item) => item.quantity != 0);
  if (updatedCartItems.length === 0) {
    this.setCart();
  } else {
    this._cart.items = updatedCartItems;
  }
  updateCartValues(this._cart);
  return this._cart;
};

function quantityChangeFailCondition(oldQuantity, quantityChange) {
  return oldQuantity == MAX_ALLOWED_QUANTITY && quantityChange == 1;
}

function updateCartValues(cartItems) {
  cartItems.total = updateValue(cartItems.items, updateCartTotal);
  cartItems.totalItems = updateValue(cartItems.items, updateCartTotalItems);
}

function updateValue(items, fn) {
  return items.reduce((prev, item) => prev + fn(item), 0);
}
function updateCartTotal(item) {
  return +item.totalItemPrice;
}
function updateCartTotalItems(item) {
  return +item.quantity;
}
