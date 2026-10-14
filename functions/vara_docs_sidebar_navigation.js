/**
 * Builds the documentation sidebar from generated pages and configured sections.
 *
 * Generated pages nest at any depth below the docs root. The first segment
 * becomes a section and deeper pages become nested links. Empty pages group
 * descendants but stay hidden when they have no visible children.
 *
 * Configured sections merge with generated sections by `id`. Configured links
 * merge with generated links by normalized `href` at any depth.
 *
 * Usage:
 *   {% set docs_sidebar = vara_docs_sidebar_navigation(docs_root_permalink, docs_sidebar_sections) %}
 */

const DEFAULT_WEIGHT = Number.MAX_SAFE_INTEGER;
const SECTION_ID_RE = /^[A-Za-z0-9%][A-Za-z0-9._~%-]*$/;

function resolveDocsSidebarNavigation(pages, rootPermalink, configuredSections, currentPermalink) {
  const rootSegments = permalinkSegments(rootPermalink);

  const docsPages = Array.isArray(pages)
    ? pages.filter(page => page && page.template === "vara-docs")
    : [];
  const root = resolveRoot(docsPages, rootSegments, currentPermalink);
  const sections = new Map();

  for (const page of docsPages) {
    const relativeSegments = relativePermalinkSegments(page.permalink, rootSegments);
    if (!relativeSegments || relativeSegments.length !== 1) continue;

    const id = relativeSegments[0];
    sections.set(id, {
      active: samePermalink(page.permalink, currentPermalink),
      href: hasContent(page) ? String(page.permalink) : "",
      icon: normalizeText(page.icon),
      id,
      links: [],
      storage_id: `section:${page.permalink}`,
      title: normalizeText(page.title) || "Untitled",
      weight: normalizeWeight(page.weight),
      _relative: relativeSegments,
    });
  }

  const linkNodes = new Map();
  for (const page of docsPages) {
    const relativeSegments = relativePermalinkSegments(page.permalink, rootSegments);
    if (!relativeSegments || relativeSegments.length < 2) continue;

    const permalink = String(page.permalink);
    linkNodes.set(permalink, {
      active: samePermalink(permalink, currentPermalink),
      children: [],
      external: false,
      href: hasContent(page) ? permalink : "",
      icon: normalizeText(page.icon),
      key: hrefIdentity(permalink),
      new_tab: false,
      title: normalizeText(page.title) || "Untitled",
      weight: normalizeWeight(page.weight),
      storage_id: `section:${permalink}`,
      _relative: relativeSegments,
      _hasContent: hasContent(page),
      _permalink: permalink,
    });
  }

  const sortedNodes = Array.from(linkNodes.values()).sort(
    (a, b) => a._relative.length - b._relative.length,
  );
  const placed = new Set();

  for (const node of sortedNodes) {
    const parent = findNearestParent(sections, placed, linkNodes, node);
    if (!parent) continue;

    if (parent.kind === "section") parent.section.links.push(node);
    else parent.node.children.push(node);
    placed.add(node._permalink);
  }

  for (const section of sections.values()) section.links = pruneLinks(section.links);

  mergeConfiguredSections(sections, configuredSections, currentPermalink);

  const normalizedSections = Array.from(sections.values());
  for (const section of normalizedSections) sortLinksRecursive(section.links);
  normalizedSections.sort(compareSections);
  for (const section of normalizedSections) stripSectionInternals(section);

  return { root, sections: normalizedSections };
}

function findNearestParent(sections, placed, linkNodes, node) {
  let bestSection = null;
  let bestSectionLength = -1;

  for (const section of sections.values()) {
    const relative = section._relative;
    if (!relative || relative.length >= node._relative.length) continue;
    if (!isPrefix(relative, node._relative)) continue;
    if (relative.length > bestSectionLength) {
      bestSection = section;
      bestSectionLength = relative.length;
    }
  }

  let bestNode = null;
  let bestNodeLength = -1;

  for (const permalink of placed) {
    const candidate = linkNodes.get(permalink);
    if (!candidate || candidate._relative.length >= node._relative.length) continue;
    if (!isPrefix(candidate._relative, node._relative)) continue;
    if (candidate._relative.length > bestNodeLength) {
      bestNode = candidate;
      bestNodeLength = candidate._relative.length;
    }
  }

  if (bestNode && bestNodeLength >= bestSectionLength) return { kind: "link", node: bestNode };
  if (bestSection) return { kind: "section", section: bestSection };
  return null;
}

function pruneLinks(links) {
  const kept = [];

  for (const link of links) {
    link.children = pruneLinks(link.children || []);
    if (!link._hasContent && link.children.length === 0) continue;
    kept.push(link);
  }

  return kept;
}

function sortLinksRecursive(links) {
  links.sort(compareLinks);
  for (const link of links) sortLinksRecursive(link.children || []);
}

function stripSectionInternals(section) {
  delete section._relative;
  for (const link of section.links) stripLinkInternals(link);
}

function stripLinkInternals(link) {
  delete link._relative;
  delete link._hasContent;
  delete link._permalink;
  for (const child of link.children || []) stripLinkInternals(child);
}

