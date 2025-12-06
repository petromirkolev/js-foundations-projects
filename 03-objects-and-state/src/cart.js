const cart = {
  items: [],
};

function createEmptyCart() {
  return { items: [] };
}

function addItem(cart, item) {
  const exists = cart.items.find((exists) => exists.id === item.id);

  if (!exists) {
    return { ...cart, items: [...cart.items, item] };
  }
  const updated = cart.items.map((current) =>
    current.id === item.id
      ? { ...current, quantity: current.quantity + item.quantity }
      : current
  );
  return { ...cart, items: updated };
}

function removeItem(cart, itemId) {
  const newItems = cart.items.filter((item) => item.id !== itemId);
  return { ...cart, items: newItems };
}

function getTotalQuantity(cart) {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

function getTotalPrice(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function clearCart(cart) {
  return { ...cart, items: [] };
}

export {
  createEmptyCart,
  addItem,
  removeItem,
  getTotalPrice,
  getTotalQuantity,
  clearCart,
};
