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

| Prop                                   | Default      | Description                                        |
| -------------------------------------- | ------------ | -------------------------------------------------- |
| `media_position`                       | `"end"`      | `start` or `end`.                                  |
| `eyebrow`                              | `""`         | Small label above the title.                       |
| `title`                                | `""`         | The section heading.                               |
| `description`                          | `""`         | Supporting copy below the title.                   |
| `heading_level`                        | `"2"`        | Section title level: 2 or 3.                       |
| `item_1`, `item_2`, `item_3`, `item_4` | `""`         | Semantic checklist items.                          |
| `primary_label`                        | `""`         | Primary action label. Requires `primary_href`.     |
| `primary_href`                         | `""`         | Primary action destination.                        |
| `primary_target`                       | `""`         | Primary action link target, such as `_blank`.      |
| `primary_icon`                         | `""`         | Decorative icon on the primary action.             |
| `primary_variant`                      | `"solid"`    | Primary action style.                              |
| `primary_color`                        | `"neutral"`  | Primary action color.                              |
| `secondary_label`                      | `""`         | Secondary action label. Requires `secondary_href`. |
| `secondary_href`                       | `""`         | Secondary action destination.                      |
| `secondary_target`                     | `""`         | Secondary action link target, such as `_blank`.    |
| `secondary_icon`                       | `""`         | Decorative icon on the secondary action.           |
| `secondary_variant`                    | `"outline"`  | Secondary action style.                            |
| `secondary_color`                      | `"neutral"`  | Secondary action color.                            |
| `image_src`                            | `""`         | An image as the supporting media.                  |
| `image_alt`                            | `""`         | Required when `image_src` is set.                  |
| `image_width`                          | `""`         | Optional intrinsic image width.                    |
| `image_height`                         | `""`         | Optional intrinsic image height.                   |
| `panel_icon`                           | `""`         | Icon for the text-panel media variant.             |
| `panel_title`                          | `""`         | Panel heading.                                     |
| `panel_description`                    | `""`         | Panel supporting copy.                             |
| `background`                           | `"base-100"` | Section surface.                                   |
| `container`                            | `"lg"`       | One of: xs, sm, md, lg, xl, full.                  |
| `class`                                | `""`         | Additional section classes.                        |

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
