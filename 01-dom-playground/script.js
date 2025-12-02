////////////////
// Mirror input
document.querySelector('input').addEventListener('keyup', (e) => {
  let text = document.querySelector('#input').value;
  if (e.key !== 'Backspace') {
    checkLength(text);
  }
  if (e.key === 'Backspace') {
    checkLength(text);
  }
  isInputEmpty();
});
// Limit reverse input chars to specified length
function checkLength(text) {
  if (text.length >= 15) {
    document.querySelector('#input-mirror').textContent = document
      .querySelector('#input')
      .value.substring(document.querySelector('#input').value.length - 15);
  } else {
    document.querySelector('#input-mirror').textContent =
      document.querySelector('#input').value;
  }
}
// Check if whole input is deleted
function isInputEmpty() {
  if (document.querySelector('#input').value === '') {
    document.querySelector('#input-mirror').textContent = '';
  }
}
/////////////////
// Button counter
// Increment counter value
document.querySelector('#incrementer').addEventListener('click', (e) => {
  document.querySelector('#counter').textContent++;
});
// Decrease counter value
document.querySelector('#decrementer').addEventListener('click', (e) => {
  document.querySelector('#counter').textContent--;
});
//////////////
// Toggle box
document.querySelector('#toggle').addEventListener('click', () => {
  let box = document.querySelector('#toggle-box');
  box.style.visibility === 'hidden'
    ? (box.style.visibility = 'visible')
    : (box.style.visibility = 'hidden');
});
/////////////////
// Shopping list
document.querySelector('#add-to-list').addEventListener('click', (e) => {
  let listItem = document.createElement('li');
  if (document.querySelector('#list-input').value !== '') {
    listItem.textContent = document.querySelector('#list-input').value;
    document.querySelector('#list').appendChild(listItem);
    document.querySelector('#list-input').value = '';
  }
});
