// Implement Array.prototype.sort() with a pure function
function sortArray(array, compareFn) {
  let result = array;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const a = array[j];
      const b = array[j + 1];
      if (compareFn(a, b) > 0) {
        result[j] = b;
        result[j + 1] = a;
      }
    }
  }
  return result;
}

// Testing
console.log(sortArray([12, 34, 45, 56, 23], (x, y) => y - x));
