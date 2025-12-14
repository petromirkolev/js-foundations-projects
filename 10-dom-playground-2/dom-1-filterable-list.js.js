const state = {
  query: '',
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
