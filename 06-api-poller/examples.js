import {
  createInitialState,
  markPolling,
  markSuccess,
  markError,
  markStopped,
} from './pollerState.js';

import { startPolling } from './apiPoller.js';

// -------------------------------------------
// POLLER STATE EXAMPLES
// -------------------------------------------
console.log('\n--- POLLER STATE EXAMPLES ---');

const initial = createInitialState();
console.log('Initial state:', initial);

const p1 = markPolling(initial);
console.log('After markPolling:', p1);

const p2 = markSuccess(p1, { foo: 'bar' });
console.log('After markSuccess:', p2);

const p3 = markError(p2, 'Something went wrong');
console.log('After markError:', p3);

const p4 = markStopped(p3);
console.log('After markStopped:', p4);

// -------------------------------------------
// API POLLER EXAMPLE – NORMAL COMPLETION
// -------------------------------------------
console.log('\n--- API POLLER EXAMPLE (NORMAL) ---');

const url = 'https://jsonplaceholder.typicode.com/posts';

function logUpdate1(state) {
  console.log('Poller update:', state.status, '| attempts:', state.attempts);
}

const poller1 = startPolling(
  url,
  { intervalMs: 1000, maxAttempts: 3 },
  logUpdate1
);

// -------------------------------------------
// API POLLER EXAMPLE – MANUAL STOP
// -------------------------------------------
console.log('\n--- API POLLER EXAMPLE (MANUAL STOP) ---');

const poller2 = startPolling(
  url,
  { intervalMs: 1000, maxAttempts: 10 },
  (state) =>
    console.log('Poller2 update:', state.status, '| attempts:', state.attempts)
);

setTimeout(() => {
  console.log('Calling poller2.stop()');
  poller2.stop();
}, 2500);

// -------------------------------------------
// API POLLER EXAMPLE – ERROR CASE
// -------------------------------------------
console.log('\n--- API POLLER EXAMPLE (ERROR) ---');

const badUrl = 'https://jsonplaceholder.typicode.com/does-not-exist';

const poller3 = startPolling(
  badUrl,
  { intervalMs: 1000, maxAttempts: 3 },
  (state) =>
    console.log(
      'Poller3 update:',
      state.status,
      '| attempts:',
      state.attempts,
      '| error:',
      state.error
    )
);
