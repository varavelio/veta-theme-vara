/**
 * Trims leading and trailing whitespace from a value.
 *
 * Nullish and otherwise falsy inputs are treated as an empty string before
 * trimming, matching the project's template usage for optional values.
 *
 * Usage:
 *   {{ props.title|trim }}
 */

export default function(_runtime, input) {
  return String(input || "").trim();
}
