---
title: "Project Structure"
weight: 1
description: "What the Vara theme ships and where each piece lives."
icon: "folder-tree"
---

# Project Structure

Vara distributes the standard Veta theme directories: `templates/`, `components/`, `filters/`, `functions/`, `data/`, and `public/`. Project files always override theme files with the same path, so you can customize the theme without forking it.

## Templates

`templates/` contains the page templates you reference from your generators:

| Template                  | Purpose                                                  |
| ------------------------- | -------------------------------------------------------- |
| `vara-landing`            | Landing page built from your `page.content`.             |
| `vara-docs`               | Documentation page with header, sidebar, TOC, and pager. |
| `vara-docs-raw`           | The raw Markdown source of a documentation page.         |
| `vara-docs-search-index`  | The JSON index used by client-side search.               |
| `vara-docs-llms-txt`      | A plain-text index of every documentation page.          |
| `vara-docs-llms-full-txt` | The same index plus the full content of every page.      |
| `vara-sitemap-xml`        | An XML sitemap of the site's HTML routes.                |
| `vara-404`                | The not-found page.                                      |

See the [Templates](../templates/) section for a description of each one.

## Components

`components/` holds a small collection of reusable building blocks. Each component is a file named `vara-<name>.j2` and is used as a custom HTML tag in your Markdown:

```html
<vara-alert
  title="Heads up"
  description="Something worth knowing."
  color="info"
/>
```

Components that take dynamic content or render interactive behavior use Alpine.js, which is bundled with the theme. See the [Components](../components/) section for the full catalog.

## Filters and functions

`filters/` and `functions/` contain the template helpers the theme uses. They carry the `vara_` prefix because they ship in the consuming project's namespace.

Most of them are internal plumbing for the theme's own templates, but a handful are worth reaching for in your own components. See [Functions and filters](./functions-and-filters/) for the curated list.

## Data

`data/` provides the theme's default configuration:

- `site_default.js` - every setting Vara understands, with its default value.
- `vara.js` - a few runtime values such as the current year, used for the footer copyright.

You override defaults with your own `data/site.yaml` in the project. See [Site settings](./site-settings/).

## Public assets

`public/` contains the compiled assets the theme serves:

- `_vara/css/` - the Tailwind CSS base stylesheet and theme styles.
- `_vara/js/` - the JavaScript bundles (head, landing, docs, and docs search).
- `_vara/fonts/` - the self-hosted Geist fonts.

All theme-owned assets live under `public/_vara/` so they never collide with your own files. Your project's `public/` directory is composed alongside the theme's.

## Your project's side

The directories Vara does not ship are the ones you own:

- `pages/` - your JavaScript page generators.
- `content/` - your Markdown content.
- `data/site.yaml` - your configuration overrides.
- `veta.yaml` - build, Tailwind CSS, and theme configuration.

## Reference generators

The theme repository includes working generators in `pages/` so you can see how everything is wired:

- `pages/pages.js` - the landing page, the not-found page, and the sitemap.
- `pages/docs.js` - every documentation page plus the search index and `llms.txt` outputs.

Adapt them to your project, or write your own from the [Page generators](./page-generators/) guide.
