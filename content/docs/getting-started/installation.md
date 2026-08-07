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

You don't need to install Tailwind CSS because it's already included in the Veta binary. The only requirement to use this theme is to have Veta installed (it's a single binary).

Vara's styles are built with Tailwind CSS. Reference the theme included entrypoint in your `veta.yaml`:

```yaml
tailwindcss:
  stylesheets:
    - styles.css
  minify: true
```

It is not necessary to create the `public/styles.css` file since the theme includes it; create it only when you need to customize the styles as indicated below.

### Extending styles

If you want to extend or customize the default styles, just include the Vara internal styles and write your own tailwind styles:

```css
/* public/styles.css */
@import "./styles_vara.css";

/* your own styles can follow */
```

The theme expects styles to always be in `public/styles.css`, so if you decide to extend it you must use that same file; otherwise you can use the default file that the theme includes and it is not necessary to even create it.

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
