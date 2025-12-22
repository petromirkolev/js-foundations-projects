// Global variables
const display = document.querySelector('#display-value');
const numButton = document.querySelectorAll('[data-digit]');
const opButton = document.querySelectorAll('[data-op]');
const actButton = document.querySelectorAll('[data-action]');
const clearButton = document.querySelector('[data-action="clear"]');
const eqButton = document.querySelector('[data-action="equals"]');
const backButton = document.querySelector('[data-action="backspace"]');

const calcState = {
  firstNum: 0,
  secondNum: 0,
  operator: null,
  result: null,
  whichNum: 'first',
};

// Operators
opButton.forEach((button) => {
  button.addEventListener('click', (e) => {
    const operator = e.target.textContent;
    calcState.whichNum = 'second';
    if (calcState.secondNum === 0) {
      display.textContent = calcState.operator = operator;
    } else {
      calculate();
      calcState.secondNum = 0;
      display.textContent = calcState.operator = operator;
      console.log(calcState);
    }
  });
});

// Actions

// Numbers
numButton.forEach((button) => {
  button.addEventListener('click', (e) => {
    const digit = e.target.dataset.digit;
    if (isNaN(Number(digit))) return;
    if (calcState.whichNum === 'first') {
      if (calcState.firstNum === 0) {
        display.textContent = calcState.firstNum = digit;
      } else {
        display.textContent = calcState.firstNum += digit;
      }
    }
    if (calcState.whichNum === 'second') {
      if (calcState.secondNum === 0) {
        display.textContent = calcState.secondNum = digit;
      } else {
        display.textContent = calcState.secondNum += digit;
      }
    }
  });
});

// Calculator operations
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
      break;
  }
}

// Clear calculator
clearButton.addEventListener('click', (e) => {
  calcState.firstNum = calcState.secondNum = display.textContent = 0;
  calcState.operator = calcState.result = null;
  calcState.whichNum = 'first';
});

// Get result
eqButton.addEventListener('click', (e) => {
  calculate();
  calcState.secondNum = 0;
  display.textContent = calcState.result;
});

backButton.addEventListener('click', (e) => {
  if (calcState.whichNum === 'first') {
  }
  if (calcState.whichNum === 'second') {
  }
});
