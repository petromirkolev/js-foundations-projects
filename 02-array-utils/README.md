# 02 – Array Utils

Small utility functions that demonstrate how core array operations work under the hood.

## 🎯 Goal

Reimplement a subset of common array methods using plain loops:

- No "Array.prototype.map", "filter", etc. inside implementations.
- Functions are pure and do not mutate input arrays.
- Each function has several example calls.

## ✅ Implemented functions

- "mapArray(array, callback)"
- "filterArray(array, predicate)"
- "reduceArray(array, reducer, initialValue)"
- "sortArray(array, compareFn)"
- "findInArray(array, predicate)"

See "index.js" for usage.

## 🧠 Concepts practiced

- Iterating arrays with "for" loops
- Pure functions (no side effects)
- Immutability (no in-place mutation of inputs)
- Functional thinking: input → output
- Basic debugging with "console.log"
- Reusable utilities

## ▶️ How to run

From the project root:

```bash
node src/index.js
```
