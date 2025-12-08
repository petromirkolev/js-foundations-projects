function createInitialState() {
  // TODO: return initial poller state object
}

function markPolling(state) {
  // TODO: return new state with status 'polling' and attempts+1
}

function markSuccess(state, result) {
  // TODO: return new state with status 'polling' and new lastResult
}

function markError(state, errorMessage) {
  // TODO: return new state with status 'error' and error info
}

function markStopped(state) {
  // TODO: return new state with status 'stopped'
}

export { createInitialState, markPolling, markSuccess, markError, markStopped };
