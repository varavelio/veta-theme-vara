import assert from "node:assert/strict";
import test from "node:test";

import docsLlmsPages from "./docs_llms_pages.js";

const resolveDocsLlmsPages = docsLlmsPages.resolve;

test("resolveDocsLlmsPages returns docs LLM pages as a weighted hierarchy", () => {
  const pages = [
    { permalink: "/docs/api/reference/index.md", template: "veta/docs-llms", title: "Reference", weight: 2 },
    { permalink: "/docs/index.md", template: "veta/docs-llms", title: "Documentation", weight: 10 },
    { permalink: "/docs/api/index.md", template: "veta/docs-llms", title: "API", weight: 2 },
    { permalink: "/docs/guide/index.md", template: "veta/docs-llms", title: "Guide", weight: 1 },
    { permalink: "/docs/ignored/index.md", template: "veta/docs", title: "Ignored" },
  ];

  assert.deepEqual(resolveDocsLlmsPages(pages), [
    { depth: 0, indent: "", permalink: "/docs/index.md", title: "Documentation" },
    { depth: 1, indent: "  ", permalink: "/docs/guide/index.md", title: "Guide" },
    { depth: 1, indent: "  ", permalink: "/docs/api/index.md", title: "API" },
    { depth: 2, indent: "    ", permalink: "/docs/api/reference/index.md", title: "Reference" },
  ]);
});

test("resolveDocsLlmsPages uses real ancestors and supports independent roots", () => {
  const pages = [
    { permalink: "/docs/guide/install/index.md", template: "veta/docs-llms", title: "Install" },
    { permalink: "/api/index.md", template: "veta/docs-llms", title: "API" },
    { permalink: "/docs/index.md", template: "veta/docs-llms", title: "Docs" },
  ];

  assert.deepEqual(
    resolveDocsLlmsPages(pages).map(item => [item.title, item.depth]),
    [["API", 0], ["Docs", 0], ["Install", 1]],
  );
});

test("resolveDocsLlmsPages escapes Markdown labels and reads pages from context", () => {
  const pages = [
    { permalink: "/docs/index.md", template: "veta/docs-llms", title: "Docs [v2]\\Guide\nHome" },
  ];

  assert.deepEqual(docsLlmsPages({ pages }), [
    {
      depth: 0,
      indent: "",
      permalink: "/docs/index.md",
      title: "Docs \\[v2\\]\\\\Guide Home",
    },
  ]);
  assert.deepEqual(resolveDocsLlmsPages(null), []);
});
