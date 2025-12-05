const counter = { value: 0 };

// Rules
// No mutation of the original object. Always return new objects.
// Validate that counter is an object with a value number. If not, throw an error.

function createCounter(initialValue) {
  /* ... */
}
// returns a NEW counter object: { value: initialValue || 0 }

function increment(counter) {
  /* ... */
}
// returns NEW counter: value + 1

function decrement(counter) {
  /* ... */
}
// returns NEW counter: value - 1

function reset(counter) {
  /* ... */
}
// returns NEW counter with value: 0

function getValue(counter) {
  /* ... */
}
// returns the number (value)
