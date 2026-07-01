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

## Operational Commands

- Use `task --list-all` as the source of truth for available project commands.
- Do not duplicate or hard-code the command list here.
