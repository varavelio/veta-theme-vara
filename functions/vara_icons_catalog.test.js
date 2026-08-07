import assert from "node:assert/strict";
import test from "node:test";

import vara_icons_catalog from "./vara_icons_catalog.js";

const MANIFEST = {
  lucide_version: "1.28.0",
  simple_icons_version: "16.27.1",
  licenses: {
    lucide: "https://example.com/lucide/LICENSE",
    "simple-icons": "https://example.com/simple-icons/LICENSE.md",
  },
  repos: {
    lucide: "https://github.com/lucide-icons/lucide/tree/1.28.0",
    "simple-icons": "https://github.com/simple-icons/simple-icons/tree/16.27.1",
  },
  icons: [
    { name: "si-apple", provider: "simple-icons" },
    { name: "check", provider: "lucide" },
    { name: "check", provider: "lucide" },
    { name: "varavel", provider: "varavel" },
  ],
};

function context(files) {
  return { files };
}

test("vara_icons_catalog parses the manifest into a sorted, deduplicated catalog", () => {
  const catalog = vara_icons_catalog(
    context({
      readFile() {
        return JSON.stringify(MANIFEST);
      },
    }),
  );

  assert.deepEqual(
    catalog.icons.map((icon) => icon.name),
    ["check", "si-apple", "varavel"],
  );
  assert.deepEqual(catalog.counts, { total: 3, lucide: 1, "simple-icons": 1, varavel: 1 });
});

test("vara_icons_catalog exposes version-pinned repo and license metadata per provider", () => {
  const catalog = vara_icons_catalog(
    context({
      readFile() {
        return JSON.stringify(MANIFEST);
      },
    }),
  );

  assert.deepEqual(catalog.lucide, {
    version: "1.28.0",
    repo: "https://github.com/lucide-icons/lucide/tree/1.28.0",
    license: "https://example.com/lucide/LICENSE",
  });
  assert.deepEqual(catalog.simple_icons, {
    version: "16.27.1",
    repo: "https://github.com/simple-icons/simple-icons/tree/16.27.1",
    license: "https://example.com/simple-icons/LICENSE.md",
  });
});

test("vara_icons_catalog falls back to scanning the icon directory", () => {
  const catalog = vara_icons_catalog(
    context({
      readFile() {
        throw new Error("missing manifest");
      },
      listFiles() {
        return ["templates/vara/icons/check.svg", "templates/vara/icons/si-apple.svg"];
      },
    }),
  );

  assert.deepEqual(catalog.icons, [
    { name: "check", provider: "" },
    { name: "si-apple", provider: "simple-icons" },
  ]);
  assert.equal(catalog.counts.total, 2);
  assert.equal(catalog.lucide.repo, "");
  assert.equal(catalog.simple_icons.version, "");
});
