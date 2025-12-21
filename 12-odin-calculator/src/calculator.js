// Global variables
const display = document.querySelector('#display-value');
const numButtons = document.querySelectorAll('[data-digit]');
const opButtons = document.querySelectorAll('[data-op]');
const actionButtons = document.querySelectorAll('[data-action]');

// Helper functions
function add(a, b) {
  return a + b;
}
function divide(a, b) {
  return a / b;
}
function multiply(a, b) {
  return a * b;
}
function subtract(a, b) {
  return a - b;
}
function calculate() {
  if (calcState.action) {
    switch (calcState.operator) {
      case '+':
        return add(calcState.firstNum, calcState.secondNum);
    }
  }
}

// Calculator state
const calcState = {
  firstNum: 0,
  secondNum: null,
  operator: null,
  action: false,
  result: 0,
  shouldClear: false,
};

// Numbers
numButtons.forEach((button) =>
  button.addEventListener('click', (e) => {
    // Clear the display from zero first
    if (display.textContent === '0' || !Number(display.textContent))
      display.textContent = '';
    // Then handle calculator numbers
    calcState.secondNum === null
      ? (calcState.firstNum = display.textContent += e.target.textContent)
      : (calcState.secondNum = display.textContent += e.target.textContent);
  })
);

// Operators
opButtons.forEach((button) =>
  button.addEventListener('click', (e) => {
    if (!calcState.action) {
      display.textContent = calcState.operator = e.target.textContent;
      calcState.secondNum = 0;
      calcState.action = true;
    } else {
      console.log(calculate());
    }
  })
);

// Actions
actionButtons.forEach((button) => button.addEventListener('click', (e) => {}));
