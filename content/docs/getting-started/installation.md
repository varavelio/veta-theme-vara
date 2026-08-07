---
title: "Installation"
weight: 1
description: "Add the Vara theme to a Veta project and configure the stylesheet."
icon: "download"
---

# Installation

## 1. Add the theme

Declare the theme in your `veta.yaml`. Remote themes use the `owner/repository@ref` form:

```yaml
theme:
  source: "varavelio/veta-theme-vara@main"
```

Pin the `ref` (recommended) to a release tag or a commit SHA when you want reproducible builds:

```yaml
theme:
  source: "varavelio/veta-theme-vara@v1.0.0"
```

## 2. Configure the stylesheet

Veta ships Tailwind CSS as part of the binary, so you don't need to install anything extra. Just point Veta at the theme's stylesheet in your `veta.yaml`:

```yaml
tailwindcss:
  stylesheets:
    - styles.css
  minify: true
```

The theme provides `public/styles.css` for you, so there's nothing to create by hand. You'll only add that file when you want to extend the styles, as shown next.

### Extending styles

To add your own styles, create `public/styles.css` and import the theme's styles first, then write your own Tailwind CSS after them:

```css
/* public/styles.css */
@import "./styles_vara.css";

/* your own styles go here */
```

Vara always reads from `public/styles.css`. When that file doesn't exist, the theme's bundled version is used as-is.

## 3. Add your site settings

Create a `data/site.yaml` with at least a title and description:

```yaml
title: "My Project"
description: "The product documentation and landing page for my project."
site_url: "https://example.com"
```

The theme reads these values for the document title, meta description, and header branding. See [Site settings](../fundamentals/site-settings/) for the full list.

## 4. Verify

Run the development server:

```sh
veta dev
```

Open the URL Veta prints. You should see the theme's base styles applied - self-hosted fonts, light and dark mode, and the default neutral palette.

## Next steps

- [Create your first pages](./quick-start/).
- Learn how the theme is structured in [Project structure](../fundamentals/project-structure/).
