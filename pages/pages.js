export default function({ data, files, parse }) {
  let pages = [];

  const homePageRaw = files.readFile("content/index.md");
  // homeRaw = parse.renderComponents(home.html);
  const homePage = parse.markdown(homePageRaw);

  pages.push({
    permalink: "/",
    template: "veta/landing",
    title: homePage.frontmatter.title || data.site.title,
    description: homePage.frontmatter.description || data.site.description,
    content: homePage.html,
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
