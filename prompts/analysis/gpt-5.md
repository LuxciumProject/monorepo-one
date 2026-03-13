# Folder Analysis: /prompts/gpt-5

This report provides a comprehensive analysis of the `gpt-5` directory within the prompts collection.

## Directory Overview

The `gpt-5` directory contains materials related to GPT-5 model behavior, prompt templates, and rhetorical frameworks for AI interaction design.

- **File count:** 5
- **Directory count:** 1 (root only)
- **Primary purpose:** GPT-5 prompt engineering templates, system prompt references, and escalation rhetoric frameworks

```
gpt-5/
├── You are ChatGPT, a large language model .txt
├── canonical-prompt-shape-one.md
├── canonical-prompt-shape-two.md
├── escalation-rethoric.md
└── goals-headers-variations.txt
```

## File-Level Analysis

Every file in the directory is listed below with a content-based description.

| File | Lines | Description |
|------|-------|-------------|
| `You are ChatGPT, a large language model .txt` | 596 | Full ChatGPT system prompt dump including knowledge cutoff, tool definitions, and behavioral instructions |
| `canonical-prompt-shape-one.md` | 44 | Front-matter-style prompt card template with a one-sentence purpose descriptor and structured sections |
| `canonical-prompt-shape-two.md` | 43 | Second variant of the canonical prompt card template with slightly different structural layout |
| `escalation-rethoric.md` | 78 | A metaphor-free, general framework for escalation-by-rhetoric abstracted from specific cases |
| `goals-headers-variations.txt` | 42 | Twenty concise header variants for standardizing section names (Objective, Strategy, Run Log, Outcomes) |

## Thematic Groupings

Files in this directory cluster into three thematic groups based on content analysis.

### Prompt Templates

These files define reusable structural templates for prompt cards.

- `canonical-prompt-shape-one.md`
- `canonical-prompt-shape-two.md`

### System Prompt Reference

This file serves as a raw reference capture of a production system prompt.

- `You are ChatGPT, a large language model .txt`

### Communication Frameworks

These files address rhetorical and organizational strategies for AI interactions.

- `escalation-rethoric.md`
- `goals-headers-variations.txt`

## Unrelated/Misplaced Content

Several naming and placement issues were identified during analysis.

- **`You are ChatGPT, a large language model .txt`** — The filename contains spaces and a trailing space before the extension, making it fragile for command-line use. It also references ChatGPT rather than GPT-5, so its placement in this folder is questionable.
- **`escalation-rethoric.md`** — Contains a typo: "rethoric" should be "rhetoric." The content is about general rhetorical escalation, not GPT-5-specific, and could belong in `techniques/`.
- **`goals-headers-variations.txt`** — A utility file about header standardization that is not GPT-5-specific; could live in `meta/` or a shared utilities folder.

## Organization Strategy

The following improvements would strengthen this directory's coherence.

1. **Fix filename issues** — Rename `You are ChatGPT, a large language model .txt` to `chatgpt-system-prompt.txt` (kebab-case, no spaces)
2. **Fix typo** — Rename `escalation-rethoric.md` to `escalation-rhetoric.md`
3. **Relocate generic files** — Move `goals-headers-variations.txt` to `meta/` and `escalation-rethoric.md` to `techniques/`
4. **Convert `.txt` to `.md`** — The system prompt and header variations would benefit from Markdown formatting
5. **Add a README** — Include a brief `README.md` explaining the folder's purpose and relationship to the canonical prompt shape templates

## Summary Statistics

Breakdown of files by type and category.

| Extension | Count |
|-----------|-------|
| `.txt`    | 2     |
| `.md`     | 3     |

| Category             | Count |
|----------------------|-------|
| Prompt templates     | 2     |
| System prompt dumps  | 1     |
| Rhetoric/strategy    | 1     |
| Header variants      | 1     |

**Total lines:** 803
