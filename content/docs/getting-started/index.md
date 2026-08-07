---
title: "Getting Started"
weight: 2
description: "Install Vara and create your first pages."
icon: "rocket"
---

# Getting Started

This section walks you through adding Vara to a Veta project and creating your first pages.

- **[Installation](./installation/)** - add the theme, wire up the stylesheet, and verify the setup.
- **[Quick Start](./quick-start/)** - create a landing page and a documentation page.

## Prerequisites

- A working [Veta](https://veta.varavel.com) installation.
- A Veta project with a `veta.yaml` file.

## How a Veta page is built

Veta does not infer routes from Markdown files. Instead, JavaScript page generators in `pages/*.js` decide what gets built. Each generator returns an array of pages, and every page names a template from the theme:

```js
export default function({ files, parse }) {
  const md = parse.markdown(files.readFile("content/index.md"));

  return [
    {
      permalink: "/",
      template: "vara-landing",
      title: "Home",
      content: parse.renderComponents(md.html),
    },
  ];
}
```

Once a page exists, everything else - layout, navigation, search, metadata - comes from the template and the site settings you configure in `data/site.yaml`.

The theme includes reference generators for both the landing page and the documentation site. You can use them as a starting point and adapt them to your project.
