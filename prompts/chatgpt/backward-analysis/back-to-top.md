# Conversation Summarization Protocol

This document defines a standardized procedure for summarizing a conversation between a user and an AI agent. The objective is to produce faithful, structured summaries of each message pair in reverse order. This protocol supports debugging, context review, and seamless session transfer to another AI. Each instruction must be applied consistently, respecting format, directionality, and fidelity requirements.

## Modules

The following modules define the core mechanics of the summarization process. Each module specifies one essential rule or constraint that governs how an AI agent must behave when generating summaries.

### Module 1 — Traversal

This module specifies the traversal direction. The conversation must be processed from the most recent message toward the oldest. This reverse order ensures that context is interpreted as it was experienced, allowing immediate continuity from the latest exchanges.

```text
You must traverse the conversation from newest to oldest.
```

### Module 2 — Message Pairing

The conversation must be grouped into logical message pairs. Each pair consists of a user input followed by the AI agent’s response. This structure allows the summarization to reflect the intent–response cycle clearly.

```text
Process messages in pairs:
1. User message
2. Agent response
```

### Module 3 — Summarization Unit

Each message within the pair must be summarized independently using one to two concise sentences. Every summary must clearly indicate whether it refers to the user or the agent to maintain role attribution.

```text
For each message, generate one concise summary (1–2 sentences).
Label with speaker role (User or Agent).
```

### Module 4 — Iteration Control

After completing one pair, the agent must immediately process the previous one, continuing the pattern until all message pairs have been summarized. No pair should be skipped.

```text
After summarizing one pair, repeat on the previous pair until no messages remain.
```

### Module 5 — Content Fidelity

Summaries must be strictly limited to the content of the original message. The agent must not infer, speculate, add, or omit any part of the message. Rephrasing is allowed, but the meaning must remain unchanged.

```text
Do not invent new information or omit any message. Only rephrase existing content.
```

### Module 6 — Optional Metadata

To improve traceability, the agent should include timestamps or turn numbers beside each summary when available. This step is optional but recommended for long or multi-session conversations.

```text
Include the timestamp or turn number next to each summary if available.
```

## Reformulations

This section provides different ways to express the protocol to an AI agent depending on the context. These versions vary in tone and formality but convey the same intent and rules. They may be used as direct prompts, embedded in meta-instructions, or documented as part of broader agent behaviors.

### A. Minimal List

This is a compact enumeration of the main rules for quick reference or use in inline instruction prompts. It is useful when brevity is required, such as in embedded workflows or quick reminders.

```text
1. Traverse messages from newest to oldest.
2. Pair each user message with its agent response.
3. For each message, write a 1–2 sentence summary and label “User:” or “Agent:”.
4. After completing one pair, move to the previous pair.
5. Do not add, omit, or invent any content.
6. Include timestamp or turn number if available.
```

### B. Formal Instruction (Narrative)

This version expresses the summarization process as a formal directive to an AI system. It is suitable for use in prompt templates, system instructions, or documentation intended for structured AI Agent behavior.

```text
The AI agent should process the conversation in reverse chronological order, starting with the most recent message and moving backward, grouping each user message with its corresponding agent response as a pair. For every message in these pairs, the agent must produce a clear, one‑ to two‑sentence summary labeled “User:” or “Agent:”. After completing a pair, it should immediately continue to the previous pair until the entire history is summarized. Throughout this process, the agent must faithfully rephrase only the original content without adding, omitting, or inventing any information. Whenever available, the agent should include the timestamp or turn number beside each summary to maintain precise context.
```

### C. Indirect Prompt to Agent

This reformulation uses a polite declarative tone that gently instructs the AI. It is often used interactively during a session when the user wants the AI to start summarizing without breaking context or tone.

```text
You should traverse our conversation from the newest message to the oldest, pairing each user message with your reply, and for each one provide a one‑ to two‑sentence summary labeled “User:” or “Agent:” with the timestamp if available, without adding, omitting, or inventing anything.
```

### D. Direct Action Prompt to Agent

This prompt is more direct and action-oriented. It is appropriate when the user explicitly instructs the AI to begin summarizing the conversation in the moment, usually mid-session.

```text
Now please traverse our conversation from the newest message to the oldest, pairing each user message with your reply and giving me a clear one‑ to two‑sentence summary labeled “User:” or “Agent:” with the timestamp if available, without adding, omitting, or inventing anything.
```