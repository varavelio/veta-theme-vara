---
title: "Call to Action"
weight: 170
description: "End a page section with one clear next step and an optional alternative."
icon: "megaphone"
---

# Call to Action

`<vara-cta>` provides the final conversion panel for a landing page. Use the centered layout for page endings and the inline layout between longer content sections.

## Usage

```html
<vara-cta
  title="Ready to get started?"
  description="Create your account in a couple of minutes."
  primary_label="Sign up"
  primary_href="/signup"
  secondary_label="Talk to sales"
  secondary_href="/contact"
/>
```

## Preview

<vara-cta
title="Ready to get started?"
description="Create your account in a couple of minutes."
primary_label="Sign up"
primary_href="/signup"
secondary_label="Talk to sales"
secondary_href="/contact"
heading_level="3"
/>

## Props

| Prop                | Default      | Description                                        |
| ------------------- | ------------ | -------------------------------------------------- |
| `layout`            | `"centered"` | `centered` or `inline`.                            |
| `eyebrow`           | `""`         | Small label above the title.                       |
| `title`             | `""`         | The panel heading.                                 |
| `description`       | `""`         | Supporting copy below the title.                   |
| `caption`           | `""`         | Small text under the actions.                      |
| `heading_level`     | `"2"`        | Section title level: 2 or 3.                       |
| `primary_label`     | `""`         | Primary action label. Requires `primary_href`.     |
| `primary_href`      | `""`         | Primary action destination.                        |
| `primary_target`    | `""`         | Primary action link target, such as `_blank`.      |
| `primary_icon`      | `""`         | Decorative icon on the primary action.             |
| `primary_variant`   | `"solid"`    | Primary action style.                              |
| `primary_color`     | `"neutral"`  | Primary action color.                              |
| `secondary_label`   | `""`         | Secondary action label. Requires `secondary_href`. |
| `secondary_href`    | `""`         | Secondary action destination.                      |
| `secondary_target`  | `""`         | Secondary action link target, such as `_blank`.    |
| `secondary_icon`    | `""`         | Decorative icon on the secondary action.           |
| `secondary_variant` | `"outline"`  | Secondary action style.                            |
| `secondary_color`   | `"neutral"`  | Secondary action color.                            |
| `background`        | `"base-100"` | Section surface.                                   |
| `container`         | `"lg"`       | One of: xs, sm, md, lg, xl, full.                  |
| `class`             | `""`         | Additional section classes.                        |

Actions are omitted unless both label and destination are present, preventing placeholder links from reaching production.

## Inline layout

For a compact panel that sits beside longer content:

```html
<vara-cta
  layout="inline"
  title="Questions about pricing?"
  description="Our team answers within one business day."
  primary_label="Contact us"
  primary_href="/contact"
/>
```
