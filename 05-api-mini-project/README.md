# 05 – API Mini Project

Small modules that wrap `fetch()` and model simple “API client” logic with async/await.

## 🎯 Goal

Practice:

- calling HTTP APIs with `fetch()`
- parsing JSON responses
- handling HTTP errors (4xx / 5xx)
- using async/await for sequential flows
- passing AbortController signals to fetch
- keeping fetch logic in a small reusable client module
- separating API client from “business” service functions

## ✅ Modules

### 1. apiClient.js

Low-level fetch wrapper.

- `getJson(url, options?)`
  - uses `fetch(url, options)`
  - throws on non-OK HTTP status (e.g. 404, 500)
  - parses and returns JSON body
  - `options` should support a `signal` for AbortController

### 2. postService.js

Higher-level functions that use `getJson` to talk to a fake posts API.

Base URL (for reference):

- `https://jsonplaceholder.typicode.com`

Functions:

- `fetchPosts()`

  - GET `/posts`
  - returns array of posts

- `fetchPostById(postId)`

  - GET `/posts/{postId}`
  - returns a single post object
  - should throw if HTTP error (via `getJson`)

- `fetchUserPosts(userId)`
  - GET `/posts?userId={userId}`
  - returns array of posts for that user

See `examples.js` for usage and flows.

## 🧠 Concepts Practiced

- wrapping `fetch()` inside a reusable helper
- async/await for clean, readable async code
- proper error propagation from low-level client to higher-level services
- distinguishing “HTTP error” vs “network/abort error”
- using AbortController with fetch to cancel requests
- structuring API calls like you will later validate in QA tests
