function createInitialState() {
  return {
    status: 'idle',
    samples: 0,
    lastValue: null,
    min: null,
    max: null,
    error: null,
  };
}

function markRunning(state) {
  return { ...state, status: 'running', samples: state.samples + 1 };
}

function applySample(state, value) {
  const newMin = state.min === null ? value : Math.min(state.min, value);
  const newMax = state.max === null ? value : Math.max(state.max, value);
  return { ...state, lastValue: value, min: newMin, max: newMax };
}

function markError(state, message) {
  return { ...state, status: 'error', error: message };
}

function markStopped(state) {
  return { ...state, status: 'stopped' };
}

export { createInitialState, markRunning, applySample, markError, markStopped };
