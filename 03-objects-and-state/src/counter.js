const counter = { value: 0 };

function createCounter(initialValue) {
  if (Number(initialValue) >= 0) {
    const newCounter = {
      value: initialValue,
    };
    return newCounter;
  } else {
    throw Error('Only numbers are accepted as input!');
  }
}

function increment(counter) {
  return counter.value++;
}

function decrement(counter) {
  return counter.value--;
}

function reset(counter) {
  return (counter.value = 0);
}

function getValue(counter) {
  return counter.value;
}

export { createCounter, increment, decrement, reset, getValue };
