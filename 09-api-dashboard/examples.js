import { createInitialState } from './state.js';
import {
  loadDashboard,
  applyQuery,
  goToPageAndUpdate,
  nextPageAndUpdate,
  prevPageAndUpdate,
} from './dashboard.js';

// Scenario 1: basic load and first page
async function runExampleBasicLoad() {
  let state = createInitialState({ pageSize: 5 });

  console.log('=== Scenario 1: Basic load ===');
  console.log('--- Initial state ---');
  console.log(state);

  state = await loadDashboard(state);

  console.log('--- After loadDashboard ---');
  console.log({
    status: state.status,
    totalItems: state.items.length,
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  return state;
}

// Scenario 2: apply query and paginate forward
async function runExampleFilterAndPaginate() {
  let state = createInitialState({ pageSize: 5 });

  state = await loadDashboard(state);

  console.log('\n=== Scenario 2: Filter and next page ===');
  console.log('--- Loaded ---');
  console.log({
    totalItems: state.items.length,
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  state = applyQuery(state, 'voluptate');
  console.log('--- After applyQuery("voluptate") ---');
  console.log({
    query: state.filter.query,
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  state = nextPageAndUpdate(state);
  console.log('--- After nextPageAndUpdate ---');
  console.log({
    currentPage: state.pagination.currentPage,
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  return state;
}

// Scenario 3: query with no results
async function runExampleNoResults() {
  let state = createInitialState({ pageSize: 5 });

  state = await loadDashboard(state);

  console.log('\n=== Scenario 3: No-results query ===');

  state = applyQuery(state, 'qwertynonsense');
  console.log('--- After applyQuery("qwertynonsense") ---');
  console.log({
    query: state.filter.query,
    pagination: state.pagination,
    viewLength: state.view.itemsOnPage.length,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  return state;
}

// Scenario 4: prev/next boundaries and goToPage
async function runExamplePrevNextAndGoTo() {
  let state = createInitialState({ pageSize: 5 });

  state = await loadDashboard(state);

  console.log('\n=== Scenario 4: Prev/Next/GoToPage boundaries ===');
  console.log('--- Loaded ---');
  console.log({
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  // Apply a query first so we test pagination with filtered data
  state = applyQuery(state, 'voluptate');
  console.log('--- After applyQuery("voluptate") ---');
  console.log({
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  // Try going to a very large page number (should clamp to last page)
  state = goToPageAndUpdate(state, 9999);
  console.log('--- After goToPageAndUpdate(9999) ---');
  console.log({
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  // Try going beyond first/last page with prev/next
  state = nextPageAndUpdate(state);
  console.log('--- After nextPageAndUpdate() from last page (should stay) ---');
  console.log({
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  state = prevPageAndUpdate(state);
  console.log('--- After prevPageAndUpdate() ---');
  console.log({
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  // Spam prev to test clamping at page 1
  state = prevPageAndUpdate(state);
  state = prevPageAndUpdate(state);
  state = prevPageAndUpdate(state);
  console.log('--- After multiple prevPageAndUpdate() (should be page 1) ---');
  console.log({
    pagination: state.pagination,
    viewIds: state.view.itemsOnPage.map((p) => p.id),
  });

  return state;
}

// Run all scenarios
(async function main() {
  await runExampleBasicLoad();
  await runExampleFilterAndPaginate();
  await runExampleNoResults();
  await runExamplePrevNextAndGoTo();
})();
