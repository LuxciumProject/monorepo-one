# Folder Analysis: /prompts/claude-anthropic

## Directory Overview

12 files, 2 directories. Primary purpose: collection of system prompts and
task-specific AI agent instructions, primarily targeting Claude by Anthropic.
Contains Claude 3.5 Sonnet system prompt iterations, specialized agent prompts
(configuration management, HTML extraction, TypeScript transformation), and
coding preference definitions.

## File-Level Analysis

1. `./configuration-manager.txt` — 31 lines, system prompt for a first-class
   AI Agent expert in configuration management for complex Linux systems.
2. `./html-reducer.txt` — 144 lines, system prompt for "HTML EXTRACTOR by
   Luxcium ✨" — AI agent that extracts content from full HTML input.
3. `./module-typescript-placholder-trsnsformation.txt` — 73 lines,
   instructions for converting a TypeScript module into a simplified
   placeholder retaining only type signatures, interfaces, and imports.
4. `./produce-html-from-image.txt` — 35 lines, instructions for an AI agent
   with advanced vision to recreate HTML-CSS from website screen captures.
5. `./prompt-crafter-2-1.txt` — 26 lines, best practices for crafting image
   generation prompts (Midjourney), "describe don't explain" approach.
6. `./system-prompts/claude-v3_5-plain.txt` — 6 lines, plain Claude by
   Anthropic system instructions for a session, concise and relevant.
7. `./system-prompts/claude-v3_5-v1.txt` — 15 lines, Claude system
   instructions v1 with section headers.
8. `./system-prompts/claude-v3_5-v2.txt` — 15 lines, Claude system
   instructions v2, similar structure to v1.
9. `./system-prompts/claude-v3_5-v3.txt` — 31 lines, Claude system
   instructions v3, expanded version.
10. `./system-prompts/complex-prompt-v0_1.md` — 57 lines, Claude 3.5 Sonnet
    system instructions with model_string, knowledge_cutoff, and date_today
    template variables.
11. `./system-prompts/complex-prompt-v0_1.txt` — 57 lines, identical to the
    .md version but with .txt extension.
12. `./system-prompts/partial-coding-preferences.txt` — 82 lines,
    user_preferences XML block with NextJS Development Guidelines, Core
    Architecture starting from app/*/page.tsx.

## Thematic Groupings

- **Group 1: Claude System Prompts** (5 files: claude-v3_5-plain.txt, v1, v2,
  v3, complex-prompt-v0_1.md/.txt) — Iterative versions of Claude session
  system prompts.
- **Group 2: Specialized Agent Prompts** (3 files: configuration-manager.txt,
  html-reducer.txt, module-typescript-placholder-trsnsformation.txt) —
  Task-specific AI agent instructions.
- **Group 3: Vision/Creative Prompts** (2 files: produce-html-from-image.txt,
  prompt-crafter-2-1.txt) — Image-to-HTML and Midjourney prompt crafting.
- **Group 4: User Preferences** (1 file: partial-coding-preferences.txt) —
  NextJS development guidelines in XML format.

## Unrelated/Misplaced Content

- `prompt-crafter-2-1.txt`: Midjourney prompt crafting best practices —
  belongs in the midjourney/ directory alongside the v6/gpt-promptcrafter
  files.
- `complex-prompt-v0_1.md` and `complex-prompt-v0_1.txt`: Duplicate content
  in two formats — only one is needed.
- `partial-coding-preferences.txt`: NextJS coding preferences — more of a
  general project configuration than Claude-specific; could belong in a
  general config/ or coding-preferences/ directory.
- Root-level specialized agent prompts (configuration-manager, html-reducer,
  etc.) are not Claude-specific — they work with any LLM.

## Organization Strategy

- Move prompt-crafter-2-1.txt to midjourney/ directory.
- Remove duplicate: keep either complex-prompt-v0_1.md or .txt, not both.
- Fix typo in filename: "module-typescript-placholder-trsnsformation.txt" →
  "module-typescript-placeholder-transformation.txt".
- Consider splitting into subdirectories: system-prompts/ (already exists),
  agent-prompts/ (configuration-manager, html-reducer, etc.), preferences/
  (partial-coding-preferences).
- Move non-Claude-specific agent prompts to a general agents/ or
  system-prompts/ directory at the prompts/ level.
- Add a README.md explaining the prompt versioning strategy (plain → v1 → v2
  → v3 → complex).

## Summary Statistics

File type breakdown: 8 TXT files (66.7%), 2 Markdown files (16.7%), 1 MD + 1
TXT duplicate pair (noted). Total estimated lines: ~572. System prompt
versions: 5 iterations of Claude system prompts.
