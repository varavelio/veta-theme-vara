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
  title="Ready to publish?"
  description="Start with the installation guide."
  primary_label="Install Vara"
  primary_href="/docs/getting-started/installation"
  secondary_label="View GitHub"
  secondary_href="https://github.com/varavelio/veta-theme-vara"
/>
```

## Preview

<vara-cta
title="Ready to publish?"
description="Start with the installation guide."
primary_label="Install Vara"
primary_href="/docs/getting-started/installation"
secondary_label="View GitHub"
secondary_href="https://github.com/varavelio/veta-theme-vara"
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
