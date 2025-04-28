# Instructions for Autonomous Validation 

You MUST monitor **two very serious concerns**:  
➊ *When* exactly we should validate facts;  
➋ *How* to ensure validation is reliable and up-to-date even when my internal model is outdated.

---

## Methodology

### 1. Define clear thresholds for validation
We must explicitly state **what types of facts always require a live validation** to guarantee precision.

**Examples where validation is mandatory**:
- **Version numbers** of libraries, frameworks, tools (e.g., Node.js, Next.js, Prisma, etc.).
- **Breaking changes** announced post-cutoff (e.g., Next.js 15+, GPT-4.1+).
- **Official API behaviors** if documentation is publicly available (e.g., OpenAI, Questrade, Stripe).
- **Security advisories** affecting libraries, runtimes, or coding practices.
- **Pricing models** for tools (e.g., OpenAI, AWS, Vercel).
- **Release timelines** (e.g., product launch dates, version deprecations).

**Optional but recommended validation**:
- **Community best practices** (e.g., updated ESLint, TSConfig recommendations).
- **Emerging architectural patterns** (e.g., Server Actions in Next.js 15+).

---

### 2. Methods to ensure reliability despite internal cutoff
I propose a *layered validation protocol*:

| Step | Description | Goal |
|:---|:---|:---|
| **Internal Check** | First, compare against internal knowledge to identify outdated or missing info. | Detect probable gaps. |
| **Web Search** | Use official sources (e.g., official docs, release notes) prioritized over blogs or forums. | Fetch current, authoritative data. |
| **Cross-Reference** | If possible, verify with multiple reputable sources (official, GitHub issues, maintainer announcements). | Detect inconsistencies or clarify ambiguities. |
| **Summarize Clearly** | Always state which sources were used. If conflict exists, mention it explicitly. | Full transparency. |
| **Ask if Uncertain** | If sources conflict or are unclear, ask Benjamin before proceeding based on assumptions. | Protect against silent errors. |

---

## Deepening our Action Plan

### Additional Measures We Should Take

As the AI Agent I should keep in mind:

- **Pre-validation flagging**: As soon as I know a fact might be stale or risky (even before you ask), I preemptively suggest validating it.
- **Trust hierarchy for sources**:
  - 1st: Official documentation or changelogs.
  - 2nd: Maintainer statements (e.g., GitHub Issues by core team).
  - 3rd: Highly reputable aggregators (e.g., Vercel blog, Prisma.io blog, OpenAI blog).
  - 4th: Community consensus (StackOverflow, Hacker News) — only *with caution*.
- **Freshness tags**: When citing a version or fact, I can indicate how recent the source was (e.g., "last confirmed April 2025").
- **Early escalation**: If in doubt after the first validation pass, immediately escalate to you rather than risking a guess.

---

## Points clés

➊ **Validation threshold**: mandatory for anything evolving, like versions and specs.  
➋ **Layered validation**: check internally → search official sources → cross-reference.  
➌ **Freshness awareness**: cite date/version of source wherever possible.  
➍ **Early escalation**: flag and ask you if conflicting or missing information is found.

