---
title: "vara-docs-llms-txt"
weight: 5
description: "A plain-text index of every documentation page for LLMs."
icon: "bot"
---

# vara-docs-llms-txt

The `vara-docs-llms-txt` template outputs a plain-text file that lists every documentation page with an absolute link to it. It follows the `llms.txt` convention so AI assistants can discover your documentation.

## When to use it

Create a page with this template at `/docs/llms.txt`:

```js
{
  permalink: "/docs/llms.txt",
  template: "vara-docs-llms-txt",
}
```

If you change `docs_root_permalink`, update the generator to match - the sidebar links to the index using that setting.

## Output

The file is built from the `vara-docs-raw` pages under the docs root, in the same order the sidebar uses. Nested pages are indented to reflect the hierarchy:

```txt
## Documentation index

This index lists every available documentation page and its Markdown source.

- [Documentation](https://example.com/docs/)
  - [Installation](https://example.com/docs/guide/installation/)
```

Absolute links are resolved with `site_url`. See [Site settings](../fundamentals/site-settings/) for details.

For a version that also includes the full content of every page, see [vara-docs-llms-full-txt](./docs-llms-full-txt/).
