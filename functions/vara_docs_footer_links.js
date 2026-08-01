/**
 * Normalizes opt-in links rendered between a docs page's content and pager.
 * Invalid entries are omitted and links open in a new tab unless explicitly disabled.
 */
function resolveDocsFooterLinks(value) {
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
      new_tab: item.new_tab !== false,
    });
  }

  return links;
}

function docsFooterLinks(_context, value) {
  return resolveDocsFooterLinks(value);
}

docsFooterLinks.resolve = resolveDocsFooterLinks;

export default docsFooterLinks;
