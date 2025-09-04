
# Think Tool

Guide on how to use the main think tool provided via your toolbox in vscode and such.

## PURPOSE

- Capture structured reasoning or planning text to guide subsequent actions.
- Provide a transparent audit trail of analysis, decisions, and next steps in the current session.
- Does not modify files, run commands, or perform side-effecting operations.

## INPUT CONTRACT

- Required:
  - thoughts: string
    - Free-form text, typically concise but can be multi-paragraph.
    - Recommended to include: goals, steps, assumptions, risks, acceptance criteria, references to files/symbols.

## OUTPUT CONTRACT

- Returns a structured acknowledgment payload containing the submitted “thoughts”.
- Output is session-scoped metadata used to inform subsequent decisions and context.
- No persistent storage or file changes; no external API/network I/O.

## EXECUTION SEMANTICS

- Read-only, context-enriching operation.
- Synchronous acknowledgment with captured content; no background processing.
- No direct orchestration of other tools; it serves as a planning/logging step.
- Does not alter the repository, the filesystem, or runtime environment variables.

## WHEN TO INVOKE

- Before multi-step actions to outline plan and success criteria.
- During debugging to list hypotheses, test ideas, and observed signals.
- At checkpoints to capture decisions, tradeoffs, and next actions.
- When clarifying requirements or enumerating edge cases.

## WHEN TO SKIP

- Trivial, single-step tasks where planning adds no value.
- Situations requiring immediate execution or edits with obvious next steps.
- Cases where the same information has already been captured and there is no delta.

## BEST-PRACTICE CONTENT STRUCTURE

- Title or short purpose line.
- Bulleted steps or phases with concrete file/function references.
- Risks and mitigations.
- Acceptance criteria / validation plan.
- Assumptions and open questions (if any).
- Next actions.

## BENEFITS

- Increases traceability of intent and rationale across steps.
- Reduces thrash by forcing concise scoping and edge-case consideration.
- Improves coverage by explicitly listing tests/validation before edits.
- Aids collaboration (human + agent) via shared planning artifacts.
- Facilitates post-hoc review: what was intended vs. what was done.

## LIMITATIONS

- No automatic enforcement; downstream actions must still follow the plan.
- Adds overhead if misused for trivial changes.
- Not a substitute for tests, linters, or execution tools.
- Session-scoped; does not persist to code or external storage by itself.

## MINIMAL INVOCATION

- thoughts: "Short plan or rationale text"

## EXAMPLE FLOW

1. Invoke #think with thoughts:
   - “Goal: standardize headers to ‘Objective · Roadmap · Run Log · Findings & Data · Later Assessments;’
     Steps: (a) inventory files using search, (b) update templates, (c) add docs note, (d) validate via grep.
     Risks: inconsistent punctuation; Mitigation: normalize separators and trailing semicolons.
     Acceptance: grep shows only standardized variant in repo. Next: implement edits in affected markdown files.”
2. Proceed with file edits and validation using appropriate tools.
3. Optionally re-invoke #think to checkpoint outcomes and next steps.

## DECISION HEURISTICS

- If uncertainty or multi-branch paths exist, prefer invoking #think.
- If the change spans multiple files or requires cross-cutting validation, invoke #think.
- If single-line fix with low risk and obvious validation, skip
