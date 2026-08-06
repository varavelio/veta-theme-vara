---
title: "Footer"
weight: 180
description: "Add copyright text, secondary navigation, credits, and an optional repository link."
icon: "panel-bottom"
---

# Footer

`<vara-footer>` supplies a restrained ending for landing pages. It reads the project title by default and never assumes that the consuming project uses Vara's repository.

## Usage

```md
<vara-footer
links="Docs|/docs,Company|/company,Privacy|/privacy"
github_href="https://github.com/example/project"
github_label="Project on GitHub"
/>
```

## Preview

<vara-footer
copyright="© Example project."
links="Docs|/docs,Components|/docs/components"
github_href="https://github.com/varavelio/veta-theme-vara"
github_label="Vara on GitHub"
show_credit="false"
/>

## Props

| Prop           | Default           | Description                            |
| -------------- | ----------------- | -------------------------------------- |
| `copyright`    | project copyright | Complete custom copyright text.        |
| `year`         | site setting      | Year used by the generated fallback.   |
| `links`        | `""`              | Comma-separated `Label\|href` records. |
| `github_href`  | `""`              | Optional repository destination.       |
| `github_label` | `"GitHub"`        | Accessible repository-link label.      |
| `show_credit`  | `"true"`          | Show the Veta and Vara credits.        |
| `container`    | `"lg"`            | xs, sm, md, lg, xl, or full.           |
| `class`        | `""`              | Additional footer classes.             |

Internal links are deployment-aware. The GitHub link opens in a new tab with the appropriate `rel` protection.
