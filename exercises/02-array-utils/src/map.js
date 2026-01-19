export function mapArray(array, callback) {
  let currentArray = array;
  let result = [];

  if (Array.isArray(currentArray)) {
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      result.push(callback(item));
    }
    return result;
  } else {
    return console.error('Error: Array is expected as input');
  }
}
