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

| Prop                         | Default      | Description                                                       |
| ---------------------------- | ------------ | ----------------------------------------------------------------- |
| `layout`                     | `"split"`    | `split` or `centered`.                                            |
| `eyebrow`                    | `""`         | Small label above the title.                                      |
| `title`                      | `""`         | The main headline.                                                |
| `description`                | `""`         | Supporting copy below the title.                                  |
| `caption`                    | `""`         | Small text under the actions.                                     |
| `heading_level`              | `"1"`        | Title level: 1 or 2. Use `2` when embedded below another heading. |
| `primary_label`              | `""`         | Primary action label. Requires `primary_href`.                    |
| `primary_href`               | `""`         | Primary action destination.                                       |
| `primary_target`             | `""`         | Primary action link target, such as `_blank`.                     |
| `primary_icon`               | `""`         | Decorative icon on the primary action.                            |
| `primary_variant`            | `"solid"`    | Primary action style.                                             |
| `primary_color`              | `"neutral"`  | Primary action color.                                             |
| `secondary_label`            | `""`         | Secondary action label. Requires `secondary_href`.                |
| `secondary_href`             | `""`         | Secondary action destination.                                     |
| `secondary_target`           | `""`         | Secondary action link target, such as `_blank`.                   |
| `secondary_icon`             | `""`         | Decorative icon on the secondary action.                          |
| `secondary_variant`          | `"outline"`  | Secondary action style.                                           |
| `secondary_color`            | `"neutral"`  | Secondary action color.                                           |
| `image_src`                  | `""`         | An image as the supporting media.                                 |
| `image_alt`                  | `""`         | Required when `image_src` is set.                                 |
| `image_width`                | `""`         | Optional intrinsic image width.                                   |
| `image_height`               | `""`         | Optional intrinsic image height.                                  |
| `panel_icon`                 | `""`         | Icon for the text-panel media variant.                            |
| `panel_title`                | `""`         | Panel heading.                                                    |
| `panel_description`          | `""`         | Panel supporting copy.                                            |
| `item_1`, `item_2`, `item_3` | `""`         | Panel checklist items.                                            |
| `media_position`             | `"end"`      | `start` or `end`.                                                 |
| `background`                 | `"base-100"` | Section surface.                                                  |
| `container`                  | `"lg"`       | One of: xs, sm, md, lg, xl, full.                                 |
| `class`                      | `""`         | Additional section classes.                                       |

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
