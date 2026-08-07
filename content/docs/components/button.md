---
title: "Button"
weight: 30
description: "Render a consistent action as a link or native button."
icon: "mouse-pointer-click"
---

# Button

`<vara-button>` renders an anchor when `href` is present and a native button otherwise. Use links for navigation and buttons for actions.

## Usage

```html
<vara-button label="Read the guide" href="/docs/" icon_end="arrow-right" />
```

## Preview

<div class="not-prose flex flex-wrap items-center gap-3">
  <vara-button label="Read the guide" href="/docs/" icon_end="arrow-right" />
  <vara-button label="Secondary action" variant="outline" />
</div>

## Props

| Prop         | Type   | Default      | Description                                               |
| ------------ | ------ | ------------ | --------------------------------------------------------- |
| `label`      | string | slot content | Visible action label.                                     |
| `href`       | string | `""`         | Destination. Its presence selects anchor rendering.       |
| `target`     | string | `""`         | Link target, such as `_blank`.                            |
| `type`       | string | `"button"`   | Native button type.                                       |
| `icon_start` | string | `""`         | Decorative icon before the label.                         |
| `icon_end`   | string | `""`         | Decorative icon after the label.                          |
| `size`       | string | `"md"`       | One of: sm, md, lg.                                       |
| `variant`    | string | `"solid"`    | One of: solid, outline, ghost.                            |
| `color`      | string | `"neutral"`  | One of: neutral, info, success, warning, error.           |
| `radius`     | string | `"md"`       | One of: sm, md, lg, full.                                 |
| `full_width` | string | `"false"`    | Stretch to the available width.                           |
| `disabled`   | string | `"false"`    | Disable native buttons or render links non-interactively. |
| `class`      | string | `""`         | Additional CSS classes.                                   |

Root-relative `href` values are deployment-aware. New-tab links automatically receive `rel="noopener noreferrer"`.

## Icons

Decorative icons can sit on either side of the label:

```html
<vara-button label="Sign up" href="/signup" icon_start="user-plus" />
<vara-button label="Next step" icon_end="arrow-right" />
```

## Variants

<div class="not-prose flex flex-wrap items-center gap-3">
  <vara-button label="Solid" />
  <vara-button label="Outline" variant="outline" />
  <vara-button label="Ghost" variant="ghost" />
  <vara-button label="Disabled" disabled="true" />
</div>
