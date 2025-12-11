export function sortArray(array, compareFn) {
  if (!Array.isArray(array)) {
    console.log('Error: Array expected');
  }
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
