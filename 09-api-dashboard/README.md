# 9 – API Dashboard

Lightweight Node-based dashboard engine that loads data from a real API, tracks async lifecycle, supports filtering and pagination, and maintains all logic as pure, immutable state transitions.

## Features

- Load posts from "https://jsonplaceholder.typicode.com/posts"
- Full async lifecycle: "idle → loading → success → error"
- Text filtering (title + body)
- Pagination with configurable "pageSize"
- Pure state update functions (immutable)
- Derived view ("itemsOnPage") from filter + pagination
- Modular structure: "api.js", "state.js", "dashboard.js", "examples.js"

## State Shape

```js
{
status: 'idle' | 'loading' | 'success' | 'error',
items: [],
filter: {
query: '',
},
pagination: {
pageSize: 5,
currentPage: 1,
totalPages: 1,
},
view: {
itemsOnPage: [],
},
error: null,
lastUpdated: null,
}
```

## Example Usage

```js
let state = createInitialState({ pageSize: 5 });
state = await loadDashboard(state);
state = applyQuery(state, 'qui');
state = nextPageAndUpdate(state);
console.log(state.view.itemsOnPage);
```
