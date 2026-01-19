function createInitialState(total) {
  return {
    status: 'idle',
    total: total,
    completed: 0,
    errors: 0,
    lastResult: null,
    lastError: null,
  };
}

function markRunning(state) {
  return { ...state, status: 'running' };
}

function markTaskSuccess(state, result) {
  return { ...state, completed: state.completed + 1, lastResult: result };
}

function markTaskError(state, error) {
  return {
    ...state,
    status: 'error',
    errors: state.errors + 1,
    lastError: error,
  };
}

function markStopped(state) {
  return { ...state, status: 'stopped' };
}

function markDone(state) {
  return { ...state, status: 'done' };
}

export {
  createInitialState,
  markRunning,
  markTaskSuccess,
  markTaskError,
  markStopped,
  markDone,
};
