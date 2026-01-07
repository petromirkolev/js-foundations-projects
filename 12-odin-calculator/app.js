import { calculate } from './core/calcCore.js';

// Global variables
const calc = {
  display: document.querySelector('#display-value'),
  numButton: document.querySelectorAll('[data-digit]'),
  opButton: document.querySelectorAll('[data-op]'),
  clearButton: document.querySelector('[data-action="clear"]'),
  eqButton: document.querySelector('[data-action="equals"]'),
  backButton: document.querySelector('[data-action="backspace"]'),
  signButton: document.querySelector('[data-action="sign"]'),
  decimalButton: document.querySelector('[data-action="decimal"]'),
};

// Calculator state object
const calcState = {
  firstNum: '0',
  secondNum: '',
  operator: null,
  result: null,
  whichNum: 'first',
};

// Bind events
function bindEvents() {
  // Operator button listener
  calc.opButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      storeOperator(e);
    });
  });
  // Numbers button listener
  calc.numButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      storeNumbers(e);
    });
  });
  // Clear calculator button listener
  calc.clearButton.addEventListener('click', clearCalculator);
  // Equals button listener
  calc.eqButton.addEventListener('click', getResult);
  // Backspace button listener
  calc.backButton.addEventListener('click', clearLastNum);
  // Decimal button listener
  calc.decimalButton.addEventListener('click', addDecimal);
  // Positive/negative sign button listener
  calc.signButton.addEventListener('click', addSign);
}

// Helpers
function storeOperator(e) {
  const operator = e.target.textContent;

  if (calcState.operator && calcState.secondNum !== '') {
    calculate();
    calcState.secondNum = '';
  }

  // Set new operator and move to second number entry
  calcState.operator = operator;
  calcState.whichNum = 'second';

  // Optional: show operator or keep current number
  calc.display.textContent = operator;
}

function storeNumbers(e) {
  const digit = e.target.dataset.digit;
  if (isNaN(Number(digit))) return;

  if (calcState.whichNum === 'first') {
    calcState.firstNum =
      calcState.firstNum === '0' ? digit : calcState.firstNum + digit;
    calc.display.textContent = calcState.firstNum;
  } else {
    calcState.secondNum =
      calcState.secondNum === '' ? digit : calcState.secondNum + digit;
    calc.display.textContent = calcState.secondNum;
  }
}

function clearCalculator() {
  calcState.firstNum = '0';
  calcState.secondNum = '';
  calcState.operator = null;
  calcState.result = null;
  calcState.whichNum = 'first';
  calc.display.textContent = '0';
}

function getResult() {
  if (!calcState.operator) {
    calc.display.textContent = calcState.firstNum;
    return;
  }

  if (calcState.secondNum === '') {
    calcState.result = calcState.firstNum;
    calc.display.textContent = calcState.result;
    calcState.operator = null;
    calcState.whichNum = 'first';
    return;
  }

  calculate();
  calcState.secondNum = '';
  calcState.operator = null;
  calcState.whichNum = 'first';
}

function clearLastNum() {
  // first
  if (calcState.whichNum === 'first') {
    if (calcState.firstNum === '0') return;

    calcState.firstNum = calcState.firstNum.substring(
      0,
      calcState.firstNum.length - 1
    );

    if (calcState.firstNum === '') calcState.firstNum = '0';
    calc.display.textContent = calcState.firstNum;
    return;
  }

  // second
  if (calcState.secondNum === '') {
    calc.display.textContent = '0';
    return;
  }

  calcState.secondNum = calcState.secondNum.substring(
    0,
    calcState.secondNum.length - 1
  );

  calc.display.textContent =
    calcState.secondNum === '' ? '0' : calcState.secondNum;
}

function addDecimal() {
  // first
  if (calcState.whichNum === 'first') {
    if (calcState.firstNum.includes('.')) return;
    calcState.firstNum =
      calcState.firstNum === '0' ? '0.' : calcState.firstNum + '.';
    calc.display.textContent = calcState.firstNum;
    return;
  }
  // second
  if (calcState.secondNum.includes('.')) return;
  calcState.secondNum =
    calcState.secondNum === '' ? '0.' : calcState.secondNum + '.';
  calc.display.textContent = calcState.secondNum;
}

function addSign() {
  // first
  if (calcState.whichNum === 'first') {
    if (calcState.firstNum === '0') return;
    calcState.firstNum = calcState.firstNum.startsWith('-')
      ? calcState.firstNum.slice(1)
      : '-' + calcState.firstNum;
    calc.display.textContent = calcState.firstNum;
    return;
  }

  // second
  if (calcState.secondNum === '') return;
  calcState.secondNum = calcState.secondNum.startsWith('-')
    ? calcState.secondNum.slice(1)
    : '-' + calcState.secondNum;
  calc.display.textContent = calcState.secondNum;
}

// Init
function init() {
  bindEvents();
}

init();

export { calcState, calc };
