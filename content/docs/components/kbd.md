---
title: "Keyboard Key"
weight: 60
description: "Display a keyboard key or shortcut segment."
icon: "keyboard"
---

# Keyboard Key

Use `<vara-kbd>` for key names in shortcut instructions. It renders the semantic `<kbd>` element.

## Usage

```html
Press <vara-kbd text="Ctrl" /> + <vara-kbd text="K" /> to search.
```

## Preview

Press <vara-kbd text="Ctrl" /> + <vara-kbd text="K" /> to search.

## Props

| Prop    | Type   | Default      | Description             |
| ------- | ------ | ------------ | ----------------------- |
| `text`  | string | slot content | Key label.              |
| `size`  | string | `"md"`       | One of: sm, md, lg.     |
| `class` | string | `""`         | Additional CSS classes. |

## In a sentence

Combined with Markdown, key names read naturally in instructions:

```html
Press <vara-kbd text="Cmd" /> + <vara-kbd text="Shift" /> + <vara-kbd
  text="P"
/> to open the command palette.
```

## With a slot

The label can also be placed between the tags:

```html
Press <vara-kbd>Enter</vara-kbd> to submit.
```
