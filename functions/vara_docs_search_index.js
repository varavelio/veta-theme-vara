const SEARCH_INDEX_VERSION = 1;

/**
 * Serializes searchable documentation pages for the client-side search engine.
 * Only HTML docs under the current index route are included.
 */
function resolveDocsSearchIndex(pages, currentPermalink) {
  const root = indexRoot(currentPermalink);
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

function indexRoot(value) {
  const permalink = normalizedPath(value);
  const lastSlash = permalink.lastIndexOf("/");
  return lastSlash >= 0 ? permalink.slice(0, lastSlash + 1) : "/";
}

function isWithinRoot(value, root) {
  const permalink = normalizedPath(value);
  return root === "/" ? permalink.startsWith("/") : permalink.startsWith(root);
}

function normalizedPath(value) {
  if (!value) return "";
  const path = String(value).trim().split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function docsSearchIndex({ page, pages }) {
  return resolveDocsSearchIndex(pages, page && page.permalink);
}

docsSearchIndex.resolve = resolveDocsSearchIndex;

export default docsSearchIndex;
