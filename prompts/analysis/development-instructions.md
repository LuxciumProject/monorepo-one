# Folder Analysis: /prompts/development-instructions

This report provides a comprehensive analysis of the `development-instructions` directory within the prompts collection.

## Directory Overview

The `development-instructions` directory contains structured guidelines and rules for AI-assisted development workflows, covering coding preferences, process rules, and autonomous validation requirements.

- **File count:** 3
- **Directory count:** 1 (root only)
- **Primary purpose:** Development process guidelines, coding rules and preferences, and web-tool validation instructions for AI agents

```
development-instructions/
├── rules-preferences.md
├── rules-preferences.prompt.md
└── web-tool-validation.md
```

## File-Level Analysis

Every file in the directory is listed below with a content-based description.

| File | Lines | Description |
|------|-------|-------------|
| `rules-preferences.md` | 77 | Development process guidelines document covering coding standards, workflow rules, and preference hierarchies |
| `rules-preferences.prompt.md` | 117 | Fully layered, categorical specification of every development preference and rule, formatted as a prompt template (note: title contains typo "Ruels") |
| `web-tool-validation.md` | 64 | Instructions for autonomous validation requiring AI agents to monitor two serious concerns when using web tools |

## Thematic Groupings

Files in this directory form two cohesive thematic clusters.

### Development Rules and Preferences

These two files both address coding rules and preferences but from different angles — one as documentation, the other as a prompt template.

- `rules-preferences.md`
- `rules-preferences.prompt.md`

### Agent Autonomy and Validation

This file addresses how AI agents should validate their own work when operating autonomously.

- `web-tool-validation.md`

## Unrelated/Misplaced Content

Minor issues were identified during analysis.

- **`rules-preferences.prompt.md`** — Contains a typo in its heading: "General Ruels and Preferences" should be "General Rules and Preferences"
- **Duplication concern** — `rules-preferences.md` and `rules-preferences.prompt.md` cover overlapping content (development rules and preferences). The `.prompt.md` variant is more comprehensive but shares the same base topic. Consider whether both are needed.
- **Naming convention** — The `.prompt.md` double extension is non-standard; consider using a subfolder or a clearer naming pattern like `rules-preferences-prompt.md`

## Organization Strategy

The following improvements would strengthen this directory's coherence.

1. **Fix typo** — Correct "Ruels" to "Rules" in `rules-preferences.prompt.md`
2. **Consolidate duplicates** — Merge `rules-preferences.md` and `rules-preferences.prompt.md` into a single authoritative document, or clearly differentiate their purposes with distinct names
3. **Standardize naming** — Replace the double extension `.prompt.md` with a clearer convention such as `rules-preferences-prompt.md` or place prompt variants in a `prompts/` subfolder
4. **Add a README** — Include a brief `README.md` explaining the folder's purpose and how these instructions integrate with the broader development workflow
5. **Cross-reference** — Link to related instruction files in `custom-instructions/` and `references/` to avoid content drift

## Summary Statistics

Breakdown of files by type and category.

| Extension    | Count |
|-------------|-------|
| `.md`       | 2     |
| `.prompt.md`| 1     |

| Category                    | Count |
|----------------------------|-------|
| Development rules/prefs    | 2     |
| Validation instructions    | 1     |

**Total lines:** 258
