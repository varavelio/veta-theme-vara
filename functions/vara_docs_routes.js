const DEFAULT_DOCS_ROOT = "/docs/";
const DEFAULT_SEARCH_INDEX = "/docs/vara-docs-search-index.json";

/**
 * Resolves normalized site-relative routes for the single documentation tree.
 * Deployment prefixes belong in `site_url`, not in these logical permalinks.
 */
function resolveDocsRoutes(site, siteDefault) {
  return {
    root: resolveRoute(site, siteDefault, "docs_root_permalink", DEFAULT_DOCS_ROOT, true),
    search_index: resolveRoute(
      site,
      siteDefault,
      "docs_search_index_permalink",
      DEFAULT_SEARCH_INDEX,
      false,
    ),
  };
}

function resolveRoute(site, siteDefault, key, fallback, directory) {
  for (const source of [site, siteDefault]) {
    if (!source || !Object.prototype.hasOwnProperty.call(source, key)) continue;
    const path = normalizePath(source[key]);
    if (!path || !directory && (path === "/" || path.endsWith("/"))) continue;
    return directory ? asDirectory(path) : path;
  }
  return directory ? asDirectory(fallback) : fallback;
}

function asDirectory(path) {
  return path === "/" ? path : `${path.replace(/\/+$/, "")}/`;
}

function normalizePath(value) {
  const input = String(value || "").trim();
  if (!input || /^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/.test(input)) return "";

  const path = input.split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function docsRoutes({ data }) {
  return resolveDocsRoutes(data && data.site, data && data.site_default);
}

docsRoutes.resolve = resolveDocsRoutes;

export default docsRoutes;
