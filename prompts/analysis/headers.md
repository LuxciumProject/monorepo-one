# Folder Analysis: /prompts/headers

## Directory Overview

14 files, 2 directories. Primary purpose: a system of emoji-annotated section
headers designed to structure AI assistant output — defines when and how to use
specialized sections like 🧐🧪 Analysis, ⚙️💭 Thought Process,
👩‍🔬⚗️ Synthesis, 🔗💬 Chain of Thought, and 🧑🏻‍🏫📋 Summary. Functions as a
prompt engineering toolkit for structured reasoning output.

## File-Level Analysis

1. `./admonition-and-features.md` — 176 lines, full Markdown demonstration of every official Admonition type plus advanced features (collapsible, custom labels)
2. `./all-in-one-headers-toolings.txt` — 639 lines, comprehensive guide on header section tools: evaluate complexity, determine when to use analysis/synthesis/summary headers
3. `./analyze.txt` — 119 lines, implementing the 🧐🧪 Analysis section header, exploring its potential for deep-diving into topics
4. `./boxed-headers.md` — 129 lines, detailed explanation of each header with IMPORTANT admonition: "Global Rule: Use Only If Justified"
5. `./chain-of-thoughts.txt` — 106 lines, plan for creating 🔗💬 Chain of Thought detailed description, based on Analysis/Thought Process/Synthesis examples
6. `./cot/condensed-cot-001.txt` — 78 lines, ultra-condensed Chain of Thoughts (CoT) framework
7. `./cot/condensed-draft-v2.txt` — 36 lines, Role & Safety AI reasoning assistant definition with Chain-of-Thought framework
8. `./detailled-advanced-headers-use.md` — 121 lines, detailed explanation of each header ("What it is" format) with Global Rule: Use Only If Justified
9. `./headers-explainer.txt` — 14 lines, brief explanations of 🧐🧪 Analysis, ⚙️💭 Thought Process, 👩‍🔬⚗️ Synthesis, and other section headers
10. `./headers-tools.txt` — 96 lines, information pertaining to header sections: evaluate complexity, determine if deeper understanding needed
11. `./improved-output-process-with-headers.md` — 71 lines, section headers as powerful tools, must not be used systematically, only when input requires them
12. `./summary.txt` — 100 lines, implementing 🧑🏻‍🏫📋 Summary section header, based on Analysis/Thought Process/Chain of Thought/Synthesis examples
13. `./synthesis.txt` — 100 lines, implementing 👩‍🔬⚗️ Synthesis section header, the potential and application of synthesis
14. `./thoughts-process.txt` — 106 lines, implementing ⚙️💭 Thought Process section header, enhances problem-solving transparency

## Thematic Groupings

### Group 1: Individual Header Definitions

5 files: `analyze.txt`, `thoughts-process.txt`, `chain-of-thoughts.txt`,
`synthesis.txt`, `summary.txt`. Detailed implementation guides for each
specific header type.

### Group 2: Comprehensive Header Guides

3 files: `all-in-one-headers-toolings.txt`, `headers-tools.txt`,
`headers-explainer.txt`. Combined reference documents covering all headers.

### Group 3: Formatted Header Documentation

3 files: `boxed-headers.md`, `detailled-advanced-headers-use.md`,
`improved-output-process-with-headers.md`. Polished Markdown versions with
admonitions and formatting.

### Group 4: Chain of Thought Framework

2 files in `cot/`: `condensed-cot-001.txt`, `condensed-draft-v2.txt`.
Condensed CoT reasoning frameworks.

### Group 5: Admonition Reference

1 file: `admonition-and-features.md`. Markdown admonition type demonstration.

## Unrelated/Misplaced Content

- `admonition-and-features.md`: Demonstrates Markdown admonition syntax (NOTE, TIP, IMPORTANT, WARNING, CAUTION) — more of a general Markdown reference than a header tool; could belong in a `docs/` or `markdown-reference/` directory.
- Some content overlap between `all-in-one-headers-toolings.txt` and `headers-tools.txt` (both cover evaluation of complexity and when to use headers).
- The `cot/` subdirectory content overlaps thematically with `chain-of-thoughts.txt` in the parent directory.

## Organization Strategy

- Consolidate overlapping content: `all-in-one-headers-toolings.txt` and `headers-tools.txt` cover similar ground.
- Move `cot/` files alongside `chain-of-thoughts.txt` or vice versa for consistency.
- Fix typo in filename: `detailled-advanced-headers-use.md` → `detailed-advanced-headers-use.md`.
- Choose one canonical format (either `.md` or `.txt`) for the individual header definitions.
- Move `admonition-and-features.md` to a general `markdown-reference/` directory.
- Add a `README.md` explaining the header system and how AI agents should use it.
- Consider versioning the comprehensive guides since there are multiple iterations.

## Summary Statistics

File type breakdown: 8 TXT files (57.1%), 4 Markdown files (28.6%), 2 TXT
files in `cot/` subdirectory (14.3%). Total estimated lines: ~1,891.
