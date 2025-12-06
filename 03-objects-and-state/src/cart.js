const cart = {
  items: [],
};

function createEmptyCart() {
  const newCart = {
    items: [],
  };
  return newCart;
}

function addItem(cart, item, price) {
  const isSuchProduct = cart.items.find((product) => product.name === item);
  // There is NO such product
  if (isSuchProduct === undefined) {
    let lastId = cart.items.length;
    let lastQuantity = cart.items.find((product) => product.name === item);
    cart.items.push({
      id: lastId + 1,
      name: item,
      price: price,
      quantity: lastQuantity === undefined ? 1 : lastQuantity.quantity + 1,
    });
    // There is such product - should update quantity and price only
  } else {
    isSuchProduct.price = price;
    isSuchProduct.quantity++;
  }
}

function removeItem(cart, itemId) {
  const findItem = cart.items.forEach((item) => {
    if (item.id === itemId) {
      let index = cart.items.findIndex((item) => item.id === itemId);
      cart.items.splice(index, 1);
    }
  });
}
// removes item with given id (if exists)
// returns NEW cart object

function getTotalQuantity(cart) {
  /* ... */
}
// sum of all quantities

function getTotalPrice(cart) {
  /* ... */
}
// sum of price * quantity

function clearCart(cart) {
  /* ... */
}
// returns NEW cart { items: [] }

// Testing
let firstCart = createEmptyCart();
addItem(firstCart, 'sirene', 5);
addItem(firstCart, 'hlqb', 5);
addItem(firstCart, 'mlqko', 5);
addItem(firstCart, 'sirene', 5);
addItem(firstCart, 'airqn', 5);
addItem(firstCart, 'bira', 5);
removeItem(firstCart, 4);
