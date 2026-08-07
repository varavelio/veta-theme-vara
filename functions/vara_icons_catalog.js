/**
 * Returns the icon catalog metadata consumed by the internal
 * `vara-icons-catalog` template. Not intended for public documentation.
 *
 * Reads the generated `templates/vara/icons/icons.json` manifest and returns
 * the deduplicated, alphabetically sorted icon list with per-provider counts
 * and version-pinned repository and license URLs. When the manifest is
 * missing, it falls back to scanning the icon directory, losing provider
 * metadata.
 *
 * Usage:
 *   {% set catalog = vara_icons_catalog() %}
 *   {% for icon in catalog.icons %}
 *     {{ icon.name }} ({{ icon.provider }})
 *   {% endfor %}
 */

function providerMetadata(manifest, repoKey, licenseKey, versionKey) {
  return {
    version: manifest ? String(manifest[versionKey] || "") : "",
    repo: manifest && manifest.repos ? String(manifest.repos[repoKey] || "") : "",
    license: manifest && manifest.licenses ? String(manifest.licenses[licenseKey] || "") : "",
  };
}

function iconsCatalog({ files }) {
  let manifest = null;
  try {
    manifest = JSON.parse(files.readFile("templates/vara/icons/icons.json"));
  } catch (_error) {
    manifest = null;
  }

  let icons = [];
  if (manifest && Array.isArray(manifest.icons)) {
    icons = manifest.icons
      .map((icon) => ({
        name: String(icon.name || ""),
        provider: String(icon.provider || ""),
      }))
      .filter((icon) => icon.name.length > 0);
  } else if (typeof files.listFiles === "function") {
    for (const path of files.listFiles("templates/vara/icons/*.svg")) {
      const name = String(path).split("/").pop().replace(/\.svg$/, "");
      if (!name) continue;
      icons.push({ name, provider: name.startsWith("si-") ? "simple-icons" : "" });
    }
  }

  const seen = new Set();
  icons = icons
    .filter((icon) => {
      if (seen.has(icon.name)) return false;
      seen.add(icon.name);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const counts = { total: icons.length };
  for (const icon of icons) {
    if (icon.provider) counts[icon.provider] = (counts[icon.provider] || 0) + 1;
  }

  return {
    icons,
    counts,
    lucide: providerMetadata(manifest, "lucide", "lucide", "lucide_version"),
    simple_icons: providerMetadata(manifest, "simple-icons", "simple-icons", "simple_icons_version"),
  };
}

export default iconsCatalog;
