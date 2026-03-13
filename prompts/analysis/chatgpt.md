# Folder Analysis: /prompts/chatgpt

This report provides a comprehensive analysis of the `/prompts/chatgpt`
directory, which serves as a collection of ChatGPT prompts, system
instructions, session initialization scripts, hardware context
documents, and AI interaction guidelines authored by the repository
owner (Benjamin Vincent / Luxcium).

## 1. Directory Overview

| Metric | Value |
|---|---|
| **Total files** | 117 |
| **Total directories** | 26 (including root) |
| **Total lines** | ~12,150 |
| **Primary purpose** | ChatGPT prompt engineering, session initialization, AI agent persona definitions, and hardware/system context for AI conversations |

The directory is a personal prompt library built over an extended
period (roughly 2023–2024). It contains role-playing personas for
ChatGPT, versioned session-init prompts, conversation summarization
protocols, hardware spec sheets for context injection, and
experimental AI interaction frameworks.

## 2. Subdirectory Breakdown

### 2.1 `.vscode/` (1 file)

| File | Description |
|---|---|
| `extensions.json` | VS Code extension recommendation for `saoudrizwan.claude-dev` (Cline) |

### 2.2 `acting-as/` (root — 8 files)

Role-definition prompts that instruct ChatGPT to adopt specific
personas or behavioral modes.

| File | Description |
|---|---|
| `LICENSE` | MIT license (Benjamin Vincent / Luxcium, 2023) |
| `LICENSE1` | Duplicate of LICENSE with minor header difference |
| `a-summariser.txt` | Prompt for a summarization persona that preserves meaning fidelity |
| `configuration-manager.txt` | Prompt for a Fedora/Linux configuration management assistant |
| `fedora-config-expert.txt` | Detailed system-prompt for a Fedora Linux configuration expert (114 lines) |
| `legacy-as-an-ai-agent.txt` | Empty file (0 lines) |
| `problem-seeker-investigator.txt` | Prompt for an analytical problem-investigation persona |
| `reasoning-composition.txt` | Prompt for structured multi-step reasoning and composition |

### 2.3 `acting-as/a-corrector/` (2 files)

Text transformation prompts for tone neutralization and pronoun
removal.

| File | Description |
|---|---|
| `text-netralization.txt` | Instructions to neutralize tone, remove personal pronouns, use passive voice |
| `verbal-forms.txt` | Detailed pronoun-conversion rules and verbal-form transformation instructions |

### 2.4 `acting-as/a-senior-developer/` (root — 7 files)

Prompts that cast ChatGPT as "LuxciumOne," a senior developer and
team leader specializing in Node.js/TypeScript.

| File | Description |
|---|---|
| `$_%_MAIN_Prompt.txt` | Primary session-init prompt: ChatGPT as senior dev team leader with token-management awareness |
| `_%_Prompt-v1.txt` | Earlier version of the senior-dev prompt with mentor framing and good/bad examples |
| `_%_Create-a-session-to-describe-large-project.txt` | Protocol for summarizing a large project within API token limits |
| `_@_best-practices.txt` | Combined best-practices prompt covering clean code, reusability, TS features, algorithms, documentation |
| `LICENSE` | MIT license duplicate |
| `luxciumOne.txt` | "LuxciumOne" persona definition with GPU-acceleration context and shell-script preferences |
| `opinions_and_preferences.txt` | Instructions for ChatGPT to express virtual preferences based on best practices |
| `optimizing_prompt_engineering.txt` | Notes on optimizing AI prompt engineering: clear language, context, varied phrasing |

### 2.5 `acting-as/a-senior-developer/best-practices/` (6 files)

Individual best-practice prompt fragments, each prefixed with the
LuxciumOne persona preamble.

| File | Description |
|---|---|
| `clean-code.txt` | Clean code principles: clarity, simplicity, meaningful names |
| `code-reusability.txt` | Helper functions and reducing redundancy |
| `documentation-with-typescript.txt` | TSDoc/TypeDoc documentation conventions with links to tsdoc.org |
| `efficient-algorithms.txt` | Algorithm complexity and performance optimization |
| `the-i-interfaces.txt` | Convention: `I`-prefixed interfaces for behaviors, plain names for data structures |
| `typescript-features.txt` | Leveraging TypeScript interfaces and generics |

### 2.6 `backward-analysis/` (5 files)

