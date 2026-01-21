const els = {
  list: document.querySelector('[data-view="items"]'),
  inputNew: document.querySelector('[data-input="new-todo"]'),
  search: document.querySelector('[data-input="search"]'),
  filterStatus: document.querySelector('[data-input="filter-status"]'),
  sort: document.querySelector('[data-input="sort"]'),
  total: document.querySelector('[data-view="count-total"]'),
  active: document.querySelector('[data-view="count-active"]'),
  completed: document.querySelector('[data-view="count-completed"]'),
  clearAll: document.querySelector('[data-action="clear-all"]'),
  clearCompleted: document.querySelector('[data-action="clear-completed"]'),
  seed: document.querySelector('[data-action="seed"]'),
  empty: document.querySelector('[data-view="empty"]'),
  addTaskByClick: document.querySelector('[data-action="add-todo"]'),
  addTaskByKey: document.querySelector('[data-input="new-todo"]'),
};

export { els };
