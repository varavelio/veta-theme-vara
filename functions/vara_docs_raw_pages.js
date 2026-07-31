/**
 * Returns all raw docs pages in a stable, hierarchical order.
 *
 * Hierarchy is derived from exact permalink segment prefixes. Depth counts
 * actual indexed ancestors, so missing intermediate pages never create broken
 * Markdown indentation.
 *
 * Usage:
 *   {% for item in vara_docs_raw_pages() %}
 *     {{ item.indent }}- [{{ item.title }}]({{ url(item.permalink) |vara_docs_relative_url }})
 *   {% endfor %}
 */

function resolveDocsRawPages(pages) {
  if (!Array.isArray(pages)) return [];

  const nodes = pages
    .filter(page => page && page.template === "vara-docs-raw")
    .map((page, sourceIndex) => ({
      children: [],
      page,
      parent: null,
      route: logicalRoute(page.permalink),
      sourceIndex,
    }))
    .filter(node => node.route.length > 0);

  for (const node of nodes) {
    for (const candidate of nodes) {
      if (candidate === node || candidate.route.length >= node.route.length) continue;
      if (!isRoutePrefix(candidate.route, node.route)) continue;

      if (!node.parent || candidate.route.length > node.parent.route.length) {
        node.parent = candidate;
      }
    }

    if (node.parent) node.parent.children.push(node);
  }

  const entries = [];
  const roots = nodes.filter(node => !node.parent).sort(compareNodes);

  for (const root of roots) appendNode(entries, root, 0);
  return entries;
}

function appendNode(entries, node, depth) {
  entries.push({
    content: String(node.page.content || ""),
    depth,
    indent: "  ".repeat(depth),
    permalink: node.page.permalink,
    title: escapeMarkdownLabel(node.page.title || "Untitled"),
  });

  node.children.sort(compareNodes);
  for (const child of node.children) appendNode(entries, child, depth + 1);
}

function compareNodes(a, b) {
  const weightDifference = normalizedWeight(a.page.weight) - normalizedWeight(b.page.weight);
  if (weightDifference !== 0) return weightDifference;

  const titleDifference = String(a.page.title || "").localeCompare(String(b.page.title || ""));
  if (titleDifference !== 0) return titleDifference;

  const permalinkDifference = String(a.page.permalink).localeCompare(String(b.page.permalink));
  return permalinkDifference || a.sourceIndex - b.sourceIndex;
}

function normalizedWeight(value) {
  const weight = Number(value);
  return Number.isFinite(weight) ? weight : 9007199254740991;
}

function logicalRoute(value) {
  if (!value) return [];

  const permalink = String(value).split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  const segments = permalink.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && lastSegment.toLowerCase() === "index.md") segments.pop();
  return segments;
}

function isRoutePrefix(candidate, route) {
  return candidate.every((segment, index) => segment === route[index]);
}

function escapeMarkdownLabel(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/[\r\n]+/g, " ");
}

function docsRawPages({ pages }) {
  return resolveDocsRawPages(pages);
}

docsRawPages.resolve = resolveDocsRawPages;

export default docsRawPages;
