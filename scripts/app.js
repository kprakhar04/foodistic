const startTime = new Date().getTime();

// GLOBAL CONSTANTS
const DISH_ITEMS = "dishItems";

// DATA INITIALIZER
function init(spec) {
  const that = {};

  that.getField = function (key) {
    return spec[key];
  };

  that.setField = function (key, value) {
    spec[key] = value;
  };

  return that;
}

// appData initialization
const appData = init({});

// fakeFetch

const fakeFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve({
          data,
          status: 200,
        });
      } else {
        reject({
          msg: "Resource not found!",
          status: 404,
        });
      }
    }, 500);
  });
};

// resolving the promise

const loadData = () => {
  fakeFetch()
    .then((res) => {
      appData.setField(DISH_ITEMS, JSON.parse(res.data));
      loadDishes();
    })
    .catch((err) => {
      console.log("inside catch");
      console.log(`${err.msg}: ${err.status}`);
    });
};

loadData();

// HELPER FUNCTIONS

const getIcon = (key) => {
  const root = "./assets/icons";
  return `${root}/${key}.svg`;
};

const title = (line) => {
  let res = "";
  for (let word of line.trim().split(" ")) {
    res += word[0].toUpperCase() + word.slice(1) + " ";
  }
  res.trim();
  return res;
};

const getCurrencySymbol = (currencyName) => {
  const currencyEntities = {
    INR: "&#8377;",
    USD: "&#36;",
  };
  return currencyEntities[currencyName];
};

const createElement = (elem, payload) => {
  const element = document.createElement(elem);
  if (payload) {
    if (payload.html) {
      element.innerHTML = payload.html;
    }
    if (payload.class) {
      element.classList.add(payload.class);
    }
    if (payload.attrs) {
      const attributes = payload.attrs;
      for (let pair of attributes) {
        element.setAttribute(pair["attr"], pair["value"]);
      }
    }
  }
  return element;
};

const appendChildToFragment = (fragment, child) => {
  fragment.appendChild(child);
};

/* 
REPLICATE THIS THROUGH JS
<div id="starters" class="dish-group">
             <div>
              <h2>Starters</h2>
              <p class="sub-title">3 items</p>
            </div>
             <div class="dish-item">

                <div>
                <img src="./assets/icons/non-veg.svg" alt="non-veg" class="icon">
                <h3>Chicken Malai Tikka</h3>
                <p>&#8377; 250</p>
                <div>Chicken tikka with malai flavor of malai on it served with green chutney and sliced onion</div>
              </div>
              <div>
                <button>Add</button>
              </div>
            </div>
            </div> */

// IMPORTS OF ELEMENTS IN HTML FILE

const dishesContainer = document.querySelector(".dishes");

// FUNCTION TO BUILD A BUTTON INSIDE A DIV CONTAINER

const buildButton = (text) => {
  const btnContainer = createElement("div");
  const btn = createElement("button", {
    html: text,
  });
  btnContainer.appendChild(btn);
  return btnContainer;
};

// HELPER FUNCTION TO BUILD THE MAIN PART OF A DISH ITEM

const buildDish = (dish) => {
  const dishFragment = new DocumentFragment();
  const dishContainer = createElement("div");

  const icon = createElement("img", {
    class: "icon",
    attrs: [
      {
        attr: "src",
        value: getIcon(dish["type"]),
      },
      {
        attr: "alt",
        value: dish["type"],
      },
    ],
  });

  const name = createElement("h3", {
    html: dish["name"],
  });
  const currencySymbol = getCurrencySymbol(dish["currency"]);
  const price = createElement("p", {
    html: `${currencySymbol} ${dish["price"]}`,
  });
  const description = createElement("div", {
    html: dish["description"],
  });

  appendChildToFragment(dishFragment, icon);
  appendChildToFragment(dishFragment, name);
  appendChildToFragment(dishFragment, price);
  appendChildToFragment(dishFragment, description);
  dishContainer.appendChild(dishFragment);
  return dishContainer;
};

// HELPER FUNCTION TO BUILD A DISH GROUP ITEMS

const buildDishGroupItems = (dishGroupFragment, dishGroupData) => {
  for (let dish of dishGroupData) {
    const dishFragment = new DocumentFragment();
    const dishItemContainer = createElement("div", {
      class: "dish-item",
    });
    const dishContainer = buildDish(dish);
    const addBtn = buildButton("add");
    dishFragment.appendChild(dishContainer);
    dishFragment.appendChild(addBtn);

    appendChildToFragment(dishFragment, dishContainer);
    appendChildToFragment(dishFragment, addBtn);
    dishItemContainer.appendChild(dishFragment);
    dishGroupFragment.appendChild(dishItemContainer);
  }
};

// HELPER FUNCTION TO BUILD THE HEADER PART OF A DISH CATEGORY/GROUP

const buildDishGroupHeader = (dishGroup, len) => {
  const dishHeaderContainer = createElement("div");
  const groupName = createElement("h2", {
    html: title(dishGroup),
  });

  const totalItems = createElement("p", {
    class: "sub-title",
    html: `${len} items`,
  });

  dishHeaderContainer.appendChild(groupName);
  dishHeaderContainer.appendChild(totalItems);

  return dishHeaderContainer;
};

// BUILD WHOLE LIST ITEM BY ACCEPTING A CONTAINER AND DATA ASSOCIATED WITH IT

const buildDishesList = (dishesFragment, dishItems) => {
  const dishGroupKeys = Object.keys(dishItems);

  for (let dishGroup of dishGroupKeys) {
    const dishGroupFragment = new DocumentFragment();
    const dishGroupContainer = createElement("div", {
      class: ["dish-group"],
    });
    const dishGroupHeader = buildDishGroupHeader(
      dishGroup,
      dishItems[dishGroup].length
    );
    appendChildToFragment(dishGroupFragment, dishGroupHeader);
    buildDishGroupItems(dishGroupFragment, dishItems[dishGroup]);
    dishGroupContainer.appendChild(dishGroupFragment);
    appendChildToFragment(dishesFragment, dishGroupContainer);
  }
};

const loadDishes = () => {
  const dishItems = appData.getField(DISH_ITEMS);

  const dishesFragment = new DocumentFragment();
  buildDishesList(dishesFragment, dishItems);

  dishesContainer.appendChild(dishesFragment);

  const endTime = new Date().getTime();
  console.log(endTime - startTime);
};
