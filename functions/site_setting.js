/**
 * Returns the first configured site setting from an ordered list of keys.
 *
 * Each key is checked in project settings before theme defaults. Null values and
 * empty strings are skipped, while false, zero, and empty collections are kept.
 *
 * Usage:
 *   {{ site_setting("title") }}
 *   {{ site_setting("docs_favicon", "favicon") }}
 */

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function resolveSiteSetting(site, siteDefault, ...keys) {
  const sources = [site, siteDefault];

  for (const key of keys) {
    if (typeof key !== "string" || key === "") {
      continue;
    }

    for (const source of sources) {
      if (!source || !Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
      }

      const value = source[key];
      if (hasValue(value)) {
        return value;
      }
    }
  }

  return null;
}

function siteSetting({ data }, ...keys) {
  return resolveSiteSetting(data && data.site, data && data.site_default, ...keys);
}

siteSetting.resolve = resolveSiteSetting;

export default siteSetting;
