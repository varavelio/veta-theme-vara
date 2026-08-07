---
title: "Badge"
weight: 20
description: "Display a small status label."
icon: "tag"
---

# Badge

The `<vara-badge>` component renders a compact status label.

## Usage

```html
<vara-badge text="Beta" color="info" />
```

## Preview

<vara-badge text="Beta" color="info" />

## Props

| Prop      | Type   | Default     | Description                                     |
| --------- | ------ | ----------- | ----------------------------------------------- |
| `text`    | string | `""`        | Badge text. Falls back to slot content.         |
| `size`    | string | `"md"`      | One of: sm, md, lg.                             |
| `variant` | string | `"soft"`    | One of: soft, solid, outline.                   |
| `color`   | string | `"neutral"` | One of: neutral, info, success, warning, error. |
| `class`   | string | `""`        | Additional CSS classes.                         |

## Variants

### Soft

<vara-badge text="Default" color="neutral" />
<vara-badge text="Info" color="info" />
<vara-badge text="Success" color="success" />

### Solid

<vara-badge text="Warning" color="warning" variant="solid" />
<vara-badge text="Error" color="error" variant="solid" />

### Outline

<vara-badge text="Neutral" color="neutral" variant="outline" />
<vara-badge text="Info" color="info" variant="outline" />

## Sizes

<vara-badge text="Small" size="sm" color="info" />
<vara-badge text="Medium" size="md" color="info" />
<vara-badge text="Large" size="lg" color="info" />

## With a slot

Provide a `text` prop or put the label between the tags. Both are equivalent:

```html
<vara-badge color="success">New</vara-badge>
```
