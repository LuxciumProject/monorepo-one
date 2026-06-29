# WORD TOOLS: Expansion Axes Reference
## Complete Taxonomy with Examples & Orthogonality Mapping

**Test Lemma: `normal`** (en-CA)  
**Current Base Structure:** Synonym/Antonym × Polarity (Pos/Neu/Neg) = 6 buckets

---

## GROUP I: Fully Orthogonal to BOTH axes
**(Clean extensions to N-dimensional cube)**

### 1. REGISTER
**Dimension:** formal · academic · standard · colloquial · slang · vulgar · literary · archaic-formal

**Test word: `normal`**
- Formal: *regular, conformist, normative*
- Standard: *normal, ordinary, usual*
- Colloquial: *normal, regular, regular as clockwork*
- Slang: *vanilla, straight, garden-variety*
- Literary: *quotidian, prosaic, unexceptional*

**Orthogonality:** ✓ Clean. A term can be positive-colloquial AND positive-formal simultaneously. Register ≠ polarity.

**Universality:** ✓✓✓ Nearly universal. Every word has register.

**Implementation ease:** High. Straightforward categorization.

---

### 2. DOMAIN/FIELD
**Dimension:** general · technical · legal · medical · military · scientific · ecclesiastical · commercial · legal · culinary

**Test word: `normal`**
- General: *normal, ordinary, usual*
- Technical (mathematics): *perpendicular, orthogonal*
- Medical: *normal (no pathology), healthy reference state*
- Legal: *lawful, compliant, normative standard*
- Scientific: *standard condition, reference state*
- Commercial: *standard issue, stock*

**Orthogonality:** ✓ Clean. Domain is independent of polarity and relation type.

**Universality:** ✓✓ High. Many words have domain-specific senses.

**Implementation ease:** High. Clear categorization.

---

### 3. DIATOPIC (REGION)
**Dimension:** en-CA · en-GB · en-US · fr-CA · fr-FR · fr-BE · es-ES · es-MX · pt-BR · pt-PT

**Test word: `normal`**
- en-CA: *normal, regular*
- en-GB: *normal, ordinary, usual*
- en-US: *normal, regular*
- fr-CA (Quebec): *normal, ordinaire*
- fr-FR (Parisian): *normal, ordinaire, courant*
- es-MX: *normal*
- es-ES: *normal*

**Orthogonality:** ✓ Clean. Region is independent of polarity.

**Universality:** ✓✓✓ Universal. Every word has regional variation potential.

**Implementation ease:** Medium-High. Requires regional corpus or knowledge.

---

### 4. DIACHRONIC (TIME LAYER)
**Dimension:** obsolete · archaic · dated · current · neologism

**Test word: `normal`**
- Obsolete: —
- Archaic: *wonted, accustomed* (Middle English)
- Dated: —
- Current: *normal, ordinary, usual*
- Neologism: —

**Orthogonality:** ✓ Clean. Time-layer ≠ polarity.

**Universality:** ✓✓ High. Many words have historical layers.

**Implementation ease:** High. Etymology + corpus dating handles this.

---

### 5. ETYMOLOGICAL STRATUM
**Dimension:** Anglo-Saxon · Latinate · Greek · French-Norman · Germanic · Scandinavian · Celtic

**Test word: `normal`**
- Etymology: Latin *normalis* ← *norma* (rule, standard)
- Stratum: Latinate (via French)

**Contrasts:**
- Anglo-Saxon cognate layer: *regular* (less formal)
- Greek alternative: *orthopedic* (right-footed, perpendicular)

**Orthogonality:** ✓ Clean. Stratum ≠ polarity; orthogonal to relation type.

**Universality:** ✓✓✓ Universal for established words.

**Implementation ease:** High. Etymology field already exists in schema.

---

### 6. LITERAL ↔ FIGURATIVE
**Dimension:** literal · metonymic · metaphorical · idiomatic · synecdochic

**Test word: `normal`**
- Literal: *conforming to a standard, perpendicular*
- Metaphorical: *socially acceptable, not deviant* (abstract extension)
- Idiomatic: — (not primary)

