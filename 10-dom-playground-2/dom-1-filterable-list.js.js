const state = {
  query: '',
  newName: '',
  nextId: 6,
  items: [
    { id: 1, name: 'Auth' },
    { id: 2, name: 'Payments' },
    { id: 3, name: 'Reports' },
    { id: 4, name: 'Search' },
    { id: 5, name: 'Email' },
  ],
};

const queryEl = document.querySelector('#query');
const listEl = document.querySelector('#list');
const metaEl = document.querySelector('#meta');
const formEl = document.querySelector('#addForm');
const newNameEl = document.querySelector('#newName');

function selectFilteredItems(state) {
  const q = state.query.trim().toLowerCase();
  if (q === '') return state.items;
  return state.items.filter((item) => item.name.toLowerCase().includes(q));
}

function render(state) {
  const filtered = selectFilteredItems(state);
  metaEl.textContent = `Showing ${filtered.length} of ${state.items.length}`;
  listEl.textContent = '';
  filtered.forEach((item) => {
    let listItem = document.createElement('li');
    listItem.textContent = item.name;
    listEl.appendChild(listItem);
  });
}

render(state);

// input event -> update state -> render
queryEl.addEventListener('input', (e) => {
  state.query = e.target.value;
  render(state);
});

newNameEl.addEventListener('input', (e) => {
  state.newName = e.target.value;
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = state.newName.trim();
  if (name === '') return;
  // TODO: add item
  // TODO: reset input + state.newName
  // TODO: render(state)
});
