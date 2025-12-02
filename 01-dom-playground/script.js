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
