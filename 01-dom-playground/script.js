// Add input keys
document.querySelector('input').addEventListener('keypress', (e) => {
  let text = document.querySelector('#input').value;
  checkLength(text);
});
// Remove last string char if backspace is pressed
document.querySelector('input').addEventListener('keyup', (e) => {
  if (e.key === 'Backspace') {
    let text = document.querySelector('#input').value;
    checkLength(text);
    isInputEmpty();
  }
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
