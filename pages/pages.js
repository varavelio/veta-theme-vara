export default function({ data, files, parse }) {
  const siteTitle = data.site.title || data.site_default.title;
  const siteDescription = data.site.description || data.site_default.description;

  let pages = [];

  const homePageRaw = files.readFile("content/index.md");
  const homePageMd = parse.markdown(homePageRaw);
  const homePageContent = parse.renderComponents(homePageMd.html);

  pages.push({
    permalink: "/",
    template: "vara/landing",
    title: homePageMd.frontmatter.title || siteTitle,
    description: homePageMd.frontmatter.description || siteDescription,
    content: homePageContent,
  });

  pages.push({
    permalink: "/404.html",
    template: "vara/404",
    title: "Page not found",
    description: "The requested page could not be found.",
    sitemap: false,
    content: "",
  });

  pages.push({
    permalink: "/sitemap.xml",
    template: "vara/sitemap-xml",
  });

  return pages;
}
