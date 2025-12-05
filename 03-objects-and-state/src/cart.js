const cart = {
  items: [
    // { id: 'p1', name: 'Product 1', price: 10, quantity: 2 }
  ],
};

// Rules
// Do NOT mutate original cart or cart.items.
// item should have а shape: { id, name, price, quantity }.

function createEmptyCart() {
  /* ... */
}
// returns { items: [] }

function addItem(cart, item) {
  /* ... */
}
// if item with same id exists → increase quantity
// else → push new item
// returns NEW cart object

function removeItem(cart, itemId) {
  /* ... */
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
