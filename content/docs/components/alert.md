---
title: "Alert"
weight: 10
description: "Present a contextual note or an optional live status message."
icon: "info"
---

# Alert

Use `<vara-alert>` for notes, guidance, warnings, and status feedback. It is static by default; set `role="status"` or `role="alert"` only for content that changes after page load.

## Usage

```md
<vara-alert title="Heads up" description="This action cannot be undone." color="warning" />
```

## Preview

<vara-alert title="Heads up" description="Review the generated output before deploying." color="warning" />

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

## Colors

<vara-alert title="Information" description="The index updates during every build." color="info" />

<vara-alert title="Success" description="The deployment completed." color="success" />

<vara-alert title="Error" description="The configuration could not be loaded." color="error" />

## Custom icon

Pass any icon name from the Lucide or Simple Icons sets:

```md
<vara-alert title="Deploy" description="Production deploy started." icon="rocket" color="success" />
```

For richer content, use a paired tag. Its body is rendered as Markdown before it reaches the component.