function resolveRoot(pages, rootSegments, currentPermalink) {
  for (const page of pages) {
    const segments = permalinkSegments(page.permalink);
    if (!sameSegments(segments, rootSegments)) continue;

    return {
      active: samePermalink(page.permalink, currentPermalink),
      href: String(page.permalink),
      icon: normalizeText(page.icon),
      title: normalizeText(page.title) || "Untitled",
    };
  }

  return null;
}

function mergeConfiguredSections(sections, configuredSections, currentPermalink) {
  if (!Array.isArray(configuredSections)) return;

  for (const configured of configuredSections) {
    if (!configured || typeof configured !== "object") continue;

    const id = normalizeText(configured.id);
    if (!SECTION_ID_RE.test(id)) continue;

    let section = sections.get(id);
    if (!section) {
      const title = normalizeText(configured.title);
      if (!title) continue;

      section = {
        active: false,
        href: "",
        icon: "",
        id,
        links: [],
        storage_id: `custom:${id}`,
        title,
        weight: DEFAULT_WEIGHT,
      };
      sections.set(id, section);
    }

    if (hasOwn(configured, "title") && normalizeText(configured.title)) {
      section.title = normalizeText(configured.title);
    }
    if (hasOwn(configured, "icon")) section.icon = normalizeText(configured.icon);
    if (hasOwn(configured, "weight")) section.weight = normalizeWeight(configured.weight);

    mergeConfiguredLinks(section.links, configured.links, currentPermalink);
  }
}

function mergeConfiguredLinks(links, configuredLinks, currentPermalink) {
  if (!Array.isArray(configuredLinks)) return;

  for (const configured of configuredLinks) {
    if (!configured || typeof configured !== "object") continue;

    const title = normalizeText(configured.title);
    const href = normalizeText(configured.href);
    if (!title || !href) continue;

    const key = hrefIdentity(href);
    const existing = findLinkByKey(links, key);

    if (existing) {
      existing.title = title;
      if (hasOwn(configured, "icon")) existing.icon = normalizeText(configured.icon);
      if (hasOwn(configured, "new_tab")) existing.new_tab = Boolean(configured.new_tab);
      if (hasOwn(configured, "weight")) existing.weight = normalizeWeight(configured.weight);
      existing.active = samePermalink(existing.href || href, currentPermalink);
      continue;
    }

    links.push({
      active: samePermalink(href, currentPermalink),
      children: [],
      external: isExternalHref(href),
      href,
      icon: normalizeText(configured.icon),
      key,
      new_tab: Boolean(configured.new_tab),
      title,
      weight: normalizeWeight(configured.weight),
    });
  }
}

function findLinkByKey(links, key) {
  for (const link of links) {
    if (link.key === key) return link;
    const found = findLinkByKey(link.children || [], key);
    if (found) return found;
  }

  return null;
}

function compareSections(a, b) {
  if (a.weight !== b.weight) return a.weight - b.weight;

  const titleDifference = a.title.localeCompare(b.title);
  return titleDifference || a.id.localeCompare(b.id);
}

function compareLinks(a, b) {
  if (a.weight !== b.weight) return a.weight - b.weight;

  const titleDifference = a.title.localeCompare(b.title);
  return titleDifference || a.href.localeCompare(b.href);
}

function isPrefix(prefix, value) {
  return prefix.every((segment, index) => segment === value[index]);
}

function relativePermalinkSegments(permalink, rootSegments) {
  const segments = permalinkSegments(permalink);
  if (segments.length < rootSegments.length) return null;
  if (!rootSegments.every((segment, index) => segment === segments[index])) return null;

  return segments.slice(rootSegments.length);
}

function permalinkSegments(value) {
  if (!value) return [];

  return String(value)
    .split(/[?#]/, 1)[0]
    .replace(/\/{2,}/g, "/")
    .split("/")
    .filter(Boolean);
}

function samePermalink(a, b) {
  if (!a || !b || isExternalHref(a) || isExternalHref(b)) return false;
  return sameSegments(permalinkSegments(a), permalinkSegments(b));
}

function sameSegments(a, b) {
  return a.length === b.length && a.every((segment, index) => segment === b[index]);
}

function hrefIdentity(value) {
  const href = normalizeText(value);
  if (isExternalHref(href) || !href.startsWith("/")) return href;

  const suffixIndex = href.search(/[?#]/);
  const pathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : href.slice(suffixIndex);
  const normalizedPathname = `/${permalinkSegments(pathname).join("/")}`;
  return `${normalizedPathname || "/"}${suffix}`;
}

function isExternalHref(value) {
  return /^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/.test(String(value || ""));
}

function hasContent(page) {
  return normalizeText(page.content) !== "";
}

function normalizeText(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function normalizeWeight(value) {
  if (value === undefined || value === null || value === "") return DEFAULT_WEIGHT;

  const weight = Number(value);
  return Number.isFinite(weight) ? weight : DEFAULT_WEIGHT;
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function docsSidebarNavigation({ pages, page }, rootPermalink, configuredSections) {
  return resolveDocsSidebarNavigation(
    pages,
    rootPermalink,
    configuredSections,
    page && page.permalink,
  );
}

docsSidebarNavigation.resolve = resolveDocsSidebarNavigation;

export default docsSidebarNavigation;