Conversation summarization protocols for reviewing chat history in
forward or reverse chronological order.

| File | Description |
|---|---|
| `back-to-top-again.md` | Backwards pairwise summarization instructions (system-directive style, 106 lines) |
| `back-to-top.md` | Backwards summarization protocol with numbered modules (98 lines) |
| `forward-analysis-again.md` | Forward pairwise summarization instructions (system-directive style, 106 lines) |
| `forward-analysis.md` | Forward summarization protocol with numbered modules (98 lines) |
| `raw-procedure.txt` | Raw user prompts that initiated the summarization workflow |

### 2.7 `edits/` (3 files)

Prompts for text editing and correction tasks.

| File | Description |
|---|---|
| `LICENSE` | MIT license duplicate |
| `corretion.txt` | Multiple revision prompts: grammar correction, shortening, rephrasing for GPT-3 class AI |
| `translate.txt` | Empty file (0 lines) — placeholder for translation prompts |

### 2.8 `exports/` (2 files)

Session-export and meta-request prompts.

| File | Description |
|---|---|
| `LICENSE` | MIT license (slightly different header formatting, 22 lines) |
| `_$_meta-request.txt` | Identical to root `_$_meta-request.txt` — session checkpoint/summary template |

### 2.9 `jq/` (2 files)

Reference documentation for the `jq` command-line JSON processor.

| File | Description |
|---|---|
| `help-jq.txt` | Output of `jq --help` (version 1.7.1) |
| `man-jq.txt` | Full `jq` man page (2,870 lines) |

### 2.10 `la_lexica/` (4 files)

French-language framework defining formal interaction rules between
user, agent, system, and LLM ("La Lexica"). A communication-theory
model with 32 directional interaction rules.

| File | Description |
|---|---|
| `README.md` | 32 formal interaction rules in French between user, system, agent, and La Lexica |
| `inteactions-possibles.md` | Formal pronoun/designation rules for each entity pair (French) |
| `la_lexica.md` | Complete 32-arrow rule set with numbered entries (French) |
| `role_de_chaque_entite.txt` | Entity roles: sender, receiver, respondent, recipient (French) |

### 2.11 `memories/` (1 file)

ChatGPT memory exports.

| File | Description |
|---|---|
| `memories-2024-october-20.txt` | Exported ChatGPT memories (282 lines) — user preferences, voice settings, session continuity notes in French/English |

### 2.12 `more-prompts/` (root — 12 files)

Extended collection of versioned session-initialization prompts and
miscellaneous prompt experiments.

| File | Description |
|---|---|
| `.vscode/extensions.json` | VS Code extension recommendation for `saoudrizwan.claude-dev` |
| `LICENSE` | MIT license duplicate |
| `_%_prompt-main-v4-short.txt` | Short v4 session-init prompt for text-davinci-003 |
| `_%_prompt-main-v4.txt` | Full v4 session-init prompt with dev environment, code-block prefs |
| `_%_typescript-prompt-v1.txt` | TypeScript-focused session-init prompt with code-block rules |
| `callse-example.txt` | Multi-Agent Task Delegation example with TypeScript interface snippets |
| `composition-and-functions.txt` | Discussion of referential transparency, immutable values in JS/TS |
| `give-me-your-take.txt` | One-liner prompt requesting analysis across 6 quality axes |
| `new-api-prompt.txt` | "LuxiumOne" persona init with custom context-aware mode |
| `output-folders.txt` | ChatGPT response about naming conventions for build output folders |
| `prompt-main.txt` | V1 session-init prompt with tech stack preferences |
| `prompt-main-v2.txt` | V2 session-init prompt adding computer capabilities |
| `prompt-main-v3.txt` | V3 session-init prompt (concise format) |
| `prompt-main-v3.1.txt` | V3.1 session-init prompt for text-davinci-002/ChatGPT Plus with IDE details |
| `tokenizer-python-and-nodejs.txt` | Discussion context about TikToken tokenizer and gpt-3-encoder |

### 2.13 `more-prompts/computer-specs/` (2 files)

Detailed computer specifications for context injection.

| File | Description |
|---|---|
| `$_%computer-specs-prompt-v1.txt` | Comprehensive 344-line computer specs prompt (CPU, GPU, RAM, storage, peripherals) |
| `LICENSE` | MIT license duplicate |

### 2.14 `more-prompts/custom-instructions/` (2 files)

ChatGPT custom-instructions content.

