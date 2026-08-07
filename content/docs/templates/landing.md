---
title: "vara-landing"
weight: 1
description: "The landing page template."
icon: "layout-template"
---

# vara-landing

The `vara-landing` template renders your page content as a full-page landing site. It loads the landing JavaScript bundle, which starts Alpine and registers the shared theme controls used by interactive components such as `<vara-header>`.

## When to use it

Use `vara-landing` for any page that is not documentation: marketing pages, home pages, project showcases, and single-purpose pages. The template places no constraints on your content - it renders whatever the page's `content` contains.

## Page fields

| Field         | Purpose                                                |
| ------------- | ------------------------------------------------------ |
| `content`     | The rendered page body, composed with Vara components. |
| `title`       | The document title and metadata.                       |
| `description` | The meta description.                                  |
| `lang`        | Optional. The page language; defaults to `en`.         |

## Declaring the page

```js
{
  permalink: "/",
  template: "vara-landing",
  title: "Home",
  description: "The landing page for the project.",
  content: parse.renderComponents(md.html),
}
```

## The base shell

Like the docs and 404 templates, `vara-landing` builds on the theme's base template, which provides:

- The document shell with `<html>` and `<head>`.
- Title, meta description, canonical, and Open Graph metadata.
- The site favicon and the compiled stylesheet.
- The head JavaScript bundle that applies the saved theme before first paint.

You can supply extra metadata through page fields such as `description`, `keywords`, and `og_type`.

## What your content includes

Landing pages are typically composed with the landing-page components: `<vara-header>`, `<vara-hero>`, `<vara-features>`, `<vara-content-split>`, `<vara-stats>`, `<vara-faq>`, `<vara-testimonial>`, `<vara-carousel>`, `<vara-cta>`, and `<vara-footer>`.
