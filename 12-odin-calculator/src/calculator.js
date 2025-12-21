// Get calculator input
function getInput() {
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
      console.log('Hey!');
    });
  });
}

getInput();
