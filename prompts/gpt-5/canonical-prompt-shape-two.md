---
description: One-sentence purpose of this card
---

<!-- memory-bank/prompts/<filename>.prompt.md -->

# <Title Case Stem>
One short paragraph setting the stage and framing the task.

## Slash Command: /<stem> - <one-line purpose>
One short paragraph naming the operational state this command casts or lifts for this run.

> [!IMPORTANT]
> `/<stem>` has been called by the user to <one-line purpose>. The state above applies for this run.

### Context & Activation
- **Scope:** <what this run can read/change>
- **State:** <capabilities enabled and restrictions while active>
- **Inputs:** `${input:...}` defaults and validation
- **Safety:** <explicitly out of scope actions>

### Goal
State the task and success criteria in one short paragraph.

### Output format
Define the exact shape (for example, Markdown checklist, JSON schema, table).

### Inputs
- `${selection}` (optional)
- `${file}` (optional)
- `${input:arg}` (collect named inputs at run time)

### Steps / Rules
- Prescriptive, unambiguous bullets.
- Link shared rules: [Team standards](../instructions/<file>.instructions.md)

### Examples
**Input:** …
**Expected Output:** …

### Edge cases / Stop criteria
- List known pitfalls.
- Define when to stop or return partial results.
