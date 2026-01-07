import { test, expect } from '../scripts/testRunner.js';
import {
  calculate,
  appendDigit,
  applyBackspace,
  addDecimal,
  toggleSign,
} from '../core/calcCore.js';

test('calculate adds numbers', () => {
  expect(calculate(2, 3, '+')).toBe(5);
});

test('appendDigit replaces leading zero with digit', () => {
  expect(appendDigit('0', '3')).toBe('3');
});

test('appendDigit keeps zero when digit is 0', () => {
  expect(appendDigit('0', '0')).toBe('0');
});

test('appendDigit appends to non-zero string', () => {
  expect(appendDigit('12', '3')).toBe('123');
});

test('appendDigit works with multiple leading zeros', () => {
  expect(appendDigit('000000', '3')).toBe('3');
});

test('applyBackspace from single char', () => {
  expect(applyBackspace('7')).toBe('0');
  expect(applyBackspace('0')).toBe('0');
  expect(applyBackspace('12')).toBe('1');
});

test('addDecimal only once', () => {
  expect(addDecimal('1.2')).toBe('1.2');
  expect(addDecimal('0.2')).toBe('0.2');
});

test('toggleSign toggles minus', () => {
  expect(toggleSign('5')).toBe('-5');
  expect(toggleSign('-5')).toBe('5');
  expect(toggleSign('-0')).toBe('0');
});
