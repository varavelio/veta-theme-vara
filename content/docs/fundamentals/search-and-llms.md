---
title: "Search and LLM Output"
weight: 4
description: "Client-side search, Markdown actions, and llms.txt files for AI assistants."
icon: "search"
---

# Search and LLM Output

Documentation sites built with Vara get three content features out of the box: client-side search, on-demand syntax highlighting, and LLM-friendly Markdown output.

## Client-side search

When `docs_search` is enabled, the docs header shows a search field. Opening it (or pressing `Ctrl`/`Cmd` + `K`) runs a full-text search over your documentation, entirely in the browser.

### How the index works

At build time, the `vara-docs-search-index` template produces a JSON index. The theme builds it from every `vara-docs` page under the docs root, storing the title, description, and rendered content of each page.

The search UI loads the index lazily - the first time you hover or focus the search field - and builds a MiniSearch engine from it in the background. Queries match page titles and section headings, with fuzzy matching for longer terms.

### Customizing what gets indexed

Exclude a page from search with `disable_search: true` in its frontmatter. Pages marked as drafts are not generated at all.

### When the index is missing

The search dialog shows a clear error if the index cannot be loaded. That happens when your generator does not create the search index route. Make sure it produces a page with the `vara-docs-search-index` template at `docs_search_index_permalink` (default `/docs/vara-docs-search-index.json`), or disable search with `docs_search: false`.

## Syntax highlighting

Code blocks are highlighted on demand with the `github-light` and `github-dark` themes, following the site's active theme. Vara overrides their backgrounds to match the theme's surfaces and renders that background while the highlighter loads, so blocks never flash unstyled.

The language of each code fence is detected from its rendered `language-*` class and loaded only when needed:

````md
```js
const answer = 42;
```
````

Extra languages beyond Shiki's bundled set can be added with `docs_shiki_custom_languages`. The entry's `id` must match the code fence language.

Highlighted blocks include a copy button that appears on hover. It is wired to the clipboard API and disabled automatically when the clipboard is unavailable.

To disable highlighting entirely, set `docs_shiki: false`.

## Markdown actions

Every documentation page that has content shows a **"Ask AI"** menu next to the table-of-contents toggle. From it you can:

- Open the page's Markdown source in an AI assistant: ChatGPT, Claude, Grok, Perplexity, or DeepSeek.
- Copy a ready-made prompt for asking about the page.
- Copy, view, or download the raw Markdown.

These actions rely on the raw Markdown version of each page (`vara-docs-raw`), so they only appear when your generator produces it. They are tied to the `docs_llms` setting - set it to `false` to hide both the menu and the "Agents" sidebar section.

## llms.txt output

Vara generates two plain-text files that describe your documentation for LLMs:

| File            | Contents                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `llms.txt`      | A hierarchical index of every documentation page, with absolute links to each page and its Markdown source. |
| `llms-full.txt` | The same index followed by the complete content of every page, reproduced verbatim.                         |

Both are generated from the `vara-docs-raw` pages under the docs root, in the same order the sidebar uses. Their routes are `/docs/llms.txt` and `/docs/llms-full.txt` by default, and they appear under the **Agents** section in the sidebar.

`docs_llms_index` controls whether each individual `vara-docs-raw` page also prepends a small index before its own content. This is useful when a single Markdown file is handed to an assistant directly.
