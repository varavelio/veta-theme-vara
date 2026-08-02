import assert from "node:assert/strict";
import test from "node:test";

import {
  createSearchEngine,
  createSearchSnippet,
  fetchSearchDocuments,
  normalizeSearchPayload,
  processSearchTerm,
  resolveSiteUrl,
  searchDocuments,
  tokenizeSearchText,
} from "./search.js";

test("normalizes technical search terms and preserves useful subterms", () => {
  assert.deepEqual(tokenizeSearchText("docs_footer-links and vara.site"), [
    "docs_footer-links",
    "and",
    "vara.site",
  ]);
  assert.deepEqual(processSearchTerm("docs_footerLinks"), [
    "docs_footerlinks",
    "docs",
    "footer",
    "links",
  ]);
  assert.equal(processSearchTerm("Configuración"), "configuracion");
});

test("validates and normalizes versioned search payloads", () => {
  assert.deepEqual(
    normalizeSearchPayload({
      version: 1,
      documents: [
        { id: " /docs/ ", url: " /docs/ ", title: " Docs ", html: "<h1>Docs</h1>" },
        { id: "/docs/", url: "/duplicate/", title: "Duplicate" },
        { title: "Missing URL" },
      ],
    }),
    [
      {
        id: "/docs/",
        url: "/docs/",
        title: "Docs",
        description: "",
        html: "<h1>Docs</h1>",
        lang: "en",
      },
    ],
  );
  assert.throws(() => normalizeSearchPayload({ version: 2, documents: [] }), /Expected version 1/);
});

test("reports unavailable search indexes", async () => {
  await assert.rejects(
    fetchSearchDocuments("/docs/vara-docs-search-index.json", {
      fetcher: async () => ({ ok: false, status: 404 }),
    }),
    /status 404/,
  );
});

test("resolves index permalinks relative to the generated site root", () => {
  assert.equal(
    resolveSiteUrl("/docs/guide/", "../../", "https://example.com/project/docs/current/"),
    "https://example.com/project/docs/guide/",
  );
});

test("ranks titles above body matches and supports prefixes and fuzzy terms", async () => {
  const documents = [
    {
      id: "title",
      url: "/title/",
      pageTitle: "Installation",
      sectionTitle: "",
      text: "Set up the project.",
    },
    {
      id: "body",
      url: "/body/",
      pageTitle: "Overview",
      sectionTitle: "Setup",
      text: "Read the installation instructions.",
    },
    {
      id: "technical",
      url: "/technical/",
      pageTitle: "Configuration",
      sectionTitle: "Footer links",
      text: "Use docs_footer_links to add actions.",
    },
    {
      id: "technical-duplicate",
      url: "/technical/",
      pageTitle: "Duplicate configuration",
      sectionTitle: "Footer links",
      text: "Use docs_footer_links to add actions.",
    },
  ];
  const { engine, textById } = await createSearchEngine(documents);

  assert.deepEqual(searchDocuments(engine, textById, "instal").map(result => result.id), ["title", "body"]);
  const fuzzyResult = searchDocuments(engine, textById, "instalation")[0];
  assert.equal(fuzzyResult.id, "title");
  assert.deepEqual(fuzzyResult.titleSegments.filter(segment => segment.match), [
    { text: "Installation", match: true },
  ]);
  const technicalResults = searchDocuments(engine, textById, "footer links");
  assert.equal(technicalResults[0].id, "technical");
  assert.equal(technicalResults.filter(result => result.url.endsWith("/technical/")).length, 1);
});

test("creates bounded snippets with safe highlighted segments", () => {
  const segments = createSearchSnippet(
    "A long introduction before the installation instructions and the final words.",
    "installation",
    48,
  );

  assert.equal(segments.map(segment => segment.text).join(""), "...before the installation instructions and...");
  assert.deepEqual(segments.filter(segment => segment.match), [
    { text: "installation", match: true },
  ]);
});
