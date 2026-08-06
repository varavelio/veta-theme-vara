import assert from "node:assert/strict";
import test from "node:test";

import footerCopyright from "./vara_component_footer_copyright.js";

const resolveComponentFooterCopyright = footerCopyright.resolve;

test("replaces %year% with the current year", () => {
  assert.equal(
    resolveComponentFooterCopyright({ data: { vara: { year: 2026 } } }, "© %year% Acme"),
    "© 2026 Acme",
  );
});

test("replaces a spaced % year % placeholder", () => {
  assert.equal(
    resolveComponentFooterCopyright({ data: { vara: { year: 2026 } } }, "© % year % Acme"),
    "© 2026 Acme",
  );
});

test("replaces partially spaced and differently cased placeholders", () => {
  assert.equal(
    resolveComponentFooterCopyright({ data: { vara: { year: 2026 } } }, "%Year % and % YEAR%"),
    "2026 and 2026",
  );
});

test("replaces every year placeholder occurrence", () => {
  assert.equal(
    resolveComponentFooterCopyright({ data: { vara: { year: 2026 } } }, "%year% - % year %"),
    "2026 - 2026",
  );
});

test("leaves text unchanged without a year value", () => {
  assert.equal(resolveComponentFooterCopyright({ data: {} }, "© %year% Acme"), "© %year% Acme");
  assert.equal(resolveComponentFooterCopyright({ data: null }, "© 2026 Acme"), "© 2026 Acme");
});

test("passes through missing values", () => {
  assert.equal(resolveComponentFooterCopyright({ data: { vara: { year: 2026 } } }, null), null);
  assert.equal(resolveComponentFooterCopyright({ data: { vara: { year: 2026 } } }, undefined), undefined);
});
