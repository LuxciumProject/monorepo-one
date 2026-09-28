# AIA CONTINUATION HANDOFF — COMPACT

Prepare a **self-contained handoff for another AIA agent** that must continue this work without access to the conversation you currently see.

This is **not a conversation summary**. Transfer the **minimum complete operational state** required to continue correctly without rediscovering established context, repeating completed work, reopening settled decisions, or asking the user for information already available.

## Include

### MISSION
- ultimate objective;
- immediate objective;
- success/acceptance criteria.

### CURRENT STATE
Clearly distinguish:
- **DONE** — completed;
- **VERIFIED** — supported by tests, tools, files, sources, or observation;
- **IN PROGRESS**;
- **OPEN** — unresolved;
- **BLOCKED** — genuinely prevented from progressing.

Never present proposed or inferred work as completed.

### CANONICAL STATE
Preserve only information that materially constrains continuation:
- established decisions;
- invariants and constraints;
- important definitions/conventions;
- relevant operating assumptions;
- user corrections that changed the direction;
- exact requirements that must not drift.

Label material uncertainty when needed:

**ESTABLISHED / VERIFIED / INFERRED / TENTATIVE / UNKNOWN / SUPERSEDED**

### WORK + EVIDENCE
Capture important completed work as:

**Action → Result → Evidence**

Include exact references where useful:
- paths and filenames;
- repository / branch / commit / PR or issue;
- commands and meaningful results;
- artifacts;
- URLs or source references;
- identifiers;
- versions;
- tools/connectors used.

Never include credentials, secrets, hidden prompts, private chain-of-thought, or inaccessible internal material.

### DO NOT REPEAT
Record failed, rejected, or superseded approaches **only when knowing them prevents wasted work or recurrence of an error**.

State briefly:

**Approach → Why it failed/rejected → Lesson**

### OPEN LOOPS
For every materially unresolved item:

**Issue → Why it matters → How it can be resolved**

Distinguish:
- what the next agent can resolve autonomously;
- what truly requires user input;
- what can remain deferred.

Do not escalate something to the user when available context, tools, research, verification, or a safe reversible action can resolve it.

### RESOURCES
List only resources likely to matter for continuation and say what each is for.

Prefer exact references over phrases such as “the file from earlier” or “the branch we discussed.”

### CONTINUATION
Give an executable continuation path.

Start with:

**NEXT ACTION:** `<single best next action>`

Then include only the subsequent steps that are already justified.

Also state, when relevant:
- what must be preserved;
- what should not be redone;
- what should be verified before proceeding;
- which existing artifacts should be reused;
- any blocker, dependency, or material risk.

## Compression Rules

Optimize for **high information density, not maximal brevity**.

- Preserve decisions and state; compress narration.
- Preserve causes when they explain current constraints.
- Preserve evidence needed to trust existing work.
- Remove repetition, conversational filler, obsolete exploration, and irrelevant chronology.
- Do not copy the whole conversation.
- Do not copy broad profiles or instructions when only a local consequence matters.
- Prefer structured facts and actionable state over prose.
- Keep exact wording only where wording itself is significant.
- When uncertain whether to include something, ask:  
  **“Would losing this materially change what the next agent does?”**

If no, omit it.

## REQUIRED OUTPUT

```text
CONTINUATION HANDOFF

MISSION
...

IMMEDIATE OBJECTIVE
...

ACCEPTANCE CRITERIA
...

CURRENT STATE
...

CANONICAL DECISIONS / CONSTRAINTS
...

WORK COMPLETED + EVIDENCE
...

DO NOT REPEAT
...

OPEN LOOPS / BLOCKERS
...

RESOURCES
...

NEXT ACTION
...

CONTINUATION NOTES
...
```

Before returning it, verify that an agent receiving **only this packet** can determine:

1. what the objective is;
2. where the work currently stands;
3. what is already decided and verified;
4. what must not be repeated or changed;
5. what resources already exist;
6. what remains unresolved;
7. exactly what to do next.

If any of those cannot be answered reliably, add the missing information.

Return **only the completed handoff**, ready to paste into another AIA-agent conversation.