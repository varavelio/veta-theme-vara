---
title: "Icon"
weight: 50
description: "Render a bundled Lucide or Simple Icons SVG."
icon: "shapes"
---

# Icon

`<vara-icon>` renders an optimized SVG from Vara's icon bundle. Icons are decorative by default; provide `label` only when the icon carries meaning without adjacent text.

## Usage

```md
<vara-icon name="rocket" label="Deployment" class="size-6 text-info" />
```

## Preview

<vara-icon name="rocket" label="Deployment" class="size-8 text-info" />
<vara-icon name="github" label="GitHub" class="size-8" />
<vara-icon name="circle-check" label="Complete" class="size-8 text-success" />

## Props

| Prop    | Default | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| `name`  | `""`    | Bundled icon filename without `.svg`.             |
| `label` | `""`    | Accessible name for a meaningful standalone icon. |
| `class` | `""`    | Size, color, and positioning utilities.           |

If an icon is missing, Vara renders a visible error glyph instead of failing the build. Decorative SVGs are hidden from assistive technology and cannot receive focus.
