import { calcState, calc } from '../app.js';

// ---------- Calculator core ----------
function calculate() {
  if (!calcState.operator) return;
  if (calcState.secondNum === '') return;
  const a = Number(calcState.firstNum);
  const b = Number(calcState.secondNum);

  let value;
  switch (calcState.operator) {
    case '+':
      value = a + b;
      break;
    case '-':
      value = a - b;
      break;
    case '×':
      value = a * b;
      break;
    case '÷':
      value = a / b;
      break;
    default:
      return;
  }

  // Keep state as strings
  calcState.result = String(value);
  calcState.firstNum = calcState.result;
  calc.display.textContent = calcState.result;
}

export { calculate };
