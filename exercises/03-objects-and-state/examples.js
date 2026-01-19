import {
  createEmptyCart,
  addItem,
  removeItem,
  getTotalPrice,
  getTotalQuantity,
  clearCart,
} from './src/cart.js';

import {
  createCounter,
  increment,
  decrement,
  reset,
  getValue,
} from './src/counter.js';

import {
  createDefaultSettings,
  updateTheme,
  toggleNotifications,
  setLanguage,
  cloneSettings,
} from './src/userSettings.js';

//// Counter tests
console.log('--- COUNTER EXAMPLES ---');
let c = createCounter(5);
// Expect: 5
console.log(getValue(c));
c = increment(c);
// Expect 6
console.log(getValue(c));
c = reset(c);
// Expect 0
console.log(getValue(c));

//// User settings tests
console.log('--- USER SETTINGS EXAMPLES ---');

let settings = createDefaultSettings();
console.log('Default settings:', settings);
// Expect: { theme: 'light', language: 'en', notifications: true }

// Change theme
const darkSettings = updateTheme(settings, 'dark');
console.log('After updateTheme to dark:', darkSettings);
// Expect: theme: 'dark'
console.log('Original settings still light? (immutability check):', settings);
// Expect: theme: 'light'

// Toggle notifications
const toggledOnce = toggleNotifications(settings);
console.log('Toggled notifications once:', toggledOnce);
// Expect: notifications: false (if default was true)
const toggledTwice = toggleNotifications(toggledOnce);
console.log('Toggled notifications twice:', toggledTwice);
// Expect: notifications back to true

// Change language
const bgSettings = setLanguage(settings, 'bg');
console.log('Language set to bg:', bgSettings);
// Expect: language: 'bg'
console.log('Original settings language still en?:', settings);
// Expect: 'en' if not mutated

// Clone settings
const cloned = cloneSettings(settings);
console.log('Cloned settings:', cloned);
// Expect: same values as settings

// Mutate clone and ensure original unchanged
cloned.theme = 'dark';
console.log('Mutated clone theme to dark:', cloned);
console.log(
  'Original settings after clone mutation (should stay light):',
  settings
);

//// Cart tests
console.log('--- CART EXAMPLES ---');

let cart = createEmptyCart();
console.log('Empty cart:', cart);
// Expect: { items: [] }

// Add first item
const itemA = { id: 'p1', name: 'Product 1', price: 10, quantity: 2 };
cart = addItem(cart, itemA);
console.log('After adding itemA:', cart);
// Expect: items length 1, item p1 with quantity 2

// Add second item
const itemB = { id: 'p2', name: 'Product 2', price: 5, quantity: 1 };
cart = addItem(cart, itemB);
console.log('After adding itemB:', cart);
// Expect: items length 2

// Add same itemA again (should increase quantity, not duplicate)
cart = addItem(cart, { id: 'p1', name: 'Product 1', price: 10, quantity: 3 });
console.log('After adding itemA again (quantity +3):', cart);
// Expect: p1 quantity = 5 (2 + 3), still only ONE item with id 'p1'

// Totals
const totalQty = getTotalQuantity(cart);
const totalPrice = getTotalPrice(cart);
console.log('Total quantity:', totalQty);
// Expect: 5 (p1) + 1 (p2) = 6
console.log('Total price:', totalPrice);
// Expect: (5 * 10) + (1 * 5) = 55

// Remove itemB
cart = removeItem(cart, 'p2');
console.log('After removing p2:', cart);
// Expect: only p1 left

const totalQtyAfterRemove = getTotalQuantity(cart);
const totalPriceAfterRemove = getTotalPrice(cart);
console.log('Total quantity after remove:', totalQtyAfterRemove);
// Expect: 5
console.log('Total price after remove:', totalPriceAfterRemove);
// Expect: 5 * 10 = 50

// Clear cart
const cleared = clearCart(cart);
console.log('Cleared cart:', cleared);
// Expect: { items: [] }
console.log('Old cart still has items? (immutability check):', cart);
// Expect: old cart still has items
