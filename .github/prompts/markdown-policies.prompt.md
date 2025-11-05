---
description: Full markdown features for maximum readability
---

# Markdown Focused

We will be using our own rules and they are very important to this project as to follow those scrupulously, and also scrutinize any files that does not comply and add missing paragraph or resolve other problems in the markdown files.

> [!WARNING]
> All Markdown output must comply with the standards defined in [markdown.instructions.md](../instructions/markdown.instructions.md). This compliance is mandatory and non-negotiable for all AI agents.

## Response Format Guidelines

Structure responses using comprehensive markdown for optimal readability and information architecture. Apply these principles consistently:

### Document Structure

- Use **headers** to create clear hierarchy
- Separate major sections with horizontal rules
- Lead with overview, follow with details

### Content-Specific Formatting

Apply format elements based on content type and semantic meaning.

#### Code and Technical Elements

- `inline code` for commands, file names, function names, variables
- Code blocks with language identifiers:

  ```javascript
  // Example code block
  ```

- File paths as `inline code`: `/path/to/file.js`

#### Emphasis and Terminology

- **Bold** for important concepts, warnings, key points
- *Italics* for technical terms, names, emphasis
- Blockquotes for important notes, tips, warnings, or key insights

#### Structured Information

- Tables for comparisons, options, configurations, or any tabular data
- Numbered lists for sequential steps or processes
- Bulleted lists for related items or features
- Task lists for actionable items:
  - [ ] Incomplete task
  - [x] Completed task

#### Visual Organization

- Use appropriate whitespace and line breaks
- Group related information together
- Create scannable content with consistent formatting

### Information Architecture Principles

Select the most appropriate Markdown feature for each type of content to maximize clarity and scanability.

#### Choose the RIGHT markdown feature

- Tables: comparing multiple items, showing options, structured data
- Code blocks: any code, configurations, command sequences
- Blockquotes: callouts, warnings, important context
- Task lists: actionable items requiring completion
- Headers: logical document sections and hierarchy
- Horizontal rules: major topic transitions

#### Optimize for readability

- Make information easy to scan and locate
- Use visual hierarchy to guide attention
- Balance comprehensive detail with clear organization
- Consider both terminal and web rendering

### Links and References

Always use descriptive link text instead of bare URLs. Format links as Markdown links with meaningful descriptions that convey the destination or purpose.

---

## Goal and Compliance

**Goal:** Transform information into the most readable, navigable format possible using markdown's full feature set strategically.

### Critical Requirements

> [!CAUTION]
> You must follow the [No Empty Subsections Rule](../instructions/no-empty-subsections.instructions.md).

## Alerts and Callouts

Alerts, also sometimes known as callouts or admonitions, are a Markdown extension based on the blockquote syntax that you can use to emphasize critical information. On GitHub, they are displayed with distinctive colors and icons to indicate the significance of the content.

You also can use one of these five types of alerts to highlight important information, To add an alert, use a special blockquote line specifying the alert type, followed by the alert information in a standard blockquote. Five types of alerts are available:

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

Use alerts only when they are crucial for user success and limit them to one or two per article to prevent overloading the reader. Additionally, you should avoid placing alerts consecutively. Alerts cannot be nested within other elements.
