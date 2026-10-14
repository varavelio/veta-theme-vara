export default function({ files, parse }) {
  let paths = files.listFiles("content/docs/**/*.md");
  if (paths.length === 0) return [];

  let pages = [];

  for (const path of paths) {
    const permalink = files.toPermalink(path, { stripPrefix: "content/" });
    const pageRaw = files.readFile(path);
    const pageMd = parse.markdown(pageRaw);
    const pageIsDraft = Boolean(pageMd.frontmatter.draft);
    if (pageIsDraft) continue;

    const pageMarkdown = pageMd.content;
    const pageContent = parse.renderComponents(pageMd.html);
    const title = String(pageMd.frontmatter.title || "Untitled");
    const description = String(pageMd.frontmatter.description || "");
    const weight = Number(pageMd.frontmatter.weight) || 999999;
    const icon = String(pageMd.frontmatter.icon || "");
    const sidebarCollapsed = normalizeCollapsed(pageMd.frontmatter.sidebar_collapsed);

    // HTML Version
    pages.push({
      permalink,
      template: "vara-docs",
      title,
      description,
      weight,
      icon,
      sidebar_collapsed: sidebarCollapsed,
      content: pageContent,
      docs_footer_links: [
        {
          title: "Edit this page",
          href: `https://github.com/varavelio/veta-theme-vara/edit/main/${path}`,
          icon: "pencil-line",
        },
      ],
    });

    // Markdown Version
    pages.push({
      permalink: permalink + "index.md",
      template: "vara-docs-raw",
      title,
      description,
      weight,
      icon,
      sidebar_collapsed: sidebarCollapsed,
      content: pageMarkdown,
    });
  }

  pages.sort(compareByWeight);

  pages.push({
    permalink: "/docs/vara-docs-search-index.json",
    template: "vara-docs-search-index",
    sitemap: false,
  });

  pages.push({
    permalink: "/docs/llms.txt",
    template: "vara-docs-llms-txt",
  });

  pages.push({
    permalink: "/docs/llms-full.txt",
    template: "vara-docs-llms-full-txt",
  });

  return pages;
}

function normalizeCollapsed(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "boolean") return value;

  const normalized = String(value).trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;

  return null;
}

function compareByWeight(a, b) {
  if (a.weight !== b.weight) return a.weight - b.weight;
  return a.title.localeCompare(b.title);
}
