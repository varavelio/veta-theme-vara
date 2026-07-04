import assert from "node:assert/strict";
import test from "node:test";

import trim from "./trim.js";

test("trim removes surrounding whitespace", () => {
  assert.equal(trim({}, "  Vara  "), "Vara");
  assert.equal(trim({}, null), "");
});
