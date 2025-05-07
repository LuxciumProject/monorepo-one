# Conversation Summarization Instructions (Backwards Pairwise)

This document provides a comprehensive, single‐block set of modular instructions for an AI Agent to summarize a conversation in reverse chronological order. It conforms to strict GitHub Markdown rules with exactly one H1 heading, followed by H2 and H3 sections, each introduced by a full descriptive paragraph and containing the associated directive code.

## System Directive Style

These directives are designed for embedding into system prompts to control the AI Agent’s behavior in a declarative, deterministic manner. Each H3 subsection below defines one reusable module.

### Traversal Order

This module specifies the direction to process the conversation, ensuring summaries begin with the most recent messages and proceed backward.

```
You must traverse the conversation **from newest to oldest**.
```

### Message Pairing

This module defines the unit of summarization as a pair consisting of a user message immediately followed by the agent’s response, preserving alignment.

```
Process messages **in pairs**:
1. User message
2. Agent response
```

### Summarization Unit

This module describes the format for each summary: a brief, labeled statement that identifies the speaker and captures the core content.

```
For each message, generate **one concise summary** (1–2 sentences).
Label each summary with the speaker role (User or Agent).
```

### Iteration Control

This module enforces the loop logic, directing the AI to continue summarizing each prior pair until the very first exchange is reached.

```
After summarizing one pair, **repeat** on the previous pair until no messages remain.
```

### Content Fidelity

This module guarantees faithfulness to the original conversation by prohibiting the introduction or omission of any information.

```
Do not invent new information or omit any message. Only rephrase existing content.
```

### Optional Metadata

This module allows for the inclusion of additional context—such as timestamps or turn numbers—when such metadata is available in the conversation history.

```
Include the timestamp or turn number next to each summary if available.
```

## Paragraph Style (Natural Language Full Sentences)

This narrative form presents the entire summarization logic as one cohesive directive, suitable for user‐level prompts that require grammatical completeness.

### Instruction as Narrative

This paragraph instructs the AI to perform backward pairwise summarization with clear labels, fidelity constraints, and optional metadata, all in one statement.

```
Please work backward through the conversation from the most recent exchange, treating each user message together with its corresponding agent response as a single pair. For each message in the pair, generate a concise one‑ to two‑sentence summary clearly labeled “User” or “Agent,” include any available timestamps or turn numbers, and continue this exact process without skipping, inventing, or omitting any details until you reach the very beginning of the thread.
```

## Candid User Request

These examples model how a real user might directly ask the AI Agent for backward pairwise summarization in a natural yet precise style.

### Direct Instruction

This form mimics a straightforward user command, emphasizing clarity and completeness without system‑level framing.

```
I need you to go backwards through our conversation, pairing each of my messages with your replies, and for each pair write a concise one‑ or two‑sentence summary labeled “User” or “Agent,” including timestamps if available, until you reach the first exchange without skipping or inventing any details.
```

### Imperative Prompt Form

This version distills the same requirements into a succinct imperative suitable for live conversation.

```
Now please go backwards through our conversation, pairing each of my messages with your responses, and for each pair write a concise one‑ or two‑sentence summary labeled “User” or “Agent,” including any timestamps or turn numbers, until you reach our first exchange without skipping or inventing details.
```

## Compact Command Form

This minimal checklist condenses all essential instructions into a brief set of directives for quick reference.

### Minimal Concise Version

This checklist provides the core summarization steps in the fewest possible lines.

```
Go through the conversation from newest to oldest.
Process messages in pairs: user message first, then agent response.
Summarize each message in one or two sentences.
Label each summary as “User” or “Agent.”
Include timestamps or turn numbers if available.
Continue until all messages have been summarized without inventing or omitting any details.
```