/**
 * Returns the documentation pages that are exact ancestors of a permalink.
 *
 * Matching normalized permalink prefixes keeps breadcrumb hierarchies correct
 * at any depth and prevents similarly named sibling routes from being treated
 * as parents.
 *
 * Usage:
 *   {% set ancestors = vara_docs_breadcrumb_ancestors() %}
 */

function resolveDocsBreadcrumbAncestors(pages, currentPermalink) {
  if (!Array.isArray(pages)) return [];

  const current = normalizePermalink(currentPermalink);
  if (!current) return [];

  return pages
    .filter(page => {
      if (!page || page.template !== "vara-docs") return false;

      const candidate = normalizePermalink(page.permalink);
      return candidate && candidate !== current && current.startsWith(candidate);
    })
    .sort((a, b) => normalizePermalink(a.permalink).length - normalizePermalink(b.permalink).length);
}

function docsBreadcrumbAncestors({ pages, page }) {
  return resolveDocsBreadcrumbAncestors(pages, page && page.permalink);
}

function normalizePermalink(value) {
  if (!value) return "";

  let permalink = String(value).split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (!permalink.startsWith("/")) permalink = `/${permalink}`;
  if (!permalink.endsWith("/")) permalink += "/";
  return permalink;
}

docsBreadcrumbAncestors.resolve = resolveDocsBreadcrumbAncestors;

export default docsBreadcrumbAncestors;
