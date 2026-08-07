---
title: "FAQ"
weight: 150
description: "Present questions in a native accordion or static grid."
icon: "circle-question-mark"
---

# FAQ

`<vara-faq>` uses native `<details>` and `<summary>` elements by default, providing keyboard interaction without custom JavaScript. Use `variant="grid"` when every answer should remain visible.

## Usage

```html
<vara-faq
  title="Frequently asked questions"
  item_1_question="Is there a free plan?"
  item_1_answer="Yes. The free plan covers a single project with the core features."
  item_2_question="Can I cancel anytime?"
  item_2_answer="You can cancel or downgrade from the billing settings."
/>
```

## Preview

<vara-faq
title="Frequently asked questions"
description="A few common questions before you get started."
item_1_question="Is there a free plan?"
item_1_answer="Yes. The free plan covers a single project with the core features."
item_2_question="Can I cancel anytime?"
item_2_answer="You can cancel or downgrade from the billing settings."
item_3_question="Do you offer team pricing?"
item_3_answer="Team pricing starts at ten seats and includes shared billing."
open_first="true"
heading_level="3"
/>

## Props

| Prop                               | Default       | Description                                |
| ---------------------------------- | ------------- | ------------------------------------------ |
| `variant`                          | `"accordion"` | `accordion` or `grid`.                     |
| `open_first`                       | `"false"`     | Open the first accordion item initially.   |
| `item_N_question`                  | `""`          | Required question for records 1 through 6. |
| `item_N_answer`                    | `""`          | Answer text.                               |
| `eyebrow`, `title`, `description`  | `""`          | Section introduction.                      |
| `heading_level`                    | `"2"`         | Section title level: 2 or 3.               |
| `background`, `container`, `class` | varies        | Surface and layout customization.          |

## Grid variant

When every answer should stay visible, switch to the grid:

```html
<vara-faq
  variant="grid"
  title="Frequently asked questions"
  item_1_question="What platforms are supported?"
  item_1_answer="Windows, macOS, and Linux."
  item_2_question="How often do releases ship?"
  item_2_answer="A stable release every month, with patches in between."
  item_3_question="Where are the releases announced?"
  item_3_answer="In the changelog and on the community forum."
/>
```
