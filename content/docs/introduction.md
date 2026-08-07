---
title: "Introduction"
weight: 1
description: "An overview of what Vara is, what it provides, and how it fits a Veta project."
icon: "sparkles"
---

# Introduction

Vara is a theme for **Veta**, the static site generator by Varavel. It provides the page templates, components, and assets you need to build a documentation site and a landing page, so you can focus on the content instead of the frontend.

## How Veta and Vara work together

Veta turns project files into a static site. Your project declares which pages to generate, and Vara provides the presentation layer for them.

A typical Veta project built with Vara has three parts:

1. **Page generators** (`pages/*.js`) - declare each route and the template it uses.
2. **Markdown content** (`content/`) - written by you, optionally composed with Vara components.
3. **Site settings** (`data/site.yaml`) - branding and behavior that the theme reads.

The theme stays out of your content. You decide what the site contains; Vara decides how it looks.

## What Vara provides

- **Page templates** for landing pages, documentation pages, the not-found page, an XML sitemap, a search index, and LLM-friendly Markdown output.
- **A focused component collection** for documentation content and landing-page sections.
- **A visual system** with light and dark mode, a theme picker, self-hosted fonts, and bundled icons.
- **Client-side features** such as full-text documentation search and on-demand syntax highlighting.

## What Vara does not provide

- **Page generators.** Veta themes can only distribute `templates/`, `components/`, `filters/`, `functions/`, `data/`, and `public/`. Your project owns `pages/*.js` and therefore decides what gets built.
- **Configuration.** Your project's `veta.yaml` controls the build, Tailwind CSS entrypoints, and output settings.

This separation keeps the site structure explicit and prevents a theme from creating unexpected routes.

## Design principles

Vara follows three principles:

1. **Simple** - few moving parts, easy to understand and to extend.
2. **Fast** - static output with minimal JavaScript, loaded only when a page needs it.
3. **Idiomatic** - built around Veta's own concepts: templates, components, filters, and functions.

## Next steps

- [Install the theme](./getting-started/installation/).
- [Create your first pages](./getting-started/quick-start/).
- Browse the [templates](./templates/) and [components](./components/) when you are ready to compose.
