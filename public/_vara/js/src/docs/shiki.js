const SHIKI_MODULE_URL = "https://esm.run/shiki@4.4.1";
const COPY_BUTTON_MODULE_URL = "https://esm.run/shiki-transformer-copy-button@0.0.6";
const SHIKI_THEMES = {
  light: "github-light",
  dark: "github-dark",
};
const LANGUAGE_CLASS_PREFIX = "language-";
const READY_ATTRIBUTE = "data-vara-shiki-ready";
const COPY_RESET_DELAY = 2000;
const PLAIN_TEXT_LANGUAGES = new Set(["text", "txt", "plaintext"]);

export function getCodeBlockLanguage(code) {
  for (const className of code?.classList || []) {
    if (className.startsWith(LANGUAGE_CLASS_PREFIX) && className.length > LANGUAGE_CLASS_PREFIX.length) {
      return className.slice(LANGUAGE_CLASS_PREFIX.length);
    }
  }

  return "";
}

export function resolveCodeBlocks(elements) {
  return Array.from(elements || []).flatMap((code) => {
    const language = getCodeBlockLanguage(code);
    return language ? [{ code, language }] : [];
  });
}

export function resolveCustomLanguages(elements) {
  const languages = new Map();

  for (const element of elements || []) {
    const id = String(element.dataset?.languageId || "").trim();
    const url = String(element.dataset?.languageUrl || "").trim();
    if (id && url) languages.set(id, { id, url });
  }

  return languages;
}

export function resolveLanguageSources(languages, bundledLanguages, customLanguages) {
  const sources = new Map();

  for (const language of languages || []) {
    if (sources.has(language)) continue;

    const customLanguage = customLanguages.get(language);
    if (customLanguage) {
      sources.set(language, { type: "custom", ...customLanguage });
    } else if (
      Object.prototype.hasOwnProperty.call(bundledLanguages, language)
      || PLAIN_TEXT_LANGUAGES.has(language)
    ) {
      sources.set(language, { type: "bundled", id: language });
    } else {
      sources.set(language, { type: "bundled", id: "text" });
    }
  }

  return sources;
}

export function createCopyButtonTransformer(addCopyButton) {
  return addCopyButton({
    toggle: COPY_RESET_DELAY,
    button: {
      class: "vara-shiki-copy",
      type: "button",
      tabindex: -1,
      title: "Copy code",
      "aria-label": "Copy code",
      "aria-live": "polite",
    },
  });
}

export async function fetchCustomGrammar(language, fetcher = globalThis.fetch) {
  if (!fetcher) throw new Error("Custom grammar fetching is not available.");

  const response = await fetcher(language.url);
  if (!response.ok) throw new Error(`Custom grammar request failed with status ${response.status}.`);

  const grammar = await response.json();
  if (!grammar || typeof grammar !== "object" || Array.isArray(grammar) || !grammar.scopeName) {
    throw new Error("Custom grammar is not a valid TextMate grammar.");
  }

  return {
    ...grammar,
    name: language.id,
    aliases: [],
  };
}

function resolveConfig(template) {
  if (!template?.content) return null;

  return {
    customLanguages: resolveCustomLanguages(
      template.content.querySelectorAll("[data-language-id][data-language-url]"),
    ),
  };
}

function mergeOriginalAttributes(target, source) {
  for (const className of source.classList) target.classList.add(className);

  for (const attribute of source.attributes) {
    if (attribute.name === "class") continue;

    if (attribute.name === "style") {
      for (let index = 0; index < source.style.length; index++) {
        const property = source.style.item(index);
        if (!target.style.getPropertyValue(property)) {
          target.style.setProperty(
            property,
            source.style.getPropertyValue(property),
            source.style.getPropertyPriority(property),
          );
        }
      }
    } else {
      target.setAttribute(attribute.name, attribute.value);
    }
  }
}

export function bindCopyButton(root, codeText, options = {}) {
  const button = root.querySelector("button.vara-shiki-copy");
  if (!button) return false;

  button.removeAttribute("onclick");

  const clipboard = options.clipboard ?? globalThis.navigator?.clipboard;
  if (!clipboard?.writeText) {
    button.hidden = true;
    return false;
  }

  const schedule = options.setTimeout ?? globalThis.setTimeout;
  const cancel = options.clearTimeout ?? globalThis.clearTimeout;
  let resetTimer;

  const resetButton = () => {
    button.classList.remove("copied");
    button.setAttribute("aria-label", "Copy code");
    button.title = "Copy code";
  };

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    if (button.disabled) return;

    button.disabled = true;

    try {
      await clipboard.writeText(codeText);
      button.classList.add("copied");
      button.setAttribute("aria-label", "Code copied");
      button.title = "Code copied";

      if (resetTimer) cancel(resetTimer);
      resetTimer = schedule(resetButton, COPY_RESET_DELAY);
    } catch (_error) {
      button.setAttribute("aria-label", "Could not copy code");
      button.title = "Could not copy code";
      if (resetTimer) cancel(resetTimer);
      resetTimer = schedule(resetButton, COPY_RESET_DELAY);
    } finally {
      button.disabled = false;
    }
  });

  return true;
}