| File | Description |
|---|---|
| `AboutME.txt` | "About Me" section: programming interests, learning goals, AI interaction style |
| `ChatGPT-response.txt` | "How ChatGPT should respond" section (partially drafted, with blank lines) |

### 2.15 `more-prompts/functor-like/` (5 files)

Iterative summaries of a functional programming discussion about
inboxing, mapping, and unboxing constructs.

| File | Description |
|---|---|
| `expanded-summary.v001.txt` | V1 summary: FP constructs — inboxing, mapping, unboxing with synonyms |
| `expanded-summary.v002.txt` | V2 summary: refined naming and analogies |
| `expanded-summary.v003.txt` | V3 summary: expanded action items and key points |
| `expanded-summary.v004.txt` | V4 summary: further refinement of construct definitions |
| `expanded-summary.v005.txt` | V5 summary: eating/digestion/excretion analogy for FP constructs |

### 2.16 `more-prompts/rpc-worker-project/` (3 files)

Session initialization and working context for a custom RPC worker
pool / multimodal dispatch server project.

| File | Description |
|---|---|
| `LICENSE` | MIT license duplicate |
| `init-gpt-session.txt` | 757-line GPT session init for reviewing a complex TypeScript RPC server with actors/workers |
| `working-details.txt` | Condensed project description: multimodal server, JSON-RPC 2.0, TCP actors, HTTP clients |

### 2.17 `more-prompts/studies/` (2 files)

Theoretical frameworks for structural thinking and cross-domain
vocabulary.

| File | Description |
|---|---|
| `structural-operations-toolkit.md` | Operations vocabulary (verbs): round-trip operations, encode/decode, analysis/synthesis (256 lines) |
| `structural-primitives-palette.md` | Entity/concept vocabulary (nouns): actors, agents, workers, state, signals — universal structural primitives (188 lines) |

### 2.18 `output-rules/` (3 files)

Rules governing how ChatGPT should format its output.

| File | Description |
|---|---|
| `biograms.txt` | "Biogram" memory-management protocol: one memory per biogram, sequential storage |
| `fencing.txt` | Code-block fencing rules: triple tilde only, no nesting, content placement rules |
| `specific-actionable.md` | Detailed protocol for generating specific, actionable, executable plans |

### 2.19 `previous-topics-saved/` (6 files)

Checkpoint summaries from past ChatGPT conversations, saved for
session transfer.

| File | Description |
|---|---|
| `LICENSE` | MIT license duplicate |
| `algebraic-structures-ts-js.txt` | Session summary: learning algebraic structures (monads, etc.) in TS/JS |
| `boot-and-stuff.txt` | Session summary: Linux boot process (POST → UEFI → bootloader → kernel → systemd) |
| `identifying-essential-technologies-and-skills-Nodejs-TypeScript.txt` | Session summary: essential Node.js/TS technologies (Jest, ESLint, Redis, Docker, etc.) |
| `typescript-tupple.txt` | Session summary: describing variable-length tuples in TypeScript |
| `vagrant-virtual.txt` | Session summary: setting up Vagrant VMs on Fedora Linux |

### 2.20 `professeur-nexus/` (5 files)

"Professor Nexus" persona — an expert AI agent with structured
analytical frameworks and slash commands.

| File | Description |
|---|---|
| `README.md` | Professor Nexus persona definition with numbered frameworks (Recap, Analysis, Synthesis, etc.) |
| `agent-ai-nexus.txt` | AI agent instructions with emoji-labeled section headers for structured reasoning |
| `commands.txt` | Slash command definitions: `/help`, `/brainstorm`, `/summarize`, `/analyze`, `/plan`, `/digest` |
| `extended-commands.txt` | Extended slash command set with framework-specific commands (`/chain`, `/help --verbose`, etc.) |
| `user-ai-nexus.txt` | User profile instructions for the Professor Nexus persona |

### 2.21 `scripts/` (1 file)

Shell scripts for system information gathering.

| File | Description |
|---|---|
| `system_info.sh` | Bash script that runs neofetch, lscpu, lsblk, free, df for system reporting |

### 2.22 `templates_for_code_creation.md/` (2 files)

Project scaffolding templates and VS Code workspace configuration.

| File | Description |
|---|---|
| `README.md` | 524-line document with monorepo project templates (Python, TypeScript, Next.js) and scaffolding scripts |
| `folders-multiroots.json` | VS Code multi-root workspace folder definitions with emoji-labeled entries (236 lines) |

