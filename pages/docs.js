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

    // HTML Version
    pages.push({
      permalink,
      template: "veta/docs",
      title,
      description,
      weight,
      icon,
      content: pageContent,
    });

    // Markdown Version
    pages.push({
      permalink: permalink + "index.md",
      template: "veta/docs-llms",
      title,
      description,
      weight,
      icon,
      content: pageMarkdown,
    });
  }

  return pages.sort(compareByWeight);
}

function compareByWeight(a, b) {
  if (a.weight !== b.weight) return a.weight - b.weight;
  return a.title.localeCompare(b.title);
}
