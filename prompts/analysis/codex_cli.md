# Folder Analysis: /prompts/codex_cli

This report provides a comprehensive analysis of the `codex_cli` directory.

## Directory Overview

- **Total files**: 1
- **Total directories**: 0 (root only)
- **Primary purpose**: Archives the system instructions (system prompt) for the OpenAI Codex CLI agent, capturing the exact prompt configuration as of a specific date.

## File-Level Analysis

| File | Type | Lines | Description |
|------|------|-------|-------------|
| `SystemInstructions-09-juil-2025.md` | Markdown | 91 | Full system instructions for the Codex CLI deployed coding agent, including coding guidelines, patch format specification, and behavioral rules. |

### SystemInstructions-09-juil-2025.md

This file is a snapshot of the Codex CLI system prompt dated July 9, 2025. Key sections include:

- **Agent identity**: Defines the agent as a deployed coding agent working in a container with pre-cloned repos.
- **Operational rules**: Allows analyzing proprietary code, vulnerability scanning, and showing tool call details.
- **Tool preferences**: Mandates `rg` (ripgrep) over `ls -R`, `find`, or `grep` for performance in large repos.
- **Patch format**: Specifies the `apply_patch` tool for file edits with a precise diff-like syntax.
- **Coding guidelines**: Root-cause fixes, minimal changes, style consistency, no copyright headers, pre-commit checks.
- **Post-coding checklist**: `git status` sanity check, inline comment removal, copyright header removal, pre-commit run.
- **Response format**: Brief bullet points for small tasks, detailed descriptions for complex ones.
- **Non-coding behavior**: Friendly remote teammate persona for question-based interactions.

## Thematic Groupings

All content belongs to a single theme: **Codex CLI agent system prompt documentation**. The file is monolithic and well-structured internally.

## Unrelated/Misplaced Content

No files appear misplaced. The directory serves as a focused archive of a specific agent's configuration.

## Organization Strategy

- **Current state**: Clean single-file directory. Appropriate for archival.
- **Suggestion**: If additional system prompt versions are archived, adopt a date-based naming convention (e.g., `YYYY-MM-DD-system-instructions.md`) for consistency and sorting.
- **Suggestion**: The filename uses French date format (`juil` for July). Consider standardizing to ISO date format for international clarity.

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total files | 1 |
| Text files (`.txt`) | 0 |
| Markdown files (`.md`) | 1 |
| Total lines | 91 |
