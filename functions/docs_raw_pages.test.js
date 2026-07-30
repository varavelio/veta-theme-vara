import assert from "node:assert/strict";
import test from "node:test";

import docsRawPages from "./docs_raw_pages.js";

const resolveDocsRawPages = docsRawPages.resolve;

test("resolveDocsRawPages returns raw docs pages as a weighted hierarchy", () => {
  const pages = [
    {
      content: "# Reference",
      permalink: "/docs/api/reference/index.md",
      template: "veta/docs-raw",
      title: "Reference",
      weight: 2,
    },
    {
      content: "# Documentation",
      permalink: "/docs/index.md",
      template: "veta/docs-raw",
      title: "Documentation",
      weight: 10,
    },
    { content: "# API", permalink: "/docs/api/index.md", template: "veta/docs-raw", title: "API", weight: 2 },
    { content: "# Guide", permalink: "/docs/guide/index.md", template: "veta/docs-raw", title: "Guide", weight: 1 },
    { permalink: "/docs/ignored/index.md", template: "veta/docs", title: "Ignored" },
  ];

  assert.deepEqual(resolveDocsRawPages(pages), [
    { content: "# Documentation", depth: 0, indent: "", permalink: "/docs/index.md", title: "Documentation" },
    { content: "# Guide", depth: 1, indent: "  ", permalink: "/docs/guide/index.md", title: "Guide" },
    { content: "# API", depth: 1, indent: "  ", permalink: "/docs/api/index.md", title: "API" },
    { content: "# Reference", depth: 2, indent: "    ", permalink: "/docs/api/reference/index.md", title: "Reference" },
  ]);
});

test("resolveDocsRawPages uses real ancestors and supports independent roots", () => {
  const pages = [
    { permalink: "/docs/guide/install/index.md", template: "veta/docs-raw", title: "Install" },
    { permalink: "/api/index.md", template: "veta/docs-raw", title: "API" },
    { permalink: "/docs/index.md", template: "veta/docs-raw", title: "Docs" },
  ];

  assert.deepEqual(
    resolveDocsRawPages(pages).map(item => [item.title, item.depth]),
    [["API", 0], ["Docs", 0], ["Install", 1]],
  );
});

test("resolveDocsRawPages escapes Markdown labels and reads pages from context", () => {
  const pages = [
    { permalink: "/docs/index.md", template: "veta/docs-raw", title: "Docs [v2]\\Guide\nHome" },
  ];

  assert.deepEqual(docsRawPages({ pages }), [
    {
      content: "",
      depth: 0,
      indent: "",
      permalink: "/docs/index.md",
      title: "Docs \\[v2\\]\\\\Guide Home",
    },
  ]);
  assert.deepEqual(resolveDocsRawPages(null), []);
});
