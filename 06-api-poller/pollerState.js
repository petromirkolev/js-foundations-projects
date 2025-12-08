// Poller state shape:
// {
//   status: 'idle' | 'polling' | 'stopped' | 'error',
//   attempts: number,
//   lastResult: any | null,
//   error: string | null
// }

function createInitialState() {
  return {
    status: 'idle',
    attempts: 0,
    lastResult: null,
    error: null,
  };
}

function markPolling(state) {
  const attempts = state.attempts + 1;
  return { ...state, status: 'polling', attempts };
}

function markSuccess(state, result) {
  return { ...state, status: 'polling', lastResult: result };
}

function markError(state, errorMessage) {
  return { ...state, status: 'error', error: errorMessage };
}

function markStopped(state) {
  return { ...state, status: 'stopped' };
}

export { createInitialState, markPolling, markSuccess, markError, markStopped };
