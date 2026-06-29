# Word Tools — Project Export Bundle

**Exported:** 2026-06-27  
**Operator:** Benjamin (Luxcium), VP R&D, Québec City  
**Default language:** Canadian English (en-CA)  
**Secondary language:** Québécois French (fr-CA)

---

## Contents

### Protocol

| File | Description |
|------|-------------|
| `WORD_TOOLS_v3_PROTOCOL.md` | Full schema, rules, language policy, flags, example output, procedural spec |
| `WORD_TOOLS_AXIS_REFERENCE.md` | Complete taxonomy of 30 expansion axes with orthogonality mapping and tier recommendations |
| `extended_options.md` | Extended capability reference: analysis depth modes, output formats, language options, relation mapping expansions |

### Reference Entries

| File | Description |
|------|-------------|
| `english_en-CA.json` | Full Word Tools entry for the lemma "English" — en-CA, Deep Dive + Concept Network + Regional Variation |
| `francais_fr-CA.json` | Full Word Tools entry for the lemma "Français" — fr-CA, Deep Dive + Concept Network + Variation Régionale |

### Session Context

| File | Description |
|------|-------------|
| `MEMORY_SNAPSHOT.md` | Accumulated project memory: current state, key learnings, active domains, file conventions |
| `COLLABORATION_CONTRACT.md` | Operator profile and collaboration norms governing session behaviour |

---

## Quick Start

### Inject into a new Claude project

1. Upload all `.md` and `.json` files to a new Claude project.
2. Set `WORD_TOOLS_v3_PROTOCOL.md` as the system prompt (or paste its contents into the project instructions field).
3. Optionally include `COLLABORATION_CONTRACT.md` as user preferences.
4. Submit a bare lemma to trigger execution:

```
threshold
```

### Flag syntax

```
:deep: threshold
:compare: normal / habituel
:json: resilience
:fr: seuil
:deep: :fr: seuil
```

### Language detection

| Input | Output language |
|-------|----------------|
| `threshold` | Canadian English (en-CA) |
| `Pour le mot seuil` | Québécois French (fr-CA) |
| `:fr: threshold` | Québécois French (fr-CA) forced |
| `:en: seuil` | Canadian English (en-CA) forced |

---

## Schema Summary

```
## LEMMA
One-line definition (20 words max)

### Synonyms
#### Positive / Neutral / Negative (all three mandatory)

### Antonyms
#### Positive / Neutral / Negative (all three mandatory)

## Extended
Phonetics · Etymology · Morphology · Syntax · Lexical Notes

### Translations
fr-CA · es · de · pt-BR

### Full Definitions
Sense 1 … Sense N

## Concept Network
Hyponymy · Taxonomy · Coordinate Terms · Parallel Concepts [+ optional extensions]
```

**Invariant rules:**
- Six polarity buckets always populated — no empty buckets.
- One term per line; alphabetized within each bucket.
- Headers in the language of the lemma.
- No preamble; output begins at `## LEMMA`.

---

## Axis Tiers (from `WORD_TOOLS_AXIS_REFERENCE.md`)

| Tier | Axes | Activation |
|------|------|------------|
| Tier 1 | Register, Domain, Region, Etymology, Diachronic, Literal/Figurative | Default / always |
| Tier 2 | Morphology tree, POS, Frequency, Cognitive Frame, Conceptual Metaphor, Embedding neighbours | `:expand:` |
| Tier 3 | Prototypicality, Embodiment, Semiotic status, VAD, Cultural load | `:deep:` |
| Tier 4 | Prefix projections, Associative chains, Conceptual primitives | `:hyper:` (specialty) |
