# Conversation Summarization Protocol — Forward Analysis

This document defines a standardized procedure for summarizing a conversation between a user and an AI agent in forward chronological order. The objective is to review the dialogue from its beginning to its most recent message, producing faithful, structured summaries of each message pair. This protocol enables precise reconstruction of context evolution and supports onboarding, archival, or structured review workflows.

## Modules

These modules define the behavior expected of the AI agent when performing forward summarization. Each module encapsulates a single, clearly delimited constraint or procedure, applied consistently from the start of the conversation to its end.

### Module 1 — Traversal

This module establishes the traversal order. The conversation must be processed starting from the very first message, moving sequentially toward the most recent. This chronological approach reflects the natural buildup of context and intent.

```text
You must traverse the conversation from oldest to newest.
```

### Module 2 — Message Pairing

The agent must pair each user message with the corresponding response from the AI. Every unit of summarization is based on a user–agent pair, processed in the order in which they originally occurred.

```text
Process messages in pairs:
1. User message
2. Agent response
```

### Module 3 — Summarization Unit

Each message in a pair must be summarized separately in one to two sentences. Every summary must clearly identify the speaker role (“User” or “Agent”) to avoid ambiguity.

```text
For each message, generate one concise summary (1–2 sentences).
Label with speaker role (User or Agent).
```

### Module 4 — Iteration Control

After summarizing a message pair, immediately continue with the next pair in order. This must be repeated until the entire conversation has been summarized up to the final message.

```text
After summarizing one pair, continue with the next until the conversation ends.
```

### Module 5 — Content Fidelity

All summaries must preserve the meaning of the original message without distortion. The AI must not invent, omit, or interpret anything beyond rephrasing the actual content.

```text
Do not invent new information or omit any message. Only rephrase existing content.
```

### Module 6 — Optional Metadata

The AI may include the timestamp or turn number for each summary, if available. This metadata enhances clarity for long sessions or when reviewing sequences.

```text
Include the timestamp or turn number next to each summary if available.
```

## Reformulations

These variants express the same summarization protocol using different linguistic tones and syntactic forms. They may be used in different contexts: as embedded prompts, system instructions, or human-readable guides for agent configuration.

### A. Minimal List

This version presents the entire protocol as a short, clear list. It is appropriate when brevity and immediate clarity are essential, such as in inline instructions.

```text
1. Traverse messages from oldest to newest.
2. Pair each user message with its agent response.
3. For each message, write a 1–2 sentence summary and label “User:” or “Agent:”.
4. After completing one pair, move to the next pair.
5. Do not add, omit, or invent any content.
6. Include timestamp or turn number if available.
```

### B. Formal Instruction (Narrative)

This variant communicates the entire process as a formal declarative instruction suitable for system-level agents or meta‑prompt templates. The tone is consistent with documentation style directives.

```text
The AI agent should process the conversation in chronological order, beginning with the earliest message and moving forward toward the most recent, grouping each user message with its corresponding agent response as a pair. For every message in these pairs, the agent must produce a clear, one‑ to two‑sentence summary labeled “User:” or “Agent:”. After completing a pair, it should immediately continue to the next pair until the entire history is summarized. Throughout this process, the agent must faithfully rephrase only the original content without adding, omitting, or inventing any information. Whenever available, the agent should include the timestamp or turn number beside each summary to maintain precise context.
```

### C. Indirect Prompt to Agent

This formulation is conversational and gentle, ideal for when the agent is being guided during runtime in an interactive session. The directive is implicit yet precise.

```text
You should traverse our conversation from the first message to the latest, pairing each user message with your reply, and for each one provide a one‑ to two‑sentence summary labeled “User:” or “Agent:” with the timestamp if available, without adding, omitting, or inventing anything.
```

### D. Direct Action Prompt to Agent

This prompt is direct and imperative, intended to be issued during a session where the user wants the AI to immediately begin summarizing. It assumes readiness to act.

```text
Now please traverse our conversation from the first message to the latest, pairing each user message with your reply and giving me a clear one‑ to two‑sentence summary labeled “User:” or “Agent:” with the timestamp if available, without adding, omitting, or inventing anything.
```