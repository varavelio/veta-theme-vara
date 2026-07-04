import assert from "node:assert/strict";
import test from "node:test";

import range from "./range.js";

test("range returns a clamped zero-based range", () => {
  assert.deepEqual(range({}, 4), [0, 1, 2, 3]);
  assert.deepEqual(range({}, -1), []);
  assert.equal(range({}, 100).length, 20);
});
