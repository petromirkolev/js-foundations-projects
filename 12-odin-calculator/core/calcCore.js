function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return a / b;
    default:
      throw new Error('Unsupported operator: ' + operator);
  }
}

function appendDigit(currentStr, digit) {
  if (!/^[0-9]$/.test(digit)) {
    throw new Error('appendDigit: digit must be 0-9');
  }
  if (/^0*$/.test(currentStr)) return digit;
  return currentStr + digit;
}

function applyBackspace(valueStr) {
  if (valueStr.length <= 1) return '0';
  return valueStr.slice(0, -1);
}

function addDecimal(valueStr) {
  if (valueStr.includes('.')) return valueStr;
  return valueStr + '.';
}

function toggleSign(valueStr) {
  if (valueStr === '0') return '0';
  if (valueStr.startsWith('-')) return valueStr.slice(1);
  return '-' + valueStr;
}

export { calculate, appendDigit, applyBackspace, addDecimal, toggleSign };
