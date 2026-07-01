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

- Veta allows template and component files to have any extension, but this project always uses the `.j2` extension because that way the `task format` command will automatically detect and format the pongo syntax using dprint (pongo syntax is the same as jinja syntax, that's why we do this).
- When injecting string values into Alpine attributes, avoid raw JSON double-quoted strings inside double-quoted HTML attributes. Prefer a single-quoted JavaScript string literal inside the attribute so dprint formatting and HTML minification do not split the expression.

## Theme Structure

- `templates/` contains Pongo page templates. `landing.j2` are for landing pages, `docs.j2` are for docs pages, `blog.j2`/`post.j2` are for blog pages, and `404.j2` is rendered only when a page generator explicitly creates that page.
- `components/` contains Veta components. Component tag names use kebab-case because Veta component names cannot use underscores.
- `templates/macros/` contains shared Pongo macros used internally by templates and components. Public component APIs still use `class`; macro internals use `extra_class` because Pongo rejects `class=` as a macro call keyword.
- `filters/` contains veta JS filters.
- `data/site_default.js`/`data/site.yaml` contains theme defaults. Templates read site/theme metadata from `data.site or data.site_default` so the user can override only some parts of the data.
- All theme-owned public assets must stay under `public/_vara/` to avoid collisions with consuming projects.

## Working with JavaScript

- Before modifying or adding any JavaScript in this project, read `public/_vara/js/README.md` first. It explains the directory layout, bundling rules, and the role of each module.

## Operational Commands

- Use `task --list-all` as the source of truth for available project commands.
- Do not duplicate or hard-code the command list here.
