# Odin Calculator (JS Logic Focus)

A simple calculator project built to practice **state management, input handling, and edge cases** in JavaScript.

UI is intentionally minimal. The goal is correct behavior and debuggability, not styling.

---

## What This Project Demonstrates

- Deterministic calculator state (current value, pending operator, previous value)
- Input handling via "data-\*" attributes
- Correct operator behavior (+, −, ×, ÷)
- Decimal handling
- Clear / backspace behavior
- Safe handling of edge cases (e.g., divide by zero)

---

## How to Run

Open the page in a browser:

open index.html

Or visit the <a href="https://petromirkolev.github.io/js-foundations-projects/12-odin-calculator/src/index.html"> Live Demo </a>

---

## QA Notes

Key scenarios to validate:

- Basic operations: 7 + 3 = 10
- Chained operations: 2 + 3 × 4 (define expected behavior in your design)
- Decimal input: 1.2 + 3.4
- Backspace during entry
- Clear resets state completely
- Divide by zero shows safe error (e.g., "Error") and recovers after Clear
- Repeated equals (optional): 5 + 2 = =

---

## Limitations

- No styling focus
- No keyboard support
- No automated tests yet (will be added in the automation phase)

---

## Why This Project Exists

This project is part of a foundations sprint to build strong, testable JS logic before moving into Automation QA tooling (Playwright).
