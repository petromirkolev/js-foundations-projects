const tasks = {
  items: [],
  ui: {
    searchQuery: '',
    filterQuery: 'all',
    sortQuery: 'createdDesc',
  },
};

function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
}

function getViewItems() {
  const { items, ui } = tasks;
  let view = [...items];

  if (ui.filterQuery === 'active') view = view.filter((t) => !t.completed);
  if (ui.filterQuery === 'completed') view = view.filter((t) => t.completed);

  const q = ui.searchQuery.trim().toLowerCase();
  if (q) view = view.filter((t) => t.text.toLowerCase().includes(q));

  switch (ui.sortQuery) {
    case 'textAsc':
      view.sort((a, b) => a.text.localeCompare(b.text));
      break;
    case 'textDesc':
      view.sort((a, b) => b.text.localeCompare(a.text));
      break;
    case 'createdAsc':
      view.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case 'createdDesc':
      view.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }

  return view;
}

function findTaskHelper(id) {
  return tasks.items.find((t) => t.id === id) || null;
}

export { tasks, createTask, getViewItems, findTaskHelper };
