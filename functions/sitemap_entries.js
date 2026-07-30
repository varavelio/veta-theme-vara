/**
 * Returns sitemap entries for every included page.
 *
 * The current sitemap page and pages with `sitemap: false` are excluded. When
 * `site_url` is configured, locations are absolute as required by the Sitemap
 * protocol; otherwise root-relative permalinks keep local builds portable.
 *
 * Usage:
 *   {% for entry in sitemap_entries() %}
 *     <loc>{{ entry.loc }}</loc>
 *   {% endfor %}
 */

function resolveSitemapEntries(pages, currentPermalink, siteUrl) {
  if (!Array.isArray(pages)) return [];

  const baseUrl = String(siteUrl || "").trim().replace(/\/+$/, "");

  return pages
    .filter(page => page && page.sitemap !== false && page.permalink !== currentPermalink)
    .map(page => {
      const permalink = normalizePermalink(page.permalink);
      return { loc: baseUrl ? baseUrl + permalink : permalink };
    })
    .filter(entry => entry.loc !== "");
}

function normalizePermalink(value) {
  if (!value) return "";
  const permalink = String(value).trim();
  if (!permalink) return "";
  return permalink.startsWith("/") ? permalink : `/${permalink}`;
}

function configuredSiteUrl(data) {
  const siteUrl = data && data.site && data.site.site_url;
  if (siteUrl !== undefined && siteUrl !== null && siteUrl !== "") return siteUrl;
  return data && data.site_default && data.site_default.site_url;
}

function sitemapEntries({ data, page, pages }) {
  return resolveSitemapEntries(pages, page && page.permalink, configuredSiteUrl(data));
}

sitemapEntries.resolve = resolveSitemapEntries;

export default sitemapEntries;
