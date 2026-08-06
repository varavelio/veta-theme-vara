---
title: "Hero"
weight: 110
description: "Introduce a landing page with centered or split content."
icon: "gallery-horizontal-end"
---

# Hero

`<vara-hero>` establishes the page's primary message. Use `layout="centered"` for a focused introduction or the default split layout for supporting media or a concise value panel.

## Usage

```md
<vara-hero
eyebrow="Release 2.0"
title="Ship a clearer product story"
description="A focused foundation for a fast, accessible landing page."
primary_label="Get started"
primary_href="/docs/"
panel_title="Everything important, nothing excessive"
panel_description="Compose the page directly from Markdown."
item_1="Responsive by default"
item_2="Deployment-aware links"
/>
```

## Preview

<vara-hero
eyebrow="Release 2.0"
title="Ship a clearer product story"
description="A focused foundation for a fast, accessible landing page."
primary_label="Get started"
primary_href="/docs/"
secondary_label="View source"
secondary_href="https://github.com/varavelio/veta-theme-vara"
panel_title="Everything important, nothing excessive"
panel_description="Compose the page directly from Markdown."
item_1="Responsive by default"
item_2="Deployment-aware links"
heading_level="2"
/>

## Props

| Prop family                                      | Description                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| `layout`                                         | `split` or `centered`.                                                   |
| `eyebrow`, `title`, `description`, `caption`     | Introductory copy.                                                       |
| `primary_*`, `secondary_*`                       | Actions using `label`, `href`, `target`, `icon`, `variant`, and `color`. |
| `image_*`                                        | `src`, required author-supplied `alt`, optional `width`, and `height`.   |
| `panel_icon`, `panel_title`, `panel_description` | Text-panel alternative to an image.                                      |
| `item_1` through `item_3`                        | Panel checklist items.                                                   |
| `media_position`                                 | `start` or `end`.                                                        |
| `heading_level`                                  | `1` by default; use `2` when embedded below another page heading.        |
| `background`, `container`, `class`               | Surface and layout customization.                                        |

Actions render only when both their label and destination are present. Attribute text is escaped; use project components for deliberately rich hero copy.
