/**
 * Returns sitemap entries for every included page.
 *
 * The current sitemap page and pages with `sitemap: false` are excluded. The
 * sitemap template resolves each returned permalink with `vara_absolute_url`.
 *
 * Usage:
 *   {% for entry in vara_sitemap_entries() %}
 *     <loc>{{ entry.loc }}</loc>
 *   {% endfor %}
 */

function resolveSitemapEntries(pages, currentPermalink) {
  if (!Array.isArray(pages)) return [];

  return pages
    .filter(page => page && page.sitemap !== false && page.permalink !== currentPermalink)
    .map(page => {
      const permalink = normalizePermalink(page.permalink);
      return { loc: permalink };
    })
    .filter(entry => entry.loc !== "");
}

function normalizePermalink(value) {
  if (!value) return "";
  const permalink = String(value).trim();
  if (!permalink) return "";
  return permalink.startsWith("/") ? permalink : `/${permalink}`;
}

function sitemapEntries({ page, pages }) {
  return resolveSitemapEntries(pages, page && page.permalink);
}

sitemapEntries.resolve = resolveSitemapEntries;

export default sitemapEntries;
