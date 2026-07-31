import assert from "node:assert/strict";
import test from "node:test";

import docsBreadcrumbAncestors from "./vara_docs_breadcrumb_ancestors.js";

const resolveDocsBreadcrumbAncestors = docsBreadcrumbAncestors.resolve;

const pages = [
  { permalink: "/docs/foo/qux/bar/", template: "vara/docs", title: "Bar" },
  { permalink: "/docs/foo/bar/", template: "vara/docs", title: "Sibling Bar" },
  { permalink: "/docs/", template: "vara/docs", title: "Documentation" },
  { permalink: "/docs/foo/qux/", template: "vara/docs", title: "Qux" },
  { permalink: "/docs/foo/", template: "vara/docs", title: "Foo" },
  { permalink: "/docs/foo/qux/other/", template: "vara/docs", title: "Other" },
  { permalink: "/docs/foo/qux/", template: "vara/landing", title: "Landing" },
];

test("resolveDocsBreadcrumbAncestors returns no ancestors for the docs root", () => {
  assert.deepEqual(resolveDocsBreadcrumbAncestors(pages, "/docs/"), []);
});

test("resolveDocsBreadcrumbAncestors returns exact ancestors from root to parent", () => {
  assert.deepEqual(
    resolveDocsBreadcrumbAncestors(pages, "/docs/foo/qux/bar/").map(page => page.title),
    ["Documentation", "Foo", "Qux"],
  );
});

test("resolveDocsBreadcrumbAncestors normalizes permalink boundaries", () => {
  assert.deepEqual(
    resolveDocsBreadcrumbAncestors(pages, "docs/foo/qux?tab=api").map(page => page.title),
    ["Documentation", "Foo"],
  );
  assert.deepEqual(resolveDocsBreadcrumbAncestors(null, "/docs/foo/"), []);
});

test("docsBreadcrumbAncestors reads pages and the current page from context", () => {
  assert.deepEqual(
    docsBreadcrumbAncestors({ pages, page: { permalink: "/docs/foo/qux/bar/" } }).map(page => page.title),
    ["Documentation", "Foo", "Qux"],
  );
});
