/**
 * Normalizes links rendered on the not-found page.
 * Invalid entries are omitted and links stay in the current tab by default.
 */
function resolveNotFoundLinks(value) {
  if (!Array.isArray(value)) return [];

  const links = [];

  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;

    const title = String(item.title || "").trim();
    const href = String(item.href || "").trim();
    if (!title || !href) continue;

    links.push({
      title,
      href,
      icon: String(item.icon || "").trim(),
      new_tab: item.new_tab === true,
      primary: links.length === 0,
    });
  }

  return links;
}

function notFoundLinks(_context, value) {
  return resolveNotFoundLinks(value);
}

notFoundLinks.resolve = resolveNotFoundLinks;

export default notFoundLinks;
