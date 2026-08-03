const DEFAULT_WEIGHT = Number.MAX_SAFE_INTEGER;

/**
 * Resolves previous and next documentation pages in hierarchical pre-order.
 * Empty structural pages group descendants but are not navigation targets.
 */
function resolveDocsPagination(pages, currentPermalink, rootPermalink) {
  if (!Array.isArray(pages)) return { previous: null, next: null };

  const normalizedRoot = normalizePermalink(rootPermalink);
  if (!normalizedRoot) return { previous: null, next: null };
  const root = permalinkSegments(normalizedRoot);

  const nodes = pages
    .filter(page => page && page.template === "vara-docs")
    .map((page, sourceIndex) => ({
      children: [],
      page,
      parent: null,
      relative: relativeSegments(page.permalink, root),
      sourceIndex,
    }))
    .filter(node => node.relative !== null);

  for (const node of nodes) {
    for (const candidate of nodes) {
      if (candidate === node || candidate.relative.length >= node.relative.length) continue;
      if (!isPrefix(candidate.relative, node.relative)) continue;
      if (!node.parent || candidate.relative.length > node.parent.relative.length) node.parent = candidate;
    }
    if (node.parent) node.parent.children.push(node);
  }

  const ordered = [];
  const roots = nodes.filter(node => !node.parent).sort(compareNodes);
  for (const rootNode of roots) appendNode(ordered, rootNode);

  const current = normalizePermalink(currentPermalink);
  const index = ordered.findIndex(page => normalizePermalink(page.permalink) === current);
  if (index < 0) return { previous: null, next: null };

  return {
    previous: ordered[index - 1] || null,
    next: ordered[index + 1] || null,
  };
}

function appendNode(ordered, node) {
  if (hasContent(node.page)) ordered.push(node.page);
  node.children.sort(compareNodes);
  for (const child of node.children) appendNode(ordered, child);
}

function compareNodes(a, b) {
  const weight = normalizeWeight(a.page.weight) - normalizeWeight(b.page.weight);
  if (weight !== 0) return weight;

  const title = String(a.page.title || "").localeCompare(String(b.page.title || ""));
  if (title !== 0) return title;

  const permalink = String(a.page.permalink || "").localeCompare(String(b.page.permalink || ""));
  return permalink || a.sourceIndex - b.sourceIndex;
}

function relativeSegments(permalink, root) {
  const segments = permalinkSegments(permalink);
  if (segments.length < root.length || !isPrefix(root, segments)) return null;
  return segments.slice(root.length);
}

function isPrefix(prefix, value) {
  return prefix.every((segment, index) => segment === value[index]);
}

function permalinkSegments(value) {
  return normalizePermalink(value).split("/").filter(Boolean);
}

function normalizePermalink(value) {
  if (!value) return "";
  const path = String(value).trim().split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (!path) return "";
  const rooted = path.startsWith("/") ? path : `/${path}`;
  return rooted === "/" ? rooted : `${rooted.replace(/\/+$/, "")}/`;
}

function normalizeWeight(value) {
  if (value === undefined || value === null || value === "") return DEFAULT_WEIGHT;
  const weight = Number(value);
  return Number.isFinite(weight) ? weight : DEFAULT_WEIGHT;
}

function hasContent(page) {
  return String(page.content || "").trim() !== "";
}

function docsPagination({ pages, page }, rootPermalink) {
  return resolveDocsPagination(pages, page && page.permalink, rootPermalink);
}

docsPagination.resolve = resolveDocsPagination;

export default docsPagination;
