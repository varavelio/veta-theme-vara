---
title: "Templates"
weight: 4
description: "The page templates that ship with Vara and how to use them."
icon: "layout-template"
---

# Templates

Templates are the page-level layouts of the theme. Your page generators reference them by name, and each template decides how the page is rendered around your content.

Vara ships eight templates:

| Template                                         | Page                | What it renders                                                  |
| ------------------------------------------------ | ------------------- | ---------------------------------------------------------------- |
| [vara-landing](./landing/)                       | Landing pages       | Your content as a full page, with the landing JavaScript bundle. |
| [vara-docs](./docs/)                             | Documentation pages | Header, sidebar, content, table of contents, and pager.          |
| [vara-docs-raw](./docs-raw/)                     | Raw Markdown        | The original Markdown source of a docs page.                     |
| [vara-docs-search-index](./docs-search-index/)   | JSON                | The search index consumed by client-side search.                 |
| [vara-docs-llms-txt](./docs-llms-txt/)           | Plain text          | A hierarchical index of every documentation page.                |
| [vara-docs-llms-full-txt](./docs-llms-full-txt/) | Plain text          | The index plus the full content of every page.                   |
| [vara-sitemap-xml](./sitemap-xml/)               | XML                 | The site's sitemap.                                              |
| [vara-404](./404/)                               | Not found           | A self-contained 404 page.                                       |

The landing, docs, and 404 templates build on a shared base that provides the document shell, SEO metadata, fonts, and styles. The data templates (search index, llms output, sitemap) do not use that shell - they output their own format.

Each page below describes what the template expects from the page object and how to configure it.
