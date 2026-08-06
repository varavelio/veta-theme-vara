---
title: "Stats"
weight: 140
description: "Present meaningful metrics with semantic definition-list markup."
icon: "chart-no-axes-column-increasing"
---

# Stats

Use `<vara-stats>` for a small set of measurable outcomes. The component uses a definition list so labels and values remain associated for assistive technology.

## Usage

```md
<vara-stats
title="At a glance"
columns="3"
stat_1_label="Lighthouse score"
stat_1_value="100"
stat_2_label="Frontend installs"
stat_2_value="0"
stat_3_label="Deploy targets"
stat_3_value="Any"
/>
```

## Preview

<vara-stats
title="At a glance"
columns="3"
stat_1_label="Lighthouse score"
stat_1_value="100"
stat_1_description="A performance-conscious foundation."
stat_2_label="Frontend installs"
stat_2_value="0"
stat_2_description="The consuming project receives compiled assets."
stat_3_label="Deploy targets"
stat_3_value="Any"
stat_3_description="Static output works across hosting providers."
heading_level="3"
/>

## Props

| Prop                               | Default   | Description                             |
| ---------------------------------- | --------- | --------------------------------------- |
| `variant`                          | `"cards"` | cards or strip.                         |
| `columns`                          | `"4"`     | Two, three, or four desktop columns.    |
| `stat_N_value`                     | `""`      | Required value for records 1 through 6. |
| `stat_N_label`                     | `""`      | Required metric definition label.       |
| `stat_N_description`               | `""`      | Optional context.                       |
| `eyebrow`, `title`, `description`  | `""`      | Section introduction.                   |
| `heading_level`                    | `"2"`     | Section title level: 2 or 3.            |
| `background`, `container`, `class` | varies    | Surface and layout customization.       |
