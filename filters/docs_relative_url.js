/**
 * Makes a portable URL explicitly relative for LLM-facing Markdown indexes.
 *
 * Usage:
 *   {{ url(item.permalink) | docs_relative_url }}
 */

export default function(_runtime, input) {
  const value = String(input || "");
  if (value.startsWith("./") || value.startsWith("../")) return value;
  if (value.startsWith("/")) return `.${value}`;
  return `./${value}`;
}
