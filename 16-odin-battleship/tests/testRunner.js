function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}`);
    console.error(err);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toEqual(expected) {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) {
        throw new Error(`Expected ${e}, got ${a}`);
      }
    },
    toThrow() {
      if (typeof actual !== 'function') {
        throw new Error('toThrow expects a function');
      }
      let threw = false;
      try {
        actual();
      } catch (e) {
        threw = true;
      }
      if (!threw) throw new Error(`Expected function to throw, but it did not`);
    },
  };
}

export { test, expect };
