import {
  calculate,
  appendDigit,
  applyBackspace,
  addDecimal,
  toggleSign,
} from './core/calcCore.js';

// Global DOM refs
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

function render(value) {
  calc.display.textContent = value;
}

// Event handlers
function handleNumberClick(e) {
  const digit = e.target.dataset.digit;
  if (isNaN(Number(digit))) return;

  if (calcState.whichNum === 'first') {
    calcState.firstNum = appendDigit(calcState.firstNum, digit);
    render(calcState.firstNum);
  } else {
    const current = calcState.secondNum === '' ? '0' : calcState.secondNum;
    calcState.secondNum = appendDigit(current, digit);
    render(calcState.secondNum);
  }
}

function handleOperatorClick(e) {
  const operator = e.target.textContent;

  // if we already have a second number, chain calculation
  if (calcState.operator && calcState.secondNum !== '') {
    const a = Number(calcState.firstNum);
    const b = Number(calcState.secondNum);
    const value = calculate(a, b, calcState.operator);

    calcState.result = String(value);
    calcState.firstNum = calcState.result;
    calcState.secondNum = '';
    render(calcState.result);
  }

  calcState.operator = operator;
  calcState.whichNum = 'second';
}

function handleClear() {
  calcState.firstNum = '0';
  calcState.secondNum = '';
  calcState.operator = null;
  calcState.result = null;
  calcState.whichNum = 'first';
  render('0');
}

function handleEquals() {
  if (!calcState.operator) {
    render(calcState.firstNum);
    return;
  }

  if (calcState.secondNum === '') {
    calcState.result = calcState.firstNum;
    render(calcState.result);
    calcState.operator = null;
    calcState.whichNum = 'first';
    return;
  }

  const a = Number(calcState.firstNum);
  const b = Number(calcState.secondNum);
  const value = calculate(a, b, calcState.operator);

  calcState.result = String(value);
  calcState.firstNum = calcState.result;
  calcState.secondNum = '';
  calcState.operator = null;
  calcState.whichNum = 'first';

  render(calcState.result);
}

function handleBackspace() {
  if (calcState.whichNum === 'first') {
    calcState.firstNum = applyBackspace(calcState.firstNum);
    render(calcState.firstNum);
    return;
  }

  if (calcState.secondNum === '') {
    render('0');
    return;
  }

  calcState.secondNum = applyBackspace(calcState.secondNum);
  render(calcState.secondNum);
}

function handleDecimal() {
  if (calcState.whichNum === 'first') {
    calcState.firstNum = addDecimal(calcState.firstNum);
    render(calcState.firstNum);
    return;
  }

  const current = calcState.secondNum === '' ? '0' : calcState.secondNum;
  calcState.secondNum = addDecimal(current);
  render(calcState.secondNum);
}

function handleSign() {
  if (calcState.whichNum === 'first') {
    calcState.firstNum = toggleSign(calcState.firstNum);
    render(calcState.firstNum);
    return;
  }

  if (calcState.secondNum === '') return;

  calcState.secondNum = toggleSign(calcState.secondNum);
  render(calcState.secondNum);
}

// Bind events
function bindEvents() {
  calc.opButton.forEach((button) => {
    button.addEventListener('click', handleOperatorClick);
  });

  calc.numButton.forEach((button) => {
    button.addEventListener('click', handleNumberClick);
  });

  calc.clearButton.addEventListener('click', handleClear);
  calc.eqButton.addEventListener('click', handleEquals);
  calc.backButton.addEventListener('click', handleBackspace);
  calc.decimalButton.addEventListener('click', handleDecimal);
  calc.signButton.addEventListener('click', handleSign);
}

// Init
function init() {
  render(calcState.firstNum);
  bindEvents();
}

init();

export { calcState };
