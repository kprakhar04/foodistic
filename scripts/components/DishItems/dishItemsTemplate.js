import { title, getIcon, getCurrencySymbol } from "../../utility/helper.js";

export const dishItemsTemplate = function (dishCategories, dishItems) {
  let res = "";
  for (let dishCategory of dishCategories) {
    res += `
      <div id="${dishCategory}" class="dish-group">
      ${buildDishGroupHeader(dishCategory, dishItems)}
      ${buildDishGroupItems(dishCategory, dishItems[dishCategory])}
      </div>
      `;
  }
  return res;
};
const buildDishGroupHeader = function (dishCategory, dishItems) {
  return `
      <h2>${title(dishCategory)}</h2>
      <p class="sub-title">${dishItems[dishCategory].length} items</p>
      `;
};
const buildDishGroupItems = function (dishCategory, dishList) {
  let res = ``;
  for (let dish of dishList) {
    res += `<div class=dish-item>
       <div>
       <img src="${getIcon(dish.type)}" alt="${dish.type}" class='icon'/>
       <h3>${dish.name}</h3>
       <p>${getCurrencySymbol(dish.currency)} ${dish.price}</p>
       <div>${dish.description}</div>
       </div>
       <div>
       <button class="add-to-cart-btn btn" data-dish-category="${dishCategory}" data-dish-id=${
      dish.id
    }>Add</button>
       </div>
      </div>
      `;
  }
  return res;
};

export const dishNavLinksTemplate = (dishCategories) => {
  let res = "";
  for (const dishCategory of dishCategories) {
    res += `
     <a href="#${dishCategory}">${title(dishCategory)}</a>
     `;
  }
  return res;
};

export const dishesTemplate = (dishNavLinks, dishItemsList) => {
  return `
   <div class="dish-nav-links">
   ${dishNavLinks}
   </div>
   <div class="dishes">
   ${dishItemsList}
   </div>
  `;
};
