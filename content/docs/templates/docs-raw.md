---
title: "vara-docs-raw"
weight: 3
description: "The raw Markdown version of a documentation page."
icon: "file-text"
---

# vara-docs-raw

The `vara-docs-raw` template outputs the original Markdown source of a documentation page as a plain-text page. It is what powers the Markdown actions menu (View, Copy, Download, and "Ask AI") and the LLM indexes.

## When to use it

Create one `vara-docs-raw` page for every documentation page, at the same permalink with `index.md` appended:

```js
{
  permalink: "/docs/guide/installation/index.md",
  template: "vara-docs-raw",
  title: "Installation",
  description: "How to install the project.",
  weight: 2,
  icon: "download",
  content: pageMarkdown,
}
```

The template expects the **unrendered Markdown** in `page.content`, not the rendered HTML.

## Index prefix

When `docs_llms_index` is enabled, the template prepends a small hierarchical index of every documentation page to its output, followed by a heading and the page's content reproduced verbatim:

```txt
## Documentation index

This index lists every available documentation page and its Markdown source.

- [Documentation](https://example.com/docs/)
  - [Installation](https://example.com/docs/guide/installation/)

## Documentation content

The documentation for the current page follows, reproduced verbatim.

# Installation
...
```

Set `docs_llms_index: false` to output the page's Markdown alone.
