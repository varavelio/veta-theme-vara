---
title: "Header"
weight: 100
description: "Add responsive navigation, branding, a theme control, and an optional primary action."
icon: "panel-top"
---

# Header

`<vara-header>` provides the site chrome needed by a landing page: responsive branding, desktop and mobile navigation, theme switching, and one primary action.

## Usage

```md
<vara-header
title="Acme"
links="Product|/product,Docs|/docs,Company|/company"
cta_label="Get started"
cta_href="/docs/getting-started"
/>
```

## Preview

<vara-header
title="Acme"
links="Product|/product,Docs|/docs,Company|/company"
cta_label="Get started"
cta_href="/docs/getting-started"
show_theme="false"
/>

## Props

| Prop          | Default     | Description                                            |
| ------------- | ----------- | ------------------------------------------------------ |
| `title`       | site title  | Brand title.                                           |
| `logo_light`  | site logo   | Logo for light surfaces.                               |
| `logo_dark`   | site logo   | Logo for dark surfaces.                                |
| `logo_alt`    | title       | Accessible logo text when the visible title is hidden. |
| `home_href`   | `"/"`       | Brand-link destination.                                |
| `links`       | `""`        | Comma-separated `Label\|href` navigation records.      |
| `cta_label`   | `""`        | Primary action label. Requires `cta_href`.             |
| `cta_href`    | `""`        | Primary action destination.                            |
| `cta_variant` | `"solid"`   | Primary action style.                                  |
| `cta_color`   | `"neutral"` | Primary action color.                                  |
| `show_title`  | `"true"`    | Show the visible brand title.                          |
| `show_theme`  | `"true"`    | Show the theme cycle control.                          |
| `sticky`      | `"false"`   | Keep the header at the viewport top.                   |
| `container`   | `"lg"`      | xs, sm, md, lg, xl, or full.                           |
| `class`       | `""`        | Additional header classes.                             |

The mobile navigation closes on Escape and outside clicks. Long logos and titles shrink safely instead of overflowing.
