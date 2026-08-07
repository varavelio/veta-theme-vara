---
title: "Site Settings"
weight: 3
description: "Every setting Vara reads from data/site.yaml."
icon: "settings"
---

# Site Settings

Vara reads its configuration from your project's `data/site.yaml`. The theme's defaults live in its own `data/site_default.js`; your file only needs to override what you care about.

When a template asks for a value, it checks `data.site` first and falls back to the theme default. Empty strings are treated as unset, so `""` falls through to the default; `false`, `0`, and empty collections are kept.

## Core settings

| Setting       | Default        | Description                                                                                                     |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `title`       | `""`           | The site title. Used in the document title, header branding, and social metadata.                               |
| `description` | `""`           | Default meta description, used when a page has none.                                                            |
| `site_url`    | `""`           | The public base URL. Used for canonical and Open Graph URLs, the sitemap, and the absolute links in LLM output. |
| `favicon`     | Varavel avatar | The site favicon.                                                                                               |
| `logo_light`  | Varavel logo   | The brand logo for light surfaces.                                                                              |
| `logo_dark`   | Varavel logo   | The brand logo for dark surfaces.                                                                               |

A minimal `data/site.yaml`:

```yaml
title: "Acme"
description: "Documentation and landing page for Acme."
site_url: "https://acme.example.com"
favicon: "/favicon.svg"
logo_light: "/images/logo-dark.svg"
logo_dark: "/images/logo-light.svg"
```

### `site_url`

Set this to the deployed origin (for example `https://acme.example.com`). Vara uses it only where an absolute URL is required - canonical tags, Open Graph, the sitemap, and LLM output. Navigation links stay relative so local previews keep working.

If `site_url` is missing or invalid, Vara falls back to root-relative URLs.

## The not-found page

| Setting           | Default                   | Description                                                                                                                                                                |
| ----------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `not_found_links` | one link: `Go home` → `/` | Ordered links on the 404 page. Each entry needs `title` and `href`, and may have `icon` and `new_tab`. The first valid link is the primary action; the rest are secondary. |

```yaml
not_found_links:
  - title: "Go home"
    href: "/"
    icon: "house"
  - title: "Read the docs"
    href: "/docs/"
    icon: "book-open-text"
  - title: "View the source"
    href: "https://github.com/example/project"
    icon: "github"
    new_tab: true
```

## Documentation settings

Documentation settings are namespaced with `docs_`. They only affect the `vara-docs` template.

### Branding

| Setting           | Default           | Description                                              |
| ----------------- | ----------------- | -------------------------------------------------------- |
| `docs_favicon`    | site `favicon`    | Favicon used on documentation pages.                     |
| `docs_logo_light` | site `logo_light` | Brand logo for light surfaces on documentation pages.    |
| `docs_logo_dark`  | site `logo_dark`  | Brand logo for dark surfaces on documentation pages.     |
| `docs_show_title` | `true`            | Show the site title next to the logo in the docs header. |

### Header and GitHub

| Setting             | Default | Description                                                                                                                                          |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs_github_repo`  | `""`    | Repository in `owner/name` format. When set, the docs header shows a GitHub button with star count fetched at build time.                            |
| `docs_header_links` | `[]`    | Ordered links shown in the desktop header and the mobile navigation drawer. Each entry needs `title` and `href`, with optional `new_tab` and `icon`. |

```yaml
docs_github_repo: "acme/project"

docs_header_links:
  - title: "Blog"
    href: "/blog/"
  - title: "GitHub"
    href: "https://github.com/acme/project"
    new_tab: true
    icon: "github"
```

### Sidebar

| Setting                  | Default | Description                                                                                                                                                     |
| ------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs_sidebar_sections`  | `[]`    | Creates or extends sidebar sections. Sections merge with the generated ones by stable `id`; links with matching `href` values are merged instead of duplicated. |
| `docs_sidebar_collapsed` | `false` | Collapse sidebar groups by default. The visitor's open/closed state is remembered.                                                                              |

The sidebar is built from your documentation pages. The first segment of each permalink below the docs root becomes a section, and pages two levels deep become links within it.

```yaml
docs_sidebar_sections:
  - id: "guide"
    title: "Guide"
    icon: "book-open-text"
    weight: 10
    links:
      - title: "Introduction"
        href: "/docs/guide/introduction/"
      - title: "Contributing"
        href: "/docs/guide/contributing/"
```

The stable `id` is the first permalink segment below the docs root. Use it to reorder a generated section or to attach extra links to it.

### Search and LLM output

| Setting                       | Default                             | Description                                                                                                      |
| ----------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `docs_search`                 | `true`                              | Enable client-side documentation search.                                                                         |
| `docs_search_index_permalink` | `/docs/vara-docs-search-index.json` | The route of the search index. Your generator must create that route with the `vara-docs-search-index` template. |
| `docs_llms`                   | `true`                              | Enable the "Agents" sidebar section and the Markdown actions menu on documentation pages.                        |
| `docs_llms_index`             | `true`                              | Prepend a hierarchical index to each `vara-docs-raw` page.                                                       |

See [Search and LLM output](./search-and-llms/) for how these features work together.

### Content

| Setting                       | Default    | Description                                                                                                              |
| ----------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `docs_credits_footer`         | `true`     | Show the "Built with veta and veta-theme-vara" line below the documentation content.                                     |
| `docs_root_permalink`         | `/docs/`   | The logical root of the documentation tree. It may be nested or `/`. Deployment prefixes belong in `site_url`.           |
| `docs_shiki`                  | `true`     | Enable client-side syntax highlighting with the fixed `github-light` and `github-dark` themes.                           |
| `docs_shiki_custom_languages` | one: `vdl` | Extra languages for syntax highlighting. Each entry requires an exact `id` and a CORS-accessible TextMate grammar `url`. |

```yaml
docs_shiki_custom_languages:
  - id: "toml"
    url: "https://cdn.example.com/toml.tmLanguage.json"
```

The custom language `id` must match the code fence language you use in Markdown:

````md
```toml
theme:
  source: "varavelio/veta-theme-vara"
```
````
