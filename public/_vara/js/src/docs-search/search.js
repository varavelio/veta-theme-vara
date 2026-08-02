import MiniSearch from "minisearch";

import { resolveTableOfContents } from "../docs/docs.js";

const SEARCH_INDEX_VERSION = 1;
const SEARCH_RESULT_LIMIT = 10;

export function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function tokenizeSearchText(value) {
  return String(value || "").match(/[\p{L}\p{N}]+(?:[._:/-][\p{L}\p{N}]+)*/gu) || [];
}

export function processSearchTerm(value) {
  const source = String(value || "");
  const normalized = normalizeSearchText(source);
  if (!normalized) return null;

  const expanded = source.replace(/([\p{Ll}\p{N}])([\p{Lu}])/gu, "$1 $2");
  const parts = normalizeSearchText(expanded).split(/[._:/\s-]+/).filter(Boolean);
  const terms = [...new Set([normalized, ...parts])];
  return terms.length === 1 ? terms[0] : terms;
}

export function normalizeSearchPayload(value) {
  if (!value || value.version !== SEARCH_INDEX_VERSION || !Array.isArray(value.documents)) {
    throw new Error(`Unsupported documentation search index. Expected version ${SEARCH_INDEX_VERSION}.`);
  }

  const seenIds = new Set();

  return value.documents
    .filter(document => document && typeof document === "object")
    .map(document => ({
      id: String(document.id || "").trim(),
      url: String(document.url || "").trim(),
      title: String(document.title || "Untitled").trim() || "Untitled",
      description: String(document.description || "").trim(),
      html: String(document.html || ""),
      lang: String(document.lang || "en").trim() || "en",
    }))
    .filter(document => {
      if (!document.id || !document.url || seenIds.has(document.id)) return false;
      seenIds.add(document.id);
      return true;
    });
}

export function resolveSiteUrl(permalink, siteRoot, baseUrl) {
  const root = new URL(String(siteRoot || "/"), baseUrl);
  return new URL(String(permalink || "").replace(/^\/+/, ""), root).href;
}

function compactText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function textBetween(root, start, end, documentRef) {
  const range = documentRef.createRange();
  if (start) range.setStartAfter(start);
  else range.setStart(root, 0);
  if (end) range.setEndBefore(end);
  else range.setEnd(root, root.childNodes.length);
  return compactText(range.cloneContents().textContent);
}

export function buildSearchDocuments(sources, options = {}) {
  const documentRef = options.documentRef ?? globalThis.document;
  const baseUrl = options.baseUrl ?? globalThis.location?.href;
  const siteRoot = options.siteRoot ?? "/";
  if (!documentRef?.createElement || !documentRef?.createRange || !baseUrl) return [];

  const documents = [];

  for (const source of sources || []) {
    const article = documentRef.createElement("article");
    article.innerHTML = source.html;
    article.querySelectorAll("script, style, template, [data-search-exclude]").forEach(element => element.remove());

    const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const toc = resolveTableOfContents(headings);
    const sectionHeadings = headings.filter(heading =>
      (heading.tagName === "H2" || heading.tagName === "H3") && compactText(heading.textContent)
    );
    const url = resolveSiteUrl(source.url, siteRoot, baseUrl);
    const introduction = textBetween(article, null, sectionHeadings[0], documentRef);

    documents.push({
      id: source.id,
      url,
      pageTitle: source.title,
      sectionTitle: "",
      text: compactText(`${source.description} ${introduction}`),
    });

    toc.forEach((item, index) => {
      const heading = sectionHeadings[index];
      if (!heading) return;

      documents.push({
        id: `${source.id}#${item.id}`,
        url: `${url}#${encodeURIComponent(item.id)}`,
        pageTitle: source.title,
        sectionTitle: item.title,
        text: textBetween(article, heading, sectionHeadings[index + 1], documentRef),
      });
    });
  }

  return documents;
}

export async function createSearchEngine(documents) {
  const engine = new MiniSearch({
    fields: ["pageTitle", "sectionTitle", "text"],
    storeFields: ["url", "pageTitle", "sectionTitle"],
    tokenize: tokenizeSearchText,
    processTerm: processSearchTerm,
  });
  const textById = new Map(documents.map(document => [document.id, document.text]));

  await engine.addAllAsync(documents, { chunkSize: 50 });
  return { engine, textById };
}

function searchOptions(combineWith) {
  return {
    boost: { pageTitle: 5, sectionTitle: 3, text: 1 },
    combineWith,
    fuzzy: term => term.length >= 5 ? 0.2 : false,
    maxFuzzy: 1,
    prefix: (_term, index, terms) => index === terms.length - 1,
    weights: { fuzzy: 0.55, prefix: 0.8 },
  };
}

