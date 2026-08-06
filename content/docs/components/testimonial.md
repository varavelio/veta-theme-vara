---
title: "Testimonial"
weight: 160
description: "Highlight one customer quote with clear attribution and an optional result."
icon: "quote"
---

# Testimonial

`<vara-testimonial>` focuses on one credible statement instead of presenting a dense carousel or decorative quote grid. It uses `figure`, `blockquote`, and `figcaption` semantics.

## Usage

```md
<vara-testimonial
quote="We published a coherent documentation site without maintaining a frontend app."
author="Alex Morgan"
author_role="Documentation lead"
author_href="https://example.com/alex"
quote_href="https://example.com/blog/launch"
result_label="Time to first deployment"
result_value="1 day"
/>
```

## Preview

<vara-testimonial
quote="We published a coherent documentation site without maintaining a frontend app."
author="Alex Morgan"
author_role="Documentation lead"
author_href="https://example.com/alex"
quote_href="https://example.com/blog/launch"
result_label="Time to first deployment"
result_value="1 day"
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
