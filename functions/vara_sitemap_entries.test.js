import assert from "node:assert/strict";
import test from "node:test";

import sitemapEntries from "./vara_sitemap_entries.js";

const resolveSitemapEntries = sitemapEntries.resolve;

test("resolveSitemapEntries returns normalized permalinks and excludes opted-out pages", () => {
  const pages = [
    { permalink: "/" },
    { permalink: "/docs/" },
    { permalink: "/404.html", sitemap: false },
    { permalink: "/sitemap.xml", template: "vara-sitemap-xml" },
  ];

  assert.deepEqual(resolveSitemapEntries(pages, "/sitemap.xml"), [
    { loc: "/" },
    { loc: "/docs/" },
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