export function searchDocuments(engine, textById, query, limit = SEARCH_RESULT_LIMIT) {
  const value = String(query || "").trim();
  if (value.length < 2) return [];

  let matches = engine.search(value, searchOptions("AND"));
  if (matches.length === 0 && tokenizeSearchText(value).length > 1) {
    matches = engine.search(value, searchOptions("OR"));
  }

  const results = [];
  const seenUrls = new Set();

  for (const match of matches) {
    if (!match.url || seenUrls.has(match.url)) continue;
    seenUrls.add(match.url);

    const matchedTerms = Object.keys(match.match || {});
    const text = textById.get(match.id);
    const context = compactText(`${match.sectionTitle || match.pageTitle}. ${text || ""}`);

    results.push({
      id: String(match.id),
      url: match.url,
      pageTitle: match.pageTitle,
      snippet: createSearchSnippet(context, value, 170, matchedTerms),
    });

    if (results.length >= limit) break;
  }

  return results;
}

function queryTerms(query, matchedTerms = []) {
  return [
    ...new Set(
      [
        ...tokenizeSearchText(query).flatMap(term => {
          const processed = processSearchTerm(term);
          return Array.isArray(processed) ? processed : [processed];
        }),
        ...matchedTerms.map(normalizeSearchText),
      ].filter(term => term && term.length >= 2),
    ),
  ].sort((a, b) => b.length - a.length);
}

export function createSearchHighlight(value, query, matchedTerms = []) {
  const text = compactText(value);
  if (!text) return [];

  const normalized = normalizeSearchText(text);
  const queryMatches = queryTerms(query);
  const terms = queryMatches.some(term => normalized.includes(term))
    ? queryMatches
    : queryTerms("", matchedTerms);
  const segments = [];
  let cursor = 0;

  while (cursor < text.length) {
    const term = terms.find(candidate => normalized.startsWith(candidate, cursor));
    if (!term) {
      const last = segments[segments.length - 1];
      if (last && !last.match) last.text += text[cursor];
      else segments.push({ text: text[cursor], match: false });
      cursor += 1;
      continue;
    }

    segments.push({ text: text.slice(cursor, cursor + term.length), match: true });
    cursor += term.length;
  }

  return segments;
}

export function createSearchSnippet(value, query, maxLength = 170, matchedTerms = []) {
  const text = compactText(value);
  if (!text) return [];

  const terms = queryTerms(query, matchedTerms);
  const normalized = normalizeSearchText(text);
  const firstMatch = terms.reduce((best, term) => {
    const index = normalized.indexOf(term);
    return index >= 0 && (best < 0 || index < best) ? index : best;
  }, -1);
  let start = firstMatch < 0 ? 0 : Math.max(0, firstMatch - Math.floor(maxLength * 0.35));
  let end = Math.min(text.length, start + maxLength);

  if (start > 0) {
    const nextSpace = text.indexOf(" ", start);
    if (nextSpace >= 0 && nextSpace < end) start = nextSpace + 1;
  }
  if (end < text.length) {
    const previousSpace = text.lastIndexOf(" ", end);
    if (previousSpace > start) end = previousSpace;
  }

  const excerpt = text.slice(start, end);
  const segments = createSearchHighlight(excerpt, query, matchedTerms);

  if (start > 0) segments.unshift({ text: "...", match: false });
  if (end < text.length) segments.push({ text: "...", match: false });
  return segments;
}

export async function fetchSearchDocuments(indexUrl, options = {}) {
  const fetcher = options.fetcher ?? globalThis.fetch;
  if (!fetcher) throw new Error("Fetch is not available.");

  const response = await fetcher(indexUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Search index request failed with status ${response.status}.`);
  return normalizeSearchPayload(await response.json());
}

function registerAlpineDocsSearch() {
  globalThis.Alpine.data("varaDocsSearch", (indexUrl, siteRoot) => ({
    query: "",
    results: [],
    status: "idle",
    engine: null,
    textById: null,

    async preload() {
      if (this.status !== "idle") return;
      this.status = "loading";

      try {
        const sources = await fetchSearchDocuments(indexUrl);
        const documents = buildSearchDocuments(sources, { siteRoot });
        const search = await createSearchEngine(documents);
        this.engine = search.engine;
        this.textById = search.textById;
        this.status = "ready";
        this.runQuery();
      } catch (error) {
        this.status = "error";
        console.error(
          `[Vara] Documentation search index is unavailable at ${indexUrl}. Generate it with the vara-docs-search-index template or disable docs_search.`,
          error,
        );
      }
    },

    openSearch() {
      if (!this.$refs.dialog.open) this.$refs.dialog.showModal();
      this.preload();
      this.$nextTick(() => this.$refs.input.focus());
    },

    closeSearch() {
      if (this.$refs.dialog.open) this.$refs.dialog.close();
    },

    retry() {
      if (this.status !== "error") return;
      this.status = "idle";
      this.preload();
    },

    resetSearch() {
      this.query = "";
      this.results = [];
    },

    runQuery() {
      if (!this.engine || !this.textById) return;
      this.results = searchDocuments(this.engine, this.textById, this.query);
    },

    handleShortcut(event) {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey) || event.altKey) return;
      event.preventDefault();
      if (this.$refs.dialog.open) this.closeSearch();
      else this.openSearch();
    },
  }));
}

export function initDocsSearch() {
  document.addEventListener("alpine:init", registerAlpineDocsSearch);
}
