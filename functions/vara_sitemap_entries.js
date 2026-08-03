/**
 * Returns sitemap entries for every included page.
 *
 * HTML routes are included by default. Other output formats require
 * `sitemap: true`, while `sitemap: false` always excludes a page. The sitemap
 * template resolves each returned permalink with `vara_absolute_url`.
 *
 * Usage:
 *   {% for entry in vara_sitemap_entries() %}
 *     <loc>{{ entry.loc }}</loc>
 *   {% endfor %}
 */

function resolveSitemapEntries(pages, currentPermalink) {
  if (!Array.isArray(pages)) return [];

  const current = normalizePermalink(currentPermalink);
  const seen = new Set();
  const entries = [];

  for (const page of pages) {
    if (!page || page.sitemap === false) continue;

    const permalink = normalizePermalink(page.permalink);
    if (!permalink || permalink === current || seen.has(permalink)) continue;
    if (page.sitemap !== true && !isHtmlPermalink(permalink)) continue;

    seen.add(permalink);
    entries.push({ loc: permalink });
  }

  return entries;
}

function normalizePermalink(value) {
  if (!value) return "";
  const input = String(value).trim();
  if (/^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/.test(input)) return "";

  const permalink = input.split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (!permalink) return "";
  return permalink.startsWith("/") ? permalink : `/${permalink}`;
}

function isHtmlPermalink(permalink) {
  if (permalink === "/" || permalink.endsWith("/")) return true;

  const filename = permalink.slice(permalink.lastIndexOf("/") + 1);
  const extensionIndex = filename.lastIndexOf(".");
  if (extensionIndex <= 0) return true;

  const extension = filename.slice(extensionIndex + 1).toLowerCase();
  return extension === "html" || extension === "htm";
}

function sitemapEntries({ page, pages }) {
  return resolveSitemapEntries(pages, page && page.permalink);
}

sitemapEntries.resolve = resolveSitemapEntries;

export default sitemapEntries;
