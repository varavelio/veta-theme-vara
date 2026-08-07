import assert from "node:assert/strict";
import test from "node:test";

import { resolveFaqInitialOpen, toggleFaqOpenItem } from "./faq.js";

test("toggles a closed item open", () => {
  assert.equal(toggleFaqOpenItem(null, "plan"), "plan");
  assert.equal(toggleFaqOpenItem("cancel", "plan"), "plan");
});

test("toggles the open item closed", () => {
  assert.equal(toggleFaqOpenItem("plan", "plan"), null);
});

test("keeps a single item open at a time", () => {
  assert.equal(toggleFaqOpenItem("plan", "cancel"), "cancel");
  assert.equal(toggleFaqOpenItem("cancel", "plan"), "plan");
});

test("opens the first item only when requested", () => {
  assert.equal(resolveFaqInitialOpen("true", "plan"), "plan");
  assert.equal(resolveFaqInitialOpen("false", "plan"), null);
  assert.equal(resolveFaqInitialOpen("true", ""), null);
});
