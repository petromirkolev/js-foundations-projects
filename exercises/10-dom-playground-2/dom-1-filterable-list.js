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
    const listItem = document.createElement('li');

    const spanItem = document.createElement('span');
    spanItem.textContent = item.name;

    const buttonItem = document.createElement('button');
    buttonItem.textContent = 'Remove';
    buttonItem.dataset.id = String(item.id);

    listItem.appendChild(spanItem);
    listItem.appendChild(buttonItem);
    listEl.appendChild(listItem);
  });
  const buttons = listEl.querySelectorAll('button[data-id]');
  console.log('Remove buttons:', buttons.length);
}

render(state);

queryEl.addEventListener('input', (e) => {
  state.query = e.target.value;
  render(state);
});

newNameEl.addEventListener('input', (e) => {
  state.newName = e.target.value;
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  state.newName = newNameEl.value;
  const name = state.newName.trim();

  if (name === '') return;

  state.items.push({ id: state.nextId, name });
  state.nextId++;
  newNameEl.value = state.newName = '';
  render(state);
});

listEl.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  state.items = state.items.filter((item) => item.id !== +e.target.dataset.id);
  render(state);
});
