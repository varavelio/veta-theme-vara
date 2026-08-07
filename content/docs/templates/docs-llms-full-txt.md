---
title: "vara-docs-llms-full-txt"
weight: 6
description: "The LLM index with the full content of every documentation page."
icon: "bot"
---

# vara-docs-llms-full-txt

The `vara-docs-llms-full-txt` template is the extended version of `vara-docs-llms-txt`. It produces the same hierarchical index, followed by the complete content of every documentation page, reproduced verbatim.

## When to use it

Create a page with this template at `/docs/llms-full.txt`:

```js
{
  permalink: "/docs/llms-full.txt",
  template: "vara-docs-llms-full-txt",
}
```

This file is larger than `llms.txt` by design - it gives an assistant the entire documentation in a single download, which is convenient but slower to fetch. Publish both files and let each reader choose.

## Output

```txt
## Documentation index

This index lists every available documentation page and its Markdown source.

- [Documentation](https://example.com/docs/)
  - [Installation](https://example.com/docs/guide/installation/)

## Documentation content

The complete documentation for this website follows, reproduced verbatim from every page.

---

# Installation

...
```

The content comes from the `vara-docs-raw` pages, so each section is the original Markdown. Set `docs_llms: false` to hide both LLM files from the sidebar.
