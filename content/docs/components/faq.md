---
title: "FAQ"
weight: 150
description: "Present questions in a native accordion or static grid."
icon: "circle-question-mark"
---

# FAQ

`<vara-faq>` uses native `<details>` and `<summary>` elements by default, providing keyboard interaction without custom JavaScript. Use `variant="grid"` when every answer should remain visible.

## Usage

```md
<vara-faq
title="Frequently asked questions"
item_1_question="Does this require a frontend framework?"
item_1_answer="No. Vara ships ready-to-use theme assets."
item_2_question="Can projects add components?"
item_2_answer="Yes. Project components extend or override the theme."
/>
```

## Preview

<vara-faq
title="Frequently asked questions"
description="The essentials before starting a project."
item_1_question="Does this require a frontend framework?"
item_1_answer="No. Vara ships ready-to-use theme assets."
item_2_question="Can projects add components?"
item_2_answer="Yes. Project components extend or override the theme."
item_3_question="Can it deploy below a path prefix?"
item_3_answer="Yes. Internal component links use Veta's deployment-aware URL helper."
open_first="true"
heading_level="3"
/>

## Props

| Prop                               | Default       | Description                                |
| ---------------------------------- | ------------- | ------------------------------------------ |
| `variant`                          | `"accordion"` | accordion or grid.                         |
| `open_first`                       | `"false"`     | Open the first accordion item initially.   |
| `item_N_question`                  | `""`          | Required question for records 1 through 6. |
| `item_N_answer`                    | `""`          | Answer text.                               |
| `eyebrow`, `title`, `description`  | `""`          | Section introduction.                      |
| `heading_level`                    | `"2"`         | Section title level: 2 or 3.               |
| `background`, `container`, `class` | varies        | Surface and layout customization.          |
