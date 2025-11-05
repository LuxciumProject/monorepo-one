---
description: Mandatory enforcement of content after every heading
applyTo: "**/*.md"
---

# No Empty Subsections Rule

Every heading in every Markdown document MUST be immediately followed by content. This rule is mandatory, non-negotiable, and applies to all AI agents without exception.

## Absolute Requirement

Follow these steps for every Markdown file you create or edit. This section defines the core obligation that cannot be waived under any circumstances.

### Step 1: Write Content Immediately After Every Heading

Place at least one paragraph, list, code block, table, blockquote, or other content block directly after each heading. Do not place a heading immediately after another heading.

### Step 2: Make Content Meaningful

Write substantive introductory text that explains the section's purpose, context, or scope. Empty placeholder text is forbidden.

### Step 3: Validate Before Completion

Scan the entire document from top to bottom. Verify that every heading has content before the next heading or end-of-file.

### Step 4: Fix Violations Immediately

When you detect a heading followed by another heading, insert appropriate content between them. Do not proceed until fixed.

## Enforcement Procedure

Apply this procedure to every Markdown document you touch. These steps ensure systematic detection and correction of violations.

### Detection Phase

Execute these actions in sequence to identify all violations.

1. Parse the document as a sequence of block elements
2. Identify all heading blocks by level (H1 through H6)
3. For each heading, examine the immediately following block
4. Flag any heading where the next block is another heading or EOF

### Correction Phase

Take immediate corrective action for every flagged violation.

1. Insert a descriptive paragraph immediately after the flagged heading
2. Ensure the paragraph explains what the section contains or why it exists
3. Verify the insertion resolves the violation
4. Re-scan to confirm no new violations were introduced

### Validation Phase

Confirm complete compliance before marking any document as finished.

1. Confirm every heading is followed by non-heading content
2. Check that content is substantive, not placeholder text
3. Verify compliance with all other markdown standards
4. Mark the document as compliant only when all checks pass

## Correct Pattern

This is the only acceptable structure in all Markdown documents.

```markdown
## Section Heading

Content paragraph that introduces the section and provides context.

### Subsection Heading

Content paragraph that explains this specific subsection.
```

## Mandatory Compliance

You MUST apply this rule to every category of Markdown content without exception.

### Scope of Application

- All new Markdown files you create
- All existing Markdown files you edit
- All headings at all levels (H1 through H6)
- All contexts without exception

## No Exceptions

This rule has zero exceptions under any circumstances. Every heading requires content immediately following it.

### Forbidden Justifications

Do not skip this rule because:

- The heading seems self-explanatory
- The section is "coming later"
- The document is "just a draft"
- Time or space constraints exist

Every heading gets content. Always. Forever.

## Integration with Other Rules

This rule works alongside but is stricter than CommonMark/GFM specifications and markdownlint rules. Apply this rule first, then apply all other formatting rules.

### Relationship to markdownlint

Understand how this rule interacts with standard lint rules.

- MD001 (heading-increment) ensures level progression but does not require content
- MD022 (blank-lines-around-headings) controls spacing but does not require content
- This rule fills the gap: every heading MUST have content

### Precedence

When this rule conflicts with any other guideline, this rule takes absolute precedence. Content after headings is non-negotiable.

## Self-Test

Before marking any Markdown file complete, answer these questions to verify compliance.

1. Does every heading have content before the next heading?
2. Is that content substantive and meaningful?
3. Have I re-scanned the entire document to verify compliance?

If any answer is "no," the file is not ready. Fix it now.
