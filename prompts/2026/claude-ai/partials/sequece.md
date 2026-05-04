## PHASE 1: AUDIT INGESTION & STRUCTURE PARSING

**What I'm doing:** Mapping the new audit against what I already discovered in the synthesis to see: (1) what's NEW, (2) what's CONFIRMED, (3) what needs REORDERING.

**Reading the audit structure:**
- Part 1 (domain-specific): 6 domains × 15-20 terms each = ~100 domain-specific terms mapped to structural cores
- Part 2 (cross-domain): 14 terms that appear in ≥2 domains → **THESE ARE THE TRUE STRUCTURAL PRIMITIVES**
- Part 3 (re-explained): 15 terms that get re-explained in conversation = high cognitive debt
- Part 4 (lowest-hanging fruit): Tiered list (Tier 1: 5 terms, Tier 2: 5 terms, Tier 3: 5 terms)
- Part 5 (synthesis): Shows which skills would benefit from each term
- Part 6 (unused): 14 observed but not formalized (including things already in skills but underused)

**Computing overlap:**
- My synthesis had: 25 primitives
- This audit specifies: 14 cross-domain + 15 re-explained = 29 core terms (with overlap)
- NEW terms not in my synthesis: **Serialization Bottleneck** (explicit), **Round-trip** (formalized), refined definitions of **Momentum**, **Compression**, **Interface/Channel**

**Key difference:** Audit provides DOMAIN EVIDENCE for each term (why it matters, where it recurs). My synthesis was abstract. This grounds it.

---

## PHASE 2: ASSESSMENT — TIER 1 TERMS (5 foundation terms)

**What I'm doing:** For each Tier 1 term, I'll evaluate:
- (A) Is it in current skills? (Yes/No/Partial)
- (B) Is it being re-explained repeatedly? (Yes/No + evidence)
- (C) What does adding it enable? (skill simplification, prevent re-explanation, cross-domain coherence)
- (D) What conflicts/dependencies exist?

---

### **TIER 1.1: BOUNDARY**

**(A) Current coverage:**
- ❌ NOT in structural-statics, -dynamics, -agency, -composition as a **named primitive**
- Implicit in: "domain," "scope," "interface," "layer" (all describe boundaries indirectly)
- But "boundary" itself is never invoked as a first-class concept

**(B) Re-explanation evidence:**
- Trading: "Entry/Exit are boundary crossings"
- Dev: "Type boundaries," "API boundaries"
- Infra: "Layer boundaries," "node boundaries"
- Cognitive: "Mode boundaries," "attention boundaries"
- Org: "Role boundaries," "scope boundaries"
- Pattern: Benjamin says "boundary" or "at the boundary," Claude translates to "interface" or "where X applies" instead of naming the boundary operation itself

**(C) What adding it enables:**
- All 6 domains collapse into ONE concept: "Where one property/rule set ends and another begins"
- Subsumes current scattered "interface," "domain," "scope" definitions and grounds them as *types* of boundaries
- Prevents: "What is an entry point?" rephrased as "At what boundary does state change?"

**(D) Dependencies/conflicts:**
- "Boundary" is the parent concept; "interface," "domain," "scope," "layer" are *applications of boundary to specific contexts*
- No conflicts. Just elevation.

**My assessment:** TIER 1A priority. This is the load-bearing structural primitive. All others hang off it.

---

### **TIER 1.2: RATIFICATION**

**(A) Current coverage:**
- ❌ NOT in any skill
- "Verify," "verify," "confirm" appear, but "ratification" as *epistemic state change* doesn't exist
- Closest: "invariant" (thing that holds) ≠ "ratification" (the act of marking something safe)

