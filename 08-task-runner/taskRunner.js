import {
  createInitialState,
  markRunning,
  markTaskSuccess,
  markTaskError,
  markStopped,
  markDone,
} from './runnerState.js';

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

    for (let i = 0; i < tasks.length; i++) {
      if (stopped) break;
      const task = tasks[i];
      try {
        const currentTask = await task();
        state = markTaskSuccess(state, currentTask);
        onUpdate(state);
      } catch (error) {
        state = markTaskError(state, error);
        onUpdate(state);
        break;
      }
    }
    if (state.completed === total) {
      state = markDone(state);
      onUpdate(state);
    }
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

function runParallel(tasks, concurrency, onUpdate) {
  const total = tasks.length;
  let state = createInitialState(total);
  let stopped = false;
  let inFlight = 0;
  let index = 0;
  let doneCount = 0;

  onUpdate(state);

  state = markRunning(state);
  onUpdate(state);

  async function startNext() {
    if (stopped) return;
    if (index >= total) return;
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
    } finally {
      inFlight--;
      doneCount++;

      if (doneCount >= total) {
        if (!stopped) {
          if (state.status !== 'error') {
            state = markDone(state);
          }
          onUpdate(state);
        }
        return;
      }
      startNext();
    }
  }

  function kickOff() {
    for (let i = 0; i < concurrency; i++) {
      startNext();
    }
  }

  function stop() {
    if (stopped) return;
    stopped = true;
    state = markStopped(state);
    onUpdate(state);
  }

  kickOff();

  return { stop };
}

export { runSequential, runParallel };
