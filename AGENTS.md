# Agent Context for veta-theme-vara

## Summary

This file defines the project-wide operating rules for AI agents working in this repository. Keep it concise, durable, and focused on guidance that helps future agents work correctly.

## Maintaining this Document

After completing any task, review this file and update it if you made structural changes or discovered patterns worth documenting. Only add information that helps understand how to work with the project. Avoid implementation details, file listings, or trivial changes. This is a general guide, not a changelog.

When updating this document, do so with the context of the entire document in mind; do not simply add new sections at the end, but place them where they make the most sense within the context of the document.

## General Instructions

You MUST follow the following instructions:

- At the start of every new assigned task or request, first run `task --list-all` to get the full current list of project commands. Do not hard-code the command list in this document because it will change over time.
- Whenever a new task or request is assigned, keep working without stopping until the task is fully completed.
- All written code must be professional, idiomatic, readable, and maintainable. Maintainability and readability are the top priority.
- Note that the command `task dev` will lock the terminal; use the command `task build` instead.
- You are inside a development container running debian, you can install anything you want to help with your work.

## Formatting & Quality

- Veta templates and components use the `.j2` extension, but `dprint.json` explicitly excludes `.j2`; format Pongo/Jinja files manually rather than relying on `task format`.
- Veta's Pongo lexer does not allow newlines within a single `{% ... %}` tag or `{{ ... }}` expression. Keep every tag or expression—including long macro calls—on one physical line while formatting the surrounding HTML readably.
- When injecting string values into Alpine attributes, avoid raw JSON double-quoted strings inside double-quoted HTML attributes. Prefer a single-quoted JavaScript string literal inside the attribute so dprint formatting and HTML minification do not split the expression.

## Theme Structure

- `templates/` contains Pongo page templates. The supported page templates are `templates/vara-landing.j2`, `templates/vara-docs.j2`, `templates/vara-docs-raw.j2`, `templates/vara-docs-search-index.j2`, `templates/vara-docs-llms-txt.j2`, `templates/vara-docs-llms-full-txt.j2`, `templates/vara-sitemap-xml.j2`, and `templates/vara-404.j2`. `templates/vara-icons-catalog.j2` is an internal catalog served at `/icons/` by the showcase `pages/pages.js` and is linked from the docs as the icon-name explorer; consuming projects only get the route if they create it, and its metadata comes from the generated `templates/vara/icons/icons.json` manifest.
- `components/` contains Veta components. Every component filename and tag must use the `vara-` prefix and kebab-case (for example, `vara-alert.j2` and `<vara-alert>`).
- Keep the public component collection small and general-purpose; domain-specific recipes belong in consuming projects. Every public component must be documented in `content/docs/components/`, either in its own page or within the page of a parent component; `tests/components_docs.test.js` enforces coverage, example, and catalog parity.
- Component attributes are strings. Use quoted `"true"`/`"false"` booleans, consistent `*_label`/`*_href` action pairs, and `item_N_*` families for bounded records. Resolve internal links and assets with `url()`.
- `filters/` contains distributable JS filters. Every filter filename and template filter name must use the `vara_` prefix because these ship in the consuming project's global namespace.
- `functions/` contains JS template functions. Every function filename and template function name must use the `vara_` prefix because these ship in the consuming project's global namespace.
- `data/site_default.js` contains theme defaults. `data/site.yaml` is the showcase override. In Pongo templates and components, resolve these values with `vara_site_setting("specific_key", "fallback_key")`; it checks each key in `data.site` and then `data.site_default`. Keep literal defaults in the template with the `default` filter.
- `not_found_links` configures ordered links on the 404 page. Each link requires `title` and `href`, with optional `icon` and `new_tab`; the first valid link is the primary action and later links are secondary.
- `docs_header_links` adds ordered links to the desktop docs header and mobile navigation drawer. Each link requires `title` and `href`, with optional `new_tab` and `icon` values.
- `page.docs_footer_links` adds opt-in links between a documentation page's content and pager. Each link requires `title` and a final `href`, with optional `icon`; `new_tab` defaults to `true`. The page generator owns source-specific URL construction.
- `docs_sidebar_sections` creates or extends weighted docs sidebar sections. It merges with generated sections by stable `id` (the first permalink segment below the docs root), and links with matching normalized `href` values are merged rather than duplicated.
- Vara supports one documentation collection per generated site. `docs_root_permalink` is its normalized logical root and defaults to `/docs/`; it may be nested or `/`. Deployment prefixes belong in `site_url`, not in docs permalinks.
- The docs table of contents is built client-side from rendered `h2` and `h3` elements; do not add TOC metadata to page generators.
- Docs heading hashes and TOC links scroll the internal `main` container smoothly.
- `docs_shiki` enables client-side syntax highlighting with the fixed `github-light` and `github-dark` themes and defaults to `true`. Vara overrides only their backgrounds to fit the theme surfaces and renders that final background while highlighting loads. Languages are detected from rendered `language-*` classes and loaded on demand. Entries in `docs_shiki_custom_languages` require an exact `id` and a CORS-accessible TextMate grammar `url`; the ID must match the code fence language.
- `docs_credits_footer` enables the credit footer below the documentation content and defaults to `true`. It renders "Built with veta and veta-theme-vara" after the pager.
- `docs_search` enables local client-side documentation search and defaults to `true`. `docs_search_index_permalink` is the index's complete logical route, defaults to `/docs/vara-docs-search-index.json`, and is independent of the docs root. The generator must create that route with `vara-docs-search-index`; the UI reports a configuration error if it is missing. Every `vara-docs` page under the configured root is included unless it sets `disable_search: true`.
- `vara-docs-raw` expects raw content in `page.content` and an exact-extension permalink such as `/docs/guide/index.md`. When `docs_llms_index` is enabled, it prepends a hierarchical index of every page using that template.
- `vara-docs-llms-txt` and `vara-docs-llms-full-txt` generate indexes from `vara-docs-raw` pages under the configured docs root. The full variant also concatenates every included raw content body.
- `site_url` is the public base URL for canonical and Open Graph metadata, sitemap locations, and generated Markdown documentation indexes. Resolve these external-facing URLs with `vara_absolute_url`; keep interactive navigation and asset URLs on Veta's relative `url()` helper so local previews remain navigable. Missing or invalid values fall back to root-relative URLs.
- `vara-sitemap-xml` includes normalized, unique HTML routes by default. `sitemap: false` always excludes a page; non-HTML outputs require `sitemap: true` to opt in.
- All theme-owned public assets must stay under `public/_vara/` to avoid collisions with consuming projects.
- `pages/` and `content/` belong to the showcase, not the distributable theme.

## Working with JavaScript

- Before modifying or adding any JavaScript under `public/_vara/js/`, read `public/_vara/js/README.md` first. It explains the directory layout, bundling rules, and the role of each module.
- Keep Shiki loading-state, theme, code-block, and copy-button styles centralized in `public/_vara/css/shiki.css`.
- JS source modules under `public/_vara/js/src/` use modern ES syntax (esbuild handles transpilation).
- `vara-landing` loads the `landing` bundle, which starts Alpine and registers shared theme controls for interactive public components.
- JS source inside `pages/*.js`, `data/*.js`, `filters/*.js`, `functions/*.js` are constrained by Goja and are synchronous only.

## Operational Commands

- Use `task --list-all` as the source of truth for available project commands.
- Do not duplicate or hard-code the command list here.
