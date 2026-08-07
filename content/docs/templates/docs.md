---
title: "vara-docs"
weight: 2
description: "The documentation page template."
icon: "book-open-text"
---

# vara-docs

The `vara-docs` template is the heart of the documentation site. It provides the full documentation chrome around your content: a header, a search field, a collapsible sidebar, a table of contents, previous and next navigation, and page metadata.

## When to use it

Use `vara-docs` for every page under your documentation root. The template handles navigation and reading experience, so your generator only needs to supply content and a few ordering fields.

## Layout

A documentation page is composed of:

- **Header** - brand, search field, header links, the GitHub button, and the theme picker.
- **Sidebar** - the documentation tree, built from your pages and `docs_sidebar_sections`. On small screens it becomes a drawer.
- **Content** - breadcrumbs, the rendered article, optional page links, previous/next pager, and the credits footer.
- **Table of contents** - on wide screens it sits to the right; on small screens it opens as a panel.

The template loads the docs JavaScript bundle, which handles the sidebar, TOC, anchor links, back-to-top button, and syntax highlighting.

## Page fields

| Field               | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `content`           | The rendered article body. Empty pages render as section landing pages. |
| `title`             | Document title, sidebar label, and breadcrumb.                          |
| `description`       | Meta description and search snippets.                                   |
| `weight`            | Ordering in the sidebar, pager, and LLM indexes.                        |
| `icon`              | An icon shown next to the page in the sidebar.                          |
| `disable_search`    | Exclude the page from search when `true`.                               |
| `docs_footer_links` | Optional links rendered between content and the pager.                  |

### `docs_footer_links`

Each entry needs `title` and `href`, and may have an `icon`. Links open in a new tab unless you set `new_tab: false`. The theme's own generator uses this to add an "Edit this page" link.

## Declaring the page

```js
{
  permalink: "/docs/guide/installation/",
  template: "vara-docs",
  title: "Installation",
  description: "How to install the project.",
  weight: 2,
  icon: "download",
  content: parse.renderComponents(md.html),
  docs_footer_links: [
    { title: "Edit this page", href: "https://github.com/example/project/edit/main/content/docs/guide/installation.md", icon: "pencil-line" },
  ],
}
```

## Configuration

Most of the template's behavior is controlled by the `docs_*` site settings:

- Branding and the GitHub button: `docs_favicon`, `docs_logo_light`, `docs_logo_dark`, `docs_show_title`, `docs_github_repo`, `docs_header_links`.
- Sidebar: `docs_sidebar_sections`, `docs_sidebar_collapsed`.
- Features: `docs_search`, `docs_llms`, `docs_credits_footer`, `docs_shiki`, `docs_root_permalink`.

See [Site settings](../fundamentals/site-settings/) for the full reference.

## Related templates

The documentation site is supported by three companion templates:

- [vara-docs-raw](./docs-raw/) - the Markdown source of each page, used by the Markdown actions.
- [vara-docs-search-index](./docs-search-index/) - the JSON index for client-side search.
- [vara-docs-llms-txt](./docs-llms-txt/) and [vara-docs-llms-full-txt](./docs-llms-full-txt/) - the LLM indexes.
