import {
  createInitialState,
  markRunning,
  markTaskSuccess,
  markTaskError,
  markStopped,
  markDone,
} from './runnerState.js';

/**
 * Run tasks sequentially: task 0, then 1, then 2, ...
 * tasks: array of async functions: async () => any
 * onUpdate: (state) => void
 *
 * Returns: { stop }
 */
function runSequential(tasks, onUpdate) {
  const total = tasks.length;
  let state = createInitialState(total);
  let stopped = false;

  onUpdate(state);

  async function run() {
    if (stopped) return;
    if (total === 0) {
      state = markDone(state);
      onUpdate(state);
      return;
    }

    state = markRunning(state);
    onUpdate(state);

    // TODO:
    // 1. loop over tasks
    // 2. for each task:
    //    - if stopped → break
    //    - try { await task(); markTaskSuccess } catch { markTaskError; break or stop }
    // 3. if all tasks finished successfully → markDone
  }

  function stop() {
    if (stopped) return;
    stopped = true;
    state = markStopped(state);
    onUpdate(state);
  }

  run();

  return { stop };
}

/**
 * Run tasks in parallel with a concurrency limit.
 *
 * tasks: array of async functions: async () => any
 * concurrency: max number of tasks running at once
 * onUpdate: (state) => void
 *
 * Returns: { stop }
 */
function runParallel(tasks, concurrency, onUpdate) {
  const total = tasks.length;
  let state = createInitialState(total);
  let stopped = false;

  let inFlight = 0; // how many tasks currently running
  let index = 0; // next task index to start
  let doneCount = 0; // completed + errored tasks

  onUpdate(state);

  state = markRunning(state);
  onUpdate(state);

  async function startNext() {
    if (stopped) return;
    if (index >= total) return; // no more tasks to start
    if (inFlight >= concurrency) return;

    const currentIndex = index;
    const task = tasks[currentIndex];
    index++;
    inFlight++;

    try {
      const result = await task();
      state = markTaskSuccess(state, result);
      onUpdate(state);
    } catch (err) {
      state = markTaskError(state, err);
      onUpdate(state);
      // Depending on design: you might want to stop everything on first error
      // For now, just continue.
    } finally {
      inFlight--;
      doneCount++;

      // If all tasks done → markDone
      if (doneCount >= total) {
        if (!stopped) {
          state = markDone(state);
          onUpdate(state);
        }
        return;
      }

      // Start more tasks if possible
      startNext();
    }
  }

  function kickOff() {
    // Try to start up to 'concurrency' initial tasks
    for (let i = 0; i < concurrency; i++) {
      startNext();
    }
  }

  function stop() {
    if (stopped) return;
    stopped = true;
    state = markStopped(state);
    onUpdate(state);
    // Running tasks will still finish, but no new tasks will be started.
  }

  kickOff();

  return { stop };
}

export { runSequential, runParallel };
