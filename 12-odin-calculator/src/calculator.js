// Global variables
const display = document.querySelector('#display-value');
const numButton = document.querySelectorAll('[data-digit]');
const opButton = document.querySelectorAll('[data-op]');
const actButton = document.querySelectorAll('[data-action]');
const clearButton = document.querySelector('[data-action="clear"]');
const eqButton = document.querySelector('[data-action="equals"]');
const backButton = document.querySelector('[data-action="backspace"]');
const percentButton = document.querySelector('[data-action="percent"]');
const signButton = document.querySelector('[data-action="sign"]');
const decimalButton = document.querySelector('[data-action="decimal"]');

// Calculator state object
const calcState = {
  firstNum: 0,
  secondNum: 0,
  operator: null,
  result: null,
  whichNum: 'first',
};

// Enable operator buttons
function loadOpListener() {
  opButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const operator = e.target.textContent;
      calcState.whichNum = 'second';
      display.textContent = calcState.operator = operator;
      if (calcState.secondNum === 0) {
      } else {
        calculate();
        // Reset second num value
        calcState.secondNum = 0;
      }
    });
  });
}

// Enable number buttons
function loadNumListener() {
  numButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const digit = e.target.dataset.digit;
      if (isNaN(Number(digit))) return;
      if (calcState.whichNum === 'first') {
        calcState.firstNum === 0
          ? (display.textContent = calcState.firstNum = digit)
          : (display.textContent = calcState.firstNum += digit);
      }
      if (calcState.whichNum === 'second') {
        calcState.secondNum === 0
          ? (display.textContent = calcState.secondNum = digit)
          : (display.textContent = calcState.secondNum += digit);
      }
    });
  });
}

// Basic calculator operations
function calculate() {
  switch (calcState.operator) {
    case '+':
      calcState.firstNum = calcState.result =
        Number(calcState.firstNum) + Number(calcState.secondNum);
      break;
    case '-':
      calcState.firstNum = calcState.result =
        Number(calcState.firstNum) - Number(calcState.secondNum);
      break;
    case '÷':
      calcState.firstNum = calcState.result =
        Number(calcState.firstNum) / Number(calcState.secondNum);
      break;
    case '×':
      calcState.firstNum = calcState.result =
        Number(calcState.firstNum) * Number(calcState.secondNum);
      break;
    default:
      return;
  }
}

// Enable clear button
function loadClearListener() {
  clearButton.addEventListener('click', (e) => {
    calcState.firstNum = calcState.secondNum = display.textContent = 0;
    calcState.operator = calcState.result = null;
    calcState.whichNum = 'first';
  });
}

// Enable equals button
function loadEqButton() {
  eqButton.addEventListener('click', (e) => {
    calculate();
    calcState.secondNum = 0;
    calcState.operator = null;
    display.textContent = calcState.result;
  });
}

// Enable back button
function loadBackButton() {
  backButton.addEventListener('click', (e) => {
    if (calcState.whichNum === 'first') {
      calcState.firstNum = calcState.firstNum.substr(
        0,
        calcState.firstNum.length - 1
      );
      calcState.firstNum
        ? (display.textContent = calcState.firstNum)
        : (display.textContent = 0);
    }
    if (calcState.whichNum === 'second') {
      calcState.secondNum = calcState.secondNum.substr(
        0,
        calcState.secondNum.length - 1
      );
      calcState.secondNum
        ? (display.textContent = calcState.secondNum)
        : (display.textContent = 0);
    }
  });
}

// Enable decimal button
function loadDecimalButton() {
  decimalButton.addEventListener('click', (e) => {
    if (calcState.whichNum === 'first') {
      if (calcState.firstNum !== 0 && calcState.firstNum.endsWith('.')) return;
      if (calcState.firstNum === 0) {
        display.textContent = calcState.firstNum = '0.';
      } else {
        display.textContent = calcState.firstNum += '.';
      }
    }
    if (calcState.whichNum === 'second') {
      if (calcState.secondNum.endsWith('.')) return;
      display.textContent = calcState.secondNum += '.';
    }
  });
}

// Enable sign button
function loadSignButton() {
  signButton.addEventListener('click', (e) => {
    calcState.whichNum === 'first'
      ? (display.textContent = calcState.firstNum = -calcState.firstNum)
      : (display.textContent = calcState.secondNum = -calcState.secondNum);
  });
}

loadOpListener();
loadNumListener();
loadClearListener();
loadEqButton();
loadBackButton();
loadDecimalButton();
loadSignButton();
