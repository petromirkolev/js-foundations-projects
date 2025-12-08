import {
  createInitialState,
  markPolling,
  markSuccess,
  markError,
  markStopped,
} from './pollerState.js';

import { getJson } from '../05-api-mini-project/apiClient.js';

function startPolling(url, config, onUpdate) {
  // config: { intervalMs, maxAttempts }
  // TODO:
  // 1. create initial state
  // 2. call onUpdate(initialState)
  // 3. create loop function using async/await
  // 4. schedule with setTimeout
  // 5. stop on error or max attempts
  // 6. return { stop }
}

export { startPolling };
