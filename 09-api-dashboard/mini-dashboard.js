const initialDashboardState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  items: [], // array of services from the API

  filter: {
    query: '', // search text
    status: 'all', // 'all' | 'up' | 'down'
  },

  pagination: {
    page: 1, // current page (1-based)
    perPage: 5, // items per page
  },

  error: null, // last error message (string or null)
};

function filteredItems(state) {
  let result = state.items;

  if (state.filter.query.trim() !== '') {
    const q = state.filter.query.toLowerCase();
    result = result.filter((item) => item.name.toLowerCase().includes(q));
  }

  if (state.filter.status !== 'all') {
    result = result.filter((item) => item.status === state.filter.status);
  }

  return result;
}

function totalPages(state) {
  const total = filteredItems(state).length;
  return Math.max(1, Math.ceil(total / state.pagination.perPage));
}

function itemsOnPage(state) {
  const filtered = filteredItems(state);
  const start = (state.pagination.page - 1) * state.pagination.perPage;
  const end = start + state.pagination.perPage;
  return filtered.slice(start, end);
}

// Rules:
// No mutation
// Return new arrays where needed
// Use exactly the logic described
