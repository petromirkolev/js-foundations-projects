# 03 – Objects and State

Small modules that model simple “stateful” systems using plain JavaScript objects.

## 🎯 Goal

Practice:

- representing state with objects
- updating state without mutating the original
- using array methods with object collections
- keeping logic in small, focused functions

## ✅ Modules

### 1. counter.js

- createCounter(initialValue?)
- increment(counter)
- decrement(counter)
- reset(counter)
- getValue(counter)

### 2. userSettings.js

- createDefaultSettings()
- updateTheme(settings, theme)
- toggleNotifications(settings)
- setLanguage(settings, language)
- cloneSettings(settings)

### 3. cart.js

- createEmptyCart()
- addItem(cart, item)
- removeItem(cart, itemId)
- getTotalQuantity(cart)
- getTotalPrice(cart)
- clearCart(cart)

See examples/examples.js for usage and sample flows.

## 🧠 Concepts Practiced

- object literals for modeling state
- immutability with spread syntax ({ ...obj })
- working with collections of objects (items in a cart)
- deriving values from state (totals, counts)
- keeping business logic separate from I/O (console.log only in examples)

## How to run tests

```bash
node examples.js
```
