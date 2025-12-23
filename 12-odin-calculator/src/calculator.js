// Global variables
const display = document.querySelector('#display-value');
const numButton = document.querySelectorAll('[data-digit]');
const opButton = document.querySelectorAll('[data-op]');
const clearButton = document.querySelector('[data-action="clear"]');
const eqButton = document.querySelector('[data-action="equals"]');
const backButton = document.querySelector('[data-action="backspace"]');
const signButton = document.querySelector('[data-action="sign"]');
const decimalButton = document.querySelector('[data-action="decimal"]');

// Calculator state object
const calcState = {
  firstNum: '0',
  secondNum: '',
  operator: null,
  result: null,
  whichNum: 'first',
};

// ---------- Core math ----------
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
  display.textContent = calcState.result;
}

// ---------- Operator buttons ----------
function loadOpListener() {
  opButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const operator = e.target.textContent;

      if (calcState.operator && calcState.secondNum !== '') {
        calculate();
        calcState.secondNum = '';
      }

      // Set new operator and move to second number entry
      calcState.operator = operator;
      calcState.whichNum = 'second';

      // Optional: show operator or keep current number
      display.textContent = operator;
    });
  });
}

// ---------- Number buttons ----------
function loadNumListener() {
  numButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const digit = e.target.dataset.digit;
      if (isNaN(Number(digit))) return;

      if (calcState.whichNum === 'first') {
        calcState.firstNum =
          calcState.firstNum === '0' ? digit : calcState.firstNum + digit;
        display.textContent = calcState.firstNum;
      } else {
        calcState.secondNum =
          calcState.secondNum === '' ? digit : calcState.secondNum + digit;
        display.textContent = calcState.secondNum;
      }
    });
  });
}

// ---------- Clear ----------
function loadClearListener() {
  clearButton.addEventListener('click', () => {
    calcState.firstNum = '0';
    calcState.secondNum = '';
    calcState.operator = null;
    calcState.result = null;
    calcState.whichNum = 'first';
    display.textContent = '0';
  });
}

// ---------- Equals ----------
function loadEqButton() {
  eqButton.addEventListener('click', () => {
    // If no operator, nothing to do
    if (!calcState.operator) {
      display.textContent = calcState.firstNum;
      return;
    }

    // If operator exists but secondNum not entered, just keep firstNum
    if (calcState.secondNum === '') {
      calcState.result = calcState.firstNum;
      display.textContent = calcState.result;
      calcState.operator = null;
      calcState.whichNum = 'first';
      return;
    }

    calculate();
    calcState.secondNum = '';
    calcState.operator = null;
    calcState.whichNum = 'first';
  });
}

// ---------- Backspace ----------
function loadBackButton() {
  backButton.addEventListener('click', () => {
    // first
    if (calcState.whichNum === 'first') {
      if (calcState.firstNum === '0') return;

      calcState.firstNum = calcState.firstNum.substring(
        0,
        calcState.firstNum.length - 1
      );

      if (calcState.firstNum === '') calcState.firstNum = '0';
      display.textContent = calcState.firstNum;
      return;
    }

    // second
    if (calcState.secondNum === '') {
      display.textContent = '0';
      return;
    }

    calcState.secondNum = calcState.secondNum.substring(
      0,
      calcState.secondNum.length - 1
    );

    display.textContent =
      calcState.secondNum === '' ? '0' : calcState.secondNum;
  });
}

// ---------- Decimal ----------
function loadDecimalButton() {
  decimalButton.addEventListener('click', () => {
    // first
    if (calcState.whichNum === 'first') {
      if (calcState.firstNum.includes('.')) return;
      calcState.firstNum =
        calcState.firstNum === '0' ? '0.' : calcState.firstNum + '.';
      display.textContent = calcState.firstNum;
      return;
    }
    // second
    if (calcState.secondNum.includes('.')) return;
    calcState.secondNum =
      calcState.secondNum === '' ? '0.' : calcState.secondNum + '.';
    display.textContent = calcState.secondNum;
  });
}

// ---------- Sign toggle ----------
function loadSignButton() {
  signButton.addEventListener('click', () => {
    // first
    if (calcState.whichNum === 'first') {
      if (calcState.firstNum === '0') return;
      calcState.firstNum = calcState.firstNum.startsWith('-')
        ? calcState.firstNum.slice(1)
        : '-' + calcState.firstNum;
      display.textContent = calcState.firstNum;
      return;
    }

    // second
    if (calcState.secondNum === '') return;
    calcState.secondNum = calcState.secondNum.startsWith('-')
      ? calcState.secondNum.slice(1)
      : '-' + calcState.secondNum;
    display.textContent = calcState.secondNum;
  });
}

// Init calculator
loadOpListener();
loadNumListener();
loadClearListener();
loadEqButton();
loadBackButton();
loadDecimalButton();
loadSignButton();
