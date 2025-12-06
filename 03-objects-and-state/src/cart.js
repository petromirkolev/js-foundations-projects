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
  // There is NO such product - add it
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
    isSuchProduct.price += price;
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

function getTotalQuantity(cart) {
  let totalQuantity = 0;
  cart.items.forEach((item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

function getTotalPrice(cart) {
  let totalPrice = 0;
  cart.items.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
}

function clearCart(cart) {
  cart.items = [];
}

export {
  createEmptyCart,
  addItem,
  removeItem,
  getTotalPrice,
  getTotalQuantity,
  clearCart,
};
