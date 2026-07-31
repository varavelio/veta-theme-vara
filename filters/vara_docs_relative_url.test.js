import assert from "node:assert/strict";
import test from "node:test";

import docsRelativeUrl from "./vara_docs_relative_url.js";

test("vara_docs_relative_url makes relative paths explicit", () => {
  assert.equal(docsRelativeUrl({}, "index.md"), "./index.md");
  assert.equal(docsRelativeUrl({}, "guide/index.md"), "./guide/index.md");
  assert.equal(docsRelativeUrl({}, "../index.md"), "../index.md");
  assert.equal(docsRelativeUrl({}, "./index.md"), "./index.md");
  assert.equal(docsRelativeUrl({}, "/docs/index.md"), "./docs/index.md");
});
