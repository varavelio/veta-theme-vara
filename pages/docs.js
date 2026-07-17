export default function({ files, parse }) {
  let paths = files.listFiles("content/docs/**/*.md");
  if (paths.length === 0) return [];

  let pages = paths.map(function(path) {
    const permalink = files.toPermalink(path, { stripPrefix: "content/" });
    const pageRaw = files.readFile(path);
    const pageMd = parse.markdown(pageRaw);
    const pageContent = parse.renderComponents(pageMd.html);

    return {
      permalink,
      template: "veta/docs",
      title: String(pageMd.frontmatter.title || "Untitled"),
      description: String(pageMd.frontmatter.description || ""),
      weight: Number(pageMd.frontmatter.weight) || 999999,
      icon: String(pageMd.frontmatter.icon || ""),
      draft: Boolean(pageMd.frontmatter.draft),
      content: pageContent,
    };
  })
    .filter(doc => !doc.draft)
    .sort(compareByWeight);

  return pages;
}

function compareByWeight(a, b) {
  if (a.weight !== b.weight) return a.weight - b.weight;
  return a.title.localeCompare(b.title);
}
