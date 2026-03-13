# Folder Analysis: /prompts/vocabulary

This report provides a comprehensive analysis of the `vocabulary` directory within the prompts collection.

## Directory Overview

The `vocabulary` directory contains structured linguistic reference materials defining modifier affixes and prefix modifiers used in prompt engineering and AI instruction design.

- **File count:** 3
- **Directory count:** 1 (root only)
- **Primary purpose:** Cataloguing modifier words (prefixes, suffixes, affixes) that recalibrate meaning in prompt construction and AI steering

```
vocabulary/
├── affixes-details.md
├── afixes.md
└── modifiers.md
```

## File-Level Analysis

Every file in the directory is listed below with a content-based description.

| File | Lines | Description |
|------|-------|-------------|
| `affixes-details.md` | 139 | Detailed breakdown of modifier affixes — words that recalibrate base concepts along performance, quality, or intensity dimensions |
| `afixes.md` | 20 | Condensed summary version of modifier affixes covering the same topic as `affixes-details.md` but in abbreviated form |
| `modifiers.md` | 103 | Comprehensive catalog of prefix modifiers organized by function — intensity, scope, time, authenticity adjustments to base words |

## Thematic Groupings

All files in this directory share a single cohesive theme.

### Linguistic Modifiers for Prompt Engineering

All three files address the same domain: how affixes and modifiers change meaning in the context of prompt construction.

- `affixes-details.md` — Full detailed reference for suffix/affix modifiers
- `afixes.md` — Abbreviated version of the same affix content
- `modifiers.md` — Prefix modifier catalog with different organizational structure

## Unrelated/Misplaced Content

No files are out of place in this directory. However, naming issues exist.

- **`afixes.md`** — Contains a spelling error; should be `affixes.md` (double 'f'). This creates confusion with `affixes-details.md` since both cover the same topic.
- **Content overlap** — `afixes.md` appears to be a condensed version of `affixes-details.md`. The first few lines are identical, suggesting one may be a draft of the other.

## Organization Strategy

The following improvements would strengthen this directory's coherence.

1. **Fix typo** — Rename `afixes.md` to `affixes-summary.md` to fix the spelling and clarify its relationship to `affixes-details.md`
2. **Consolidate or differentiate** — Either merge `afixes.md` into `affixes-details.md` (adding a summary section) or clearly name them to show their relationship (e.g., `affixes-full.md` and `affixes-summary.md`)
3. **Add a README** — Include a brief `README.md` explaining how these vocabulary resources support prompt engineering
4. **Cross-reference** — Link to `references/modulation-llm-steering.instructions.md` which covers related LLM steering strategies
5. **Add examples** — Each modifier entry would benefit from usage examples showing the modifier applied in an actual prompt

## Summary Statistics

Breakdown of files by type and category.

| Extension | Count |
|-----------|-------|
| `.md`     | 3     |

| Category             | Count |
|----------------------|-------|
| Affix references     | 2     |
| Prefix modifiers     | 1     |

**Total lines:** 262
