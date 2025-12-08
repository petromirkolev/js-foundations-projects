// Telemetry state shape:
// {
//   status: 'idle' | 'running' | 'stopped' | 'error',
//   samples: number,
//   lastValue: number | null,
//   min: number | null,
//   max: number | null,
//   error: string | null
// }

function createInitialState() {
  // TODO: return the initial telemetry state
}

function markRunning(state) {
  // TODO: return new state with status 'running' and samples + 1
}

function applySample(state, value) {
  // TODO: return new state with updated lastValue, min, max
}

function markError(state, message) {
  // TODO: return new state with status 'error' and error message
}

function markStopped(state) {
  // TODO: return new state with status 'stopped'
}

export { createInitialState, markRunning, applySample, markError, markStopped };
