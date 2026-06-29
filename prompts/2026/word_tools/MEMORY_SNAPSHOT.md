# Word Tools — Memory Snapshot

*Derived from project memory as of 2026-06-27. Represents accumulated session knowledge about the project state, key learnings, and active patterns.*

---

## Purpose & Context

Benjamin is building a structured multilingual lexical reference system called **Word Tools** — a schema-driven micro-dictionary that generates comprehensive, deterministic entries for submitted words (lemmas). The system serves as a conceptual and linguistic database, likely feeding into a broader AI agent architecture or knowledge-base project. Entries are designed to be machine-readable, agent-portable, and semantically precise.

The project operates in **Canadian English (en-CA)** by default, with **Québécois French (fr-CA)** as the secondary language. French-language prompts (e.g., "pour le mot [lemma]") trigger full output in fr-CA. Multilingual translation fields (es, de, pt-BR, and others) are standard across entries.

A parallel thread involves **AI multi-agent systems design**, where lexical entries serve as structured semantic capsules for agent roles (Analyst, Auditor, Examiner, Steward, etc.), each profiled with agent-frame mapping, epistemic authority, and role topology.

---

## Current State

Benjamin is actively executing Word Tools entries across several domains:

- **Professional/agent roles:** Detailed profiles for Analyst, Auditor, Examiner, Steward, and similar roles — each framed as nodes in a multi-agent pipeline with conformance, inference, and fiduciary properties.
- **Logic and epistemology:** Entries for axiom, theorem, lemma, inductive reasoning, and seven inference modes (deductive, abductive, analogical, intuitive, insight, statistical, enumerative induction), culminating in a synthesis of emergence as a structural property of inferential space.
- **Foundational vocabulary:** Entries for dimension, layer, scalar, system, task, mission, tactic, blueprint, and related structural primitives.
- **Semiotics and philosophy of language:** Entries for semiotic, vade mecum, philologie, humanité, humanisme, and related scholarly terms.

The protocol in active use is **Word Tools v3**, documented as `WORD_TOOLS_v3_PROTOCOL.md`. A broken file (`extended_options`) was previously removed from the project directory. The canonical protocol file may be absent from `/mnt/project/` — Claude should proceed from schema context when the file is not found.

---

## Key Learnings & Principles

- **Zero-shot execution:** A single word submission is an immediate trigger. No preamble, no confirmation loops, no meta-commentary before or after output.
- **Six mandatory polarity buckets:** Positive/Neutral/Negative × Synonyms/Antonyms — all six must always be populated, never left empty or declared absent.
- **One term per line:** List items are line-separated, never comma-separated.
- **Subheaders for every named field:** Extended and Concept Network sections use `#### Field` subheaders, not inline `Field: value` prose — output must be skimmable, not a wall of text.
- **Language-matched headers:** All section headers appear in the language of the input lemma.
- **Silent correction:** Errors are fixed immediately without re-explanation or apology.
- **No narration of process:** Claude should not describe what it is about to do or announce memory changes — changes must be narrated *before* being made if narration is necessary at all.
- **Load-bearing language only:** Words exist to do work. Empty intensifiers (very, quite, really, well as opener) and filler conjunctions are prohibited. Severity signals, epistemic hedges, logical connectives, and contrastive markers are mandatory when applicable.
- **No performative stance:** No evaluative commentary on Benjamin's ideas (e.g., "genius move"), no sycophantic framing, no closing pleasantries or offers to refine unless Benjamin invites them.

---

## Approach & Patterns

- **Terse, compressed prompts:** Benjamin communicates minimally and expects Claude to infer the full schema from context. A bare word or short phrase is sufficient to trigger complete execution.
- **Flag/command syntax:** Extended modes use `:command:` syntax (e.g., `:deep:`, `:JSON:`, `:compare:`, `:expansion:`). These compose with the base schema.
- **Iterative refinement with direct correction:** Benjamin identifies errors precisely and expects immediate behavioural updating — not acknowledgment followed by continued non-compliance.
- **Conceptual geometry as a thinking tool:** Benjamin frames semantic relationships spatially and dimensionally (axes, orthogonality, curvature, latent space). Analyses that reveal non-obvious structural relationships are valued over taxonomic coverage alone.
- **Non-convergent analysis preferred for neologisms:** When analyzing constructed or neologistic terms, the goal is to open conceptual space rather than collapse it into a single canonical definition.
- **File delivery conventions:** Output files go to `/mnt/user-data/outputs/` with naming convention `[lemma]_[languageCode].[format]`. Output must be rendered directly in-conversation (via `view` after `present_files`) — file reference alone is insufficient.

---

## Tools & Resources

- **Word Tools v3 protocol:** Canonical schema; file may be absent from project directory — proceed from memory when missing.
- **Output directory:** `/mnt/user-data/outputs/`
- **Supported output formats:** Markdown (primary), JSON, YAML
- **Languages in scope:** en-CA (default), fr-CA (French input trigger), es, de, pt-BR (translation fields)
- **Benjamin's structural lexicon:** A personal vocabulary of operational primitives — terms like LAYER, BOUNDARY, ABSTRACTION LEVEL, REAL, MAP — carry precise definitions that differ from general usage and should be respected when they appear in context.

---

## Active Domains Logged

### Agent Role Profiles
Analyst, Auditor, Examiner, Steward

### Logic & Epistemology
axiom, theorem, lemma, inductive reasoning  
Seven inference modes: deductive, abductive, analogical, intuitive, insight, statistical, enumerative induction  
Synthesis concept: emergence (as structural property of inferential space)

### Structural Primitives
dimension, layer, scalar, system, task, mission, tactic, blueprint

### Semiotics & Philosophy of Language
semiotic, vade mecum, philologie, humanité, humanisme
