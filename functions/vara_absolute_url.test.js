import assert from "node:assert/strict";
import test from "node:test";

import absoluteUrl from "./vara_absolute_url.js";

const resolveAbsoluteUrl = absoluteUrl.resolve;

test("resolveAbsoluteUrl joins internal paths to a normalized site URL", () => {
  assert.equal(resolveAbsoluteUrl("/docs/", "https://example.com/"), "https://example.com/docs/");
  assert.equal(
    resolveAbsoluteUrl("docs/index.md", "https://example.com/base/"),
    "https://example.com/base/docs/index.md",
  );
});

test("resolveAbsoluteUrl preserves absolute HTTP URLs", () => {
  assert.equal(
    resolveAbsoluteUrl("https://cdn.example.com/file.txt", "https://example.com"),
    "https://cdn.example.com/file.txt",
  );
  assert.equal(resolveAbsoluteUrl("//cdn.example.com/file.txt", "https://example.com"), "//cdn.example.com/file.txt");
});

test("resolveAbsoluteUrl falls back to root-relative paths", () => {
  assert.equal(resolveAbsoluteUrl("docs/", ""), "/docs/");
  assert.equal(resolveAbsoluteUrl("/docs/", "example.com"), "/docs/");
  assert.equal(resolveAbsoluteUrl("", "https://example.com"), "");
});

test("vara_absolute_url reads project settings before theme defaults", () => {
  assert.equal(
    absoluteUrl({
      data: { site: { site_url: "https://project.example" }, site_default: { site_url: "https://theme.example" } },
    }, "/docs/"),
    "https://project.example/docs/",
  );
  assert.equal(
    absoluteUrl(
      { data: { site: { site_url: "invalid" }, site_default: { site_url: "https://theme.example" } } },
      "/docs/",
    ),
    "https://theme.example/docs/",
  );
});
