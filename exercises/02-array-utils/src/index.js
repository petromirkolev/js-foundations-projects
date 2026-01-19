// Simple script to call all functions at once

import { filterArray } from './filter.js';
import { findInArray } from './find.js';
import { mapArray } from './map.js';
import { reduceArray } from './reduce.js';
import { sortArray } from './sort.js';

console.log('---Array map:---');
console.log(mapArray([1, 2, 3], (x) => x * 2));
console.log(mapArray([5, 10, 15], (x) => x * 2));
console.log(mapArray('[5, 10, 15]', (x) => x * 2));

console.log('---Array filter:---');
console.log(filterArray([1, 2, 3, 4], (x) => x % 2 === 0));
console.log(filterArray([5, 33, 13, 10, 12, 15], (x) => x % 2 === 0));
console.log(filterArray('[1, 2, 3, 4]', (x) => x % 2 === 0));

// console.log('\nreduceArray:');
// console.log(reduceArray([1, 2, 3], (sum, x) => sum + x, 0));

// console.log('\nsortArray:');
// console.log(sortArray([3, 1, 2], (a, b) => a - b));

// console.log('\nfindInArray:');
// console.log(findInArray([1, 3, 5, 6], (x) => x % 2 === 0));
