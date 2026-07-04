import assert from "node:assert/strict";
import test from "node:test";

import compactNumber from "./compact_number.js";

test("compact_number formats finite values compactly", () => {
  assert.equal(compactNumber({}, 999), "999");
  assert.equal(compactNumber({}, 1200), "1.2k");
  assert.equal(compactNumber({}, 1000000), "1M");
  assert.equal(compactNumber({}, Number.NaN), "0");
});
