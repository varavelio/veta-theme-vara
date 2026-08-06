import assert from "node:assert/strict";
import test from "node:test";

import { clampIndex, resolveActiveIndex, resolveStep } from "./carousel.js";

test("clampIndex keeps an index inside the slide range", () => {
  assert.equal(clampIndex(0, 3), 0);
  assert.equal(clampIndex(2, 3), 2);
  assert.equal(clampIndex(-1, 3), 0);
  assert.equal(clampIndex(9, 3), 2);
});

test("clampIndex returns zero for empty or invalid ranges", () => {
  assert.equal(clampIndex(1, 0), 0);
  assert.equal(clampIndex(1, -2), 0);
  assert.equal(clampIndex(Number.NaN, 3), 0);
});

test("resolveStep uses the offset between consecutive slides", () => {
  const track = {
    children: [
      { offsetLeft: 0, offsetWidth: 320 },
      { offsetLeft: 336, offsetWidth: 320 },
    ],
  };
  assert.equal(resolveStep(track), 336);
});

test("resolveStep falls back to a single slide width", () => {
  const track = { children: [{ offsetLeft: 0, offsetWidth: 400 }] };
  assert.equal(resolveStep(track), 400);
  assert.equal(resolveStep(null), 0);
});

test("resolveActiveIndex rounds the scroll position to the active slide", () => {
  assert.equal(resolveActiveIndex(0, 336, 3), 0);
  assert.equal(resolveActiveIndex(336, 336, 3), 1);
  assert.equal(resolveActiveIndex(680, 336, 3), 2);
  assert.equal(resolveActiveIndex(5000, 336, 3), 2);
});
