import assert from "node:assert/strict";
import test from "node:test";

import sitemapEntries from "./vara_sitemap_entries.js";

const resolveSitemapEntries = sitemapEntries.resolve;

test("resolveSitemapEntries builds absolute URLs and excludes opted-out pages", () => {
  const pages = [
    { permalink: "/" },
    { permalink: "/docs/" },
    { permalink: "/404.html", sitemap: false },
    { permalink: "/sitemap.xml", template: "vara/sitemap-xml" },
  ];

  assert.deepEqual(resolveSitemapEntries(pages, "/sitemap.xml", "https://example.com/"), [
    { loc: "https://example.com/" },
    { loc: "https://example.com/docs/" },
  ]);
});

test("sitemapEntries reads context and falls back to root-relative URLs", () => {
  assert.deepEqual(
    sitemapEntries({
      data: { site: {}, site_default: { site_url: "" } },
      page: { permalink: "/sitemap.xml" },
      pages: [{ permalink: "docs/" }],
    }),
    [{ loc: "/docs/" }],
  );
  assert.deepEqual(resolveSitemapEntries(null, "/sitemap.xml", "https://example.com"), []);
});
