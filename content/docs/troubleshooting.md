---
title: "Troubleshooting"
weight: 6
description: "Quick fixes for the issues people run into most often."
icon: "circle-help"
---

# Troubleshooting

A few issues come up often enough that it is worth having the answers handy. If your problem is not here, start with the page that covers the feature - most topics in this documentation have a "when it breaks" note near the end.

## The page looks unstyled or blank

Check that `veta.yaml` points at the theme's stylesheet:

```yaml
tailwindcss:
  stylesheets:
    - styles.css
  minify: true
```

If you created your own `public/styles.css`, make sure it imports the theme's styles first:

```css
@import "./styles_vara.css";
```

## A component does not render

Components are resolved after Markdown, as custom tags. The usual culprits:

- The tag name has a typo or does not start with `vara-`.
- The component file is not in `components/` with a `.j2` extension.
- The tag is inside a fenced code block, where it is shown as code on purpose.
- A paired component is missing its closing tag.

## The search dialog reports a configuration error

The search dialog shows an error when it cannot load the index. Make sure your generator creates a page with the `vara-docs-search-index` template at `docs_search_index_permalink` (default `/docs/vara-docs-search-index.json`), or disable search with `docs_search: false`. See [Search and LLM output](../fundamentals/search-and-llms/).

## A heading does not appear in the table of contents

The TOC is built from the `h2` and `h3` headings that live in the page's prose. Headings inside components are excluded because components render with a `not-prose` marker. Move the heading out of the component if you want it to be navigable. See [vara-docs](../templates/docs/).

## The 404 page does not show

The theme generates a static `404.html`. Most static hosts serve it automatically for missing routes; if yours does not, point the host at `404.html` as the custom error page.

## An icon renders a warning glyph

The icon name does not match a file in the theme's icon set. Check the spelling, and remember that brand icons use the `si-` prefix when they collide with a Lucide name. See [Icon](../components/icon/).

## A draft page still appears on the site

The theme skips pages whose frontmatter has `draft: true`, but only when your generator applies that filter. If you wrote your own generator, add the same `draft` check. See [Page generators](../fundamentals/page-generators/).

## Links look wrong after deploying

Set `site_url` to your public origin in `data/site.yaml`. Interactive navigation stays relative, while canonical tags, the sitemap, and LLM output use the absolute base URL. See [Site settings](../fundamentals/site-settings/).

## The year in the footer is not replaced

The footer replaces the `%year%` placeholder (with flexible spacing and any casing). If you wrote your own footer, use the `vara_component_footer_copyright` function, which reads the year from the theme data. See [Footer](../components/footer/).