**Example contrast (word: `flood`)**
- Literal: *inundation of water*
- Metaphorical: *emotional flood, flood of tears, flood of memories*
- Metonymic: *the flood reached the village* (the water itself)

**Orthogonality:** ✓ Clean. Literal/Figurative orthogonal to polarity.

**Universality:** ✓✓ High. Many words have both.

**Implementation ease:** Medium. Requires sense distinction.

---

### 7. MORPHOLOGICAL DERIVATION
**Dimension:** root · prefixed · suffixed · compound · blended · clipped · acronymic · reduplicative

**Test word: `normal`**
- Root form: *normal*
- Derived forms: *normally* (adv), *normality* (noun), *normalize* (verb), *abnormal* (prefixed), *subnormal* (prefixed)
- Related compound: *normalization, paranormal*

**Orthogonality:** ✓ Clean. Morphological class ≠ polarity.

**Universality:** ✓✓✓ Universal.

**Implementation ease:** High. Already present in schema's Morphology section; could be spun into its own axis.

---

### 8. PART-OF-SPEECH TRANSPOSITION
**Dimension:** nominal · verbal · adjectival · adverbial · predicative · attributive

**Test word: `normal`**
- Adjectival: *normal behavior, a normal day*
- Nominal: *the normal (the expected state), return to normal*
- Adverbial: *normally, in a normal manner*
- Predicative: *That seems normal.*
- Attributive: *normal wear and tear*

**Orthogonality:** ✓ Clean. POS ≠ polarity.

**Universality:** ✓✓ Moderate-High. Varies by word.

**Implementation ease:** Medium. Requires sense distinction by POS.

---

### 9. FREQUENCY
**Dimension:** high · medium · low · rare · hapax

**Test word: `normal`**
- Frequency: High (everyday word, millions of instances in corpora)
- COCA rank: ~800
- BNC rank: ~600

**Orthogonality:** ✓ Clean. Frequency ≠ polarity or relation type.

**Universality:** ✓✓✓ Universal (measurable from corpus).

**Implementation ease:** High. Corpus data available.

---

### 10. SENSORY MODALITY
**Dimension:** visual · auditory · tactile · olfactory · gustatory · proprioceptive · abstract

**Test word: `normal`**
- Modality: Abstract (no direct sensory referent)

**Example contrast (word: `warm`)**
- Tactile: *warm blanket, warm sensation*
- Visual: *warm color, warm tone*
- Emotional (abstract): *warm welcome, warm feelings*

**Orthogonality:** ✓ Clean. Modality ≠ polarity.

**Universality:** ✓✓ Moderate. Varies by word domain.

**Implementation ease:** Medium. Requires semantic field knowledge.

---

### 11. EMBODIMENT LEVEL
**Dimension:** bodily · concrete · abstract · formal-symbolic

**Test word: `normal`**
- Level: Abstract (no embodied referent)

**Example contrast (word: `run`)**
- Bodily: *run (movement), sprint, jog*
- Concrete: *run the engine, run a business*
- Abstract: *run through an idea, run a fever*

**Orthogonality:** ✓ Clean. Embodiment ≠ polarity.

**Universality:** ✓✓ Moderate. Correlates with concreteness.

**Implementation ease:** Medium. Requires judgment.

---

### 12. PROTOTYPICALITY
**Dimension:** prototypical exemplar · central member · peripheral member · marginal

**Test word: `normal`**
- Status: Prototypical (archetypal "normal")

**Example contrast (word: `bird`)**
- Prototypical: *robin, sparrow*
- Central: *eagle, penguin*
- Peripheral: *ostrich, kiwi*
- Marginal: *bat* (controversial)

**Orthogonality:** ✓ Clean. Prototypicality ≠ polarity.

**Universality:** ✓ High (for category-level words).

**Implementation ease:** Medium. Requires psycholinguistic data or judgment.

---

### 13. COGNITIVE FRAME (Fillmore)
**Dimension:** evoked frame/scenario/script

