export default function({ files, parse }) {
  let paths = files.listFiles("content/docs/**/*.md");
  if (paths.length === 0) return [];

  let pages = paths.map(function(path) {
    let permalink = files.toPermalink(path, { stripPrefix: "content/docs/" });
    let { frontmatter, content } = parse.markdown(files.readFile(path));

    return {
      permalink,
      template: "veta/docs",
      title: String(frontmatter.title || "Untitled"),
      description: String(frontmatter.description || ""),
      weight: Number(frontmatter.weight) || 999999,
      icon: String(frontmatter.icon || ""),
      draft: Boolean(frontmatter.draft),
      content: content,
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
