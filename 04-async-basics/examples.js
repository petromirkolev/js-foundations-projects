import { delay } from './delay.js';
import { fetchUser, fetchOrders, fetchDashboard } from './fakeApi.js';

//
// -------------------------------------------
// DELAY EXAMPLES
// -------------------------------------------
console.log('\n--- DELAY EXAMPLES ---');

console.log('Before delay(500)');
const promise500 = delay(500);
promise500.then((msg) => {
  console.log('delay(500) resolved with:', msg);
  // Expect: msg includes "500ms"
});
console.log('After delay(500) call');
// Expect order:
// 1. Before delay(500)
// 2. After delay(500) call
// 3. delay(500) resolved with: "...500ms"
// (the resolved log should appear LAST)

//
// -------------------------------------------
// FETCH USER EXAMPLES
// -------------------------------------------
console.log('\n--- FETCH USER EXAMPLES ---');

// Existing user
fetchUser('u1')
  .then((user) => {
    console.log('User u1 resolved:', user);
    // Expect: user.id === 'u1'
  })
  .catch((err) => {
    console.log('Unexpected error for u1:', err.message);
    // Expect: NOT to run for 'u1'
  });

// Missing user
fetchUser('no-such-id')
  .then((user) => {
    console.log('Unexpected success for missing user:', user);
    // Expect: NOT to run
  })
  .catch((err) => {
    console.log('Error for no-such-id:', err.message);
    // Expect: "User not found"
  });

//
// -------------------------------------------
// DASHBOARD EXAMPLES
// -------------------------------------------
console.log('\n--- DASHBOARD EXAMPLES ---');

async function runDashboardExamples() {
  try {
    const dashboard = await fetchDashboard('u1');
    console.log('Dashboard for u1:', dashboard);
    // Expect:
    // dashboard.user.id === 'u1'
    // dashboard.orders is an array
    // dashboard.totalSpent === sum of order.total values for user 'u1'
  } catch (err) {
    console.log('Unexpected error fetching dashboard for u1:', err.message);
    // Expect: NOT to run for valid user
  }

  try {
    const badDashboard = await fetchDashboard('nope');
    console.log('Unexpected success for missing dashboard:', badDashboard);
    // Expect: NOT to run
  } catch (err) {
    console.log('Dashboard error for missing user:', err.message);
    // Expect: "User not found"
  }
}

runDashboardExamples();

//
// -------------------------------------------
// SEQUENTIAL VS PARALLEL EXAMPLES
// -------------------------------------------
console.log('\n--- SEQUENTIAL VS PARALLEL EXAMPLES ---');

async function loadSequential() {
  console.log('Sequential start');

  const user = await fetchUser('u1');
  console.log('Sequential user:', user);
  // Expect: user.id === 'u1'

  const userOrders = await fetchOrders('u1');
  console.log('Sequential orders:', userOrders);
  // Expect: all orders where order.userId === 'u1'

  console.log('Sequential done');
  // Expect total time ≈ sum of both delays
}

async function loadParallel() {
  console.log('Parallel start');

  const [user, userOrders] = await Promise.all([
    fetchUser('u1'),
    fetchOrders('u1'),
  ]);

  console.log('Parallel user:', user);
  // Expect: user.id === 'u1'

  console.log('Parallel orders:', userOrders);
  // Expect: orders for 'u1'

  console.log('Parallel done');
  // Expect total time ≈ the slower of the two delays (faster overall)
}

async function runLoadComparison() {
  await loadSequential();
  await loadParallel();
}

runLoadComparison();
