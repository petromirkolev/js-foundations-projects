import { fetchPosts } from './api.js';
import {
  createInitialState,
  setLoading,
  setSuccess,
  setError,
  setQuery,
  recalculatePagination,
  goToPage,
  nextPage,
  prevPage,
  updateView,
} from './state.js';

async function loadDashboard(initialState, options = {}) {
  let state = setLoading(initialState);
  try {
    const items = await fetchPosts(options);
    state = setSuccess(state, items);
    state = recalculatePagination(state);
    state = updateView(state);
    return state;
  } catch (error) {
    state = setError(state, error);
    return state;
  }
}

function applyQuery(state, query) {
  let next = setQuery(state, query);
  next = recalculatePagination(next);
  next = updateView(next);
  return next;
}

function goToPageAndUpdate(state, pageNumber) {
  let updatedState = goToPage(state, pageNumber);
  updatedState = recalculatePagination(updatedState);
  updatedState = updateView(updatedState);
  return updatedState;
}

function nextPageAndUpdate(state) {
  let updatedState = nextPage(state);
  updatedState = recalculatePagination(updatedState);
  updatedState = updateView(updatedState);
  return updatedState;
}

function prevPageAndUpdate(state) {
  let updatedState = prevPage(state);
  updatedState = recalculatePagination(updatedState);
  updatedState = updateView(updatedState);
  return updatedState;
}

export {
  loadDashboard,
  applyQuery,
  goToPageAndUpdate,
  nextPageAndUpdate,
  prevPageAndUpdate,
};