**Test word: `normal`**
- Frame: *Normalcy frame* (expectation-setting, deviation-marking)
- Associated script: *normal routine, normal operation, normal distribution*

**Example contrast (word: `court`)**
- Legal frame: *court proceedings, judge, verdict*
- Athletic frame: *tennis court, court boundaries*
- Romantic frame: *court a suitor, courting behavior*

**Orthogonality:** ✓ Clean. Frame ≠ polarity.

**Universality:** ✓✓ High (varies by polysemy).

**Implementation ease:** Medium-High. Requires FrameNet or semantic parsing.

---

### 14. CONCEPTUAL METAPHOR SOURCE (Lakoff)
**Dimension:** source domain mapping

**Test word: `normal`**
- Primary metaphor: *Standard as baseline, deviation as distance from baseline*
- Implicit mapping: *normal-is-centered, abnormal-is-peripheral*

**Example contrast (word: `argument`)**
- Metaphor: *ARGUMENT IS WAR*
  - *attack a position, defend one's claim, win an argument, indefensible position*

**Orthogonality:** ✓ Clean. Conceptual metaphor source ≠ polarity (though may correlate).

**Universality:** ✓✓ Moderate. Many words lack explicit metaphor.

**Implementation ease:** Medium-High. Requires metaphor database.

---

### 15. EMBEDDING-SPACE NEIGHBORS
**Dimension:** latent-space proximity (LLM word2vec, GloVe, BERT)

**Test word: `normal`**
- Neighbors (cosine similarity): *ordinary, usual, standard, common, typical, regular, abnormal, expected, natural*
- Note: These include both synonyms AND oppositional attractors.

**Orthogonality:** ✓ Clean. Embedding neighbors ≠ traditional synonym/antonym.

**Universality:** ✓✓✓ Universal (computable from any embedding).

**Implementation ease:** High. Algorithmic.

---

### 16. ASSOCIATIVE CHAINS (Free Association)
**Dimension:** psycholinguistic after-effects, free-association network

**Test word: `normal`**
- Association chains: *normal → average → boring → dull* (negative path) *normal → expected → safe → comfortable* (positive path)

**Orthogonality:** ✓ Clean. Associations ≠ strict synonymy/antonymy.

**Universality:** ✓✓ Moderate. Culture-dependent, highly individual.

**Implementation ease:** Medium. Requires native speaker judgment or corpus-mined associations.

---

### 17. CROSS-DOMAIN TRANSPOSITION
**Dimension:** same-spelling, different-field uses

**Test word: `normal`** (limited in this case)

**Example contrast (word: `pitch`)**
- Music: *pitch (frequency), perfect pitch, pitch black*
- Baseball: *pitch (throw), baseball pitch*
- Sales: *pitch (proposal), elevator pitch*
- Surface: *pitch (tar), asphalt pitch*
- Tent: *pitch a tent*

**Orthogonality:** ✓ Clean. Domain transposition ≠ polarity.

**Universality:** ✓✓ Moderate. High for polysemous words.

**Implementation ease:** High (semantic field mapping).

---

### 18. CONCEPTUAL PRIMITIVES (Wierzbicka NSM)
**Dimension:** decomposition into semantic primes (GOOD, BAD, THING, PERSON, CAUSE, WANT, etc.)

**Test word: `normal`**
- Prime decomposition: *"it is like most other things of this kind"* or *"it is as things usually are"*
- Primes: THING, KIND, LIKE, GOOD, BAD, NOT

**Orthogonality:** ✓ Clean. Primitives ≠ polarity (orthogonal representation).

**Universality:** ✓✓✓ Universal (by definition of NSM).

**Implementation ease:** Medium-High. Requires NSM database or expert judgment.

---

### 19. SOUND-SYMBOLIC / PHONAESTHEMES
**Dimension:** phonetic iconicity, sound-symbol associations

**Test word: `normal`**
- Phonaestheme: —
- Contrast: *sn-* words (nose, snout, sniff, sneeze): nose-related or nasality
- Contrast: *-ump* words (bump, dump, jump, lump): dull, heavy, blockish

