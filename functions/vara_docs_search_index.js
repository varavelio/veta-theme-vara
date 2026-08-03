const SEARCH_INDEX_VERSION = 1;

/**
 * Serializes searchable documentation pages for the client-side search engine.
 * Only HTML docs under the configured docs root are included.
 */
function resolveDocsSearchIndex(pages, rootPermalink) {
  const root = normalizedDirectory(rootPermalink);
  const seenPermalinks = new Set();
  const documents = Array.isArray(pages)
    ? pages
      .filter(page => page && page.template === "vara-docs" && page.disable_search !== true)
      .filter(page => isWithinRoot(page.permalink, root))
      .filter(page => {
        const permalink = normalizedPath(page.permalink);
        if (!permalink || seenPermalinks.has(permalink)) return false;
        seenPermalinks.add(permalink);
        return true;
      })
      .map(page => ({
        id: String(page.permalink),
        url: String(page.permalink),
        title: String(page.title || "Untitled"),
        description: String(page.description || ""),
        html: String(page.content || ""),
        lang: String(page.lang || "en"),
      }))
    : [];

  return JSON.stringify({ version: SEARCH_INDEX_VERSION, documents });
}

function isWithinRoot(value, root) {
  const permalink = normalizedPath(value);
  return root === "/" ? permalink.startsWith("/") : permalink.startsWith(root);
}

function normalizedDirectory(value) {
  const path = normalizedPath(value);
  if (!path) return "/docs/";
  return path === "/" ? path : `${path.replace(/\/+$/, "")}/`;
}

function normalizedPath(value) {
  if (!value) return "";
  const path = String(value).trim().split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function docsSearchIndex({ pages }, rootPermalink) {
  return resolveDocsSearchIndex(pages, rootPermalink);
}

docsSearchIndex.resolve = resolveDocsSearchIndex;

export default docsSearchIndex;
