---
title: "Stats"
weight: 140
description: "Present meaningful metrics with semantic definition-list markup."
icon: "chart-no-axes-column-increasing"
---

# Stats

Use `<vara-stats>` for a small set of measurable outcomes. The component uses a definition list so labels and values remain associated for assistive technology.

## Usage

```html
<vara-stats
  title="Numbers that matter"
  columns="3"
  stat_1_label="Active users"
  stat_1_value="12k"
  stat_2_label="Average response time"
  stat_2_value="1.4s"
  stat_3_label="Support rating"
  stat_3_value="4.9"
/>
```

## Preview

<vara-stats
title="Numbers that matter"
columns="3"
stat_1_label="Active users"
stat_1_value="12k"
stat_1_description="Accounts active in the last 30 days."
stat_2_label="Average response time"
stat_2_value="1.4s"
stat_2_description="Measured across the public API."
stat_3_label="Support rating"
stat_3_value="4.9"
stat_3_description="Based on 2,300 responses."
heading_level="3"
/>

## Props

| Prop                               | Default   | Description                             |
| ---------------------------------- | --------- | --------------------------------------- |
| `variant`                          | `"cards"` | `cards` or `strip`.                     |
| `columns`                          | `"4"`     | Two, three, or four desktop columns.    |
| `stat_N_value`                     | `""`      | Required value for records 1 through 6. |
| `stat_N_label`                     | `""`      | Required metric definition label.       |
| `stat_N_description`               | `""`      | Optional context.                       |
| `eyebrow`, `title`, `description`  | `""`      | Section introduction.                   |
| `heading_level`                    | `"2"`     | Section title level: 2 or 3.            |
| `background`, `container`, `class` | varies    | Surface and layout customization.       |

Values are rendered in a mono typeface so columns of numbers align. Only complete records (value and label together) are rendered.

## Strip variant

For a horizontal strip without card surfaces:

```html
<vara-stats
  variant="strip"
  columns="4"
  stat_1_label="Downloads"
  stat_1_value="48k"
  stat_2_label="Countries"
  stat_2_value="90"
  stat_3_label="Contributors"
  stat_3_value="120"
  stat_4_label="Years"
  stat_4_value="6"
/>
```
