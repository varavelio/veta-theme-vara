---
title: "Hero"
weight: 110
description: "Introduce a landing page with centered or split content."
icon: "panels-top-left"
---

# Hero

`<vara-hero>` establishes the page's primary message. Use `layout="centered"` for a focused introduction or the default split layout for supporting media or a concise value panel.

## Usage

```html
<vara-hero
  eyebrow="New release"
  title="A headline that says what you do"
  description="One or two sentences that explain the value clearly and simply."
  primary_label="Get started"
  primary_href="/signup"
  panel_title="What makes it different"
  panel_description="A short list or summary that supports the headline."
  item_1="The first differentiator"
  item_2="The second differentiator"
/>
```

## Preview

<vara-hero
eyebrow="New release"
title="A headline that says what you do"
description="One or two sentences that explain the value clearly and simply."
primary_label="Get started"
primary_href="/signup"
secondary_label="Learn more"
secondary_href="/features"
panel_title="What makes it different"
panel_description="A short list or summary that supports the headline."
item_1="The first differentiator"
item_2="The second differentiator"
heading_level="2"
/>

## Props

| Prop family                                      | Description                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| `layout`                                         | `split` or `centered`.                                                   |
| `eyebrow`, `title`, `description`, `caption`     | Introductory copy.                                                       |
| `primary_*`, `secondary_*`                       | Actions using `label`, `href`, `target`, `icon`, `variant`, and `color`. |
| `image_src`, `image_alt`                         | An image as the supporting media; `alt` is required for images.          |
| `image_width`, `image_height`                    | Optional intrinsic image dimensions.                                     |
| `panel_icon`, `panel_title`, `panel_description` | Text-panel alternative to an image.                                      |
| `item_1` through `item_3`                        | Panel checklist items.                                                   |
| `media_position`                                 | `start` or `end`.                                                        |
| `heading_level`                                  | `1` by default; use `2` when embedded below another page heading.        |
| `background`, `container`, `class`               | Surface and layout customization.                                        |

Actions render only when both their label and destination are present. Attribute text is escaped; use project components for deliberately rich hero copy.

## Centered layout

For a focused introduction without supporting media:

```html
<vara-hero
  layout="centered"
  title="Simple, honest pricing"
  description="No tiers to untangle. One plan that covers everything."
  primary_label="See pricing"
  primary_href="/pricing"
/>
```

## Using an image

```html
<vara-hero
  eyebrow="Product tour"
  title="See it in action"
  description="A guided look at the main workflow."
  image_src="/images/hero.png"
  image_alt="The main interface"
  media_position="start"
/>
```

Hero images load eagerly with a high priority since they sit above the fold.