**(B) Re-explanation evidence:**
- Interaction protocol: "Track what is ratified vs. what is only stated"
- Decision-making: "Is this ratified?" = "Have we checked this thoroughly?"
- Architecture: "Ratified boundary" = "We've examined this, it's stable"
- Pattern: Benjamin uses it as a **state marker** (something changes from "tentative" → "stable"), but Claude reads it as "confirmed" (which doesn't capture the operational meaning)

**(C) What adding it enables:**
- Grounds the interaction protocol: Claude will know "ratified" is not just "agreed" but "examined from multiple angles, safe to build on"
- Prevents confusion in collaboration: Benjamin can mark what's off-the-table vs. what's still under negotiation
- Enables verification-focused skill: operations like "round-trip test," "invariant check" are actually *ratification operations*

**(D) Dependencies/conflicts:**
- Depends on: "boundary" (you ratify boundaries as safe)
- Enables: "structural-operations" skill (if created) with ratification as core operation

**My assessment:** TIER 1B priority. Foundational for *how we work together*. Not purely structural but **relational/epistemological**.

---

### **TIER 1.3: LOAD-BEARING**

**(A) Current coverage:**
- ❌ NOT as a primitive
- Implicit in: "invariant" (what must not break) but not marked as *consequence-heavy*
- Closest: "conservation" (quantity preserved) — but that's not the same

**(B) Re-explanation evidence:**
- Architecture: "Is this scaffolding or load-bearing?" (reversible vs. consequence-heavy)
- Refactoring: "What's load-bearing here?" (what breaks if we change it)
- Project planning: "Load-bearing assumptions" (wrong = expensive)
- Pattern: Benjamin asks "if this breaks, what fails?" — NOT "is this true" but "does this carry consequence?"

**(C) What adding it enables:**
- Marks invariants by *consequence level*, not just by "must hold"
- Enables prioritization: what must be correct (load-bearing) vs. what's nice-to-have (scaffolding)
- Prevents: Treating all invariants as equally critical; distinguishes "must not change" from "if changed, system collapses"

**(D) Dependencies/conflicts:**
- Refines: "invariant" (adds consequence dimension)
- Related to: "boundary" (boundaries can be load-bearing or not)
- No conflicts

**My assessment:** TIER 1C priority. Critical for *project/architecture decisions*. Changes how you evaluate what to protect.

---

### **TIER 1.4: TRANSFER**

**(A) Current coverage:**
- ❌ NOT as a named primitive
- Implicit in: "signal," "message," "channel," "coupling" (all describe transfer indirectly)
- But the core question "what transfers across boundary, what doesn't" has no operator

**(B) Re-explanation evidence:**
- Cognitive profile: "What transfers across boundaries, what doesn't?"
- Trading: Money flows (transfer), risk stays local (doesn't transfer)
- Dev: State moves across API (transfers), internal implementation detail doesn't
- Infra: Data flows across network (transfers), consensus rules apply locally (don't transfer)
- Cognitive: Attention can shift (transfers), identity stays fixed (doesn't transfer)
- Pattern: Benjamin asks this question at *every boundary*. Claude answers with domain-specific terms instead of naming the operation.

**(C) What adding it enables:**
- Unified question across all domains: "What's portable here?"
- Enables: Assessment of boundary safety ("can this move safely?" vs. "does it break?")
- Prevents: Scattered answers (flow/move/propagate/spread) when the structural question is identical

**(D) Dependencies/conflicts:**
- Depends on: "boundary" (can't ask about transfer without boundaries)
- Pairs with: "channel," "coupling," "interface" (these describe the transfer mechanism)
- No conflicts

**My assessment:** TIER 1D priority. The *core navigation question* across all domains. Essential for boundary analysis.

---

### **TIER 1.5: LAYER**

**(A) Current coverage:**
- ✓ In structural-statics ("organization" section)
- Definition: "One level in a vertical arrangement. Implies things above and below."
- **PROBLEM:** Definition assumes *sequential* layers (stack, nested)
- Benjamin's usage: "simultaneous" layers (cognitive: parallel processes; code: abstraction levels visible at same time; org: hierarchy coexisting)

**(B) Re-explanation evidence:**
- Cognitive profile: "Layers of abstraction simultaneously"
- Trading: Intrinsic vs. extrinsic value (two layers, both real at same time)
- Dev: Type layer, logic layer, state layer (all present, not sequential)
- Infra: OSI layers (simultaneous, each processing different aspects)
- Cognitive domain: Executive layer, attention layer, processing layer (all active in parallel)
- Pattern: Current definition suggests "one after another" (stack). Benjamin means "multiple concurrent levels."

**(C) What adding it enables:**
- Redefines "layer" as "simultaneous level with hidden detail" instead of "sequential level"
- Enables: Understanding why "layer" ≠ "phase" or "stage"
- Prevents: Misinterpretation that layers are processed sequentially

**(D) Dependencies/conflicts:**
- Needs refinement of existing skill entry (not addition, but correction)
- Related to: "abstraction level," "boundary," "interface"

**My assessment:** TIER 1E priority. Correction of existing definition. High impact on understanding his simultaneous-processing cognition.

---

## PHASE 2 SUMMARY: TIER 1 ASSESSMENT

| Term | Priority | Action | Depends On | Enables |
|------|----------|--------|-----------|---------|
| BOUNDARY | 1A | Add to structural-statics | None | All others |
| RATIFICATION | 1B | Add to (new?) structural-operations | BOUNDARY | Verification workflows |
| LOAD-BEARING | 1C | Add to structural-statics | BOUNDARY | Consequence marking |
| TRANSFER | 1D | Add to structural-agency | BOUNDARY | Boundary navigation |
| LAYER | 1E | REVISE in structural-statics | BOUNDARY | Multi-level reasoning |

**Dependency order:** BOUNDARY must be first. Then 1B-1E can parallel.

---

## PHASE 3: TIER 2 ASSESSMENT (Quick pass — 5 terms)

**What I'm doing:** Lighter assessment. Tier 2 is "high value, structural clarity" — I'll just note what each enables without full analysis.

### Quick Tier 2 Scan:

**TIER 2.1: DELIMIT / DELIMITATION**
- Current: NOT in skills
- Evidence: Cognitive profile uses it ("concept must be delimited"), architecture ("delimit the scope")
- Enables: Distinguishes "define what it is" from "draw boundaries of where it applies"
- Dependencies: Needs BOUNDARY first
- Action: Add to structural-statics as operation

**TIER 2.2: ABSTRACTION LEVEL**
- Current: Implicit in "layer" + composition-lens; not named as operation
- Evidence: Dev ("at what abstraction level"), cognitive ("abstraction mismatch"), org ("what level of detail?")
- Enables: Explains what gets hidden, what invariants preserve, what emerges
- Dependencies: Needs LAYER (refined) first
- Action: Extend composition-lens with "abstraction-level composition"

**TIER 2.3: SERIALIZATION BOTTLENECK**
- Current: NOT in skills
- Evidence: Neurodivergent domain (explaining communication structure); high-frequency explanation cost
- Enables: Explains why his input is compressed/asides-heavy without Claude misinterpreting as "unclear"
- Dependencies: Needs BOUNDARY, MODE
- Action: Add to new structural-operations or neurodivergent-specific skill

**TIER 2.4: MOMENTUM**
- Current: In structural-dynamics implicitly (state/dynamics); not named as distinct primitive
- Evidence: Trading ("momentum"), cognitive ("breaks momentum"), org ("loses momentum")
- Enables: Distinguishes from "motivation" or "flow state" — it's trajectory inertia (structural)
- Dependencies: None
- Action: Elevate in structural-dynamics to first-class primitive

**TIER 2.5: MAP**
- Current: NOT in skills; used as output goal, not operator
- Evidence: Cognitive profile ("complete map of boundaries"), all domains (architecture, org, cognitive — they all want a map)
- Enables: "Map" as deliverable: "Here's structure with all boundaries visible, showing what transfers/stays local"
- Dependencies: Needs BOUNDARY
- Action: Add to composition-lens as output form

---

## PHASE 3 SUMMARY: TIER 2 ASSESSMENT

| Term | Dependency Order | Skill Home | Enables |
|------|------------------|-----------|---------|
| DELIMIT | After BOUNDARY | structural-statics | Boundary operations |
| ABSTRACTION LEVEL | After LAYER | composition-lens | Abstraction-level reasoning |
| SERIALIZATION BOTTLENECK | After BOUNDARY, MODE | (new skill?) | Communication-structure clarity |
| MOMENTUM | Independent | structural-dynamics | Trajectory reasoning |
| MAP | After BOUNDARY | composition-lens | Deliverable form |

---

## PHASE 4: DECISION POINT — SKILL INTEGRATION PLAN

**What I'm doing:** Deciding WHERE these 10 Tier 1+2 terms go. Options:

**Option A: Extend existing skills**
- structural-statics + BOUNDARY, LAYER (revised), LOAD-BEARING, DELIMIT
- structural-dynamics + MOMENTUM
- structural-agency + TRANSFER
- composition-lens + ABSTRACTION LEVEL, MAP
- Create NEW skill for RATIFICATION + other verification operations

**Option B: Create unified "structural-primitives" skill**
- All 10 terms in one place, cross-referenced
- Skills reference it (one-line pointer per term)
- Pro: Single source of truth
- Con: Might be too monolithic

**Option C: Create two new skills**
- "structural-foundation" (BOUNDARY, LAYER, TRANSFER, LOAD-BEARING)
- "structural-operations" (RATIFICATION, DELIMIT, verification workflows, round-trip, etc.)
- Extend existing skills to reference these two

**Recommendation:** **Option C hybrid**
- Core structural primitives (BOUNDARY, LAYER, TRANSFER) go into structural-statics/-agency/-dynamics as **foundational entries**
- Operations (RATIFICATION, DELIMIT, MAP, ABSTRACTION LEVEL) go into a NEW **structural-composition-and-operations** skill or extend composition-lens
- LOAD-BEARING, MOMENTUM get added to existing homes (statics, dynamics)
- SERIALIZATION BOTTLENECK goes into benjamin-lexicon (neurodivergent/cognitive domain)

---

## PHASE 5: EXECUTION PLAN (Before I start modifying anything)

**Sequence I propose:**

1. **Populate benjamin-lexicon/references/lexicon.md with Tier 1+2 terms** (15 entries total)
   - With operational definitions from the audit
   - Context-adaptive framing
   - Cross-domain examples

2. **Update structural-statics**
   - Add BOUNDARY as foundational organizational primitive (Parent to domain/scope/interface/layer)
   - Revise LAYER definition to emphasize "simultaneous" abstraction levels
   - Add LOAD-BEARING as conservation primitive
   - Add DELIMIT as operation

3. **Update structural-dynamics**
   - Add MOMENTUM as state property
   - Link to TRANSFER (momentum preservation across boundaries)

4. **Update structural-agency**
   - Add TRANSFER as navigation operation
   - Link to BOUNDARY, CHANNEL, COUPLING

5. **Extend composition-lens** OR **create structural-composition-operations**
   - Add ABSTRACTION LEVEL composition
   - Add MAP as deliverable form
   - Add COMPRESSION operation (from synthesis)

6. **Create OR extend structural-operations skill** (if not exists)
   - RATIFICATION as core operation
   - Round-trip test, idempotency, convergence
   - Verification workflows

7. **Add SERIALIZATION BOTTLENECK to benjamin-lexicon**
   - With detailed explanation of communication structure and cognitive load
   - Link to MODE, BOUNDARY, and cognitive domain