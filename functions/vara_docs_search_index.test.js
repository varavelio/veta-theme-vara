import assert from "node:assert/strict";
import test from "node:test";

import docsSearchIndex from "./vara_docs_search_index.js";

const resolveDocsSearchIndex = docsSearchIndex.resolve;

test("serializes searchable HTML docs under the current index root", () => {
  const pages = [
    {
      permalink: "/docs/guide/",
      template: "vara-docs",
      title: "A \"quoted\" guide",
      description: "Start here\nnext",
      content: "<h1>Guide</h1>",
      lang: "es",
    },
    {
      permalink: "/docs/private/",
      template: "vara-docs",
      title: "Private",
      disable_search: true,
    },
    {
      permalink: "/docs/guide/",
      template: "vara-docs",
      title: "Duplicate guide",
    },
    {
      permalink: "/docs/guide/index.md",
      template: "vara-docs-raw",
      title: "Raw guide",
    },
    {
      permalink: "/other/guide/",
      template: "vara-docs",
      title: "Other guide",
    },
  ];

  assert.deepEqual(JSON.parse(resolveDocsSearchIndex(pages, "/docs/vara-docs-search-index.json")), {
    version: 1,
    documents: [
      {
        id: "/docs/guide/",
        url: "/docs/guide/",
        title: "A \"quoted\" guide",
        description: "Start here\nnext",
        html: "<h1>Guide</h1>",
        lang: "es",
      },
    ],
  });
});

test("returns an empty versioned index for invalid input", () => {
  assert.equal(resolveDocsSearchIndex(null, "/docs/vara-docs-search-index.json"), "{\"version\":1,\"documents\":[]}");
  assert.deepEqual(JSON.parse(docsSearchIndex({ page: {}, pages: [] })), {
    version: 1,
    documents: [],
  });
});
