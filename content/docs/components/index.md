---
title: "Components"
weight: 3
description: "A focused collection of content and landing-page building blocks included with Vara."
icon: "box"
---

# Components

Vara includes a deliberately small set of components for documentation content and landing pages. They provide the common foundations without preventing a project from adding its own components.

## How to use components

Use components as custom HTML tags in Markdown content:

```html
<vara-alert title="Note" description="This is important." color="info" />
```

### Props

All attributes are strings and should be quoted. Boolean props use `"true"` and `"false"`. Repeated records use predictable families such as `item_1_title`, `item_2_title`, and so on.

Vara's generators render Markdown first and then resolve components. Paired components receive their already-rendered inner content as `props.content`.

## Available components

### Content foundations

- [Alert](./alert/) - contextual callouts.
- [Badge](./badge/) - compact labels and statuses.
- [Button](./button/) - links and native buttons.
- [Container](./container/) - constrained content layout.
- [Icon](./icon/) - bundled Lucide and Simple Icons.
- [Keyboard key](./kbd/) - keyboard shortcuts and key names.

### Landing-page sections

- [Header](./header/) - responsive site navigation.
- [Hero](./hero/) - centered or split page introduction.
- [Content split](./content-split/) - explanatory copy with supporting media.
- [Features](./features/) - reusable feature cards.
- [Stats](./stats/) - semantic metrics in cards or a strip.
- [FAQ](./faq/) - native accordion or static grid.
- [Testimonial](./testimonial/) - a focused customer quote.
- [Carousel](./carousel/) - a generic slider for any collection of slides.
- [Call to action](./cta/) - centered or inline conversion panel.
- [Footer](./footer/) - site metadata and secondary navigation.

These components intentionally omit product-specific pricing, forms, team grids, comparison schemas, and similar recipes. Add those in the consuming project's `components/` directory when its content model is known.

## Customization

Components use Vara's design tokens and accept a `class` prop for targeted extension. Internal links and assets are resolved with Veta's `url()` helper, so they remain portable across root domains and deployment subdirectories.
