---
title: "Features"
weight: 130
description: "Present a concise collection of capabilities or resources."
icon: "layout-grid"
---

# Features

`<vara-features>` is the general card collection for capabilities, integrations, resources, and short process summaries. Use project-specific components when records need a richer domain model.

## Usage

```md
<vara-features
title="Built for publishing"
columns="3"
item_1_icon="file-text"
item_1_title="Markdown first"
item_1_description="Keep content readable and portable."
item_2_icon="smartphone"
item_2_title="Responsive"
item_2_description="Every layout works from mobile to desktop."
/>
```

## Preview

<vara-features
title="Built for publishing"
description="A small set of reliable defaults covers the common path."
columns="3"
item_1_icon="file-text"
item_1_title="Markdown first"
item_1_description="Keep content readable and portable."
item_1_badge="Content"
item_2_icon="smartphone"
item_2_title="Responsive"
item_2_description="Every layout works from mobile to desktop."
item_3_icon="accessibility"
item_3_title="Accessible"
item_3_description="Semantics, focus states, and readable contrast are built in."
heading_level="3"
/>

## Props

| Prop                               | Default        | Description                                              |
| ---------------------------------- | -------------- | -------------------------------------------------------- |
| `eyebrow`, `title`, `description`  | `""`           | Section introduction.                                    |
| `columns`                          | `"3"`          | Two, three, or four desktop columns.                     |
| `item_N_title`                     | `""`           | Required field for each rendered card, from 1 through 6. |
| `item_N_description`               | `""`           | Supporting copy.                                         |
| `item_N_icon`                      | `""`           | Decorative bundled icon.                                 |
| `item_N_badge`                     | `""`           | Compact metadata label.                                  |
| `item_N_href`                      | `""`           | Optional destination.                                    |
| `item_N_link_label`                | `"Learn more"` | Link label when a destination exists.                    |
| `heading_level`                    | `"2"`          | Section title level: 2 or 3.                             |
| `background`, `container`, `class` | varies         | Surface and layout customization.                        |

Cards without links do not present hover behavior. Linked cards expose a visible keyboard focus state.
