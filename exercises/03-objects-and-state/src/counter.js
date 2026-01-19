const counter = { value: 0 };

function createCounter(initialValue) {
  if (Number.isNaN(initialValue) || typeof initialValue !== 'number') {
    throw Error('Only numbers are accepted as input!');
  }
  return {
    value: initialValue,
  };
}

function increment(counter) {
  return { value: counter.value + 1 };
}

function decrement(counter) {
  return { value: counter.value - 1 };
}

function reset() {
  return { value: 0 };
}

function getValue(counter) {
  return counter.value;
}

export { createCounter, increment, decrement, reset, getValue };
