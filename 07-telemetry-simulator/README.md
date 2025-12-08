# 07 – Telemetry Simulator

A small module that simulates a telemetry stream (e.g. sensor readings) over time.

This project combines:

- immutable state updates for a running sensor
- async/timer loops (like the API Poller)
- error simulation and manual stop control

---

## 🎯 Goal

Practice:

- modeling time-evolving numeric data (samples, min, max, last value)
- using timers (`setTimeout`) with async functions
- clean state transitions: `idle → running → stopped` or `idle → running → error → stopped`
- returning a `{ stop }` control object from a long-running process

---

## 📁 Structure

Recommended layout:

```txt
07-telemetry-simulator/
  telemetryState.js
  telemetrySimulator.js
  examples.js
  README.md
```

## How to run tests

```bash
node examples.js
```
