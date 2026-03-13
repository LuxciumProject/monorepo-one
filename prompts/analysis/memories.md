# Folder Analysis: /prompts/memories

## Directory Overview

15 files, 1 directory (flat structure). Primary purpose: archive of
ChatGPT and AI assistant "memories" — saved user preferences, working
habits, coding conventions, and session context that the user
(Benjamin/Luxcium) has accumulated across multiple AI chat sessions
from January 2024 through May 2025.

## File-Level Analysis

1. `20240103-memories-processed.txt` — 160 lines, processed/condensed version of memories: radically simplified instructions to essential semantic core, eliminated non-critical words
2. `20240103-memories.txt` — 666 lines, raw ChatGPT memories: VS Code setup on SDA4 partition, SDA7 for Monorepo files, detailed user preferences and habits
3. `20241027-memories.txt` — 397 lines, memories about RushStack package manager usage, pnpm run scripts, monorepo-one conventions
4. `20241125-memories.txt` — 461 lines, memories requiring code sections with proper fencing, outermost blocks use ~~~, subsections inside
5. `apex-transient-memories.txt` — 936 lines, instructions to split into independent rephrased biograms, optimize for LLM token density, maximize information
6. `memories-002.txt` — 61 lines, French-language memories: user is male, born in Quebec City, speaks French
7. `memories-003.txt` — 96 lines, French-language memories: user uses iOS ChatGPT app, frustration with slow versions, limiting real-time code testing
8. `memories-004.txt` — 7 lines, reference to git file paths on github.com/LuxciumProject/monorepo-one for IDPAC.txt
9. `memories-005.txt` — 91 lines, French-language comparison/integration of long-form user instructions with jointly-formulated concise directives
10. `memories-006.txt` — 87 lines, English memories: works in small incremental steps, uses GitHub Copilot for unit tests, forming a team
11. `memories-2024-09september.txt` — 243 lines, September 2024 memories: one item per code block for copy-paste, merge items meant to be copied together
12. `memories-antropic.txt` — 15 lines, French-language Claude 3 system prompt: "Je suis Claude 3" agent instructions for Anthropic LLM
13. `memories-august-20-2024.txt` — 175 lines, memories about Next.js project development, modular/incremental/iterative approach with ChatGPT
14. `memories-may-21st.txt` — 150 lines, French memories: user is male, born in Quebec, speaks French (similar to memories-002)
15. `memories-may-25-2025.txt` — 527 lines, French "Mémoires enregistrées" — exported ChatGPT saved memories, comprehensive collection

## Thematic Groupings

- **Group 1: Date-Stamped Raw Memory Exports** (7 files: 20240103, 20241027, 20241125, 2024-09september, august-20-2024, may-21st, may-25-2025) — Chronological snapshots of saved AI memories
- **Group 2: Numbered Memory Collections** (4 files: memories-002 through 006) — Sequentially numbered memory sets, mix of French and English
- **Group 3: Processed/Optimized Memories** (2 files: 20240103-memories-processed.txt, apex-transient-memories.txt) — Condensed and optimized versions for token efficiency
- **Group 4: Non-ChatGPT AI Memories** (1 file: memories-antropic.txt) — Claude 3 system prompt in French
- **Group 5: File Path References** (1 file: memories-004.txt) — Brief reference to GitHub repository paths

## Unrelated/Misplaced Content

- `memories-antropic.txt`: Claude 3 system prompt — this is a system prompt, not a "memory"; belongs in claude-anthropic/system-prompts/
- `memories-004.txt`: Just a file path reference (7 lines) — more of a note than a memory
- Significant overlap between memories-002, memories-005, memories-may-21st (all contain similar French-language user bio info)
- Note typo: "antropic" should be "anthropic"

## Organization Strategy

- Adopt a consistent naming convention: either date-prefix (YYYYMMDD-) or sequential numbering, not both
- Consolidate overlapping French-language bio memories (002, 005, may-21st) into one canonical file
- Move memories-antropic.txt to claude-anthropic/ directory
- Fix filename typo: "memories-antropic.txt" → "memories-anthropic.txt"
- Add a README.md explaining the memory archive purpose and chronology
- Consider organizing by language (en/ and fr/ subdirectories) since content is mixed French/English
- The processed/apex files are valuable — consider a "processed/" subdirectory

## Summary Statistics

File type breakdown: 15 TXT files (100%). Language: ~7 primarily
English, ~5 primarily French, ~3 mixed. Total estimated lines: ~4,071.
Date range: January 2024 to May 2025.
