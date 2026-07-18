import assert from "node:assert/strict";
import test from "node:test";

import siteSetting from "./site_setting.js";

const resolveSiteSetting = siteSetting.resolve;

test("resolveSiteSetting resolves keys in order across site settings and defaults", () => {
  const site = {
    docs_favicon: "",
    favicon: "/project-favicon.svg",
  };
  const siteDefault = {
    docs_favicon: "/docs-favicon.svg",
    favicon: "/default-favicon.svg",
  };

  assert.equal(
    resolveSiteSetting(site, siteDefault, "docs_favicon", "favicon"),
    "/docs-favicon.svg",
  );
  assert.equal(
    resolveSiteSetting({ docs_favicon: "/project-docs.svg" }, siteDefault, "docs_favicon", "favicon"),
    "/project-docs.svg",
  );
  assert.equal(
    resolveSiteSetting({}, siteDefault, "missing", "favicon"),
    "/default-favicon.svg",
  );
});

test("resolveSiteSetting preserves explicit false, zero, and empty collections", () => {
  assert.equal(resolveSiteSetting({ enabled: false }, { enabled: true }, "enabled"), false);
  assert.equal(resolveSiteSetting({ count: 0 }, { count: 10 }, "count"), 0);

  const items = [];
  assert.equal(resolveSiteSetting({ items }, { items: ["default"] }, "items"), items);
});

test("resolveSiteSetting skips absent values and returns null when unresolved", () => {
  assert.equal(resolveSiteSetting({ title: null }, { title: "" }, "title"), null);
  assert.equal(resolveSiteSetting(undefined, undefined, "title"), null);
});
