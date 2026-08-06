---
title: "Container"
weight: 40
description: "Constrain and align arbitrary rendered content."
icon: "panel-top"
---

# Container

`<vara-container>` is the minimal layout primitive for project-specific compositions. It accepts paired content and applies a consistent maximum width.

## Usage

```html
<vara-container
  size="xs"
  class="rounded-lg border border-base-400 bg-base-200 py-6"
>
  Contained content stays readable at every viewport size.
</vara-container>
```

## Preview

<vara-container size="xs" class="rounded-lg border border-base-400 bg-base-200 py-6 text-center">
Contained content stays readable at every viewport size.
</vara-container>

## Props

| Prop      | Default    | Description                        |
| --------- | ---------- | ---------------------------------- |
| `size`    | `"md"`     | xs, sm, md, lg, xl, or full.       |
| `padding` | `"true"`   | Apply standard horizontal padding. |
| `align`   | `"center"` | left, center, or right.            |
| `class`   | `""`       | Additional CSS classes.            |

The paired body is trusted rendered content. Use it for author-controlled Markdown and component output, not unsanitized external HTML.
