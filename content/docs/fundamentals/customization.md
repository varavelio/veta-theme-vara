---
title: "Customization"
weight: 5
description: "Colors, fonts, icons, dark mode, and overriding the theme."
icon: "palette"
---

# Customization

Vara is designed to look good on its own, but it is meant to be adapted. Because the theme is built with Tailwind CSS and structured around Veta's concepts, most customizations stay small and local to your project.

## Colors

Vara uses a small set of design tokens that map to Tailwind utility classes:

| Token           | Light       | Dark        | Typical use              |
| --------------- | ----------- | ----------- | ------------------------ |
| `base-100`      | white       | black       | Page and header surfaces |
| `base-200`      | neutral-100 | neutral-900 | Card and panel surfaces  |
| `base-300`      | neutral-200 | neutral-800 | Hover surfaces           |
| `base-400`      | neutral-300 | neutral-700 | Borders and dividers     |
| `content`       | neutral-950 | neutral-50  | Primary text             |
| `content-muted` | neutral-500 | neutral-400 | Secondary text           |
| `info`          | blue-500    | blue-500    | Informational accents    |
| `success`       | emerald-500 | emerald-500 | Success accents          |
| `warning`       | orange-500  | orange-500  | Warning accents          |
| `error`         | red-500     | red-500     | Error accents            |

Components use these tokens directly, so changing them restyles the whole site. Add your own overrides after the theme import in your stylesheet:

```css
@import "./_vara/css/base.css";

@theme {
  --color-info: var(--color-sky-500);
}
```

The full token definitions live in `public/_vara/css/base.css`.

## Dark mode

Light and dark mode are built in. The theme starts by following the operating system preference, remembers the visitor's choice in `localStorage`, and reacts to system changes while it is set to "system".

Landing pages get a theme picker through the `<vara-header>` component, and documentation pages always show one in the header. The picker offers System, Light, and Dark.

## Typography

Vara ships with the Geist Sans and Geist Mono variable fonts, self-hosted under `public/_vara/fonts/` so no external requests are needed. Sans is used for interface and content text; mono is used for code, keyboard keys, and metrics.

Add a `font-sans` or `font-mono` override in your stylesheet to change the families site-wide.

## Icons

The theme bundles an icon set with thousands of SVGs - Lucide icons plus Simple Icons - stored under `templates/vara/icons/`. Use them anywhere with the `<vara-icon>` component:

```html
<vara-icon name="rocket" class="size-6 text-info" />
```

Lucide names collide with Simple Icons names on purpose; when that happens, the Simple Icons variant is prefixed with `si-` (for example, `x` is the Lucide version and `si-x` is the brand version).

To use an icon in your own template, call the `vara_icon` function with the icon name and optional classes:

```
{{ vara_icon("check", "size-4") | safe }}
```

Missing icons render a visible warning glyph instead of breaking the build.

## Writing content

### Component attributes

Component attributes are strings. Quote every value, use `"true"` / `"false"` for booleans, and use the predictable `item_N_*` families for bounded lists of records.

Markdown inside a component's body is rendered before the component resolves it, so paired components receive real HTML, not raw Markdown. Set `class` on a component to extend it with your own utilities.

### Links and assets

Use root-relative paths for internal links and assets. Vara resolves them with Veta's deployment-aware `url()` helper, so your site keeps working when deployed below a path prefix. When a link opens in a new tab, the theme adds `rel="noopener noreferrer"` automatically.

## Overriding the theme

Veta composes the theme and the project into one filesystem, and project files win. To customize the theme without forking it, add files with the same path to your project:

```txt
theme/templates/vara-docs.j2
templates/vara-docs.j2        # your override
```

You can override a template, replace a component, or extend the styles. The rest of the theme keeps working as before.

### Adding your own components

Components are just templates in `components/`. Add a new file there, and it becomes available as a custom tag in your content:

```html
<my-project-cta title="Ship it" />
```

Your components can import the theme's macros and call its functions, so they stay consistent with the rest of the site. Keep domain-specific components in your project - the theme's own collection stays small and general-purpose by design.
