import {
  createEmptyCart,
  addItem,
  removeItem,
  getTotalPrice,
  getTotalQuantity,
  clearCart,
} from '../src/cart.js';

import {
  createCounter,
  increment,
  decrement,
  reset,
  getValue,
} from '../src/counter.js';

import {
  createDefaultSettings,
  updateTheme,
  toggleNotifications,
  setLanguage,
  cloneSettings,
} from '../src/userSettings.js';

console.log('--- COUNTER EXAMPLES ---');
let c = createCounter(5);
console.log(getValue(c));
c = increment(c);
console.log(getValue(c));
c = reset(c);
console.log(getValue(c));

console.log('\n--- USER SETTINGS EXAMPLES ---');
// create, update theme, toggle notifications, etc.

console.log('\n--- CART EXAMPLES ---');
// createEmptyCart, addItem multiple times, get totals, remove item, clear
