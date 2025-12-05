// Implement Array.prototype.reduce() with a pure function
export function reduceArray(array, reducer, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array');
  }
  let result = initialValue;
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i]);
  }
  return result;
}

// Testing
// console.log(reduceArray([12, 34, 45, 56, 23], (res, x) => res + x, 0));
