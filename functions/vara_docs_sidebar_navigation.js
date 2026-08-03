/**
 * Builds the documentation sidebar from generated pages and configured sections.
 *
 * Configured sections merge with generated sections by `id`. Generated section
 * ids are the first permalink segment below the docs root.
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
    });
  }

  for (const page of docsPages) {
    const relativeSegments = relativePermalinkSegments(page.permalink, rootSegments);
    if (!relativeSegments || relativeSegments.length !== 2 || !hasContent(page)) continue;

    const section = sections.get(relativeSegments[0]);
    if (!section) continue;

    section.links.push(normalizeGeneratedLink(page, currentPermalink));
  }

  mergeConfiguredSections(sections, configuredSections, currentPermalink);

  const normalizedSections = Array.from(sections.values());
  for (const section of normalizedSections) section.links.sort(compareLinks);
  normalizedSections.sort(compareSections);

  return { root, sections: normalizedSections };
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
    const existing = links.find(link => link.key === key);

    if (existing) {
      existing.title = title;
      if (hasOwn(configured, "icon")) existing.icon = normalizeText(configured.icon);
      if (hasOwn(configured, "new_tab")) existing.new_tab = Boolean(configured.new_tab);
      if (hasOwn(configured, "weight")) existing.weight = normalizeWeight(configured.weight);
      existing.active = samePermalink(existing.href, currentPermalink);
      continue;
    }

    links.push({
      active: samePermalink(href, currentPermalink),
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

function normalizeGeneratedLink(page, currentPermalink) {
  const href = String(page.permalink);

  return {
    active: samePermalink(href, currentPermalink),
    external: false,
    href,
    icon: normalizeText(page.icon),
    key: hrefIdentity(href),
    new_tab: false,
    title: normalizeText(page.title) || "Untitled",
    weight: normalizeWeight(page.weight),
  };
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
