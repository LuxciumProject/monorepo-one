# Folder Analysis: /prompts/github-copilot

## Directory Overview

15 files, 2 directories. Primary purpose: GitHub Copilot configuration
research and instruction-file authoring conversation archive. Contains
VS Code Copilot documentation references, a multi-part ChatGPT
conversation about creating `.instructions.md` and `.prompt.md` files,
and related tooling notes.

## File-Level Analysis

1. `./prompts-instructions/cahtgpt-biograms-template.txt` — 5 lines, French-language ChatGPT biogram template (`to=bio`, Type, Contexte, Instruction fields)
2. `./prompts-instructions/copilot-customization.md` — 405 lines, VS Code Copilot customization documentation (ContentId, DateApproved metadata) covering instruction files, custom chat modes, and settings
3. `./prompts-instructions/copilot-settings.md` — 122 lines, VS Code Copilot settings documentation with ContentId metadata
4. `./prompts-instructions/message-001.txt` — 18 lines, user-assistant pair #1 asking for help on a topic
5. `./prompts-instructions/message-002.txt` — 36 lines, pair #2 about writing `.instructions.md` configuration documents
6. `./prompts-instructions/message-003.txt` — 48 lines, pair #3 about preparing a project using instruction file types
7. `./prompts-instructions/message-004.txt` — 32 lines, pair #4 about creating a multipurpose folder at project root
8. `./prompts-instructions/message-005.txt` — 157 lines, pair #5 explaining how to create `*.prompt.md` files for AI agents
9. `./prompts-instructions/message-006.txt` — 111 lines, pair #6 about when, why, and how AI agents should create instruction files
10. `./prompts-instructions/message-007.txt` — 59 lines, pair #7 about creating `*.instruction.md` files
11. `./prompts-instructions/message-008.txt` — 77 lines, pair #8 making instruction file compliant with markdown-lint strictness
12. `./prompts-instructions/message-009.txt` — 95 lines, pair #9 creating `*.prompt.md` version with same information
13. `./prompts-instructions/message-full.txt` — 3070 lines, concatenated full conversation (all 9 message pairs combined)
14. `./tool-used-to-configure-notebook.md` — 77 lines, instructions for configuring a Notebook tool before running cells or installing packages
15. `./vscode-links.md.txt` — 22 lines, VS Code Copilot documentation links with instruction to always fetch latest official docs

## Thematic Groupings

- **Group 1 — Copilot Documentation References** (3 files: `copilot-customization.md`, `copilot-settings.md`, `vscode-links.md.txt`): Official VS Code Copilot docs and links.
- **Group 2 — Instruction File Authoring Conversation** (10 files: `message-001` through `message-009` plus `message-full.txt`): Sequential ChatGPT conversation about creating `.instructions.md` and `.prompt.md` files.
- **Group 3 — Tooling Notes** (1 file: `tool-used-to-configure-notebook.md`): Notebook configuration tool instructions.
- **Group 4 — Biogram Template** (1 file: `cahtgpt-biograms-template.txt`): French-language ChatGPT bio template.

## Unrelated or Misplaced Content

- `cahtgpt-biograms-template.txt`: Filename has typo ("cahtgpt" should be "chatgpt"); French-language biogram template for ChatGPT bio — not specifically about GitHub Copilot.
- `tool-used-to-configure-notebook.md`: Notebook configuration tool — tangentially related at best.
- `message-full.txt` is redundant with `message-001` through `message-009` (it is the concatenation of all parts).

## Organization Strategy

- Fix typo in filename: `cahtgpt-biograms-template.txt` → `chatgpt-biograms-template.txt`.
- Move `cahtgpt-biograms-template.txt` to a more appropriate location (e.g., `prompts/memories/` or `prompts/chatgpt/`).
- Consider keeping either `message-full.txt` OR the individual `message-NNN.txt` files, not both.
- Move `tool-used-to-configure-notebook.md` to a `tools/` or `notebooks/` directory.
- Rename `vscode-links.md.txt` to `vscode-links.md` (drop the double extension).
- Add a `README.md` explaining this is a research archive about Copilot instruction files.

## Summary Statistics

| Category | Count | Percentage |
| --- | --- | --- |
| TXT files | 11 | 73.3% |
| Markdown files | 3 | 20.0% |
| Markdown-TXT hybrid | 1 | 6.7% |