**Orthogonality:** ✓ Clean. Phonaestheme ≠ polarity.

**Universality:** ✓ Low-Moderate. Limited subset of words; mostly onomatopoeia, sound symbolism.

**Implementation ease:** Medium. Requires phonaesthetic database.

---

### 20. AFFECTIVE DIMENSIONS (non-Valence)
**Dimension:** VAD (Valence, Arousal, Dominance) or dimensional emotion theory

**Test word: `normal`**
- Valence: Neutral to Positive (+0.5)
- Arousal: Low (calm, not exciting) (−0.4)
- Dominance: High (controlling, established) (+0.3)

**Example contrast (word: `storm`)**
- Valence: Negative (−0.8)
- Arousal: High (exciting, chaotic) (+0.8)
- Dominance: Low (overwhelming) (−0.6)

**Orthogonality:** ✓ Mostly clean. VAD is orthogonal to polarity in structure, though correlations exist.

**Universality:** ✓✓ High (measurable from corpora or crowdsourcing).

**Implementation ease:** Medium. Requires lexicon or annotation.

---

### 21. CULTURAL LOAD / IN-GROUP MARKING
**Dimension:** in-group · out-group · universal · marked · stereotyped

**Test word: `normal`**
- Load: Universal (applies across cultures, though "normal" varies by culture)

**Example contrast (word: `eh?`)**
- In-group: *Canadian English speaker*
- Out-group: *non-Canadian*
- Stereotyped: *Canadian identity marker*

**Orthogonality:** ✓ Clean. Cultural load ≠ polarity.

**Universality:** ✓✓ Moderate. Varies by social context.

**Implementation ease:** Medium. Requires sociolinguistic expertise.

---

### 22. REFERENCE LEVEL (Semiotic)
**Dimension:** use · mention · quotation · metaconcept

**Test word: `normal`**
- Level: Use (direct reference to the concept)

**Example contrast:**
- Use: *That's normal.*
- Mention: *The word "normal" has seven letters.*
- Quotation: *He said "normal" sarcastically.*
- Metaconcept: *"Normal" is a social construct.*

**Orthogonality:** ✓ Clean. Reference level ≠ polarity.

**Universality:** ✓✓✓ Universal (applies to all words).

**Implementation ease:** Medium. Requires context-sensitivity.

---

### 23. SEMIOTIC STATUS (Peirce)
**Dimension:** index · icon · symbol

**Test word: `normal`**
- Status: Symbol (arbitrary sign, culturally defined)

**Example contrast:**
- Index: *smoke* (indicates fire)
- Icon: *🔥* (resembles fire)
- Symbol: *normal* (arbitrary mapping to concept)

**Orthogonality:** ✓ Clean. Semiotic status ≠ polarity.

**Universality:** ✓✓✓ Universal (all words are symbols; some also index/icon).

**Implementation ease:** Medium. Philosophical judgment required.

---

## GROUP II: Orthogonal to ONE axis only
**(Partial cube — flag dependencies)**

### 24. INTENSITY / SCALAR
**Dimension:** mild · moderate · strong · intense · extreme

**Test word: `normal`**
- Intensity: Neutral (baseline, not marked)

**Example contrast (word: `cold`)**
- Mild: *cool, chilly*
- Moderate: *cold*
- Strong: *frigid, biting*
- Extreme: *arctic, polar*

**Orthogonality:** ✓ to relation type (syn/ant) but ✗ to polarity
- Issue: Extreme values often carry emotional/polar weight (*extremely normal* = mildly positive)

**Universality:** ✓✓ High (especially for gradable adjectives).

**Implementation ease:** Medium. Scalar ordering requires judgment.

---

### 25. EUPHEMISM / DYSPHEMISM
**Dimension:** dysphemistic · neutral · euphemistic

**Test word: `normal`**
- Status: Neutral

**Example contrast (word: `die`)**
- Dysphemism: *croak, bite the dust, kick the bucket*
- Neutral: *die, pass away*
- Euphemism: *pass away, go to sleep, depart, succumb*

