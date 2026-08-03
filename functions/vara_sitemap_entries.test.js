import assert from "node:assert/strict";
import test from "node:test";

import sitemapEntries from "./vara_sitemap_entries.js";

const resolveSitemapEntries = sitemapEntries.resolve;

test("resolveSitemapEntries returns normalized permalinks and excludes opted-out pages", () => {
  const pages = [
    { permalink: "/" },
    { permalink: "/docs/" },
    { permalink: "/docs//guide/?preview=true#intro" },
    { permalink: "/about" },
    { permalink: "/legal.html" },
    { permalink: "/legacy.HTM" },
    { permalink: "/docs/index.md" },
    { permalink: "/llms.txt" },
    { permalink: "/search.json" },
    { permalink: "/feed.xml" },
    { permalink: "/guide.pdf", sitemap: true },
    { permalink: "https://example.com/external/", sitemap: true },
    { permalink: "/private/", sitemap: false },
    { permalink: "/docs/guide/" },
    { permalink: "/404.html", sitemap: false },
    { permalink: "/sitemap.xml", template: "vara-sitemap-xml" },
  ];

  assert.deepEqual(resolveSitemapEntries(pages, "/sitemap.xml"), [
    { loc: "/" },
    { loc: "/docs/" },
    { loc: "/docs/guide/" },
    { loc: "/about" },
    { loc: "/legal.html" },
    { loc: "/legacy.HTM" },
    { loc: "/guide.pdf" },
  ]);
});

test("sitemapEntries reads pages and the current page from context", () => {
  assert.deepEqual(
    sitemapEntries({
      page: { permalink: "/sitemap.xml" },
      pages: [{ permalink: "docs/" }],
    }),
    [{ loc: "/docs/" }],
  );
  assert.deepEqual(resolveSitemapEntries(null, "/sitemap.xml"), []);
});

test("normalizes the current sitemap route before excluding it", () => {
  assert.deepEqual(
    resolveSitemapEntries([
      { permalink: "sitemap.xml", sitemap: true },
      { permalink: "/nested//sitemap.xml?source=build", sitemap: true },
    ], "/nested/sitemap.xml"),
    [{ loc: "/sitemap.xml" }],
  );
});
