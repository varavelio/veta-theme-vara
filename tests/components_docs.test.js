import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const componentNames = readdirSync("components")
  .filter((name) => name.startsWith("vara-") && name.endsWith(".j2"))
  .map((name) => name.slice("vara-".length, -".j2".length))
  .sort();

const documentationNames = readdirSync("content/docs/components")
  .filter((name) => name !== "index.md" && name.endsWith(".md"))
  .map((name) => name.slice(0, -".md".length))
  .sort();

test("every public component has one documentation page", () => {
  assert.deepEqual(documentationNames, componentNames);
});

test("every component page includes source and a rendered example", () => {
  for (const name of componentNames) {
    const documentation = readFileSync(`content/docs/components/${name}.md`, "utf8");
    const invocationCount = documentation.split(`<vara-${name}`).length - 1;

    assert.ok(invocationCount >= 2, `${name}.md must include source and a rendered example`);
  }
});

test("the component catalog links every public component", () => {
  const catalog = readFileSync("content/docs/components/index.md", "utf8");

  for (const name of componentNames) {
    assert.match(catalog, new RegExp(`\\(\\./${name}/\\)`));
  }
});
