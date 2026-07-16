export default function({ data, files, parse }) {
  let pages = [];

  let home = parse.markdown(files.readFile("content/index.md"));
  pages.push({
    permalink: "/",
    template: "veta/landing",
    title: home.frontmatter.title || site.title,
    description: home.frontmatter.description || site.description,
    content: home.content,
  });

  pages.push({
    permalink: "/404.html",
    template: "veta/404",
    title: "Page not found",
    description: "The requested page could not be found.",
    content: "",
  });

  return pages;
}
