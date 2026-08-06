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

| Prop         | Default      | Description                                               |
| ------------ | ------------ | --------------------------------------------------------- |
| `label`      | slot content | Visible action label.                                     |
| `href`       | `""`         | Destination. Its presence selects anchor rendering.       |
| `target`     | `""`         | Link target, such as `_blank`.                            |
| `type`       | `"button"`   | Native button type.                                       |
| `icon_start` | `""`         | Decorative icon before the label.                         |
| `icon_end`   | `""`         | Decorative icon after the label.                          |
| `size`       | `"md"`       | sm, md, or lg.                                            |
| `variant`    | `"solid"`    | solid, outline, or ghost.                                 |
| `color`      | `"neutral"`  | neutral, info, success, warning, or error.                |
| `radius`     | `"md"`       | sm, md, lg, or full.                                      |
| `full_width` | `"false"`    | Stretch to the available width.                           |
| `disabled`   | `"false"`    | Disable native buttons or render links non-interactively. |
| `class`      | `""`         | Additional CSS classes.                                   |

Root-relative `href` values are deployment-aware. New-tab links automatically receive `rel="noopener noreferrer"`.