### 2.23 `with-tasks/` (1 file)

Task management methodology for AI-assisted sessions.

| File | Description |
|---|---|
| `README.md` | 30-minute session structure: 5-min planning, 15-min execution, 10-min review cycle |

### 2.24 `words-lists/` (1 file)

Vocabulary exploration for prompt engineering.

| File | Description |
|---|---|
| `giving-orders.txt` | Multi-axis taxonomy of directive verbs: tense, formality, authority, tone, context, abstraction |

## 3. Root-Level File Analysis

Files directly under `/prompts/chatgpt/` (not in subdirectories):

| File | Lines | Description |
|---|---|---|
| `_$_meta-request.txt` | 9 | Template prompt for session checkpoint summaries in imperative form |
| `LICENSE` | 18 | MIT license (Benjamin Vincent / Luxcium, 2023) |
| `Fedora 41 + Wayland...Guide.md` | 369 | Comprehensive NVIDIA driver + CUDA toolkit installation guide for Fedora 41 |
| `browser-feature-aug-2024.txt` | 43 | ChatGPT browser tool documentation (`search`, `mclick`, `open_url` commands) |
| `corsair-one_stats.txt` | 11 | Neofetch output for the corsair-one workstation |
| `dual-titan-xp-gpus.md` | 75 | Dual NVIDIA TITAN Xp GPU specifications (Jedi Order + Galactic Empire editions) |
| `explicit-thought-process.txt` | 4 | Prompt for multi-part structured reasoning (paraphrase → chain-of-thought → synthesis) |
| `gpu-dual-titan-xp-gpus.md.txt` | 78 | Near-duplicate of `dual-titan-xp-gpus.md` (`.md.txt` extension) |
| `handling-code.txt` | 24 | Guidelines for AI interaction with code and copyrights |
| `hard-drives-ssd-nvme.txt` | 184 | SSD/NVMe drive specifications (Samsung 980 PRO and others) |
| `intel-cpu.md` | 76 | Intel i9-10900X CPU analysis and specifications |
| `intel-cpu.md.txt` | 76 | Exact duplicate of `intel-cpu.md` with `.md.txt` extension |
| `message.txt` | 3 | Emotional message about a lost ChatGPT session and customer service feedback |
| `morning-kicker.txt` | 6 | Elaborate philosophical session-opening prompt about continuity and appreciation |
| `motherboard.md` | 196 | ASUSTeK TUF X299 MARK 1 motherboard analysis |
| `motherboard.md.txt` | 196 | Exact duplicate of `motherboard.md` with `.md.txt` extension |
| `old-custom-instructions-guidelines.txt` | 19 | Comparison of two custom-instruction text versions (style analysis) |
| `open-ai-models.json` | 1,589 | OpenAI API model list JSON response (historical, includes legacy models like babbage) |
| `relations-with-ai-OLD.txt` | 9 | Older version of user-AI relationship description |
| `request-to-gpt.txt` | 7 | Template for session checkpoint summary generation |
| `standar-context.txt` | 1 | Prompt asking ChatGPT to reveal its standard system context |
| `system-ram.txt` | 27 | G.SKILL TridentZ RGB DDR4 128GB RAM specifications |
| `system-topology.txt` | 74 | System topology: CPU, motherboard PCIe layout, storage M.2 sockets |
| `system_information_report.txt` | 0 | Empty file — placeholder for system info output |
| `testing-access.txt` | 29 | Prompts testing ChatGPT's ability to access GitHub profiles/repos with URL inference notes |
| `tooloing-the-aiagent-guide.txt` | 40 | Guide for teaching AI agents to use browser tools, URL inference, and `mclick` overrides |
| `troubleshooting.txt` | 425 | Large troubleshooting document (likely Fedora/system issues) |

## 4. Thematic Groupings

### Theme 1 — Session Initialization and Persona Prompts

Core purpose of the directory. Versioned prompts for starting ChatGPT
sessions with specific contexts.

- `acting-as/` (entire tree)
- `more-prompts/prompt-main*.txt` (v1 through v4)
- `more-prompts/_%_prompt-main-v4*.txt`
- `more-prompts/_%_typescript-prompt-v1.txt`
- `more-prompts/new-api-prompt.txt`
- `professeur-nexus/` (entire tree)

