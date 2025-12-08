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
  let stopped = false;
  let timeoutId = null;

  if (stopped) return;

  async function load() {
    state = markPolling(state);
    onUpdate(state);

    if (state.attempts > config.maxAttempts) {
      state = markStopped(state);
      onUpdate(state);
      return;
    }

    try {
      const result = await getJson(url);
      state = markSuccess(state, result);
      onUpdate(state);
    } catch (err) {
      state = markError(state, err.message);
      onUpdate(state);
      state = markStopped(state);
      onUpdate(state);
      return;
    }
  }

  const stop = function () {
    stopped = true;
    timeoutId = null;
    state = markStopped(state);
    onUpdate(state);
    return { stop };
  };

  load();
}

export { startPolling };
