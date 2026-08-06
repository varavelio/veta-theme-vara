/**
 * Replaces year placeholders in footer copyright text with the current year
 * from the theme data (`data.vara.year`).
 *
 * Only the `%year%` placeholder is supported and it tolerates extra
 * whitespace (`% year %`) and any casing. `%` delimiters are used because
 * `{{ }}` is template syntax and would collide with Pongo expressions.
 *
 * Usage:
 *   {{ vara_component_footer_copyright("© %year% Acme Inc.") }}
 */

const YEAR_PATTERN = /%\s*year\s*%/gi;

function resolveComponentFooterCopyright({ data }, value) {
  if (value === undefined || value === null) return value;

  const year = data && data.vara && data.vara.year;
  if (year === undefined || year === null) return value;

  return String(value).replace(YEAR_PATTERN, String(year));
}

export default resolveComponentFooterCopyright;
resolveComponentFooterCopyright.resolve = resolveComponentFooterCopyright;
