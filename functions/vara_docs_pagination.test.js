import assert from "node:assert/strict";
import test from "node:test";

import docsPagination from "./vara_docs_pagination.js";

const resolveDocsPagination = docsPagination.resolve;

const pages = [
  { permalink: "/products/acme/manual/", template: "vara-docs", title: "Manual", content: "Root", weight: 1 },
  { permalink: "/products/acme/manual/guide/", template: "vara-docs", title: "Guide", content: "", weight: 2 },
  {
    permalink: "/products/acme/manual/guide/start/",
    template: "vara-docs",
    title: "Start",
    content: "Start",
    weight: 1,
  },
  {
    permalink: "/products/acme/manual/guide/start/deep/",
    template: "vara-docs",
    title: "Deep",
    content: "Deep",
    weight: 1,
  },
  {
    permalink: "/products/acme/manual/reference/",
    template: "vara-docs",
    title: "Reference",
    content: "Ref",
    weight: 3,
  },
  { permalink: "/wiki/", template: "vara-docs", title: "Wiki", content: "Wiki", weight: 1 },
];

test("resolves hierarchical pagination relative to a nested docs root", () => {
  assert.deepEqual(
    resolveDocsPagination(pages, "/products/acme/manual/guide/start/", "/products/acme/manual/"),
    {
      previous: pages[0],
      next: pages[3],
    },
  );
  assert.deepEqual(
    resolveDocsPagination(pages, "/products/acme/manual/reference/", "/products/acme/manual/"),
    {
      previous: pages[3],
      next: null,
    },
  );
});

test("ignores pages outside the configured docs root", () => {
  assert.deepEqual(resolveDocsPagination(pages, "/wiki/", "/products/acme/manual/"), {
    previous: null,
    next: null,
  });
  assert.deepEqual(resolveDocsPagination(null, "/docs/", "/docs/"), {
    previous: null,
    next: null,
  });
});

test("reads pages and the current page from function context", () => {
  assert.deepEqual(
    docsPagination({ pages, page: pages[3] }, "/products/acme/manual/"),
    {
      previous: pages[2],
      next: pages[4],
    },
  );
});

test("supports documentation rooted at the generated site root", () => {
  const rootPages = [
    { permalink: "/", template: "vara-docs", title: "Docs", content: "Root" },
    { permalink: "/guide/", template: "vara-docs", title: "Guide", content: "Guide" },
  ];

  assert.deepEqual(resolveDocsPagination(rootPages, "/", "/"), {
    previous: null,
    next: rootPages[1],
  });
});
