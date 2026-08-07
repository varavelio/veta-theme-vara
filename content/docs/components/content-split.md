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
  eyebrow="Why it matters"
  title="The benefits at a glance"
  description="A short paragraph that summarizes the section so readers can decide whether to keep reading."
  item_1="The first key point"
  item_2="The second key point"
  panel_icon="workflow"
  panel_title="A supporting panel"
  panel_description="Optional extra context that reinforces the copy on the other side."
/>
```

## Preview

<vara-content-split
eyebrow="Why it matters"
title="The benefits at a glance"
description="A short paragraph that summarizes the section so readers can decide whether to keep reading."
item_1="The first key point"
item_2="The second key point"
item_3="The third key point"
panel_icon="workflow"
panel_title="A supporting panel"
panel_description="Optional extra context that reinforces the copy on the other side."
heading_level="3"
/>

## Props

| Prop family                                      | Description                                                     |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `eyebrow`, `title`, `description`                | Section introduction.                                           |
| `item_1` through `item_4`                        | Semantic checklist items.                                       |
| `primary_*`, `secondary_*`                       | Optional actions with the same naming as the hero.              |
| `image_src`, `image_alt`                         | An image as the supporting media; `alt` is required for images. |
| `image_width`, `image_height`                    | Optional intrinsic image dimensions.                            |
| `panel_icon`, `panel_title`, `panel_description` | Text-panel alternative to an image.                             |
| `media_position`                                 | `start` or `end`.                                               |
| `heading_level`                                  | Section title level: 2 or 3.                                    |
| `background`, `container`, `class`               | Surface and layout customization.                               |

When no image or panel is supplied, the component becomes a single-column content section rather than rendering placeholder UI.

## Using an image

```html
<vara-content-split
  eyebrow="Screenshots"
  title="See it in action"
  description="A sentence that points out what to look for in the image."
  image_src="/images/preview.png"
  image_alt="A preview of the main interface"
  media_position="start"
/>
```

Images load lazily and keep their aspect ratio. The panel variant is the simpler choice when you have no image to show.
