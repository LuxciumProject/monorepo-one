---
description: One-sentence purpose of this card (why/when to use)
---

<!-- memory-bank/prompts/<filename>.prompt.md -->

# <Title Case Stem>
One short paragraph setting the stage and framing the task.

## Slash Command: /<stem> - <one-line purpose>
One short paragraph naming the operational state this command casts or lifts for this run.

> [!IMPORTANT]
> `/<stem>` has been called by the user to <one-line purpose>. The state above applies for this run.

### Context & Activation
- **Scope:** <files/entities in scope>
- **State:** <enabled capabilities and restrictions>
- **Inputs:** `${input:...}` defaults and validation
- **Safety:** <out-of-scope actions>

### Goal
<Desired end-state and success criteria>

### Output format
<Exact output shape (JSON/checklist/table/markdown)>

### Inputs
- `${selection}` (optional)
- `${file}` (optional)
- `${input:arg}` (runtime named inputs)

### Steps / Rules
- If missing → generate.
- If partial/broken → repair.
- If complete → no-op.
- Link standards: [Team rules](../instructions/<file>.instructions.md)

### Examples
**Input:** …
**Expected Output:** …

### Edge cases / Stop criteria
- <pitfalls and halting conditions>
- Do nothing if already compliant