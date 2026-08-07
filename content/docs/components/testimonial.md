---
title: "Testimonial"
weight: 160
description: "Highlight one customer quote with clear attribution and an optional result."
icon: "quote"
---

# Testimonial

`<vara-testimonial>` focuses on one credible statement instead of presenting a dense carousel or decorative quote grid. It uses `figure`, `blockquote`, and `figcaption` semantics.

## Usage

```html
<vara-testimonial
  quote="The product paid for itself within the first month of use."
  author="Alex Morgan"
  author_role="Head of product, Northwind"
  author_href="https://example.com/alex"
  quote_href="https://example.com/blog/customer-story"
  result_label="Time saved per week"
  result_value="6h"
/>
```

## Preview

<vara-testimonial
quote="The product paid for itself within the first month of use."
author="Alex Morgan"
author_role="Head of product, Northwind"
author_href="https://example.com/alex"
quote_href="https://example.com/blog/customer-story"
result_label="Time saved per week"
result_value="6h"
/>

## Props

| Prop                               | Default                 | Description                                               |
| ---------------------------------- | ----------------------- | --------------------------------------------------------- |
| `quote`                            | `""`                    | Testimonial text.                                         |
| `author`                           | `""`                    | Attribution name.                                         |
| `author_role`                      | `""`                    | Role or organization.                                     |
| `avatar_src`                       | `""`                    | Optional avatar URL.                                      |
| `avatar_alt`                       | `""`                    | Avatar alternative text; keep empty when decorative.      |
| `avatar_width`, `avatar_height`    | `""`                    | Optional intrinsic image dimensions.                      |
| `author_href`                      | `""`                    | Optional link to the author's website or profile.         |
| `author_href_target`               | `"_blank"`              | Link target for the author.                               |
| `quote_href`                       | `""`                    | Optional link to the original quote.                      |
| `quote_label`                      | `"View original quote"` | Label for the original-quote link.                        |
| `result_value`, `result_label`     | `""`                    | Optional highlighted outcome; both are required together. |
| `background`, `container`, `class` | varies                  | Surface and layout customization.                         |

Internal author and quote destinations are deployment-aware. New-tab links automatically receive `rel="noopener noreferrer"`.

## Without extras

A minimal testimonial needs only a quote and an author:

```html
<vara-testimonial
  quote="Simple to adopt and easy to explain to the rest of the team."
  author="Sam Rivera"
  author_role="Engineering manager"
/>
```

## With an avatar

```html
<vara-testimonial
  quote="The onboarding guide answered every question we had."
  author="Priya Nair"
  author_role="Customer success lead"
  avatar_src="/images/priya.jpg"
  avatar_alt="Portrait of Priya Nair"
  avatar_width="40"
  avatar_height="40"
/>
```
