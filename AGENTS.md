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

- `templates/` contains Pongo page templates. The supported page templates are `templates/veta/landing.j2`, `templates/veta/docs.j2`, and `templates/veta/404.j2`.
- `components/` contains Veta components. Component tag names use kebab-case because Veta component names cannot use underscores.
- `filters/` contains distributable JS filters. These ARE part of the theme overlay and ship to consuming projects.
- `functions/` contains JS template functions. These ARE part of the theme overlay and ship to consuming projects.
- `data/site_default.js` contains theme defaults. `data/site.yaml` is the showcase override. In Pongo templates and components, resolve these values with `site_setting("specific_key", "fallback_key")`; it checks each key in `data.site` and then `data.site_default`. Keep literal defaults in the template with the `default` filter.
- All theme-owned public assets must stay under `public/_vara/` to avoid collisions with consuming projects.
- `pages/` and `content/` belong to the showcase, not the distributable theme.

## Working with JavaScript

- Before modifying or adding any JavaScript under `public/_vara/js/`, read `public/_vara/js/README.md` first. It explains the directory layout, bundling rules, and the role of each module.
- JS source modules under `public/_vara/js/src/` use modern ES syntax (esbuild handles transpilation).
- JS source inside `pages/*.js`, `data/*.js`, `filters/*.js`, `functions/*.js` are constrained by Goja and are synchronous only.

## Operational Commands

- Use `task --list-all` as the source of truth for available project commands.
- Do not duplicate or hard-code the command list here.
