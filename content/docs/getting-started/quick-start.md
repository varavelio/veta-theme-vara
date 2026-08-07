---
title: "Quick Start"
weight: 2
description: "Create a landing page and a documentation page with Vara."
icon: "zap"
---

# Quick Start

This guide creates a project with a landing page at `/` and a small documentation site at `/docs/`.

## 1. Create the landing page generator

Create `pages/pages.js` to render `content/index.md` with the `vara-landing` template:

```js
export default function({ data, files, parse }) {
  const md = parse.markdown(files.readFile("content/index.md"));

  return [
    {
      permalink: "/",
      template: "vara-landing",
      title: md.frontmatter.title || data.site.title,
      description: md.frontmatter.description || data.site.description,
      content: parse.renderComponents(md.html),
    },
  ];
}
```

## 2. Write the landing page

Create `content/index.md` and compose it with Vara components:

```md
---
title: "My Project"
description: "A short description of the project."
---

<vara-hero
  title="Welcome to my project"
  description="A clear sentence about what this project does and who it is for."
  primary_label="Get started"
  primary_href="/docs/"
  secondary_label="View on GitHub"
  secondary_href="https://github.com/example/project"
/>
```

## 3. Create the documentation generator

Create `pages/docs.js` to turn every Markdown file under `content/docs/` into a page using the `vara-docs` template:

```js
export default function({ files, parse }) {
  return files.listFiles("content/docs/**/*.md").map((path) => {
    const page = parse.markdown(files.readFile(path));

    return {
      permalink: files.toPermalink(path, { stripPrefix: "content/" }),
      template: "vara-docs",
      title: page.frontmatter.title || "Untitled",
      description: page.frontmatter.description || "",
      weight: Number(page.frontmatter.weight) || 999999,
      icon: page.frontmatter.icon || "",
      content: parse.renderComponents(page.html),
    };
  });
}
```

## 4. Add a documentation page

Create `content/docs/getting-started/hello.md`:

```md
---
title: "Hello"
weight: 1
---

# Hello

This is my first documentation page.
```

Add an index page at `content/docs/index.md` if you want a landing page for the section:

```md
---
title: "Documentation"
weight: 0
---

# Documentation

The documentation for my project lives here.
```

## 5. Configure the site

Add a `data/site.yaml`:

```yaml
title: "My Project"
description: "A short description of the project."
site_url: "https://example.com"
```

## 6. Run it

```sh
veta dev
```

Visit `/` for the landing page and `/docs/getting-started/hello/` for the documentation page.

## Next steps

- Learn how documentation pages are organized in [Page generators](../fundamentals/page-generators/).
- Customize the sidebar, search, and branding in [Site settings](../fundamentals/site-settings/).
- Browse the [components](../components/) to enrich your content.
