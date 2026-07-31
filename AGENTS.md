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

- `templates/` contains Pongo page templates. The supported page templates are `templates/vara-landing.j2`, `templates/vara-docs.j2`, `templates/vara-docs-raw.j2`, `templates/vara-docs-llms-txt.j2`, `templates/vara-docs-llms-full-txt.j2`, `templates/vara-sitemap-xml.j2`, and `templates/vara-404.j2`.
- `components/` contains Veta components. Every component filename and tag must use the `vara-` prefix and kebab-case (for example, `vara-alert.j2` and `<vara-alert>`).
- `filters/` contains distributable JS filters. Every filter filename and template filter name must use the `vara_` prefix because these ship in the consuming project's global namespace.
- `functions/` contains JS template functions. Every function filename and template function name must use the `vara_` prefix because these ship in the consuming project's global namespace.
- `data/site_default.js` contains theme defaults. `data/site.yaml` is the showcase override. In Pongo templates and components, resolve these values with `vara_site_setting("specific_key", "fallback_key")`; it checks each key in `data.site` and then `data.site_default`. Keep literal defaults in the template with the `default` filter.
- `docs_sidebar_sections` creates or extends weighted docs sidebar sections. It merges with generated sections by stable `id` (the first permalink segment below the docs root), and links with matching normalized `href` values are merged rather than duplicated.
- `vara-docs-raw` expects raw content in `page.content` and an exact-extension permalink such as `/docs/guide/index.md`. When `docs_llms_index` is enabled, it prepends a hierarchical index of every page using that template.
- `vara-docs-llms-txt` and `vara-docs-llms-full-txt` generate documentation-wide indexes from all `vara-docs-raw` pages. Use them for root-level `/docs/llms.txt` and `/docs/llms-full.txt` outputs; the full variant also concatenates every raw content body.
- `vara-sitemap-xml` lists every generated page except itself and pages with `sitemap: false`. Configure `site_url` for protocol-compliant absolute locations; without it, local builds use root-relative permalinks.
- All theme-owned public assets must stay under `public/_vara/` to avoid collisions with consuming projects.
- `pages/` and `content/` belong to the showcase, not the distributable theme.

## Working with JavaScript

- Before modifying or adding any JavaScript under `public/_vara/js/`, read `public/_vara/js/README.md` first. It explains the directory layout, bundling rules, and the role of each module.
- JS source modules under `public/_vara/js/src/` use modern ES syntax (esbuild handles transpilation).
- JS source inside `pages/*.js`, `data/*.js`, `filters/*.js`, `functions/*.js` are constrained by Goja and are synchronous only.

## Operational Commands

- Use `task --list-all` as the source of truth for available project commands.
- Do not duplicate or hard-code the command list here.
