# Folder Analysis: /prompts/markdown

This report provides a comprehensive analysis of the `markdown` directory.

## Directory Overview

- **Total files**: 1
- **Total directories**: 1 (`rules/`)
- **Primary purpose**: Houses markdown linting rules and style guidelines as a reference for enforcing consistent Markdown formatting across the project.

## File-Level Analysis

| File | Type | Lines | Description |
|------|------|-------|-------------|
| `rules/markdownrules.txt` | Plain text | 54 | A comprehensive list of markdownlint rules (MD001 through MD042+) with their aliases and one-line descriptions, formatted as a Markdown-style reference. |

### rules/markdownrules.txt

This file is a reference catalog of markdownlint rules. Each entry follows the pattern:

```text
- **[MDXXX](doc/mdXXX.md)** *alias* - Description
```

Rules covered include (non-exhaustive):

- **MD001** `heading-increment` — Heading levels should only increment by one level at a time
- **MD003** `heading-style` — Heading style consistency
- **MD004** `ul-style` — Unordered list style
- **MD009** `no-trailing-spaces` — Trailing spaces
- **MD010** `no-hard-tabs` — Hard tabs
- **MD013** `line-length` — Line length limits
- **MD022** `blanks-around-headings` — Headings surrounded by blank lines
- **MD025** `single-title/single-h1` — Single top-level heading per document
- **MD031** `blanks-around-fences` — Fenced code blocks surrounded by blank lines
- **MD033** `no-inline-html` — Inline HTML avoidance
- **MD040** `fenced-code-language` — Language specified for fenced code blocks
- **MD041** `first-line-heading/first-line-h1` — First line should be a top-level heading
- **MD042** `no-empty-links` — No empty links

The file uses a `markdownlint-disable line-length` pragma at the top, acknowledging that the rule list entries exceed typical line length limits.

## Thematic Groupings

All content belongs to a single theme: **Markdown linting rule reference**. The `rules/` subdirectory provides logical grouping.

## Unrelated/Misplaced Content

No files appear misplaced. The content is directly relevant to the directory's purpose.

## Organization Strategy

- **Current state**: Clean structure with a `rules/` subdirectory. Logical and minimal.
- **Suggestion**: Consider converting `markdownrules.txt` to `markdownrules.md` since the content is already Markdown-formatted (using Markdown links, bold, and italic syntax).
- **Suggestion**: The `doc/mdXXX.md` links in the file reference external markdownlint documentation that does not exist locally. Consider either removing the links or adding a note that they reference the upstream markdownlint repository.
- **Suggestion**: Consider adding a configuration file (e.g., `.markdownlint.jsonc`) alongside the rules reference to show which rules are enabled/disabled in this project.

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total files | 1 |
| Text files (`.txt`) | 1 |
| Markdown files (`.md`) | 0 |
| Subdirectories | 1 |
| Total lines | 54 |
