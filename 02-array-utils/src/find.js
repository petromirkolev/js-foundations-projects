export function findInArray(array, predicate) {
  if (!Array.isArray(array)) {
    console.log('Error: Array expected');
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
