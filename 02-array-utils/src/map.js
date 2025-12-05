// Implement Array.prototype.map() with a pure function
export function mapArray(array, callback) {
  if (array.length === 0 || !Array.isArray(array)) {
    throw new Error('Not an array!');
  }
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    result.push(callback(item));
  }
  return result;
}
// Testing
// console.log(mapArray([1, 34, 5, 6, 78, 345, 34], (x) => x + 2));
