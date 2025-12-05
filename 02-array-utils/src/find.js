// Implement Array.prototype.find() with a pure function
export function findInArray(array, predicate) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array');
  }
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}
// Testing
// console.log(findInArray([2, 3, 4, 5, 6, 7], (x) => x % 2 === 0));
