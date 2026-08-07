---
title: "Icon"
weight: 50
description: "Render a bundled Lucide or Simple Icons SVG."
icon: "shapes"
---

# Icon

`<vara-icon>` renders an optimized SVG from Vara's icon bundle. Icons are decorative by default; provide `label` only when the icon carries meaning without adjacent text.

## Usage

```html
<vara-icon name="rocket" label="Deployment" class="size-6 text-info" />
```

## Preview

<vara-icon name="rocket" label="Deployment" class="size-8 text-info" />
<vara-icon name="github" label="GitHub" class="size-8" />
<vara-icon name="circle-check" label="Complete" class="size-8 text-success" />

## Props

| Prop    | Type   | Default | Description                                       |
| ------- | ------ | ------- | ------------------------------------------------- |
| `name`  | string | `""`    | Bundled icon filename without `.svg`.             |
| `label` | string | `""`    | Accessible name for a meaningful standalone icon. |
| `class` | string | `""`    | Size, color, and positioning utilities.           |

## Accessibility

Decorative SVGs are hidden from assistive technology and cannot receive focus. When an icon carries meaning on its own, add a `label` so screen readers announce it.

## Brand icons

The bundle includes both Lucide icons and Simple Icons brand marks. When a name exists in both sets, the brand version is prefixed with `si-`:

```html
<vara-icon name="si-github" class="size-8" />
<vara-icon name="si-tailwindcss" class="size-8" />
```

## Where to find icon names

The bundle follows the Lucide and Simple Icons catalogs, and this site ships a searchable explorer of every bundled icon:

- [Browse the icon explorer](/icons/)

Use the name as shown in the explorer. Remember to prefix a brand icon with `si-` when it shares a name with a Lucide icon.

## Missing icons

If an icon is missing, Vara renders a visible error glyph instead of failing the build, so a typo never breaks your site.
