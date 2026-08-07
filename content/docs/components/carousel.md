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
    quote="The team shipped the new release two weeks early, without cutting any corners."
    author="Alex Morgan"
    author_role="Head of product"
  />
  <vara-testimonial
    quote="The onboarding flow is the smoothest we have ever put in front of customers."
    author="Sam Rivera"
    author_role="Engineering manager"
  />
  <vara-testimonial
    quote="Support tickets dropped noticeably after we published the new guides."
    author="Priya Nair"
    author_role="Customer success lead"
  />
</vara-carousel>

## Props

| Prop              | Type   | Default      | Description                                       |
| ----------------- | ------ | ------------ | ------------------------------------------------- |
| `label`           | string | `"Carousel"` | Accessible region label.                          |
| `slides_per_view` | string | `"1"`        | One, two, or three slides per view at desk width. |
| `show_controls`   | string | `"true"`     | Show the previous and next buttons.               |
| `show_dots`       | string | `"true"`     | Show the slide indicator dots.                    |
| `background`      | string | `"base-100"` | Section surface.                                  |
| `container`       | string | `"lg"`       | One of: xs, sm, md, lg, xl, full.                 |
| `class`           | string | `""`         | Additional section classes.                       |

## Behavior

The track uses native scroll snapping and works with touch, trackpad, and keyboard. Controls and dots update from the scroll position, and dots only render when the carousel has more than one slide.

Slides per view above one is applied at the desk breakpoint only; on smaller screens each slide stays full width.

## Multiple slides per view

```html
<vara-carousel label="Featured articles" slides_per_view="2" show_dots="false">
  <article class="rounded-lg border border-base-400 bg-base-200 p-5">
    First article
  </article>
  <article class="rounded-lg border border-base-400 bg-base-200 p-5">
    Second article
  </article>
  <article class="rounded-lg border border-base-400 bg-base-200 p-5">
    Third article
  </article>
</vara-carousel>
```
