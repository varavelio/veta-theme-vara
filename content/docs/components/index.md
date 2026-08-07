---
title: "Components"
weight: 5
description: "The building blocks included with Vara for content and landing pages."
icon: "box"
---

# Components

Vara includes a deliberately small set of components for documentation content and landing pages. They cover the common foundations without preventing your project from adding its own.

## How to use components

Use components as custom HTML tags in your Markdown. Vara's generators render Markdown first and then resolve component tags, so components can appear anywhere in a page:

```html
<vara-alert
  title="Heads up"
  description="Something worth knowing."
  color="info"
/>
```

Paired components receive their already-rendered inner content:

```html
<vara-container size="sm">
  Any Markdown or component output can live here.
</vara-container>
```

### Props

Component attributes are strings:

- Quote every value.
- Booleans use `"true"` and `"false"`.
- Repeated records use predictable families such as `item_1_title`, `item_2_title`, and so on.

Every component accepts a `class` prop for targeted styling with your own utilities.

## Available components

### Content foundations

Small components for use inside documentation and rich text:

- [Alert](./alert/) - contextual callouts.
- [Badge](./badge/) - compact labels and statuses.
- [Button](./button/) - links and native buttons.
- [Container](./container/) - constrained content layout.
- [Icon](./icon/) - bundled Lucide and Simple Icons.
- [Keyboard key](./kbd/) - keyboard shortcuts and key names.

### Landing-page sections

Larger sections for composing landing pages:

- [Header](./header/) - responsive site navigation.
- [Hero](./hero/) - centered or split page introduction.
- [Content split](./content-split/) - explanatory copy with supporting media.
- [Features](./features/) - reusable feature cards.
- [Stats](./stats/) - semantic metrics in cards or a strip.
- [FAQ](./faq/) - single-open accordion with composable items.
- [Testimonial](./testimonial/) - a focused customer quote.
- [Carousel](./carousel/) - a generic slider for any collection of slides.
- [Call to action](./cta/) - centered or inline conversion panel.
- [Footer](./footer/) - site metadata and secondary navigation.

These components intentionally omit product-specific recipes such as pricing, forms, and team grids. Add those in your own `components/` directory when your content model is known.

## Customization

Components use Vara's design tokens, so they inherit the site's colors and dark mode automatically. Internal links and assets are resolved with Veta's deployment-aware `url()` helper, which keeps them portable across root domains and deployment subdirectories.
