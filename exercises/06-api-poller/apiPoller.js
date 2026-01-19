import {
  createInitialState,
  markPolling,
  markSuccess,
  markError,
  markStopped,
} from './pollerState.js';

import { getJson } from '../05-api-mini-project/apiClient.js';

function startPolling(url, config, onUpdate) {
  let state = createInitialState();
  let timeoutId = null;
  let stopped = false;
  onUpdate(state);

  async function load() {
    if (stopped) return;
    state = markPolling(state);
    onUpdate(state);
    try {
      const result = await getJson(url);
      state = markSuccess(state, result);
      onUpdate(state);
    } catch (error) {
      state = markError(state, error.message);
      onUpdate(state);
      state = markStopped(state);
      onUpdate(state);
      stopped = true;
      return;
    }
    if (stopped) return;
    if (state.attempts >= config.maxAttempts) {
      stopped = true;
      state = markStopped(state);
      onUpdate(state);
      return;
    }
    timeoutId = setTimeout(load, config.intervalMs);
  }

  function stop() {
    if (stopped) return;
    stopped = true;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    state = markStopped(state);
    onUpdate(state);
  }

  load();
  return { stop };
}

export { startPolling };
