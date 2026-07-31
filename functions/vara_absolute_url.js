/**
 * Resolves an internal path against the configured public site URL.
 *
 * Absolute HTTP URLs are preserved. Missing or invalid site URLs fall back to
 * root-relative paths so local and preview builds remain usable.
 *
 * Usage:
 *   {{ vara_absolute_url(page.permalink) }}
 */

function normalizeSiteUrl(value) {
  const siteUrl = String(value || "").trim();
  if (!/^https?:\/\/[^/?#\s]+(?:\/[^?#\s]*)?$/i.test(siteUrl)) return "";
  return siteUrl.replace(/\/+$/, "");
}

function resolveAbsoluteUrl(value, siteUrl) {
  const input = String(value || "").trim();
  if (!input || /^https?:\/\//i.test(input) || input.startsWith("//")) return input;

  const path = input.startsWith("/") ? input : `/${input}`;
  const baseUrl = normalizeSiteUrl(siteUrl);
  return baseUrl ? baseUrl + path : path;
}

function configuredSiteUrl(data) {
  const sources = [data && data.site, data && data.site_default];

  for (const source of sources) {
    const siteUrl = normalizeSiteUrl(source && source.site_url);
    if (siteUrl) return siteUrl;
  }

  return "";
}

function absoluteUrl({ data }, value) {
  return resolveAbsoluteUrl(value, configuredSiteUrl(data));
}

absoluteUrl.resolve = resolveAbsoluteUrl;

export default absoluteUrl;
