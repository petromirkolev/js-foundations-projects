// Implement Array.prototype.filter() with a pure function
export function filterArray(array, callback) {
  const filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (callback(item)) {
      filteredArray.push(item);
    }
  }
  return filteredArray;
}

// Testing
// console.log(filterArray([9, 4, 5, 2, 1, 3, 6, 8, 7, 10], (x) => x % 2 === 0));
