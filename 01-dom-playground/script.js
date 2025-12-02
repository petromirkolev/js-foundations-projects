document.querySelector('input').addEventListener('keypress', (e) => {
  document.querySelector('#input-mirror').textContent += e.key;
});
