// Implement Array.prototype.reduce() with a pure function
function reduceArray(array, reducer, initialValue) {
  let result = initialValue;
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i]);
  }
  return result;
}

// Testing
// console.log(reduceArray([12, 34, 45, 56, 23], (res, x) => res + x, 0));
