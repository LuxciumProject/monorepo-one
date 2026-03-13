# Folder Analysis: /prompts/notebook-lm

This report provides a comprehensive analysis of the `notebook-lm`
directory, which contains source material intended for use with
Google NotebookLM (or a similar AI podcast-generation tool) to
produce the fictional *Tech Stack* podcast.

## Directory Overview

The directory is a flat collection of 8 files with no subdirectories.

| Metric | Value |
|---|---|
| Total files | 8 |
| Total directories | 1 (root only) |
| Total size | ~51 KB |
| Primary purpose | Source material for AI-generated podcast production |

The content splits into two concerns: (1) defining the *Tech Stack*
podcast format, hosts, and production guidelines, and (2) curated
link collections for GitHub Copilot and VS Code documentation that
likely serve as episode research inputs.

## File-Level Analysis

Every file in the directory is listed below with a description
derived from its actual content.

```text
notebook-lm/alison-bio.txt                 (1 093 B,   6 lines)
notebook-lm/github-copilot-links.md        (7 275 B, 155 lines)
notebook-lm/github-copilot-links.txt       (6 632 B, 206 lines)
notebook-lm/robert-bio.txt                 (1 026 B,   6 lines)
notebook-lm/tech-stack-production-notes.md  (3 887 B,  61 lines)
notebook-lm/tech-stack.txt                 (  509 B,   6 lines)
notebook-lm/vscode-menus-links.md          (16 245 B, 462 lines)
notebook-lm/vscode-menus-links.txt         (15 481 B, 685 lines)
```

- **`notebook-lm/alison-bio.txt`** — Character biography for
  Alison, the podcast analyst and resident specialist, describing
  her personality as laid-back, nerdy, and candid.

- **`notebook-lm/robert-bio.txt`** — Character biography for
  Robert, the podcast host and commentator, describing him as a
  geeky, dynamic, and curious knowledgeable generalist.

- **`notebook-lm/tech-stack.txt`** — Brief show-format outline
  defining roles (Robert as Commentator, Alison as Analyst), the
  expert target audience, and a sample intro script template.

- **`notebook-lm/tech-stack-production-notes.md`** — Detailed
  production guide covering the podcast concept, host roles, target
  audience segments, episode structure, discussion style, and
  internal team alignment notes.

- **`notebook-lm/github-copilot-links.md`** — Organized collection
  of full-URL links to the GitHub Copilot documentation, formatted
  as clickable Markdown links grouped by topic (quickstart, setup,
  chat, code review, extensions, etc.).

- **`notebook-lm/github-copilot-links.txt`** — Plain-text version
  of the same GitHub Copilot documentation link set, using relative
  paths (e.g., `/en/copilot/...`) instead of full URLs.

- **`notebook-lm/vscode-menus-links.md`** — Extensive collection of
  full-URL links to VS Code documentation pages organized by sidebar
  menu category (Setup, Get Started, User Guide, Source Control,
  etc.), formatted as clickable Markdown links.

- **`notebook-lm/vscode-menus-links.txt`** — Plain-text version of
  the same VS Code documentation links, using full URLs on separate
  lines beneath heading labels. Contains some HTML scraping
  artifacts (e.g., `aria-expanded="true"`, `aria-label=`).

## Thematic Groupings

The 8 files cluster into three clear thematic groups.

### Podcast Identity and Production

These files collectively define the *Tech Stack* podcast brand,
characters, and episode framework.

```text
notebook-lm/alison-bio.txt
notebook-lm/robert-bio.txt
notebook-lm/tech-stack.txt
notebook-lm/tech-stack-production-notes.md
```

### GitHub Copilot Documentation Links

A paired set providing the same link catalog in two formats—full
Markdown and abbreviated plain text.

```text
notebook-lm/github-copilot-links.md
notebook-lm/github-copilot-links.txt
```

### VS Code Documentation Links

Another paired set covering VS Code docs, again in full-Markdown
and plain-text variants.

```text
notebook-lm/vscode-menus-links.md
notebook-lm/vscode-menus-links.txt
```

## Unrelated or Misplaced Content

No files appear fundamentally misplaced; all relate to podcast
production or its research inputs. However, two observations are
worth noting.

- **Scraping artifacts in `.txt` link files** — Both
  `vscode-menus-links.txt` and `vscode-menus-links.md` contain raw
  HTML fragments such as `aria-expanded="true"` and
  `aria-label="Current Page: Refactoring"`. These are leftover
  scraping artifacts that should be cleaned up.

- **Duplicate link content** — The `.md` and `.txt` pairs for both
  GitHub Copilot and VS Code contain essentially the same
  information in two formats. If both formats are not required by
  NotebookLM ingestion, one could be removed to reduce maintenance
  burden.

## Organization Strategy

The following suggestions could improve the directory's
maintainability and clarity.

1. **Add subdirectories for thematic groups.** Separate podcast
   identity files from research-input link collections:

   ```text
   notebook-lm/
   ├── podcast/
   │   ├── alison-bio.txt
   │   ├── robert-bio.txt
   │   ├── tech-stack.txt
   │   └── tech-stack-production-notes.md
   └── research/
       ├── github-copilot-links.md
       ├── github-copilot-links.txt
       ├── vscode-menus-links.md
       └── vscode-menus-links.txt
   ```

2. **Clean scraping artifacts.** Remove `aria-*` HTML remnants from
   both `vscode-menus-links.md` and `vscode-menus-links.txt`.

3. **Consolidate duplicate link formats.** If both `.md` and `.txt`
   variants are not operationally required, keep only the Markdown
   versions for richer formatting.

4. **Add a README.** A short `README.md` in the directory root
   explaining the directory's purpose and relationship to
   NotebookLM would help future contributors.

5. **Unify host bios into one file.** The two short bio files
   (`alison-bio.txt`, `robert-bio.txt`) could be merged into a
   single `hosts.md` or folded into the production notes.

## Summary Statistics

File type breakdown by extension.

| Extension | Count | Total Size | Description |
|---|---|---|---|
| `.txt` | 4 | ~24.7 KB | Plain-text bios, format outline, and link lists |
| `.md` | 4 | ~27.4 KB | Markdown production notes and link collections |
| **Total** | **8** | **~51 KB** | |

All files are text-based with no binary assets, images, or
configuration files present in the directory.
