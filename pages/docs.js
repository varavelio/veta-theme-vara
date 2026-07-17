export default function({ files, parse }) {
  let paths = files.listFiles("content/docs/**/*.md");
  if (paths.length === 0) return [];

  let pages = paths.map(function(path) {
    const permalink = files.toPermalink(path, { stripPrefix: "content/" });
    const pageRaw = files.readFile(path);
    const page = parse.markdown(pageRaw);

    return {
      permalink,
      template: "veta/docs",
      title: String(page.frontmatter.title || "Untitled"),
      description: String(page.frontmatter.description || ""),
      weight: Number(page.frontmatter.weight) || 999999,
      icon: String(page.frontmatter.icon || ""),
      draft: Boolean(page.frontmatter.draft),
      content: page.html,
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
