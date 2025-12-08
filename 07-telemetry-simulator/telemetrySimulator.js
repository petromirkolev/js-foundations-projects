import {
  createInitialState,
  markRunning,
  applySample,
  markError,
  markStopped,
} from './telemetryState.js';

function startTelemetry(config, onUpdate) {
  // config: { intervalMs, maxSamples, baseValue, noise, errorRate }

  let state = createInitialState();
  let stopped = false;
  let timeoutId = null;

  // emit initial idle state
  onUpdate(state);

  async function tick() {
    // TODO:
    // 1. if stopped → return
    // 2. markRunning + onUpdate
    // 3. simulate error with Math.random() and config.errorRate
    // 4. if error → markError, markStopped, onUpdate, set stopped, return
    // 5. generate sample around baseValue ± noise
    // 6. applySample + onUpdate
    // 7. if samples >= maxSamples → markStopped, onUpdate, set stopped, return
    // 8. schedule next tick with setTimeout
  }

  function stop() {
    // TODO:
    // 1. if already stopped → return
    // 2. set stopped = true
    // 3. clearTimeout if timeoutId is not null
    // 4. markStopped + onUpdate (if not already stopped state)
  }

  // start loop
  tick();

  // return control object
  return { stop };
}

export { startTelemetry };
