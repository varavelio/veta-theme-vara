---
title: "Page Generators"
weight: 2
description: "Declare pages in pages/*.js and wire them to the theme's templates."
icon: "file-code"
---

# Page Generators

In Veta, pages are not discovered from Markdown. Your project declares them in JavaScript files under `pages/`. Each generator returns an array of pages, and every page names a template from the theme.

This guide shows the generators the theme itself uses, adapted so you can copy them into your project.

## The landing page

The `vara-landing` template renders `page.content` as the whole page. Read `content/index.md`, render it, and pass it along:

```js
// pages/pages.js
export default function({ data, files, parse }) {
  const md = parse.markdown(files.readFile("content/index.md"));

  return [
    {
      permalink: "/",
      template: "vara-landing",
      title: md.frontmatter.title || data.site.title,
      description: md.frontmatter.description || data.site.description,
      content: parse.renderComponents(md.html),
    },
  ];
}
```

`parse.renderComponents` resolves Vara component tags after the Markdown is rendered, which is how `<vara-hero>` and friends end up in your content.

## The documentation pages

The `vara-docs` template is used for every page under the docs root. The generator reads the Markdown, extracts a few frontmatter fields, and passes the rendered content:

```js
// pages/docs.js
export default function({ files, parse }) {
  return files.listFiles("content/docs/**/*.md")
    .filter((path) => !parse.markdown(files.readFile(path)).frontmatter.draft)
    .map((path) => {
      const page = parse.markdown(files.readFile(path));

      return {
        permalink: files.toPermalink(path, { stripPrefix: "content/" }),
        template: "vara-docs",
        title: page.frontmatter.title || "Untitled",
        description: page.frontmatter.description || "",
        weight: Number(page.frontmatter.weight) || 999999,
        icon: page.frontmatter.icon || "",
        content: parse.renderComponents(page.html),
        disable_search: page.frontmatter.disable_search === true,
      };
    });
}
```

### Fields the theme reads

| Field            | Used for                                                         |
| ---------------- | ---------------------------------------------------------------- |
| `template`       | The template to render.                                          |
| `permalink`      | The page's route.                                                |
| `title`          | Document title, sidebar label, breadcrumb, and pager.            |
| `description`    | The meta description and search result snippets.                 |
| `content`        | The rendered page body.                                          |
| `weight`         | Ordering in the sidebar, pager, and LLM indexes.                 |
| `icon`           | The icon shown next to the page in the sidebar.                  |
| `disable_search` | Excludes the page from the search index when `true`.             |
| `lang`           | The page language, used by the search index (`"en"` by default). |

### Frontmatter fields

For a documentation page, Vara reads these frontmatter fields:

| Field            | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| `title`          | Required. The page title.                             |
| `description`    | Optional. Shown in search results and metadata.       |
| `weight`         | Optional. Controls ordering. Lower values come first. |
| `icon`           | Optional. An icon name for the sidebar.               |
| `draft`          | Optional. Skips the page when `true`.                 |
| `disable_search` | Optional. Excludes the page from search when `true`.  |

### The raw Markdown version

Documentation pages also get a `vara-docs-raw` page at the same permalink with `index.md` appended. This is what the "View Markdown", "Copy Markdown", and "Ask AI" actions point to:

```js
pages.push({
  permalink: permalink + "index.md",
  template: "vara-docs-raw",
  title,
  description,
  weight,
  icon,
  content: pageMarkdown,
});
```

The `vara-docs-raw` template writes the original Markdown, with an optional hierarchical index prepended when `docs_llms_index` is enabled.

## The support pages

A full documentation site also needs three support routes. They require no content of their own:

```js
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
```

If you change `docs_root_permalink` or `docs_search_index_permalink`, update these permalinks to match - the templates resolve their own output from those settings, but the routes themselves come from your generator.

## The not-found page and the sitemap

The `vara-404` template is a self-contained page. The `vara-sitemap-xml` template lists the site's HTML routes:

```js
pages.push({
  permalink: "/404.html",
  template: "vara-404",
  title: "Page not found",
  description: "The requested page could not be found.",
  sitemap: false,
  content: "",
});

pages.push({
  permalink: "/sitemap.xml",
  template: "vara-sitemap-xml",
});
```

### Sitemap behavior

HTML routes are included in the sitemap automatically. Other output formats need `sitemap: true`, and any page can opt out with `sitemap: false`. The not-found page and the search index opt out above because they are not meaningful for search engines.

## Sorting

Documentation pages are sorted by `weight`, then by title. The theme's own generator applies that ordering before building the search index and LLM outputs, so keep your generator consistent if you want the same order everywhere.
