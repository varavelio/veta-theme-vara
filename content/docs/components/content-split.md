---
title: "Content Split"
weight: 120
description: "Pair explanatory copy and actions with an image or supporting panel."
icon: "columns-2"
---

# Content Split

Use `<vara-content-split>` for product explanations, benefits, workflows, and other two-column narratives below the hero.

## Usage

```html
<vara-content-split
  eyebrow="Workflow"
  title="Keep content and presentation separate"
  description="Authors work in Markdown while Vara owns the visual system."
  item_1="Readable source files"
  item_2="Consistent responsive layout"
  panel_icon="file-text"
  panel_title="Content stays portable"
  panel_description="Move or extend it without rebuilding a frontend application."
/>
```

## Preview

<vara-content-split
eyebrow="Workflow"
title="Keep content and presentation separate"
description="Authors work in Markdown while Vara owns the visual system."
item_1="Readable source files"
item_2="Consistent responsive layout"
item_3="Project-owned extensions"
panel_icon="file-text"
panel_title="Content stays portable"
panel_description="Move or extend it without rebuilding a frontend application."
heading_level="3"
/>

## Props

| Prop family                                      | Description                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| `eyebrow`, `title`, `description`                | Section introduction.                                             |
| `item_1` through `item_4`                        | Semantic checklist items.                                         |
| `primary_*`, `secondary_*`                       | Optional actions with the same naming as the hero.                |
| `image_*`                                        | `src`, `alt`, optional `width`, and `height`; images load lazily. |
| `panel_icon`, `panel_title`, `panel_description` | Text-panel alternative to an image.                               |
| `media_position`                                 | `start` or `end`.                                                 |
| `heading_level`                                  | Section title level: 2 or 3.                                      |
| `background`, `container`, `class`               | Surface and layout customization.                                 |

When no image or panel is supplied, the component becomes a single-column content section rather than rendering placeholder UI.
