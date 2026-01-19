function createInitialState(options = {}) {
  const { pageSize = 5 } = options;
  const state = {
    status: 'idle',
    items: [],
    filter: {
      query: '',
    },
    pagination: {
      pageSize,
      currentPage: 1,
      totalPages: 1,
    },
    view: {
      itemsOnPage: [],
    },
    error: null,
    lastUpdated: null,
  };
  return state;
}

function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

function setLoading(state) {
  let cloned = cloneState(state);
  return { ...cloned, status: 'loading', error: null };
}

function setSuccess(state, items) {
  let cloned = cloneState(state);
  return {
    ...cloned,
    status: 'success',
    items: items,
    error: null,
    lastUpdated: Date.now(),
  };
}

function setError(state, error) {
  let cloned = cloneState(state);
  let message;

  if (error && typeof error === 'string') {
    message = error;
  } else {
    message = String(error);
  }
  return {
    ...cloned,
    status: 'error',
    error: { message },
  };
}

function setQuery(state, query) {
  let cloned = cloneState(state);
  let currentQuery = query.trim().toLowerCase();

  return {
    ...cloned,
    filter: { ...cloned.filter, query: currentQuery },
    pagination: { ...cloned.pagination, currentPage: 1 },
  };
}

function recalculatePagination(state) {
  const cloned = cloneState(state);
  const currentQuery = cloned.filter.query.trim().toLowerCase();
  let filtered;

  if (currentQuery.length > 0) {
    filtered = cloned.items.filter((post) => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      return title.includes(currentQuery) || body.includes(currentQuery);
    });
  } else {
    filtered = cloned.items;
  }

  const totalItems = filtered.length;
  const pageSize = cloned.pagination.pageSize;
  let totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);
  let currentPage = cloned.pagination.currentPage;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  return {
    ...cloned,
    pagination: { ...cloned.pagination, totalPages, currentPage },
  };
}

function goToPage(state, pageNumber) {
  let cloned = cloneState(state);
  return {
    ...cloned,
    pagination: { ...cloned.pagination, currentPage: pageNumber },
  };
}

function nextPage(state) {
  let cloned = cloneState(state);
  const currentPage = cloned.pagination.currentPage;
  return {
    ...cloned,
    pagination: { ...cloned.pagination, currentPage: currentPage + 1 },
  };
}

function prevPage(state) {
  let cloned = cloneState(state);
  const currentPage = cloned.pagination.currentPage;
  return {
    ...cloned,
    pagination: { ...cloned.pagination, currentPage: currentPage - 1 },
  };
}

function updateView(state) {
  let cloned = cloneState(state);
  const currentQuery = cloned.filter.query.trim().toLowerCase();
  let filtered;

  if (currentQuery.length > 0) {
    filtered = cloned.items.filter((post) => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      return title.includes(currentQuery) || body.includes(currentQuery);
    });
  } else {
    filtered = cloned.items;
  }

  let currentPage = cloned.pagination.currentPage;
  let pageSize = cloned.pagination.pageSize;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const itemsOnPage = filtered.slice(startIndex, endIndex);
  return { ...cloned, view: { ...cloned.view, itemsOnPage } };
}

export {
  createInitialState,
  cloneState,
  setLoading,
  setSuccess,
  setError,
  setQuery,
  recalculatePagination,
  goToPage,
  nextPage,
  prevPage,
  updateView,
};
