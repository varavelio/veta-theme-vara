---
title: "Keyboard Key"
weight: 60
description: "Display a keyboard key or shortcut segment."
icon: "keyboard"
---

# Keyboard Key

Use `<vara-kbd>` for key names in shortcut instructions. It renders the semantic `<kbd>` element.

## Usage

```md
Press <vara-kbd text="Ctrl" /> + <vara-kbd text="K" /> to search.
```

## Preview

Press <vara-kbd text="Ctrl" /> + <vara-kbd text="K" /> to search.

## Props

| Prop    | Default      | Description             |
| ------- | ------------ | ----------------------- |
| `text`  | slot content | Key label.              |
| `size`  | `"md"`       | sm, md, or lg.          |
| `class` | `""`         | Additional CSS classes. |
