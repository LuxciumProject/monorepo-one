# Conversation Summarization Instructions (Forward Pairwise)

This document provides a comprehensive, reusable set of instructions for summarizing a conversation in forward chronological order by pairing each user message with its corresponding agent response. It adheres to strict GitHub Markdown formatting with a single H1 heading, followed by H2 and H3 sections, each introduced by a full descriptive paragraph and containing its directive in a code fence.

## System Directive Style

These directives are designed for embedding into system prompts to control the AI Agent’s behavior in a declarative, deterministic manner. Each module defines one specific aspect of the forward, pairwise summarization behavior.

### Traversal Order

This module sets the traversal direction, instructing the agent to begin with the oldest messages and proceed forward through the conversation.

```
You must traverse the conversation **from oldest to newest**.
```

### Message Pairing

This module defines the summarization unit as a pair consisting of a user message immediately followed by the agent’s response, preserving clear alignment.

```
Process messages **in pairs**:
1. User message
2. Agent response
```

### Summarization Unit

This module specifies the output format for each message, requiring a brief, labeled summary that identifies the speaker and captures the core content.

```
For each message, generate **one concise summary** (1–2 sentences).
Label each summary with the speaker role (User or Agent).
```

### Iteration Control

This module enforces the loop logic, directing the agent to continue summarizing each subsequent pair until the most recent exchange is reached.

```
After summarizing one pair, **repeat** on the next pair until no messages remain.
```

### Content Fidelity

This module guarantees faithfulness to the original conversation by prohibiting the introduction or omission of any information.

```
Do not invent new information or omit any message. Only rephrase existing content.
```

### Optional Metadata

This module allows for the inclusion of additional context—such as timestamps or turn numbers—alongside each summary when such metadata is available.

```
Include the timestamp or turn number next to each summary if available.
```

## Paragraph Style (Natural Language Full Sentences)

This section presents the entire summarization logic as one cohesive narrative, suitable for user-level or meta-level prompts that require grammatical completeness.

### Instruction as Narrative

This paragraph instructs the agent to perform forward, pairwise summarization with clear labels, fidelity constraints, and optional metadata, all in complete sentences.

```
Please work forward through the conversation from the first exchange, treating each user message together with its corresponding agent response as a single pair. For each message in the pair, generate a concise one‑ to two‑sentence summary clearly labeled “User” or “Agent,” include any available timestamps or turn numbers, and continue this exact process without skipping, inventing, or omitting any details until you reach the most recent message.
```

## Candid User Request

This section models how a real user might directly ask the AI Agent for forward, pairwise summarization in a natural yet precise style.

### Direct Instruction

This form mimics a straightforward user command, emphasizing clarity and completeness without system-level framing.

```
I need you to go forward through our conversation, pairing each of my messages with your replies, and for each pair write a concise one‑ or two‑sentence summary labeled “User” or “Agent,” including timestamps if available, until you reach the most recent exchange without skipping or inventing any details.
```

### Imperative Prompt Form

This version distills the same requirements into a succinct imperative suitable for live conversation.

```
Now please go forward through our conversation, pairing each of my messages with your responses, and for each pair write a concise one‑ or two‑sentence summary labeled “User” or “Agent,” including any timestamps or turn numbers, until you reach our most recent exchange without skipping or inventing details.
```

## Compact Command Form

This section offers the minimal essential instructions condensed into a brief checklist format, ideal for quick-reference scenarios.

### Minimal Concise Version

This checklist provides the core summarization steps in the fewest possible lines.

```
Go through the conversation from oldest to newest.
Process messages in pairs: user message first, then agent response.
Summarize each message in one or two sentences.
Label each summary as “User” or “Agent.”
Include timestamps or turn numbers if available.
Continue until all messages have been summarized without inventing or omitting any details.
```