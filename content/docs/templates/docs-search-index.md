---
title: "vara-docs-search-index"
weight: 4
description: "The JSON index used by client-side search."
icon: "file-braces"
---

# vara-docs-search-index

The `vara-docs-search-index` template produces the JSON index that the client-side search reads. It collects every `vara-docs` page under the docs root that does not opt out, and serializes it as a JSON document.

## When to use it

Create one page with this template, at the route your search will load:

```js
{
  permalink: "/docs/vara-docs-search-index.json",
  template: "vara-docs-search-index",
  sitemap: false,
}
```

The route must match `docs_search_index_permalink` (default `/docs/vara-docs-search-index.json`). If you change that setting, update the generator to match.

## What gets included

Each page contributes its permalink, title, description, rendered content, and language. Pages marked `disable_search: true` are excluded, and the search dialog reports a configuration error when the index route is missing.

See [Search and LLM output](../fundamentals/search-and-llms/) for how the index is consumed.