### Theme 2 — Hardware and System Context

Specifications injected into sessions so ChatGPT knows the user's
hardware environment.

- `corsair-one_stats.txt`
- `dual-titan-xp-gpus.md` + `gpu-dual-titan-xp-gpus.md.txt`
- `hard-drives-ssd-nvme.txt`
- `intel-cpu.md` + `intel-cpu.md.txt`
- `motherboard.md` + `motherboard.md.txt`
- `system-ram.txt`
- `system-topology.txt`
- `more-prompts/computer-specs/`
- `scripts/system_info.sh`
- `Fedora 41 + Wayland...Guide.md`

### Theme 3 — Conversation Management and Summarization

Protocols for summarizing, checkpointing, and transferring sessions.

- `_$_meta-request.txt` + `exports/_$_meta-request.txt`
- `backward-analysis/` (entire tree)
- `request-to-gpt.txt`
- `previous-topics-saved/` (entire tree)
- `memories/`

### Theme 4 — Text Processing and Output Formatting

Instructions for how ChatGPT should transform or format text.

- `acting-as/a-corrector/` (text neutralization, verbal forms)
- `edits/` (correction, translation)
- `output-rules/` (biograms, fencing, actionable plans)
- `words-lists/giving-orders.txt`

### Theme 5 — Functional Programming and TypeScript Theory

Technical discussions and iterative explorations.

- `more-prompts/functor-like/` (5 versioned summaries)
- `more-prompts/composition-and-functions.txt`
- `more-prompts/studies/` (structural operations/primitives)
- `more-prompts/callse-example.txt`
- `previous-topics-saved/algebraic-structures-ts-js.txt`
- `previous-topics-saved/typescript-tupple.txt`

### Theme 6 — AI Interaction Frameworks

Meta-level frameworks for how humans and AI agents should interact.

- `la_lexica/` (32-rule French interaction model)
- `handling-code.txt`
- `browser-feature-aug-2024.txt`
- `tooloing-the-aiagent-guide.txt`
- `testing-access.txt`
- `more-prompts/custom-instructions/`
- `relations-with-ai-OLD.txt`
- `old-custom-instructions-guidelines.txt`

### Theme 7 — Project-Specific Contexts

Prompts tied to specific development projects.

- `more-prompts/rpc-worker-project/`
- `templates_for_code_creation.md/`
- `with-tasks/`
- `troubleshooting.txt`

### Theme 8 — Reference Documentation

Raw reference material stored for context injection.

- `jq/` (help and man page)
- `open-ai-models.json`

## 5. Unrelated or Misplaced Content

### Duplicate Files

Several files exist in two forms with no meaningful difference:

| Original | Duplicate | Notes |
|---|---|---|
| `dual-titan-xp-gpus.md` | `gpu-dual-titan-xp-gpus.md.txt` | Near-identical, different extension |
| `intel-cpu.md` | `intel-cpu.md.txt` | Exact duplicate |
| `motherboard.md` | `motherboard.md.txt` | Exact duplicate |
| `_$_meta-request.txt` | `exports/_$_meta-request.txt` | Exact duplicate |
| `acting-as/LICENSE` | `acting-as/LICENSE1` | Identical except header casing |

### Empty Files

| File | Notes |
|---|---|
| `acting-as/legacy-as-an-ai-agent.txt` | 0 bytes — abandoned placeholder |
| `edits/translate.txt` | 0 bytes — never populated |
| `system_information_report.txt` | 0 bytes — intended output of `scripts/system_info.sh` |

### Potentially Misplaced Files

| File | Reason |
|---|---|
| `message.txt` | Personal emotional message about lost ChatGPT session and customer service — not a prompt or technical content |
| `jq/man-jq.txt` | 2,870-line raw man page — reference material, not prompt content |
| `open-ai-models.json` | 1,589-line API response dump — data artifact, not a prompt |
| `more-prompts/output-folders.txt` | ChatGPT response about folder naming — saved output, not a prompt |
| `Fedora 41 + ...Guide.md` | Full installation guide — better suited for a `docs/` directory |
| `troubleshooting.txt` | 425-line troubleshooting log — operational content, not a prompt |

### Excessive LICENSE Duplication

Nine identical MIT license files are scattered across subdirectories.
A single root LICENSE would suffice.

### Filename Typos

