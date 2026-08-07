---
title: "Alert"
weight: 10
description: "Present a contextual note or an optional live status message."
icon: "info"
---

# Alert

Use `<vara-alert>` for notes, guidance, warnings, and status feedback. It is static by default; set `role="status"` or `role="alert"` only for content that changes after the page loads.

## Usage

```html
<vara-alert
  title="Heads up"
  description="Your changes have not been saved yet."
  color="warning"
/>
```

## Preview

<vara-alert title="Heads up" description="Your changes have not been saved yet." color="warning" />

## Props

| Prop            | Type   | Default     | Description                                     |
| --------------- | ------ | ----------- | ----------------------------------------------- |
| `title`         | string | `""`        | Bold heading text.                              |
| `description`   | string | `""`        | Supporting description.                         |
| `color`         | string | `"neutral"` | One of: neutral, info, success, warning, error. |
| `icon`          | string | auto        | Override the icon associated with the color.    |
| `role`          | string | `""`        | Optional live-region role: status or alert.     |
| `heading_level` | string | `"3"`       | Semantic title level: 3 or 4.                   |
| `class`         | string | `""`        | Additional CSS classes.                         |

The `description` prop takes precedence over the paired body. If you omit it, the component renders its inner content instead.

## Colors

<vara-alert title="Information" description="The report will refresh on the next run." color="info" />

<vara-alert title="Success" description="Your profile was updated." color="success" />

<vara-alert title="Error" description="The file could not be uploaded." color="error" />

## Custom icon

Pass any icon name from the bundled icon set to replace the default one:

```html
<vara-alert
  title="Deployment finished"
  description="The latest build is now live."
  icon="rocket"
  color="success"
/>
```

## Richer content

For more than a title and a description, use a paired tag. Its body is rendered as Markdown before it reaches the component:

```html
<vara-alert title="Before you continue" color="info">
  Make sure you have read the [introduction](/docs/). If you already have an
  account, you can **skip this step**.
</vara-alert>
```
