---
title: "Footer"
weight: 180
description: "Add copyright text, secondary navigation, credits, and an optional repository link."
icon: "panel-bottom"
---

# Footer

`<vara-footer>` supplies a restrained ending for landing pages. It shows your copyright and links, with an optional repository link and a small credit line.

## Usage

```html
<vara-footer
  copyright="Acme Inc. &copy; %year%"
  links="About|/about,Privacy|/privacy,Contact|/contact"
  github_href="https://github.com/example/project"
  github_label="Project on GitHub"
/>
```

## Preview

<vara-footer
copyright="Acme Inc. &copy; %year%"
links="Docs|/docs,About|/about,Privacy|/privacy"
github_href="https://github.com/example/project"
github_label="Project on GitHub"
show_credit="false"
/>

## Props

| Prop           | Type   | Default    | Description                                                              |
| -------------- | ------ | ---------- | ------------------------------------------------------------------------ |
| `copyright`    | string | `""`       | Optional copyright text. `%year%` (or `% year %`) uses the current year. |
| `links`        | string | `""`       | Comma-separated `Label\|href` records.                                   |
| `github_href`  | string | `""`       | Optional repository destination.                                         |
| `github_label` | string | `"GitHub"` | Accessible repository-link label.                                        |
| `show_credit`  | string | `"true"`   | Show the veta and veta-theme-vara credits.                               |
| `container`    | string | `"lg"`     | One of: xs, sm, md, lg, xl, full.                                        |
| `class`        | string | `""`       | Additional footer classes.                                               |

## The copyright year

The `%year%` placeholder is replaced with the current year at build time. It tolerates whitespace (`% year %`) and any casing.

Internal links are deployment-aware. The GitHub link opens in a new tab with the appropriate `rel` protection.

## Hiding the credit line

The credit line links to the veta and veta-theme-vara repositories. Set `show_credit="false"` when you prefer a fully silent footer:

```html
<vara-footer
  copyright="&copy; %year% Acme Inc."
  show_credit="false"
/>
```
