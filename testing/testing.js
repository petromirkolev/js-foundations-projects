import { test, expect } from './test.js';
import { getAge } from './script.js';

test('Age is > 15', () => {
  const age = getAge(16);
  expect(age).toBe(true);
});

test('Age is < 15', () => {
  const age = getAge(14);
  expect(age).toBe(false);
});