export function revealCodeBlocks(blocks) {
  for (const block of blocks || []) {
    block.code.parentElement?.setAttribute(READY_ATTRIBUTE, "");
  }
}

function applyHighlightedHtml(code, html, codeText, documentRef, options) {
  const container = documentRef.createElement("template");
  container.innerHTML = String(html).trim();

  const generatedPre = container.content.firstElementChild;
  const generatedCode = generatedPre?.querySelector("code");
  const originalPre = code.parentElement;

  if (generatedPre?.tagName !== "PRE" || !generatedCode || originalPre?.tagName !== "PRE") {
    throw new Error("Shiki returned an unexpected HTML structure.");
  }

  mergeOriginalAttributes(generatedPre, originalPre);
  mergeOriginalAttributes(generatedCode, code);
  generatedPre.setAttribute(READY_ATTRIBUTE, "");

  const copyButton = generatedPre.querySelector("button.vara-shiki-copy");
  if (copyButton && bindCopyButton(generatedPre, codeText, options)) {
    const wrapper = documentRef.createElement("div");
    wrapper.className = "vara-shiki-block";
    wrapper.append(generatedPre, copyButton);
    originalPre.replaceWith(wrapper);
  } else {
    copyButton?.remove();
    originalPre.replaceWith(generatedPre);
  }
}

async function loadLanguage(highlighter, source, fetcher) {
  const language = source.type === "custom"
    ? await fetchCustomGrammar(source, fetcher)
    : source.id;

  await highlighter.loadLanguage(language);
  return source.id;
}

function warn(logger, message, error) {
  logger?.warn?.(`[Vara] ${message}`, error);
}

async function importShiki() {
  return import(SHIKI_MODULE_URL);
}

async function importCopyButton() {
  return import(COPY_BUTTON_MODULE_URL);
}

export async function initShiki(options = {}) {
  const documentRef = options.document ?? globalThis.document;
  const config = resolveConfig(documentRef?.getElementById("vara-shiki-config"));
  if (!config) return 0;

  const blocks = resolveCodeBlocks(documentRef.querySelectorAll(".prose pre > code"));
  if (blocks.length === 0) return 0;

  const importer = options.importer ?? importShiki;
  const copyButtonImporter = options.copyButtonImporter ?? importCopyButton;
  const fetcher = options.fetcher ?? globalThis.fetch;
  const logger = options.logger ?? globalThis.console;

  try {
    let shiki;
    try {
      shiki = await importer();
    } catch (error) {
      warn(logger, "Could not load Shiki.", error);
      return 0;
    }

    const sources = resolveLanguageSources(
      blocks.map(block => block.language),
      shiki.bundledLanguages || {},
      config.customLanguages,
    );
    if (sources.size === 0) return 0;

    const transformers = [];
    try {
      const { addCopyButton } = await copyButtonImporter();
      transformers.push(createCopyButtonTransformer(addCopyButton));
    } catch (error) {
      warn(logger, "Could not load the Shiki copy button.", error);
    }

    let highlighter;
    try {
      highlighter = await shiki.createHighlighter({
        themes: Object.values(SHIKI_THEMES),
        langs: [],
      });
    } catch (error) {
      warn(logger, "Could not initialize Shiki.", error);
      return 0;
    }

    const loadTargets = new Map();
    for (const source of sources.values()) {
      if (!loadTargets.has(source.id)) loadTargets.set(source.id, source);
    }

    const loadedLanguages = new Set();
    await Promise.all(Array.from(loadTargets.values(), async (source) => {
      try {
        loadedLanguages.add(await loadLanguage(highlighter, source, fetcher));
      } catch (error) {
        warn(logger, `Could not load the Shiki language "${source.id}".`, error);
      }
    }));

    let highlightedCount = 0;
    await Promise.all(blocks.map(async (block) => {
      const source = sources.get(block.language);
      if (!source || !loadedLanguages.has(source.id)) return;

      const codeText = block.code.textContent || "";
      try {
        const html = await highlighter.codeToHtml(codeText, {
          lang: source.id,
          themes: SHIKI_THEMES,
          defaultColor: false,
          transformers,
        });

        applyHighlightedHtml(block.code, html, codeText, documentRef, options);
        highlightedCount++;
      } catch (error) {
        warn(logger, `Could not highlight the Shiki language "${block.language}".`, error);
      }
    }));

    return highlightedCount;
  } finally {
    revealCodeBlocks(blocks);
  }
}