**Orthogonality:** ✓ to relation type but ✗ to polarity
- Issue: Euphemism inherently masks negative polarity; dysphemism exaggerates it

**Universality:** ✓✓ Moderate. Varies by taboo level.

**Implementation ease:** Medium. Requires sociolinguistic judgment.

---

### 26. DENOTATIONAL DISTANCE (Synonym Fidelity)
**Dimension:** exact synonym · near-synonym · loose synonym · distant analogue

**Test word: `normal`**
- Relation to *ordinary*: Near-synonym (very close)
- Relation to *usual*: Near-synonym
- Relation to *typical*: Near-synonym
- Relation to *vanilla*: Distant analogue (register shift)

**Orthogonality:** ✓ to polarity but ✗ to relation type
- This REFINES the synonym bucket, adding granularity

**Universality:** ✓✓✓ Universal (all synonyms have fidelity gradations).

**Implementation ease:** Medium-High. Requires semantic distance metric.

---

### 27. ILLOCUTIONARY FORCE (Verb-dependent)
**Dimension:** assertion · command · question · promise · request · suggestion

**Test word: `normal`**
- Force: Assertion (typically)

**Example contrast (word: `go`)**
- Assertion: *He goes to work.*
- Command: *Go to work!*
- Question: *Does he go to work?*
- Suggestion: *You should go to work.*

**Orthogonality:** ✓ to polarity but ✗ to parts-of-speech
- Issue: Only applies to speech-act verbs; not universal

**Universality:** ✓ Low. Verb-dependent.

**Implementation ease:** Low. Syntax-dependent; limited applicability.

---

### 28. ASPECT (Verb-dependent)
**Dimension:** punctual · momentary · durative · iterative · habitual · stative

**Test word: `normal`** (not a verb; N/A)

**Example contrast (word: `run`)**
- Punctual: *He ran across the street.* (completed action)
- Durative: *He was running.* (ongoing)
- Iterative: *He runs every day.* (repeated)
- Habitual: *He runs marathons.* (regular behavior)
- Stative: *The program runs well.* (state, not action)

**Orthogonality:** ✓ to polarity but ✗ to POS
- Issue: Verb-specific; low universality

**Universality:** ✓ Low. Verb-only.

**Implementation ease:** Low. Morphosyntactic; context-dependent.

---

## GROUP III: ALTERNATIVE RELATION TYPES
**(Extends or replaces syn/ant axis)**

**Not orthogonal — these ARE the relation space.**

- **Meronymy** (part↔whole): *finger↔hand, page↔book*
- **Hyponymy** (kind↔of): *sparrow↔bird, maple↔tree*
- **Troponymy** (manner↔of): *whisper↔speak, trudge↔walk*
- **Entailment** (logical): *snore→asleep, kill→cause-death*
- **Causation**: *push→move, heat→expand*
- **Converse** (reciprocal): *buy↔sell, above↔below*
- **Complementary** (binary opposite): *alive↔dead, on↔off*
- **Gradable** (scalar opposite): *hot↔cold, happy↔sad*
- **Antonym** (opposite): *black↔white, begin↔end*

**Note:** This group forms a richer relation lattice; not orthogonal to syn/ant but orthogonal to POLARITY. Could replace the binary syn/ant with a richer semantic relation taxonomy.

---

## GROUP IV: TYPOLOGICAL / CROSS-LINGUISTIC

### 29. LEXICALIZATION PATTERN
**Language-specific bundling of semantic features**

**Test word: `normal`** (uniform across languages)

**Example contrast (color terms)**
- Russian: *goluboj* (sky-blue) vs. *sinij* (dark blue) — lexical distinction not standard in English
- Japanese: *ao* (green/blue) vs. *midori* (green) — distinct from English categories
- French: *couleur* is "color" but "teinte" is "shade/hue" — finer distinction

**Orthogonality:** ✓ Clean. Lexicalization patterns vary orthogonally to polarity.

**Universality:** ✓✓ Moderate-High. High for cross-lingual work.

**Implementation ease:** Medium. Requires multilingual corpus/expertise.

