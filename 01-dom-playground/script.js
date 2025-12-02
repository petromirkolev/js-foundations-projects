// Global state
const state = {
  counter: 0,
  list: [],
};
// Mirror input
document.querySelector('input').addEventListener('keyup', () => {
  checkLength(document.querySelector('#input').value);
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
// Load counter
document.querySelector('#counter').textContent = state.counter;
// Increment counter value
document.querySelector('#incrementer').addEventListener('click', (e) => {
  state.counter++;
  document.querySelector('#counter').textContent = state.counter;
});
// Decrease counter value
document.querySelector('#decrementer').addEventListener('click', (e) => {
  state.counter--;
  document.querySelector('#counter').textContent = state.counter;
});
// Toggle box
document.querySelector('#toggle').addEventListener('click', () => {
  let box = document.querySelector('#toggle-box');
  box.style.visibility === 'hidden'
    ? (box.style.visibility = 'visible')
    : (box.style.visibility = 'hidden');
});
// Shopping list
document.querySelector('#add-to-list').addEventListener('click', (e) => {
  if (document.querySelector('#list-input').value !== '') {
    let listItem = document.createElement('li');
    state.list.push(document.querySelector('#list-input').value);
    listItem.textContent = document.querySelector('#list-input').value;
    document.querySelector('#add-list').appendChild(listItem);
    document.querySelector('#list-input').value = '';
  }
});
// Filter list items
document.querySelector('#search-list').addEventListener('click', () => {
  document.querySelectorAll('li').forEach((item) => {
    if (document.querySelector('#search-input').value !== item.textContent) {
      item.style.display = 'none';
    }
  });
  document.querySelector('#search-input').value = '';
});
// Reset Playground
document.querySelector('#reset-pg').addEventListener('click', () => {
  if (document.querySelector('#input').value !== '') {
    document.querySelector('#input').value = document.querySelector(
      '#input-mirror'
    ).textContent = '';
  }
  if (state.counter !== 0) {
    state.counter = 0;
    document.querySelector('#counter').textContent = state.counter;
  }
  document.querySelector('#toggle-box').style.visibility = 'hidden';
  document.querySelector('#add-list').innerHTML = '';
});
