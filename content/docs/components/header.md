---
title: "Header"
weight: 100
description: "Add responsive navigation, branding, a theme control, and an optional primary action."
icon: "panel-top"
---

# Header

`<vara-header>` provides the site chrome needed by a landing page: responsive branding, desktop and mobile navigation, theme switching, and one primary action.

## Usage

```html
<vara-header
  title="Acme"
  links="Product|/product,Docs|/docs,Company|/company"
  cta_label="Get started"
  cta_href="/signup"
/>
```

## Preview

<vara-header
title="Acme"
links="Product|/product,Docs|/docs,Company|/company"
cta_label="Get started"
cta_href="/signup"
show_theme="false"
/>

## Props

| Prop          | Type   | Default     | Description                                            |
| ------------- | ------ | ----------- | ------------------------------------------------------ |
| `title`       | string | site title  | Brand title.                                           |
| `logo_light`  | string | site logo   | Logo for light surfaces.                               |
| `logo_dark`   | string | site logo   | Logo for dark surfaces.                                |
| `logo_alt`    | string | title       | Accessible logo text when the visible title is hidden. |
| `home_href`   | string | `"/"`       | Brand-link destination.                                |
| `links`       | string | `""`        | Comma-separated `Label\|href` navigation records.      |
| `cta_label`   | string | `""`        | Primary action label. Requires `cta_href`.             |
| `cta_href`    | string | `""`        | Primary action destination.                            |
| `cta_variant` | string | `"solid"`   | Primary action style.                                  |
| `cta_color`   | string | `"neutral"` | Primary action color.                                  |
| `show_logo`   | string | `"true"`    | Show the brand logo.                                   |
| `show_title`  | string | `"true"`    | Show the visible brand title.                          |
| `show_theme`  | string | `"true"`    | Show the theme picker control.                         |
| `sticky`      | string | `"false"`   | Keep the header at the viewport top.                   |
| `container`   | string | `"lg"`      | One of: xs, sm, md, lg, xl, full.                      |
| `class`       | string | `""`        | Additional header classes.                             |

## Behavior

The mobile navigation closes on Escape and on outside clicks. Long logos and titles shrink safely instead of overflowing.

The theme picker appears by default. Set `show_theme="false"` when you want a quiet header, and `sticky="true"` to keep the header at the top while scrolling.

## Hiding the logo or the title

Sites without a logo can hide it while keeping the title, and logos that already include the title as part of the artwork can hide the title instead:

```html
<vara-header title="Acme" show_logo="false" />
```

```html
<vara-header
  logo_light="/images/logo.svg"
  logo_dark="/images/logo.svg"
  show_title="false"
/>
```

The logo keeps the `logo_alt` text as its accessible name whenever the title is hidden. When both are hidden the header renders without a brand link.

## With a logo

Pass logo URLs for light and dark surfaces. When only one is given, it is used for both:

```html
<vara-header
  title="Acme"
  logo_light="/images/logo-dark.svg"
  logo_dark="/images/logo-light.svg"
  links="Docs|/docs"
/>
```
