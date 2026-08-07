---
title: "FAQ"
weight: 150
description: "Present questions in a single-open accordion with composable items."
icon: "circle-question-mark"
---

# FAQ

`<vara-faq>` renders an accordion section. Pair it with `<vara-faq-item>` elements: only one item stays open at a time, and every item body can hold any content, from plain text to other components.

## Usage

```html
<vara-faq title="Frequently asked questions">
  <vara-faq-item id="plan" question="Is there a free plan?">
    Yes. The free plan covers a single project with the core features.
  </vara-faq-item>
  <vara-faq-item id="cancel" question="Can I cancel anytime?">
    You can cancel or downgrade from the billing settings.
  </vara-faq-item>
</vara-faq>
```

## Preview

<vara-faq title="Frequently asked questions" description="A few common questions before you get started." open_first="true" heading_level="3">
<vara-faq-item id="plan" question="Is there a free plan?">
Yes. The free plan covers a single project with the core features.
</vara-faq-item>
<vara-faq-item id="cancel" question="Can I cancel anytime?">
You can cancel or downgrade from the billing settings.
</vara-faq-item>
<vara-faq-item id="teams" question="Do you offer team pricing?">
Team pricing starts at ten seats and includes shared billing.
</vara-faq-item>
</vara-faq>

## FAQ items

`<vara-faq-item>` is a single accordion entry. Give it a unique `id` and a `question`, then put any content in the body — paragraphs, lists, alerts, or other components.

```html
<vara-faq-item id="returns" question="What is the return policy?">
  <vara-alert
    title="30-day returns"
    description="Unopened items can be returned within 30 days."
    color="info"
  />
</vara-faq-item>
```

Only one item inside the same `<vara-faq>` stays open at a time. Item questions render as level three headings, below the section title.

## Props

`<vara-faq>`:

| Prop                               | Default   | Description                              |
| ---------------------------------- | --------- | ---------------------------------------- |
| `open_first`                       | `"false"` | Open the first item when the page loads. |
| `eyebrow`, `title`, `description`  | `""`      | Section introduction.                    |
| `heading_level`                    | `"2"`     | Section title level: 2 or 3.             |
| `background`, `container`, `class` | varies    | Surface and layout customization.        |

`<vara-faq-item>`:

| Prop       | Default | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| `id`       | `""`    | Unique accordion entry identifier. Required. |
| `question` | `""`    | Question shown in the expandable trigger.    |
