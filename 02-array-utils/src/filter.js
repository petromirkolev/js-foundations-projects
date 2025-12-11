export function filterArray(array, callback) {
  if (!Array.isArray(array)) {
    console.log('Error: Array expected');
  }
  const filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (callback(item)) {
      filteredArray.push(item);
    }
  }
  return filteredArray;
}
