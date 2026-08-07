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

| Prop family                                  | Description                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| `layout`                                     | `centered` or `inline`.                                                  |
| `eyebrow`, `title`, `description`, `caption` | Conversion copy.                                                         |
| `primary_*`, `secondary_*`                   | Actions using `label`, `href`, `target`, `icon`, `variant`, and `color`. |
| `heading_level`                              | Section title level: 2 or 3.                                             |
| `background`, `container`, `class`           | Surface and layout customization.                                        |

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
