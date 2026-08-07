---
title: "Features"
weight: 130
description: "Present a concise collection of capabilities or resources."
icon: "layout-grid"
---

# Features

`<vara-features>` is the general card collection for capabilities, integrations, resources, and short process summaries. Use project-specific components when records need a richer domain model.

## Usage

```html
<vara-features
  title="Everything included"
  columns="3"
  item_1_icon="shield-check"
  item_1_title="Secure by default"
  item_1_description="A sentence about how this capability helps the reader."
  item_2_icon="zap"
  item_2_title="Fast to set up"
  item_2_description="A sentence about how this capability helps the reader."
/>
```

## Preview

<vara-features
title="Everything included"
description="A short introduction to the capabilities on this page."
columns="3"
item_1_icon="shield-check"
item_1_title="Secure by default"
item_1_description="A sentence about how this capability helps the reader."
item_1_badge="Security"
item_2_icon="zap"
item_2_title="Fast to set up"
item_2_description="A sentence about how this capability helps the reader."
item_3_icon="users"
item_3_title="Built for teams"
item_3_description="A sentence about how this capability helps the reader."
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

## With links

Give a card a destination and its own link label:

```html
<vara-features
  columns="2"
  item_1_icon="book-open-text"
  item_1_title="Read the documentation"
  item_1_description="Everything you need to get up and running."
  item_1_href="/docs/"
  item_1_link_label="Open the docs"
  item_2_icon="message-circle"
  item_2_title="Join the community"
  item_2_description="Ask questions and share what you build."
  item_2_href="/community"
  item_2_link_label="Join the forum"
/>
```
