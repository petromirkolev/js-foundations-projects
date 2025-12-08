// Runner state shape:
// {
//   status: 'idle' | 'running' | 'stopped' | 'done' | 'error',
//   total: number,
//   completed: number,
//   errors: number,
//   lastResult: any,
//   lastError: any,
// }

function createInitialState(total) {
  // TODO: return initial state for given total task count
  // status: 'idle', completed: 0, errors: 0, lastResult: null, lastError: null
}

function markRunning(state) {
  // TODO: return new state with status 'running'
}

function markTaskSuccess(state, result) {
  // TODO:
  // - completed + 1
  // - lastResult = result
  // - status remains 'running' (unless you choose to only set 'done' at the end)
}

function markTaskError(state, error) {
  // TODO:
  // - errors + 1
  // - lastError = error
  // - status = 'error' (for now)
}

function markStopped(state) {
  // TODO: return new state with status 'stopped'
}

function markDone(state) {
  // TODO: return new state with status 'done'
}

export {
  createInitialState,
  markRunning,
  markTaskSuccess,
  markTaskError,
  markStopped,
  markDone,
};
