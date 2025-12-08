import { runSequential, runParallel } from './taskRunner.js';

//
// Helper: create async tasks with delays
//
function createDelayTask(name, ms, shouldFail = false) {
  return async () => {
    console.log(`Task ${name} started (delay ${ms}ms, fail=${shouldFail})`);
    await new Promise((resolve) => setTimeout(resolve, ms));
    if (shouldFail) {
      console.log(`Task ${name} failing`);
      throw new Error(`Task ${name} failed`);
    }
    console.log(`Task ${name} completed`);
    return `Result of ${name}`;
  };
}

//
// -------------------------------------------
// SEQUENTIAL EXAMPLE – SUCCESS
// -------------------------------------------
console.log('\n--- SEQUENTIAL EXAMPLE (SUCCESS) ---');

const seqTasksSuccess = [
  createDelayTask('A', 500),
  createDelayTask('B', 300),
  createDelayTask('C', 200),
];

runSequential(seqTasksSuccess, (state) => {
  console.log(
    'Sequential success state:',
    'status =',
    state.status,
    '| total =',
    state.total,
    '| completed =',
    state.completed,
    '| errors =',
    state.errors,
    '| lastResult =',
    state.lastResult,
    '| lastError =',
    state.lastError
  );
});

//
// -------------------------------------------
// SEQUENTIAL EXAMPLE – ERROR
// -------------------------------------------
console.log('\n--- SEQUENTIAL EXAMPLE (ERROR) ---');

const seqTasksError = [
  createDelayTask('A', 300),
  createDelayTask('B', 400, true), // this one fails
  createDelayTask('C', 200),
];

runSequential(seqTasksError, (state) => {
  console.log(
    'Sequential error state:',
    'status =',
    state.status,
    '| total =',
    state.total,
    '| completed =',
    state.completed,
    '| errors =',
    state.errors,
    '| lastResult =',
    state.lastResult,
    '| lastError =',
    state.lastError
  );
});

//
// -------------------------------------------
// PARALLEL EXAMPLE – SUCCESS
// -------------------------------------------
console.log('\n--- PARALLEL EXAMPLE (SUCCESS, CONCURRENCY=2) ---');

const parTasksSuccess = [
  createDelayTask('P1', 800),
  createDelayTask('P2', 300),
  createDelayTask('P3', 500),
  createDelayTask('P4', 200),
  createDelayTask('P5', 400),
];

runParallel(parTasksSuccess, 2, (state) => {
  console.log(
    'Parallel success state:',
    'status =',
    state.status,
    '| total =',
    state.total,
    '| completed =',
    state.completed,
    '| errors =',
    state.errors,
    '| lastResult =',
    state.lastResult,
    '| lastError =',
    state.lastError
  );
});

//
// -------------------------------------------
// PARALLEL EXAMPLE – MANUAL STOP
// -------------------------------------------
console.log('\n--- PARALLEL EXAMPLE (MANUAL STOP) ---');

const parTasksStop = [
  createDelayTask('Q1', 1000),
  createDelayTask('Q2', 1000),
  createDelayTask('Q3', 1000),
  createDelayTask('Q4', 1000),
  createDelayTask('Q5', 1000),
];

const runner = runParallel(parTasksStop, 2, (state) => {
  console.log(
    'Parallel stop state:',
    'status =',
    state.status,
    '| total =',
    state.total,
    '| completed =',
    state.completed,
    '| errors =',
    state.errors,
    '| lastResult =',
    state.lastResult,
    '| lastError =',
    state.lastError
  );
});

// Stop after 1500ms
setTimeout(() => {
  console.log('Calling runner.stop()');
  runner.stop();
}, 1500);
