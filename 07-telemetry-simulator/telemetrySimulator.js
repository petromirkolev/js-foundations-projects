import {
  createInitialState,
  markRunning,
  applySample,
  markError,
  markStopped,
} from './telemetryState.js';

function startTelemetry(config, onUpdate) {
  let state = createInitialState();
  let stopped = false;
  let timeoutId = null;

  onUpdate(state);

  async function tick() {
    if (stopped) return;

    if (Math.random() < config.errorRate) {
      state = markError(state, 'Simulated sensor failure');
      onUpdate(state);
      state = markStopped(state);
      onUpdate(state);
      stopped = true;
      return;
    }

    state = markRunning(state);
    onUpdate(state);

    const raw = config.baseValue;
    const jitter = (Math.random() * 2 - 1) * config.noise;
    const value = raw + jitter;

    state = applySample(state, value);
    onUpdate(state);

    if (stopped) {
      state = markError(state);
      onUpdate(state);
      state = markStopped(state);
      onUpdate(state);
      stopped = true;
      return;
    }

    if (state.samples >= config.maxSamples) {
      state = markStopped(state);
      onUpdate(state);
      stopped = true;
      return;
    }

    timeoutId = setTimeout(tick, config.intervalMs);
  }

  function stop() {
    if (stopped) return;
    stopped = true;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      state = markStopped(state);
      onUpdate(state);
    }
  }

  tick();

  return { stop };
}

export { startTelemetry };
