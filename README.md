<h1 align="center">Vara</h1>

<p align="center">
  A clean, fast, and responsive theme for <a href="https://veta.varavel.com">Veta</a>, the static site generator by Varavel.
</p>

<p align="center">
  <a href="https://github.com/varavelio/veta-theme-vara/actions">
    <img src="https://github.com/varavelio/veta-theme-vara/actions/workflows/ci.yaml/badge.svg" alt="CI status"/>
  </a>
  <a href="https://github.com/varavelio/veta-theme-vara/releases/latest">
    <img src="https://img.shields.io/github/release/varavelio/veta-theme-vara.svg" alt="Release Version"/>
  </a>
  <a href="https://github.com/varavelio/veta-theme-vara/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/varavelio/veta-theme-vara.svg" alt="License"/>
  </a>
  <a href="https://github.com/varavelio/veta-theme-vara">
    <img src="https://img.shields.io/github/stars/varavelio/veta-theme-vara?style=flat&label=github+stars" alt="GitHub Stars"/>
  </a>
</p>

<p align="center">
  <a href="https://varavel.com">
    <img src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.1/dist/badges/project.svg" alt="A Varavel project"/>
  </a>
</p>

Vara provides everything you need to build a documentation site and a landing page from a single project, ready-to-use page templates, a focused collection of components, and a visual system with light and dark mode, all with no frontend toolchain to maintain in your own project.

## Installation

Add the theme to your `veta.yaml`:

```yaml
theme:
  source: "varavelio/veta-theme-vara@v1.0.0"
```

Pin the `v1.0.0` to a release tag or commit when you want reproducible builds.

Then declare the styles in your `veta.yaml`:

```yaml
tailwindcss:
  stylesheets:
    - styles.css
  minify: true
```

Run `veta dev` to preview your site locally and `veta build` to produce the static output.

## Quick start

A minimal setup has three moving parts:

1. **A `pages/*.js` generator** that declares which templates to render for which routes.
2. **Markdown content** in `content/`, composed with Vara components.
3. **`data/site.yaml`** with your site's title, description, and logo.

```js
// pages/pages.js
export default function({ files, parse }) {
  let pages = [];

  const homePageRaw = files.readFile("content/index.md");
  const homePageMd = parse.markdown(homePageRaw);
  const homePageContent = parse.renderComponents(homePageMd.html);

  // Add the home landing page
  pages.push({
    permalink: "/",
    template: "vara-landing",
    title: homePageMd.frontmatter.title,
    description: homePageMd.frontmatter.description,
    content: homePageContent,
  });

  // Add the 404 page
  pages.push({
    permalink: "/404.html",
    template: "vara-404",
    title: "Page not found",
    description: "The requested page could not be found.",
    sitemap: false,
    content: "",
  });

  // Add the sitemap.xml
  pages.push({
    permalink: "/sitemap.xml",
    template: "vara-sitemap-xml",
  });

  // Read the documentation to add other types of pages (docs, llms, etc)

  return pages;
}
```

## Documentation

The full documentation, installation, fundamentals, every template, and every component lives at [https://vara.varavel.com/docs](https://vara.varavel.com/docs).

## Development

This repository is the theme itself. Run the available project commands with:

```sh
task --list-all
```

## License

MIT License. See [LICENSE](LICENSE) for details.