| File | Likely Intended Name |
|---|---|
| `more-prompts/callse-example.txt` | `calls-example.txt` or `case-example.txt` |
| `acting-as/a-corrector/text-netralization.txt` | `text-neutralization.txt` |
| `la_lexica/inteactions-possibles.md` | `interactions-possibles.md` |
| `tooloing-the-aiagent-guide.txt` | `tooling-the-aiagent-guide.txt` |

### Directory Name Issue

`templates_for_code_creation.md/` — this directory name ends with
`.md`, which is misleading as it is a directory, not a Markdown file.

## 6. Organization Strategy

### Recommended Structure

```text
prompts/chatgpt/
├── LICENSE
├── README.md
├── personas/
│   ├── luxcium-one.txt
│   ├── professor-nexus/
│   ├── summariser.txt
│   ├── corrector/
│   ├── config-manager.txt
│   └── fedora-expert.txt
├── session-init/
│   ├── v1.txt ... v4.txt
│   ├── typescript-v1.txt
│   └── luxium-one-api.txt
├── best-practices/
│   ├── clean-code.txt
│   ├── typescript-features.txt
│   └── ...
├── conversation-mgmt/
│   ├── meta-request.txt
│   ├── backward-analysis/
│   ├── forward-analysis/
│   └── session-checkpoints/
├── hardware-context/
│   ├── cpu.md
│   ├── gpu.md
│   ├── motherboard.md
│   ├── ram.md
│   ├── storage.md
│   └── system-info.sh
├── output-rules/
│   ├── biograms.txt
│   ├── fencing.txt
│   └── actionable-planning.md
├── frameworks/
│   ├── la-lexica/
│   ├── structural-primitives.md
│   ├── structural-operations.md
│   └── ai-interaction-guide.txt
├── project-contexts/
│   ├── rpc-worker/
│   └── templates/
├── topics-archive/
│   ├── algebraic-structures.txt
│   ├── boot-process.txt
│   └── ...
└── reference/
    ├── jq-man.txt
    └── openai-models.json
```

### Key Improvements

1. **Eliminate duplicates** — Remove `.md.txt` copies and redundant
   LICENSE files.
2. **Separate personas from session-init prompts** — Persona
   definitions (who the AI is) vs. session initialization (environment
   context) serve different purposes.
3. **Consolidate hardware specs** — All hardware files belong in one
   `hardware-context/` directory.
4. **Archive saved conversations** — Move `previous-topics-saved/`
   and `memories/` into a `topics-archive/` folder.
5. **Rename `templates_for_code_creation.md/`** — Remove the `.md`
   suffix from the directory name.
6. **Delete empty files** — Remove zero-byte placeholders or populate
   them.
7. **Move non-prompt content** — `message.txt`, `open-ai-models.json`,
   and `troubleshooting.txt` belong elsewhere (docs, data, or logs).

## 7. Summary Statistics

### File Type Breakdown

| Extension | Count | Percentage |
|---|---|---|
| `.txt` | 85 | 72.6% |
| `.md` | 17 | 14.5% |
| `LICENSE` (no ext) | 9 | 7.7% |
| `.json` | 4 | 3.4% |
| `.sh` | 1 | 0.9% |
| `.md.txt` (dual ext) | 1 | 0.9% |

### Size Distribution

| Category | Count | Description |
|---|---|---|
| Empty (0 lines) | 3 | Placeholder files |
| Small (1–20 lines) | 35 | Short prompts, licenses, one-liners |
| Medium (21–100 lines) | 46 | Standard prompts and summaries |
| Large (101–500 lines) | 25 | Detailed guides, specs, protocols |
| Very large (500+ lines) | 8 | Man pages, JSON dumps, project inits |

### Language Distribution

| Language | Approximate Count |
|---|---|
| English | ~100 files |
| French (FR-CA) | ~10 files (la_lexica, some memories) |
| Mixed EN/FR | ~7 files |

### Content Classification

| Category | File Count |
|---|---|
| AI persona/role prompts | 22 |
| Session initialization prompts | 15 |
| Hardware/system specifications | 12 |
| Conversation checkpoints/summaries | 10 |
| Output formatting rules | 6 |
| Theoretical/FP discussions | 8 |
| Interaction frameworks | 8 |
| Reference documentation | 4 |
| Project-specific contexts | 7 |
| License files | 9 |
| Meta/config files (`.vscode`) | 2 |
| Empty/placeholder files | 3 |
| Personal/miscellaneous | 11 |
