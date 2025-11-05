# Source Map and Priorities for Our Markdown Stack

## Overview

This is the “what to use when” guide for the eight files in our Markdown toolkit. It clarifies purpose, overlap, and practical priority so you (and any AI agent) pick the right reference fast and only browse the web when truly outside this bundle.

---

## Priority Tiers

These tiers establish the hierarchy of authority for Markdown decisions, from foundational syntax through practical tooling.

### Tier 1 — Canonical Syntax (always defer to these for truth)

- **CommonMark Spec (v0.31.2, 2024-01-28)**: The base spec for Markdown parsing rules; defines blocks, inlines, examples, and serves as conformance tests. Use this first for ambiguous parsing questions.
- **GitHub Flavored Markdown (GFM) Spec (v0.29-gfm, 2019-04-06)**: GitHub's dialect; a strict superset of CommonMark with documented extensions (tables, task list items, strikethrough, autolink variants, disallowed raw HTML). Use this when the output targets GitHub.

> Tip: If CommonMark and GFM appear to conflict for GitHub output, prefer GFM; it formally extends CommonMark and documents its differences.

---

### Tier 2 — Lint Policies (turn spec into enforceable rules)

- **markdownlint Rules**: Human-readable rule catalogue (e.g., MD058 blanks around tables, MD059 descriptive link text, MD060 table column style). This is where we justify stylistic constraints and accessibility-driven guidance.
- **markdownlint README**: Shows how to configure/override rules inline or per-file; crucial for exceptions and local configuration without breaking policy.

> Use case: Enforce "blank lines around tables" with MD058 because some parsers misinterpret unspaced tables — this maps cleanly to GFM's parsing behaviour.

---

### Tier 3 — Tooling (how we run/enforce the rules)

- **markdownlint-cli2 README**: Operational semantics and configuration (JSONC/YAML/CJS/MJS), merging/inheritance, disabling inline config, custom rules, plugins, and output formatters. Use to wire CI and local scripts.
- **VS Code markdownlint Extension README**: Editor-side behaviour, config discovery order, focus mode, run-on-save, and portable custom rules paths. Use for dev-experience, not syntax truth.

---

### Tier 4 — Platform Guidance (GitHub-specific authoring UX)

- **GitHub Docs: Basic writing and formatting syntax**: How GitHub renders features (lists, images, anchors, relative links, line breaks in issues vs `.md`, `<picture>` support). Use for authoring ergonomics and platform quirks.

---

### Tier 0 — Our Local Project Policy (the file you just finalized)

- **Markdown Focused (our policy doc)**: The "single source of project truth" for structure and style (single H1, sequential headings, no empty sections). It operationalizes Tier 1–4 into concrete rules and defaults. Use this first to decide intent; cite upward to justify edge cases.

---

## Overlap and Boundaries

| Question Type                                                                 | Primary Source           | Secondary (tie-breaker or implementation)              |
| ----------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------ |
| Parsing ambiguities (e.g., list interruption, fenced code behaviour)          | CommonMark Spec          | GFM Spec (when GitHub output)                          |
| GitHub-only features (tables, task lists, disallowed raw HTML)                | GFM Spec                 | GitHub Docs (rendering expectations)                   |
| Authoring ergonomics (relative links, anchors, images, line breaks in issues) | GitHub Docs              | GFM Spec (if syntax detail needed)                     |
| Style/lint decisions (blank lines, heading increments, accessible links)      | markdownlint Rules       | Our policy doc + markdownlint README (configuration)   |
| Local exceptions/suppressions                                                 | markdownlint README      | VS Code markdownlint (editor behaviour)                |
| CI/editor configuration and inheritance                                       | markdownlint-cli2 README | VS Code markdownlint README                            |

---

## When to Browse the Web

Browse only if the question is outside these eight files (e.g., **new GFM extension, deprecations, or GitHub renderer changes**). Otherwise, resolve via Tier 1→4 then our policy. (Your standing preference is to verify freshness online for time-sensitive claims; we’ll do that proactively when needed.)

---

## Minimal Workflow (for you agents)

1. **Decide target** (GitHub or generic). If GitHub → prefer **GFM**.
2. **Resolve syntax** in **CommonMark**; overlay **GFM** extensions as needed.  
3. **Apply style** via **markdownlint Rules**; wire exceptions per **markdownlint README**.  
4. **Enforce** in CI with **markdownlint-cli2**; in editor with **VS Code markdownlint**.  
5. **Authoring specifics** on GitHub (images, anchors, line breaks): consult **GitHub Docs**.  
6. **Project policy** (ours) settles ties on structure (single H1, no empty sections).

---

## Quick Glossary

Key terms for understanding the Markdown stack and citing in reviews.

- **Strict superset (GFM over CommonMark)**: GFM adds features but keeps CommonMark semantics.
- **GFM extensions (examples)**: Tables, task list items, strikethrough, "disallowed raw HTML".
- **Lint safety rails**: MD058 blanks around tables; MD059 descriptive link text; MD060 table column style.
- **Inline suppression**: `<!-- markdownlint-disable MD### --> … <!-- markdownlint-enable MD### -->`.

---

## Key Hierarchy Summary

Prioritize sources in this order for decision-making.

- **Truth**: CommonMark → GFM for GitHub deliverables.
- **Policy**: markdownlint Rules as our enforceable interpretation of readable, accessible Markdown (backed by specs).
- **Execution**: markdownlint-cli2 (CI) and VS Code extension (local).
- **Platform UX**: GitHub Docs for link/image/anchor ergonomics.

---

## Final Note for Agents

Default to **our local policy** for structure, cite **specs** for correctness, **lint rules** for style, and **tooling** for enforcement. Browse the web only when a change or edge case is clearly outside these sources.
