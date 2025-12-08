# 06 – API Poller

A small module that periodically calls an HTTP API using `fetch()` (via your `getJson`) and tracks the polling state.

## 🎯 Goal

Practice:

- running repeated async calls (polling)
- combining async/await with timers (`setInterval` / `setTimeout`)
- tracking state over time (idle → polling → stopped → error)
- stopping polling via a `stop()` function
- keeping state updates pure and predictable

## ✅ Modules

### 1. pollerState.js

Pure state helpers for the poller.

State shape:

```js
{
  status: 'idle' | 'polling' | 'stopped' | 'error',
  attempts: number,
  lastResult: null | any,
  error: null | string
}
```
