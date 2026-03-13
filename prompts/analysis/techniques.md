# Folder Analysis: /prompts/techniques

This report provides a comprehensive analysis of the `techniques/` directory inside the `prompts/` folder, based on direct examination of every file's content.

## Directory Overview

The `techniques/` directory is a flat collection of prompt-engineering reference material. It contains notes, conversation transcripts, and guides focused on how to interact with and instruct large-language-model AI agents.

```text
Files:       6
Directories: 1  (the techniques/ root itself; no subdirectories)
```

The primary purpose of this folder is to store research, examples, and reusable templates related to prompting techniques—specifically contrastive learning / explainability, dual-sided documentation practices, and custom-instruction optimization for ChatGPT-style agents.

## File-Level Analysis

Every file discovered by the recursive scan is listed below with a one-line description derived from its actual content.

```text
techniques/contrastive-learnins.txt        – JSON chat transcript (Groq llama3-8b) exploring contrastive learning, explainability, and self-critic prompting
techniques/cotrastive-learning.txt         – Plain-text assistant response defining contrastive learning and listing its benefits and related papers
techniques/documentation-on-both-sides.md  – Markdown guide formalizing internal vs. external documentation for Hyper-Modular Black-Box modules
techniques/special-instructions_001a.txt   – Condensed ChatGPT custom-instruction profile (user context + response guidelines, version A)
techniques/special-instructions_001b.txt   – Extended ChatGPT custom-instruction profile with additional response rules (version B)
techniques/use-to-instruct.txt             – JSON chat transcript (Groq llama3-70b) on crafting reusable meta-prompts for custom-instruction optimization
```

## Thematic Groupings

Files naturally cluster into three thematic groups.

### Contrastive Learning and Explainability

These files explore the "self-critic" or "contrastive learning" prompting technique—asking an AI to explain its errors to improve future outputs.

- `techniques/contrastive-learnins.txt` — full multi-turn conversation transcript in JSON format
- `techniques/cotrastive-learning.txt` — extracted assistant response (appears to be the first assistant reply from the same or a similar conversation)

### Custom-Instruction Optimization

These files deal with crafting and refining the "Custom Instructions" sections used to personalize ChatGPT and similar agents.

- `techniques/special-instructions_001a.txt` — compact user-profile and response-style rules
- `techniques/special-instructions_001b.txt` — expanded variant with additional numbered guidelines
- `techniques/use-to-instruct.txt` — meta-prompt conversation about generating reusable instruction-optimization queries

### Documentation Methodology

This file stands apart as a formal specification rather than a prompting technique.

- `techniques/documentation-on-both-sides.md` — details how to document internal and external facets of modular components, aligned with the Hyper-Modular Black-Boxes Design (HMBBD) specification

## Unrelated or Misplaced Content

One file does not fit the "prompting techniques" theme of this directory.

- **`techniques/documentation-on-both-sides.md`** — This is a documentation-methodology guide, not a prompting technique. It describes internal vs. external documentation standards for software modules. A more appropriate location would be `prompts/documentation/` or a top-level `docs/` subfolder such as `docs/guidelines/`.

Additionally, two filename issues were observed.

- **`contrastive-learnins.txt`** contains a typo ("learnins" instead of "learning").
- **`cotrastive-learning.txt`** contains a typo ("cotrastive" instead of "contrastive").

These misspellings make the files harder to discover via search.

## Organization Strategy

The following suggestions would improve navigability and reduce confusion.

1. **Fix typos in filenames** — Rename both contrastive-learning files to use the correct spelling (`contrastive-learning-chat.txt` and `contrastive-learning-summary.txt`, for example).
2. **Distinguish format from content** — The JSON chat transcripts (`contrastive-learnins.txt`, `use-to-instruct.txt`) could use a `.json` extension to signal their actual format and enable syntax highlighting.
3. **Relocate the documentation guide** — Move `documentation-on-both-sides.md` to a more appropriate directory (e.g., `docs/guidelines/` or `prompts/documentation/`).
4. **Consolidate the custom-instruction variants** — `special-instructions_001a.txt` and `special-instructions_001b.txt` are nearly identical in the first half. Consider merging them into a single file with clearly marked sections for the base profile and the extended additions.
5. **Add a README** — A short `README.md` in `techniques/` would explain the folder's purpose and list the available technique files with brief descriptions.
6. **Consider subdirectories** — If the collection grows, group files under `techniques/contrastive-learning/`, `techniques/custom-instructions/`, etc.

## Summary Statistics

Breakdown by file extension and aggregate metrics.

```text
Extension   Count   Total Lines   Total Bytes
---------   -----   -----------   -----------
.txt            5           178        31,273
.md             1            82         6,889
---------   -----   -----------   -----------
Total           6           260        38,162
```

Content format breakdown (based on actual content inspection, not extension):

```text
Format                     Count   Files
-------------------------  -----   -----------------------------------------
JSON (API chat transcript)     2   contrastive-learnins.txt, use-to-instruct.txt
Plain text (prose)             3   cotrastive-learning.txt, special-instructions_001a.txt, special-instructions_001b.txt
Markdown                       1   documentation-on-both-sides.md
```
