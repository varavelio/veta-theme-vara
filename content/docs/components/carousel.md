---
title: "Carousel"
weight: 165
description: "Present any collection of slides in a swipeable, accessible track."
icon: "gallery-horizontal-end"
---

# Carousel

`<vara-carousel>` is a generic slider. Every element inside the paired tag becomes one slide, so it works with existing components such as `<vara-testimonial>`, feature cards, or simple markup.

## Usage

```html
<vara-carousel label="Customer stories">
  <vara-testimonial quote="First quote" author="Alex Morgan" />
  <vara-testimonial quote="Second quote" author="Sam Rivera" />
</vara-carousel>
```

## Preview

<vara-carousel label="Customer stories">
  <vara-testimonial
    quote="We published a coherent documentation site without maintaining a frontend app."
    author="Alex Morgan"
    author_role="Documentation lead"
  />
  <vara-testimonial
    quote="The components compose cleanly and the defaults keep every page coherent."
    author="Sam Rivera"
    author_role="Engineering manager"
  />
  <vara-testimonial
    quote="One focused theme covered both our marketing page and the full product documentation."
    author="Priya Nair"
    author_role="Product designer"
  />
</vara-carousel>

## Props

| Prop              | Default      | Description                                 |
| ----------------- | ------------ | ------------------------------------------- |
| `label`           | `"Carousel"` | Accessible region label.                    |
| `slides_per_view` | `"1"`        | One, two, or three slides per view at desk. |
| `show_controls`   | `"true"`     | Show the previous and next buttons.         |
| `show_dots`       | `"true"`     | Show the slide indicator dots.              |
| `background`      | `"base-100"` | Section surface.                            |
| `container`       | `"lg"`       | xs, sm, md, lg, xl, or full.                |
| `class`           | `""`         | Additional section classes.                 |

The track uses native scroll snapping and works with touch, trackpad, and keyboard. Controls and dots update from the scroll position. Dots only render when the carousel has more than one slide.
