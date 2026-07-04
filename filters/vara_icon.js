/**
 * Vara Theme Icon Filter
 *
 * Usage: "icon-name" | vara_icon
 * Usage: "icon-name" | vara_icon:"extra-classes"
 */

const ICON_NAME_RE = /^[a-z0-9][a-z0-9-]*$/;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fallback(className) {
  return `
    <svg
      class="${escapeAttr(className)} text-red-500!"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  `;
}

export default function({ files }, input, parameter) {
  const name = String(input || "").trim();
  const extraClass = String(parameter || "").trim();
  const className = ["varapress-icon", extraClass].filter(Boolean).join(" ");

  if (!ICON_NAME_RE.test(name)) {
    return fallback(className);
  }

  let svg = "";
  try {
    svg = files.readFile(`public/_vara/icons/${name}.svg`);
  } catch (_error) {
    return fallback(className);
  }

  return svg.replace("<svg ", `<svg class="${escapeAttr(className)}" `);
}
