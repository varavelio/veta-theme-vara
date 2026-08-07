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

function documentationPageFor(name) {
  if (documentationNames.includes(name)) return name;
  return documentationNames.find((doc) => {
    if (doc === name) return false;
    return readFileSync(`content/docs/components/${doc}.md`, "utf8").includes(`<vara-${name}`);
  });
}

test("every public component is documented", () => {
  for (const name of componentNames) {
    assert.ok(documentationPageFor(name), `${name} is missing documentation`);
  }
});

test("every component documentation includes source and a rendered example", () => {
  for (const name of componentNames) {
    const page = documentationPageFor(name);
    const documentation = readFileSync(`content/docs/components/${page}.md`, "utf8");
    const invocationCount = documentation.split(`<vara-${name}`).length - 1;

    assert.ok(
      invocationCount >= 2,
      `${name} must include source and a rendered example in ${page}.md`,
    );
  }
});

test("the component catalog links every public component", () => {
  const catalog = readFileSync("content/docs/components/index.md", "utf8");

  for (const name of componentNames) {
    const page = documentationPageFor(name);
    assert.match(catalog, new RegExp(`\\(\\./${page}/\\)`));
  }
});
