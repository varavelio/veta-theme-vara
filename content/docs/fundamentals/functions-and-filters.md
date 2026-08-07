---
title: "Functions and Filters"
weight: 6
description: "The template helpers worth reaching for in your own components."
icon: "puzzle"
---

# Functions and Filters

Vara ships a set of template helpers under the `vara_` prefix. Most of them do internal plumbing - building the sidebar, pagination, search index, and similar - and you never need to touch them.

This page covers the small set that is genuinely useful when you write your own components or templates.

Functions are called like any Pongo function, and filters are applied with a pipe:

```text
{{ vara_icon("rocket", "size-5") }}
{{ repo.stars|vara_compact_number }}
```

## Functions

### `vara_icon`

Renders one of the bundled SVG icons by name. Pass optional utility classes for size and color:

```text
{{ vara_icon("check", "size-4 text-success")|safe }}
```

Icon names come from the theme's icon set - the same names the `<vara-icon>` component accepts. Browse them in the [icon explorer](/icons/).

Missing names render a visible warning glyph instead of failing the build.

### `vara_absolute_url`

Resolves a path against your `site_url` and returns an absolute URL. Useful for social metadata or generated output that needs a full link:

```text
{{ vara_absolute_url(page.permalink) }}
```

Absolute HTTP URLs pass through unchanged. When `site_url` is missing or invalid, the result falls back to a root-relative path.

### `vara_github_repo`

Fetches public metadata for an `owner/name` repository at build time: stars, forks, and the latest release tag. It is what powers the GitHub button in the docs header, and it works the same way in your own components:

```text
{% set repo = vara_github_repo("varavelio/veta") %}
{% if repo.ok %}
  {{ repo.stars|vara_compact_number }} stars
{% endif %}
```

The result is cached per repository during a build, so you can call it in several places without extra requests. Failed lookups return a safe empty result rather than breaking the build.

## Filters

### `vara_trim`

Trims leading and trailing whitespace, treating empty values as empty strings. Ideal for optional-value conditionals in components:

```text
{% if props.description|vara_trim %}
  <p>{{ props.description }}</p>
{% endif %}
```

### `vara_compact_number`

Formats a number compactly - `12400` becomes `12.4k`, and `2100000` becomes `2.1M`. Non-finite input becomes `0`. Handy for stats, repository counts, or any metric with large values:

```text
{{ repo.stars|vara_compact_number }}
```

## What is not covered here

Everything else under theme's `functions/` and `filters/` directories is theme plumbing: sidebar navigation, pagination, search indexing, sitemap generation, and the like. The theme keeps those stable, but they exist to serve its own templates. If a helper is not listed on this page, treat it as internal and prefer the public API above in your own code.
