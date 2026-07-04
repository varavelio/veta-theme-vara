/**
 * Renders an optimized SVG icon from `public/_vara/icons`.
 *
 * Arguments:
 * - `name`: icon file name without the `.svg` extension.
 * - `className`: optional CSS classes appended after `varapress-icon`.
 *
 * Invalid or missing icons render a red alert fallback instead of failing the
 * build. Existing SVG attributes are preserved; only `class` is injected on the
 * opening `<svg>` tag.
 *
 * Usage:
 *   {{ icon("check") | safe }}
 *   {{ icon("github", "size-4 text-content") | safe }}
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

export default function({ files }, name, className) {
  const iconName = String(name || "").trim();
  const extraClass = String(className || "").trim();
  const resolvedClassName = ["varapress-icon", extraClass].filter(Boolean).join(" ");

  if (!ICON_NAME_RE.test(iconName)) {
    return fallback(resolvedClassName);
  }

  let svg = "";
  try {
    svg = files.readFile(`public/_vara/icons/${iconName}.svg`);
  } catch (_error) {
    return fallback(resolvedClassName);
  }

  return svg.replace("<svg ", `<svg class="${escapeAttr(resolvedClassName)}" `);
}
