import assert from "node:assert/strict";
import test from "node:test";

import {
  bindCopyButton,
  createCopyButtonTransformer,
  fetchCustomGrammar,
  getCodeBlockLanguage,
  initShiki,
  resolveCodeBlocks,
  resolveCustomLanguages,
  resolveLanguageSources,
} from "./shiki.js";

test("detects the first language class on a code block", () => {
  assert.equal(getCodeBlockLanguage({ classList: ["block", "language-vdl", "example"] }), "vdl");
  assert.equal(getCodeBlockLanguage({ classList: ["block", "language-"] }), "");
  assert.equal(getCodeBlockLanguage({ classList: ["block"] }), "");
});

test("keeps only code blocks with an explicit language", () => {
  const javascript = { classList: ["language-js"] };
  const plain = { classList: [] };

  assert.deepEqual(resolveCodeBlocks([javascript, plain]), [
    { code: javascript, language: "js" },
  ]);
});

test("resolves valid custom language definitions by exact id", () => {
  const languages = resolveCustomLanguages([
    { dataset: { languageId: "vdl", languageUrl: "https://cdn.example/vdl.json" } },
    { dataset: { languageId: "", languageUrl: "https://cdn.example/missing.json" } },
  ]);

  assert.deepEqual(languages.get("vdl"), {
    id: "vdl",
    url: "https://cdn.example/vdl.json",
  });
  assert.equal(languages.size, 1);
  assert.equal(languages.has("VDL"), false);
});

test("prefers custom languages and resolves bundled aliases", () => {
  const customLanguages = new Map([
    ["vdl", { id: "vdl", url: "https://cdn.example/vdl.json" }],
    ["js", { id: "js", url: "https://cdn.example/custom-js.json" }],
  ]);
  const sources = resolveLanguageSources(
    ["vdl", "js", "yaml", "unknown", "yaml"],
    { js: async () => {}, yaml: async () => {} },
    customLanguages,
  );

  assert.deepEqual(Array.from(sources.values()), [
    { type: "custom", id: "vdl", url: "https://cdn.example/vdl.json" },
    { type: "custom", id: "js", url: "https://cdn.example/custom-js.json" },
    { type: "bundled", id: "yaml" },
  ]);
});

test("configures the copy transformer with accessible button metadata", () => {
  let options;
  const transformer = createCopyButtonTransformer((value) => {
    options = value;
    return { name: "copy-button" };
  });

  assert.deepEqual(transformer, { name: "copy-button" });
  assert.deepEqual(options, {
    toggle: 2000,
    button: {
      class: "vara-shiki-copy",
      type: "button",
      tabindex: -1,
      title: "Copy code",
      "aria-label": "Copy code",
      "aria-live": "polite",
    },
  });
});

test("copies only source code and resets the copy button state", async () => {
  const classes = new Set();
  const attributes = new Map([["onclick", "unsafe-inline-handler"]]);
  const listeners = {};
  let copiedText = "";
  let scheduledReset;
  const button = {
    classList: {
      add(value) {
        classes.add(value);
      },
      remove(value) {
        classes.delete(value);
      },
    },
    disabled: false,
    title: "Copy code",
    removeAttribute(name) {
      attributes.delete(name);
    },
    setAttribute(name, value) {
      attributes.set(name, value);
    },
    addEventListener(name, listener) {
      listeners[name] = listener;
    },
  };

  assert.equal(
    bindCopyButton(
      { querySelector: () => button },
      "const value = true;",
      {
        clipboard: {
          async writeText(value) {
            copiedText = value;
          },
        },
        setTimeout(callback, delay) {
          assert.equal(delay, 2000);
          scheduledReset = callback;
          return 1;
        },
      },
    ),
    true,
  );

  await listeners.click({ preventDefault() {} });

  assert.equal(attributes.has("onclick"), false);
  assert.equal(copiedText, "const value = true;");
  assert.equal(classes.has("copied"), true);
  assert.equal(attributes.get("aria-label"), "Code copied");
  assert.equal(button.disabled, false);

  scheduledReset();
  assert.equal(classes.has("copied"), false);
  assert.equal(attributes.get("aria-label"), "Copy code");
});

test("fetches a TextMate grammar and forces its configured id without aliases", async () => {
  const grammar = await fetchCustomGrammar(
    { id: "vdl", url: "https://cdn.example/vdl.json" },
    async (url) => {
      assert.equal(url, "https://cdn.example/vdl.json");
      return {
        ok: true,
        async json() {
          return {
            name: "source-name",
            scopeName: "source.vdl",
            aliases: ["vdl-alias"],
            patterns: [],
          };
        },
      };
    },
  );

  assert.equal(grammar.name, "vdl");
  assert.deepEqual(grammar.aliases, []);
  assert.equal(grammar.scopeName, "source.vdl");
});

test("rejects unavailable or invalid custom grammars", async () => {
  await assert.rejects(
    () =>
      fetchCustomGrammar(
        { id: "vdl", url: "https://cdn.example/missing.json" },
        async () => ({ ok: false, status: 404 }),
      ),
    /status 404/,
  );

  await assert.rejects(
    () =>
      fetchCustomGrammar(
        { id: "vdl", url: "https://cdn.example/invalid.json" },
        async () => ({
          ok: true,
          async json() {
            return { patterns: [] };
          },
        }),
      ),
    /valid TextMate grammar/,
  );
});

function createShikiConfigTemplate() {
  return {
    content: {
      querySelectorAll() {
        return [];
      },
    },
  };
}

test("does not import Shiki when the page has no language code blocks", async () => {
  let imported = false;
  const highlighted = await initShiki({
    document: {
      getElementById() {
        return createShikiConfigTemplate();
      },
      querySelectorAll() {
        return [];
      },
    },
    async importer() {
      imported = true;
      return {};
    },
  });

  assert.equal(highlighted, 0);
  assert.equal(imported, false);
});

test("leaves code unchanged when the Shiki CDN cannot load", async () => {
  const pre = {
    ready: false,
    setAttribute(name) {
      if (name === "data-vara-shiki-ready") this.ready = true;
    },
  };
  const code = {
    classList: ["language-js"],
    textContent: "const value = true;",
    parentElement: pre,
  };
  const warnings = [];
  const highlighted = await initShiki({
    document: {
      getElementById() {
        return createShikiConfigTemplate();
      },
      querySelectorAll() {
        return [code];
      },
    },
    async importer() {
      throw new Error("offline");
    },
    logger: {
      warn(...values) {
        warnings.push(values);
      },
    },
  });

  assert.equal(highlighted, 0);
  assert.equal(code.textContent, "const value = true;");
  assert.equal(pre.ready, true);
  assert.equal(warnings.length, 1);
});