---

### 30. UNTRANSLATABILITY INDEX
**Dimension:** easily translatable · partially translatable · untranslatable (unique concept)

**Test word: `normal`** (easily translatable)

**Example contrast:**
- Untranslatable: *saudade* (Portuguese: deep longing), *hygge* (Danish: cozy intimacy), *depaysement* (French: disorientation in foreign place)
- Easily translatable: *normal, table, run*

**Orthogonality:** ✓ Clean. Translatability ≠ polarity.

**Universality:** ✓✓ Moderate. Varies by language pair.

**Implementation ease:** Medium. Requires multilingual comparison.

---

## SUMMARY TABLE: IMPLEMENTATION RECOMMENDATION

| Tier | Axes | Applicability | Complexity | Recommended Status |
|------|------|----------------|-----------|-------------------|
| **TIER 1 (Always)** | Register, Domain, Region, Etymology | ✓✓✓ 95%+ words | Low | **PERMANENT SECTIONS** |
| **TIER 1** | Diachronic, Literal/Figurative | ✓✓ 70%+ words | Low-Medium | **PERMANENT SECTIONS** |
| **TIER 2 (Expandable)** | Morphological Derivation, POS, Frequency, Modality | ✓✓ 50-70% words | Medium | **FLAG-ACTIVATED** (`:expand:`) |
| **TIER 2** | Cognitive Frame, Conceptual Metaphor, Embedding neighbors | ✓ 40-60% words | Medium-High | **FLAG-ACTIVATED** |
| **TIER 3 (Specialty)** | Prototypicality, Embodiment, Semiotic status | ✓ 20-40% words | High | **DEEP MODE ONLY** (`:deep:`) |
| **TIER 3** | Sound-symbolism, VAD, Cultural load | ✓ 10-30% words | High | **DEEP MODE ONLY** |
| **TIER 4 (Meta)** | Prefix-operator projections, Associative chains | ✓ Highly variable | Very High | **SPECIALTY FLAG** (`:hyper-metaliminal:`) |

---

## ORTHOGONALITY MATRIX

```
                Syn/Ant  Polarity  Register  Domain  Region  Etymology
Syn/Ant            —        ✓         ✓        ✓       ✓        ✓
Polarity           ✓        —         ✓        ✓       ✓        ✓
Register           ✓        ✓         —        ~       ✓        ✓
Domain             ✓        ✓         ~        —       ✓        ✓
Region             ✓        ✓         ✓        ✓       —        ✓
Etymology          ✓        ✓         ✓        ✓       ✓        —
Literal/Fig        ✓        ✓         ✓        ✓       ✓        ✓
Frequency          ✓        ✓         ✓        ✓       ✓        ✓
Morphology         ✓        ✓         ✓        ✓       ✓        ✓
POS                ✓        ✓         ✓        ✓       ✓        ✓
Modality           ✓        ✓         ✓        ✓       ✓        ✓
Frame              ✓        ✓         ✓        ✓       ✓        ✓
Metaphor           ✓        ✓         ✓        ✓       ✓        ✓
Embedding          ✓        ✓         ✓        ✓       ✓        ✓

✓ = orthogonal
~ = partial/context-dependent
— = same axis
```

---

## NEXT STEPS: DECISION POINTS

**For you to decide:**

1. **Which Tier 1 axes are mandatory defaults?** (Recommend: Register + Domain + Region)

2. **Which Tier 2 axes activate under `:expand:`?** (Recommend: Morphology + Frame + Embedding neighbors)

3. **Introduce a new `:hyper-metaliminal:` flag?** Activates Tier 4 (prefix projections + conceptual primitives + cross-domain transpositions)

4. **Create a `:all:` mode** that runs all axes regardless of applicability?

5. **Or tiered progressive disclosure?**
   - Default: Tier 1 only
   - `:expand:` → Tier 1 + 2
   - `:deep:` → Tier 1 + 2 + 3
   - `:hyper:` → Tier 1 + 2 + 3 + 4

---

**Reference complete. Ready for your decision.**
