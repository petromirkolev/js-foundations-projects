import {
  createInitialState,
  markRunning,
  applySample,
  markError,
  markStopped,
} from './telemetryState.js';

import { startTelemetry } from './telemetrySimulator.js';

//
// -------------------------------------------
// TELEMETRY STATE EXAMPLES
// -------------------------------------------
console.log('\n--- TELEMETRY STATE EXAMPLES ---');

let state = createInitialState();
console.log('Initial state:', state);
// Expect: status 'idle', samples 0, lastValue/min/max/error null

state = markRunning(state);
console.log('After markRunning:', state);
// Expect: status 'running', samples 1

state = applySample(state, 10);
console.log('After applySample(10):', state);
// Expect: lastValue 10, min 10, max 10

state = applySample(state, 12);
console.log('After applySample(12):', state);
// Expect: lastValue 12, min 10, max 12

state = applySample(state, 8);
console.log('After applySample(8):', state);
// Expect: lastValue 8, min 8, max 12

state = markError(state, 'Test error');
console.log('After markError:', state);
// Expect: status 'error', error 'Test error'

state = markStopped(state);
console.log('After markStopped:', state);
// Expect: status 'stopped'

//
// -------------------------------------------
// TELEMETRY SIMULATOR EXAMPLE – NORMAL RUN
// -------------------------------------------
console.log('\n--- TELEMETRY SIMULATOR EXAMPLE (NORMAL) ---');

const telemetry1 = startTelemetry(
  {
    intervalMs: 500,
    maxSamples: 5,
    baseValue: 50,
    noise: 5,
    errorRate: 0,
  },
  (s) => {
    console.log(
      'Sim1 update:',
      'status =',
      s.status,
      '| samples =',
      s.samples,
      '| last =',
      s.lastValue,
      '| min =',
      s.min,
      '| max =',
      s.max
    );
  }
);

// Expect: idle → several running updates → stopped after 5 samples

//
// -------------------------------------------
// TELEMETRY SIMULATOR EXAMPLE – ERROR RUN
// -------------------------------------------
console.log('\n--- TELEMETRY SIMULATOR EXAMPLE (ERROR) ---');

const telemetry2 = startTelemetry(
  {
    intervalMs: 300,
    maxSamples: 50,
    baseValue: 100,
    noise: 10,
    errorRate: 0.3,
  },
  (s) => {
    console.log(
      'Sim2 update:',
      'status =',
      s.status,
      '| samples =',
      s.samples,
      '| last =',
      s.lastValue,
      '| min =',
      s.min,
      '| max =',
      s.max,
      '| error =',
      s.error
    );
  }
);

// Expect: eventually an 'error' status followed by 'stopped', and no more updates

//
// -------------------------------------------
// TELEMETRY SIMULATOR EXAMPLE – MANUAL STOP
// -------------------------------------------
console.log('\n--- TELEMETRY SIMULATOR EXAMPLE (MANUAL STOP) ---');

const telemetry3 = startTelemetry(
  {
    intervalMs: 400,
    maxSamples: 100,
    baseValue: 0,
    noise: 1,
    errorRate: 0,
  },
  (s) => {
    console.log(
      'Sim3 update:',
      'status =',
      s.status,
      '| samples =',
      s.samples,
      '| last =',
      s.lastValue
    );
  }
);

setTimeout(() => {
  console.log('Calling telemetry3.stop()');
  telemetry3.stop();
}, 2000);

// Expect: updates for ~2 seconds, then final 'stopped' state and no further updates
