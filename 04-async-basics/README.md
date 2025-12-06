## 04 – Async Basics

Small modules that simulate “asynchronous” systems using Promises, async/await, and simple fake API calls.

## 🎯 Goal

Practice:

- creating and resolving Promises
- using setTimeout as an async simulator
- chaining async operations with .then() and .catch()
- writing async/await functions
- handling success and error cases
- composing multiple async functions into one flow
- running predictable async tests in Node (console only)

## ✅ Modules

1. delay.js

- delay(ms)
- returns a Promise
- resolves after ms milliseconds
- resolved value must include the ms value in a string

2. fakeApi.js

Imitates a backend API using in-memory data and artificial delays.

- fetchUser(userId)
- resolves with a user object
- rejects if no such user exists
- uses delay() internally with 300–700 ms random delay
- fetchOrders(userId)
- resolves with an array of orders belonging to the user
- uses delay() internally with 300–700 ms random delay
- never rejects (empty array is valid)
- fetchDashboard(userId)
- sync function that combines the above two:
- await fetchUser(userId)
- await fetchOrders(userId)
- returns:

{
user: { ... },
orders: [ ... ],
totalSpent: number
}

- throws if user does not exist
  📁 Files
  04-async-basics/
  delay.js
  fakeApi.js
  examples.js
  README.md
  package.json // { "type": "module" }

## 📘 Examples

See examples.js for usage and example flows:

- calling delay(ms) and observing async order
- loading a user with .then() / .catch()
- loading a dashboard with async/await + try/catch
- comparing sequential vs parallel async operations (Promise.all)

Each example block prints expectations in the console in the same format as the 03-objects-and-state examples.

## 🧠 Concepts Practiced

Promises and the event loop

- resolve and reject
- async/await as a sequential interface over Promises
- combining async functions to build higher-level async flows
- error handling for rejected Promises
- understanding synchronous vs asynchronous execution order
- writing clean, predictable async tests without mutating state

## How to run tests

```bash
node examples.js
```
