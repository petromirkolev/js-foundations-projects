export function reduceArray(array, reducer, initialValue) {
  if (!Array.isArray(array)) {
    console.log('Error: Array expected');
  }
  let result = initialValue;
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i]);
  }
  return result;
}
