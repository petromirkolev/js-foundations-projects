import { delay } from './delay.js';
import { fetchUser, fetchOrders, fetchDashboard } from './fakeApi.js';

// -------------------------------------------
// DELAY EXAMPLES
// -------------------------------------------
console.log('\n--- DELAY EXAMPLES ---');

console.log('Before delay(500)');
const promise500 = delay(500);
promise500.then((msg) => {
  console.log('delay(500) resolved with:', msg);
});
console.log('After delay(500) call');

// -------------------------------------------
// FETCH USER EXAMPLES
// -------------------------------------------
console.log('\n--- FETCH USER EXAMPLES ---');

fetchUser('u1')
  .then((user) => {
    console.log('User u1 resolved:', user);
  })
  .catch((err) => {
    console.log('Unexpected error for u1:', err.message);
  });

fetchUser('no-such-id')
  .then((user) => {
    console.log('Unexpected success for missing user:', user);
  })
  .catch((err) => {
    console.log('Error for no-such-id:', err.message);
  });

// -------------------------------------------
// DASHBOARD EXAMPLES
// -------------------------------------------
console.log('\n--- DASHBOARD EXAMPLES ---');

async function runDashboardExamples() {
  try {
    const dashboard = await fetchDashboard('u1');
    console.log('Dashboard for u1:', dashboard);
  } catch (err) {
    console.log('Unexpected error fetching dashboard for u1:', err.message);
  }
  try {
    const badDashboard = await fetchDashboard('nope');
    console.log('Unexpected success for missing dashboard:', badDashboard);
  } catch (err) {
    console.log('Dashboard error for missing user:', err.message);
  }
}

runDashboardExamples();

// -------------------------------------------
// SEQUENTIAL VS PARALLEL EXAMPLES
// -------------------------------------------
console.log('\n--- SEQUENTIAL VS PARALLEL EXAMPLES ---');

async function loadSequential() {
  console.log('Sequential start');
  const user = await fetchUser('u1');
  console.log('Sequential user:', user);
  const userOrders = await fetchOrders('u1');
  console.log('Sequential orders:', userOrders);
  console.log('Sequential done');
}

async function loadParallel() {
  console.log('Parallel start');
  const [user, userOrders] = await Promise.all([
    fetchUser('u1'),
    fetchOrders('u1'),
  ]);

  console.log('Parallel user:', user);
  console.log('Parallel orders:', userOrders);
  console.log('Parallel done');
}

async function runLoadComparison() {
  await loadSequential();
  await loadParallel();
}

runLoadComparison();
