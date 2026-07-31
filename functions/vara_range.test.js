import assert from "node:assert/strict";
import test from "node:test";

import vara_range from "./vara_range.js";

test("vara_range returns a clamped zero-based range", () => {
  assert.deepEqual(vara_range({}, 4), [0, 1, 2, 3]);
  assert.deepEqual(vara_range({}, -1), []);
  assert.equal(vara_range({}, 100).length, 20);
});
