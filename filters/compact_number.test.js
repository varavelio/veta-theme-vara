import assert from "node:assert/strict";
import test from "node:test";

import compactNumber from "./compact_number.js";

test("compact_number returns values below one thousand without a suffix", () => {
  assert.equal(compactNumber({}, 0), "0");
  assert.equal(compactNumber({}, 42.5), "42.5");
  assert.equal(compactNumber({}, 999), "999");
  assert.equal(compactNumber({}, 999.9), "999.9");
});

test("compact_number formats thousands with a k suffix", () => {
  assert.equal(compactNumber({}, 1000), "1k");
  assert.equal(compactNumber({}, 1200), "1.2k");
  assert.equal(compactNumber({}, 1250), "1.3k");
  assert.equal(compactNumber({}, 10000), "10k");
  assert.equal(compactNumber({}, 999999), "1000k");
});

test("compact_number formats millions with an M suffix", () => {
  assert.equal(compactNumber({}, 1000000), "1M");
  assert.equal(compactNumber({}, 1200000), "1.2M");
  assert.equal(compactNumber({}, 1250000), "1.3M");
  assert.equal(compactNumber({}, 10000000), "10M");
});

test("compact_number preserves the sign when formatting negative values", () => {
  assert.equal(compactNumber({}, -42.5), "-42.5");
  assert.equal(compactNumber({}, -999.9), "-999.9");
  assert.equal(compactNumber({}, -1000), "-1k");
  assert.equal(compactNumber({}, -1200), "-1.2k");
  assert.equal(compactNumber({}, -1250), "-1.3k");
  assert.equal(compactNumber({}, -1000000), "-1M");
  assert.equal(compactNumber({}, -1250000), "-1.3M");
});

test("compact_number converts numeric input values", () => {
  assert.equal(compactNumber({}, "1200"), "1.2k");
  assert.equal(compactNumber({}, "1000000"), "1M");
  assert.equal(compactNumber({}, "-1200"), "-1.2k");
  assert.equal(compactNumber({}, null), "0");
  assert.equal(compactNumber({}, true), "1");
});

test("compact_number returns zero for non-finite input", () => {
  assert.equal(compactNumber({}, Number.NaN), "0");
  assert.equal(compactNumber({}, Number.POSITIVE_INFINITY), "0");
  assert.equal(compactNumber({}, Number.NEGATIVE_INFINITY), "0");
  assert.equal(compactNumber({}, undefined), "0");
  assert.equal(compactNumber({}, "not a number"), "0");
});
