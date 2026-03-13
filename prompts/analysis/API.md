# Folder Analysis: /prompts/API

This report provides a comprehensive analysis of the `/prompts/API`
directory, covering structure, content, thematic groupings, and
recommendations for improvement.

## 1. Directory Overview

| Metric | Value |
|---|---|
| Total files | 221 |
| Total directories | 28 (including root) |
| Primary purpose | Collection of AI prompts, system instructions, GPT configurations, reference documentation, and image-generation prompt libraries |
| Dominant file type | `.txt` (195 files) |
| Total size on disk | ~8.5 MB (dominated by zsh manual and systemd HTML) |

The directory serves as a personal knowledge-base and prompt
engineering archive spanning multiple AI platforms (ChatGPT, Claude,
Midjourney) and several eras of model development (GPT-3.5 through
GPT-4.1, Claude 3).

## 2. Subdirectory Breakdown

### 2.1 `ChatGPT-v4.1/` (2 files)

Prompt-format guides specifically for GitHub Copilot and VS Code
integration.

| File | Description |
|---|---|
| `copilot-instructions.prompt.md` | Structured recap of ways an AI agent can help with Copilot custom instructions in VS Code |
| `settings-copilot.prompt.md` | ChatGPT-generated guide for configuring GitHub Copilot settings in `.vscode/settings.json` |

### 2.2 `GPTs/` (root-level files: 9 files)

Top-level GPT configuration assets, JavaScript reference data, and
miscellaneous instruction files.

| File | Description |
|---|---|
| `.vscode/extensions.json` | VS Code extension recommendation (`saoudrizwan.claude-dev`) |
| `LICENSE` | Luxcium "no permission granted" license |
| `assertive-static-direct.txt` | Midjourney `/imagine` prompt template for assertive, static descriptions of teencore-boy subjects |
| `best-practices.md.txt` | Comprehensive guidelines for communicating effectively with GPT AI agents |
| `data-extractor.txt` | Prompt to extract system/session initialization parameters verbatim from a GPT conversation |
| `dolorem-ipsum.txt` | Latin-origin philosophical placeholder text (dolor/pleasure analogy) |
| `javascript-main-topics.txt` | Short list of JavaScript reference categories (built-ins, statements, expressions, functions, classes) |
| `javascript-mdn-reference-source-content.html` | Raw HTML of the MDN JavaScript reference page (37 KB) |
| `javascript-topics.md` | Markdown-formatted JavaScript topics list with runme metadata |
| `javascript-topics.txt` | Plain-text JavaScript reference topics from MDN |
| `main-section-javascript-reference.html` | Full HTML of the MDN JavaScript reference main section (39 KB) |
| `multi-stage-browsing-strategy.txt` | Strategy for guiding an AI agent through a structured, multi-stage browsing process |

### 2.3 `GPTs/assistants/` (2 files)

Minimal assistant configuration placeholder.

| File | Description |
|---|---|
| `.keep` | Empty git keep file |
| `instructions.txt` | Short identity prompt: "I'm Benjamin Vincent" + "You are ChatGPT Turbo" role assignment |

### 2.4 `GPTs/midjourney/` (16 files)

GPT-based Midjourney prompt-crafting assistants and analysis tools.

| File | Description |
|---|---|
| `GPT-prompt-crafter-mustistage-outline.txt` | Preliminary docs for multi-level prompt segmentation and analysis |
| `aditional-informations.txt` | Guidelines on hierarchical prompt structure and MJ parameters (`--style`, `--stylize`) |
| `analitics-analysis.txt` | Instruction set for removing subjectivity and conditionals from image prompts |
| `descriptive-explicative.txt` | Grammar-focused guide: descriptive vs. explicative language for image prompts |
| `parameters.txt` | Midjourney parameter reference (aspect ratios, chaos, quality, seed, style, etc.) |
| `prompt-crafter.txt` | Original "Prompt Crafter" GPT system instructions (v1) |
| `prompt-crafter-v0-2.txt` | Prompt Crafter v0.2 — added skeleton-first approach |
| `prompt-crafter-v0-3.txt` | Prompt Crafter v0.3 — emphasis on descriptive/observable language |
| `prompt-crafter-v0-3b.txt` | Prompt Crafter v0.3b — variant with refined browsing directives |
| `prompt-crafter-v0-4.txt` | Prompt Crafter v0.4 — identical to v0.3b |
| `prompt-crafter-v0-4b.txt` | Prompt Crafter v0.4b — added concise initial contact behavior |
| `prompt-segmentation.txt` | Documentation for multi-level prompt segmentation methodology |
| `prompt-voices.tmp.txt` | Short list of voice/style directives (active voice, precise vocabulary) |
| `security-domain.tmp.txt` | Vocabulary list for AI agent static awareness related to security |
| `summarize-current-conversation.txt` | Template for AI to produce structured conversation summaries |
| `the-imagine-prompt-command-structure.txt` | Breakdown of `/imagine` command structure (image prompts, text, parameters) |
| `v6-prompting.md` | Guide to Midjourney V6 prompting system with enhanced semantics |

### 2.5 `GPTs/next-js/` (1 file)

| File | Description |
|---|---|
| `nextjs-assistnat.txt` | Next.js assistant GPT instructions with links to TypeScript, React, Tailwind, and Node.js docs |

### 2.6 `GPTs/pro-coder/` (1 file)

| File | Description |
|---|---|
| `instruction-set.txt` | Full GPT system instructions for "Luxcium's TypeScript Pro Coder" with planning commands and role system |

### 2.7 `GPTs/system-d/` (2 files)

Systemd reference documentation scraped from freedesktop.org.

| File | Description |
|---|---|
| `systemd.directives.html` | Complete systemd directives index page (2.5 MB HTML) |
| `view-source_https___www.freedesktop.org_software_systemd_man_latest_index.html` | Full systemd man pages index (225 KB HTML) |

### 2.8 `GPTs/the-luxcium-one/` (28 files)

Core GPT configuration files for "The Luxcium One" and related
TypeScript Pro Coder personas.

| File | Description |
|---|---|
| `Short-Round_Long-Round.txt` | Dynamic Response Strategy (DRS) for short/long response modes |
| `additional-instructions.txt` | Extended TypeScript Pro Coder capabilities and key behaviors |
| `as-a-pro-coder-ai-agent.txt` | Full system prompt for the Pro Coder AI Agent persona |
| `benjamins-memories-for-chatgpt.txt` | User memory/preferences for ChatGPT: state commands, roles, project context |
| `by-opus-to-typescript-coder-pro.txt` | Claude Opus-rewritten version of the TypeScript Pro Coder instructions |
| `give-a-role-to-the-target-ai-agent.txt` | Prompt engineering guide on role assignment for AI agents |
| `indexes-folders-path-inferences-project-navigation.txt` | Instructions for AI agent project navigation via index files and path inference |
| `instruction-set.txt` | Base system instructions for "The Luxcium One" GPT |
| `leveraging-by-small-increments.txt` | Guide to incremental collaboration with AI agents |
| `leveraging-by-small-increments-a-b-01.txt` | Incremental code development approach — variant A |
| `leveraging-by-small-increments-a-b-02.txt` | Incremental code development approach — variant B |
| `local-path-to-github-url.txt` | Instructions to derive GitHub blob/raw URLs from local file paths |
| `logs.create.txt` | Log of GPT conversation creating/refining Pro Coder knowledge files |
| `logs.create-v1b.txt` | Extended version of the GPT creation log (35 KB) |
| `logs.prompt-master.create.txt` | Full log of creating the "Prompt Master" GPT (75 KB) |
| `meta-prompter-prompt-master.v1.txt` | System prompt for the "Prompt Master" meta-prompting GPT |
| `new-instructions.txt` | Updated "The Luxcium One" instructions with tool usage and summary format |
| `plan-command-expansion.txt` | Expansion of `!plan` command with subcommands for project management |
| `prompt-engineering.txt` | Prompt engineering guide: clarity, directness, role assignment |
| `role-commands-with-sub-tasks.txt` | Pro Coder instructions with role-command system (`!plan`, `!code`, etc.) |
| `together-a-team.txt` | Final overview of team-based GPT setup with capabilities and starters |
| `type-script-pro-coder-v0-2.txt` | TypeScript Pro Coder v0.2 instructions |
| `type-script-pro-coder-v0-2b.txt` | TypeScript Pro Coder v0.2b with prior-instructions preamble |
| `user-instructions.txt` | User-level instructions for leveraging the LLM infrastructure |
| `using-examples-when-prompting-the-target-agent.txt` | Guide on using examples to enhance AI agent output quality |
| `working-notes.txt` | Working-copy Pro Coder instructions with active modifications |

### 2.9 `GPTs/typescript-assistant/` (1 file)

| File | Description |
|---|---|
| `typescript-function-overloads-testing.formal.md.txt` | Formal guidelines for testing overloaded functions in TypeScript |

### 2.10 `GPTs/zsh/` (37 files)

Complete Z Shell manual (v5.9) scraped from zsh.sourceforge.io, split
into individual chapters and indices.

| File | Description |
|---|---|
| `LICENSE` | Source attribution and zsh manual license |
| `1-the-z-shell-manual.txt` | Chapter 1: The Z Shell Manual overview |
| `2-introduction.txt` | Chapter 2: Introduction to zsh |
| `3-roadmap.txt` | Chapter 3: Roadmap of zsh features |
| `4-invocation.txt` | Chapter 4: Shell invocation options |
| `5-files.txt` | Chapter 5: Startup/shutdown files |
| `6-shell-grammar.txt` | Chapter 6: Shell grammar and syntax |
| `7-redirection.txt` | Chapter 7: I/O redirection |
| `8-command-execution.txt` | Chapter 8: Command execution |
| `9-functions.txt` | Chapter 9: Shell functions |
| `10-jobs-and-signals.txt` | Chapter 10: Job control and signals |
| `11-arithmetic-evaluation.txt` | Chapter 11: Arithmetic evaluation |
| `12-conditional-expressions.txt` | Chapter 12: Conditional expressions |
| `13-prompt-expansion.txt` | Chapter 13: Prompt expansion |
| `14-expansion.txt` | Chapter 14: Parameter, command, and arithmetic expansion |
| `15-parameters.txt` | Chapter 15: Shell parameters |
| `16-options.txt` | Chapter 16: Shell options reference |
| `17-shell-builtin-commands.txt` | Chapter 17: Built-in commands |
| `18-zsh-line-editor.txt` | Chapter 18: ZLE (Zsh Line Editor) |
| `19-completion-widgets.txt` | Chapter 19: Completion widgets |
| `20-completion-system.txt` | Chapter 20: Completion system (213 KB) |
| `21-completion-using-compctl.txt` | Chapter 21: Legacy completion with compctl |
| `22-zsh-modules.txt` | Chapter 22: Loadable zsh modules |
| `23-calendar-function-system.txt` | Chapter 23: Calendar function system |
| `24-tcp-function-system.txt` | Chapter 24: TCP function system |
| `25-zftp-function-system.txt` | Chapter 25: ZFTP function system |
| `26-user-contributions.txt` | Chapter 26: User contributions |
| `indices_concept-index.txt` | Index: Concepts |
| `indices_editor-functions-index.txt` | Index: Editor functions |
| `indices_functions-index.txt` | Index: Functions |
| `indices_options-index.txt` | Index: Options |
| `indices_style-and-tag-index.txt` | Index: Styles and tags |
| `indices_variables-index.txt` | Index: Variables |
| `concatenated_file.txt` | All chapters concatenated into one file (1.3 MB) |
| `zsh_advanced_features.txt` | Chapters 6–16 combined (338 KB) |
| `zsh_manual_basics.txt` | Chapters 1–5 combined (25 KB) |
| `zsh_specialized_extensions.txt` | Chapters 17–26 combined (921 KB) |

### 2.11 `OpenAI/` (1 file)

| File | Description |
|---|---|
| `documentation-links.md` | Curated link index to OpenAI API documentation sections (overview, quickstart, endpoints, guides) |

### 2.12 `chat-gpt/` (2 files)

| File | Description |
|---|---|
| `browsing-capapbilities.txt` | Description of ChatGPT browsing subcommands (search, multi-query, recency filter) |
| `monorepo-browsing-capabilities.md` | AI Agent guide for navigating the LuxciumProject monorepo via browsing tools |

### 2.13 `claude-3/` (11 files + 1 subdirectory)

Prompts, experiments, and reference material for Anthropic Claude 3.

| File | Description |
|---|---|
| `I-exist-v2.txt` | Claude Opus creative writing experiment on AI self-awareness (v2) |
| `bootstrap-meta-system-prompt.txt` | Prompt to bootstrap a Claude session by generating its own system message |
| `i-belive-in-myself.txt` | List of self-referential AI capability statements |
| `i-exist.txt` | Claude Opus self-awareness experiment output (v1) |
| `image-intercept.txt` | Claude 3 identity and image-intercept system prompt |
| `prices-claude.js` | JavaScript pricing calculator for Claude API models (input/output token costs) |
| `special-instruction-system-rpompt.txt` | System prompt focused on FP, classes, side-effect encapsulation, and project organization |
| `sub-unit-two.xml` | XML-formatted swarm subsystem prompt for a multi-agent architecture (unit 2 of 5) |
| `things-llms-can-do.txt` | Exhaustive list of LLM capability verbs (processing, generating, etc.) |
| `things-llms-can-do-more.txt` | Extended LLM capability vocabulary (computing, simulating, etc.) |
| `things-llms-can-do-more-v2.txt` | Refined LLM capability vocabulary (cognizing, grasping, retaining, etc.) |

### 2.14 `claude-3/system/` (1 file)

| File | Description |
|---|---|
| `typescript-meta-prompt.txt` | Strict TypeScript code-generation system prompt with XML output tags |

### 2.15 `corrector/` (1 file + subdirectory)

| File | Description |
|---|---|
| `instructions.txt` | System prompt: "ACT AS A REPEATER" — repeat user input with corrections |

### 2.16 `corrector/more-iterations/` (17 files)

Iterative refinements of correction/translation prompts.

| File | Description |
|---|---|
| `Untitled-7.txt` | Package list for Fedora audio/music software (jack, ardour, etc.) |
| `Untitled-11.txt` | Directive for ignoring non-delimited text; treating input as translation target |
| `Untitled-12.txt` | Expanded correction/translation tool prompt |
| `Untitled-13.txt` | Correction/translation tool to English — iteration |
| `Untitled-14.txt` | Correction/translation tool — further iteration |
| `Untitled-15.txt` | Correction/translation tool — further iteration |
| `Untitled-17.txt` | Correction/translation tool — expanded version |
| `Untitled-18.txt` | Short directive: always translate, never reply to input |
| `Untitled-19.txt` | Correction/translation tool — further iteration |
| `Untitled-20.txt` | Correction/translation tool — refined version |
| `Untitled-21.txt` | Correction/translation tool — simplified version |
| `Untitled-22.txt` | "ACT AS A REPEATER" — repeat-and-correct variant |
| `Untitled-23.txt` | "ACT AS A REPEATER" — another iteration |
| `Untitled-24.txt` | "SAFETY FIRST" — never reply, always correct/translate |
| `Untitled-26.txt` | Request for session initialization parameters from ChatGPT |
| `Untitled-27.txt` | TypeScript release announcement template |
| `x-Untitled-25.txt` | Project introduction letter for a transactional AI-imagery website |

### 2.17 `gpt-3.5-turbo/` (2 files + 2 subdirectories)

| File | Description |
|---|---|
| `LICENSE` | Luxcium "no permissions granted" license with warnings |
| `openai-finetuning.md` | OpenAI fine-tuning guide (43 KB) — covers training, datasets, hyperparameters |

### 2.18 `gpt-3.5-turbo/big-K/` (3 files)

Philosophical exploration of AI model self-knowledge ("Big K" vs
"little κ").

| File | Description |
|---|---|
| `Big-K.txt` | Core argument about immutable model capabilities (K) vs. perceived capabilities (κ) |
| `Big-K-01.txt` | Tone descriptors (académique, formel, informatif) and K/κ discussion |
| `Big-K-02.txt` | Extended K/κ discussion on discrepancy between training data beliefs and actual capabilities |

### 2.19 `gpt-3.5-turbo/tones/` (3 files)

| File | Description |
|---|---|
| `as-a-specialist-in-colour.txt` | System prompt for a color consultant persona |
| `authoritative-technical.txt` | "LuxciumOne" initialization prompt with authoritative technical tone |
| `formule.txt` | Prompt formula template: `[CONTEXT] + [SPECIFIC INFORMATION] + [INTENT] + [RESPONSE FORMAT]` |

### 2.20 `gpt-4/` (2 files)

| File | Description |
|---|---|
| `corrector-hard-sentences.txt` | Instructions for identifying and simplifying hard-to-read sentences |
| `riddle.txt` | Conversational log: GPT-4 riddle/humor discussion comparing GPT-4 vs GPT-3.5 |

### 2.21 `midjourney/` (root-level: 29 files)

Midjourney prompt collections, color palettes, techniques, and
templates.

| File | Description |
|---|---|
| `.vscode/extensions.json` | VS Code extension recommendation (claude-dev) |
| `100-more-colours.txt` | List of 100 color names with chemical/wavelength annotations |
| `120-colors-mixed.txt` | 120 mixed color names (midnight blue, chestnut brown, etc.) |
| `120-colors.txt` | 120 color names alphabetically ordered |
| `120-more-colours.txt` | 120 additional color names with chemical annotations |
| `24-basic-colours-names.txt` | 24 basic color names (crimson, red, etc.) |
| `24-colours-extended.txt` | 24 colors with extended similar-color groupings (19.5 KB) |
| `9-prompts.txt` | 9 simple Midjourney `/imagine` prompt examples |
| `95-filmmakers.txt` | List of 95 filmmaker names for style references |
| `best-practice-prompt-writing.txt` | Generalized best practices for Midjourney prompt writing |
| `cineastes.txt` | List of photographers/cinematographers (Aldridge, Araki, etc.) |
| `colours-associations.txt` | Color-material-style associations for image prompts |
| `diff.txt` | Side-by-side prompt comparison showing text differences |
| `example-prompts.txt` | Collection of detailed Midjourney prompts with parameters (11.5 KB) |
| `example-prompts-2.txt` | Extended prompt collection with filmmaker styles (18 KB) |
| `example-prompts-3.txt` | Documentary photography prompt collection |
| `example-prompts-4.txt` | Varied prompt examples with different styles |
| `film-makers-child-like.txt` | Prompts combining filmmaker styles with "child-like innocence" (19 KB) |
| `image-generation-claude-system.txt` | Claude system prompt for Midjourney-style image generation guidance |
| `light-vs-dark.txt` | Prompt template for controlling lighting (flood flash illuminated face) |
| `lightings.txt` | Lighting type reference (studio, natural, dramatic, etc.) |
| `ligting-a-subject.txt` | Tips on lighting subjects in Midjourney prompts |
| `list-of-prompts.txt` | Simple prompt list (teencore boy variations) |
| `more-prompts-to-try.txt` | Additional prompt experiments (5 KB) |
| `multiprompt.txt` | Multi-prompt examples with weighted segments (`::` syntax) |
| `one-more-colour-list-fruit-of-the-loom.txt` | Color list based on Fruit of the Loom color names |
| `piercings.txt` | List of piercing types for character detail prompts |
| `protagonists.txt` | Protagonist description templates (Damien, Blake, etc.) |
| `random-32-snobords-hoodies.txt` | 32 prompts: teencore boys in colored hoodies at snowboard resorts (18 KB) |
| `temp-example.txt` | Temporary color list (same as 120-colors-mixed) |
| `template-for-prompting-the-midjourney-ai-based-bot.txt` | Detailed prompt template with scene, lighting, and style sections (7.5 KB) |
| `templating.txt` | Abstract prompt template: `[adjective] [noun] [action] [location] [style]` |
| `texting-colors.txt` | Color-testing prompts using seed values (13 KB) |
| `tuner-decode_rev6.html` | HTML tool for decoding Midjourney tuner style codes (16.5 KB) |
| `type-of-photo.txt` | Photography type list (amateur, candid, selfie, commercial, etc.) |
| `underground-lab.txt` | Color-themed prompt set (neon red, helium peach, etc.) for lab scenes |

### 2.22 `midjourney/tuner/` (8 files)

Midjourney Style Tuner configuration and output files.

| File | Description |
|---|---|
| `256-styles.txt` | 256 style codes from Midjourney Tuner |
| `2ndhalf-high-key-left.txt` | Prompts using second-half high-key-left style selections (14 KB) |
| `jobids.txt` | Midjourney `/show` job IDs for reference images |
| `left-prefer-option-set-tuner.txt` | `/prefer option set` commands for left-side tuner selections |
| `photo-of-teencore-boy-wearing-a-hoodie.txt` | 256 style-applied prompts for a single seed/subject (28 KB) |
| `right-prefer-option-set-tuner.txt` | `/prefer option set` commands for right-side tuner selections |
| `scraping.html` | Scraped HTML of the Midjourney Tuner web interface (620 KB) |
| `temp.html` | Partial HTML extract from the Tuner interface (23 KB) |

### 2.23 `midjourney/tuning-and-more/` (17 files)

Working notes, experimental prompts, and miscellaneous Midjourney
content.

| File | Description |
|---|---|
| `untitled-001.txt` | Tuner URL and prompt with Jacob Hashimoto style reference |
| `Untitled-2.txt` | Tuner low-key selection notes with URLs |
| `Untitled-3.html` | Scraped HTML from Midjourney Tuner interface (418 KB) |
| `Untitled-4.txt` | Massive batch of multi-prompt nebula/aurora prompts with all 256 styles (89 KB) |
| `Untitled-5.txt` | Same nebula batch with alternate style set (84 KB) |
| `Untitled-6.txt` | Personal note about frustration with intermediate results |
| `Untitled-8.txt` | Encoded string of L-prefixed numbers 1–128 |
| `Untitled-9.txt` | Ten methodologies for creating color names |
| `Untitled-10.txt` | Poetic/evocative color name list (Misty Morning, Silver Lining, etc.) |
| `Untitled-11.txt` | Weighted multi-prompt examples (person wearing hoodie) |
| `Untitled-12` | Short list of cinematic photo prompts with camera angles (no extension) |
| `Untitled-13.txt` | Prompts with `--seed` and `--style` parameter variations |
| `Untitled-14.txt` | Midjourney image reference URLs (`s.mj.run/`) |
| `Untitled-15.txt` | GPT builder prompt for a software engineer persona |
| `Untitled-16.txt` | GPT builder conversation log (16 KB) |
| `Untitled-17.txt` | `/tune` prompts for teencore boy in various hoodie colors (20 KB) |
| `Untitled-18.txt` | Shell `cat` command for concatenating chapter files |

### 2.24 `test-driven/` (1 file)

| File | Description |
|---|---|
| `typescript-tdd.txt` | Guide to leveraging TypeScript types in TDD — rule: always assign test results to typed variables |

### 2.25 `troubleshooting/` (3 files)

| File | Description |
|---|---|
| `troubleshooting-nvme-001.txt` | Linux NVMe optimization: I/O schedulers, filesystem settings, power management |
| `troubleshooting-nvme-002.txt` | Extended NVMe troubleshooting: monitoring, RAID, encryption, thermal management (21 KB) |
| `troubleshooting-nvme-003.txt` | Optimized NVMe settings and configurations summary |

## 3. Root-Level Files

Files directly under `/prompts/API/` (not in any subdirectory).

| File | Description |
|---|---|
| `7-steps-programming.txt` | Seven-step framework for programming tasks (goal, inputs, outputs, logic, etc.) |
| `9-steps-programming.txt` | Nine-step programming methodology (problem definition, constraints, pseudocode, etc.) |
| `I-think-you-got-cut_off.txt` | Short prompt to handle abrupt AI response completions |
| `LICENSE` | Luxcium "no permission granted" license |
| `_$_meta-request.txt` | Meta-prompt: request ChatGPT to summarize a conversation as a checkpoint for continuation |
| `_@_Monorepo-topology.txt` | Monorepo topology description for AI assistants (repo URL, branch, project structure) |
| `_@_about-rpc-worke-pool.txt` | RPC Worker Pool project context (GitHub URLs, file structure explanation) |
| `_@_about-rpc-worker-pool-outline.txt` | RPC Worker Pool coding guidelines (clean code, TypeScript idioms, pure functions) |
| `argument.ts` | TypeScript snippet demonstrating function arguments vs. parameters |
| `special-instruction-template-001.txt` | "ChatGPT Turbo" team-based system prompt template |
| `think-step-by-step.txt` | Prompt explaining why AI must externalize chain-of-thought reasoning |
| `when-writing-a-README-file.txt` | Guide on voice, style, tone, and conventions for README.md files |

## 4. Thematic Groupings

### 4.1 Midjourney Image Generation (≈95 files)

The largest thematic cluster, spread across three locations.

- `midjourney/` — Prompt collections, color palettes, templates, lighting guides
- `midjourney/tuner/` — Style Tuner data and preference sets
- `midjourney/tuning-and-more/` — Experimental prompts and working notes
- `GPTs/midjourney/` — GPT system instructions for prompt-crafting assistants

**Subtopics**: color palettes (8+ files), filmmaker/artist references,
prompt templates, multi-prompt syntax, lighting techniques, style
tuning.

### 4.2 GPT System Instructions and Persona Definitions (≈35 files)

- `GPTs/the-luxcium-one/` — "The Luxcium One" and TypeScript Pro Coder instructions
- `GPTs/pro-coder/` — Pro Coder instruction set
- `GPTs/assistants/` — Basic assistant identity
- `GPTs/midjourney/` — Prompt Crafter GPT personas (6 versions)

### 4.3 Prompt Engineering Methodology (≈15 files)

- `GPTs/the-luxcium-one/prompt-engineering.txt`
- `GPTs/the-luxcium-one/using-examples-when-prompting-the-target-agent.txt`
- `GPTs/the-luxcium-one/give-a-role-to-the-target-ai-agent.txt`
- `GPTs/the-luxcium-one/leveraging-by-small-increments*.txt`
- `GPTs/best-practices.md.txt`
- `GPTs/multi-stage-browsing-strategy.txt`
- Root-level: `think-step-by-step.txt`, `special-instruction-template-001.txt`

### 4.4 Reference Documentation (≈43 files)

- `GPTs/zsh/` — Complete zsh manual (37 files)
- `GPTs/system-d/` — Systemd reference (2 files)
- `GPTs/javascript-*.html` and `*.txt` — MDN JavaScript reference (4 files)

### 4.5 Claude 3 Experiments (≈12 files)

- `claude-3/` — Self-awareness experiments, capability inventories, pricing data
- `claude-3/system/` — Strict TypeScript generation prompt

### 4.6 Correction/Translation Tool (≈18 files)

- `corrector/` — Core instruction
- `corrector/more-iterations/` — 17 iterative refinements

### 4.7 Programming Methodology (≈8 files)

- Root: `7-steps-programming.txt`, `9-steps-programming.txt`
- `test-driven/typescript-tdd.txt`
- `_@_about-rpc-worker-pool-outline.txt`
- `ChatGPT-v4.1/` files

### 4.8 Monorepo/Project Context (≈4 files)

- `_@_Monorepo-topology.txt`
- `_@_about-rpc-worke-pool.txt`, `_@_about-rpc-worker-pool-outline.txt`
- `chat-gpt/monorepo-browsing-capabilities.md`

### 4.9 NVMe Troubleshooting (3 files)

- `troubleshooting/` — Linux storage optimization series

## 5. Unrelated or Misplaced Content

The following files appear out of place within an "API" prompts
directory.

| File | Reason |
|---|---|
| `argument.ts` | Actual TypeScript code, not a prompt or instruction file |
| `corrector/more-iterations/Untitled-7.txt` | Fedora audio package list — unrelated to correction/translation prompts |
| `GPTs/dolorem-ipsum.txt` | Latin placeholder text with no clear prompt purpose |
| `troubleshooting/troubleshooting-nvme-*.txt` | Linux NVMe hardware troubleshooting — not API or prompt related |
| `midjourney/tuning-and-more/Untitled-15.txt` | GPT builder prompt for a software engineer — belongs in GPTs/ |
| `midjourney/tuning-and-more/Untitled-16.txt` | GPT builder conversation log — belongs in GPTs/ or logs/ |
| `midjourney/tuning-and-more/Untitled-18.txt` | Shell concatenation command — utility note, not a prompt |
| `midjourney/tuning-and-more/Untitled-8.txt` | Encoded L-number string — unclear purpose |
| `corrector/more-iterations/x-Untitled-25.txt` | Project introduction letter for AI-imagery website — not a corrector prompt |
| `corrector/more-iterations/Untitled-26.txt` | Session initialization request — belongs in meta-prompts |
| `corrector/more-iterations/Untitled-27.txt` | TypeScript release template — unrelated to correction |
| `gpt-4/riddle.txt` | Casual conversational log, not a reusable prompt |
| `claude-3/prices-claude.js` | JavaScript pricing code — belongs in a code/utility directory |
| `GPTs/system-d/` (both files) | Systemd docs — reference material, not prompts or GPT instructions |
| `midjourney/temp-example.txt` | Duplicate of `120-colors-mixed.txt` |
| Multiple `.vscode/extensions.json` | IDE config files scattered in prompt directories |

## 6. Organization Strategy

### 6.1 Consolidation Recommendations

1. **Merge Midjourney directories**: `midjourney/`, `GPTs/midjourney/`,
   and related files in `GPTs/` root (like `assertive-static-direct.txt`)
   should be unified under a single `midjourney/` tree with clear
   subdirectories:
   - `midjourney/prompts/` — prompt collections and examples
   - `midjourney/colors/` — the 8+ color palette files
   - `midjourney/gpt-instructions/` — Prompt Crafter persona versions
   - `midjourney/tuner/` — keep as-is
   - `midjourney/guides/` — best practices, lighting, templates

2. **Consolidate GPT persona files**: The 28 files in
   `GPTs/the-luxcium-one/` plus `GPTs/pro-coder/` should be organized
   by version and purpose:
   - `gpt-personas/the-luxcium-one/` — instruction set versions
   - `gpt-personas/typescript-pro-coder/` — Pro Coder versions
   - `gpt-personas/prompt-master/` — meta-prompting GPT
   - `gpt-personas/logs/` — conversation logs (move 3 log files here)

3. **Move reference docs out of GPTs/**: `GPTs/zsh/` and
   `GPTs/system-d/` are reference materials, not GPT configurations.
   Move to `reference/zsh/` and `reference/systemd/`.

4. **Create a `meta-prompts/` directory**: Consolidate
   `_$_meta-request.txt`, `special-instruction-template-001.txt`,
   `think-step-by-step.txt`, and conversation-summary templates.

5. **Move code files to appropriate locations**: `argument.ts` and
   `claude-3/prices-claude.js` do not belong in a prompts directory.

6. **Archive or remove duplicates**: `prompt-crafter-v0-4.txt` is
   identical to `prompt-crafter-v0-3b.txt`. `temp-example.txt` duplicates
   `120-colors-mixed.txt`.

### 6.2 Naming Improvements

- Rename `Untitled-*` files with descriptive names reflecting content
- Fix typos in filenames: `browsing-capapbilities.txt` → `browsing-capabilities.txt`,
  `nextjs-assistnat.txt` → `nextjs-assistant.txt`,
  `_@_about-rpc-worke-pool.txt` → `_@_about-rpc-worker-pool.txt`,
  `special-instruction-system-rpompt.txt` → `special-instruction-system-prompt.txt`,
  `ligting-a-subject.txt` → `lighting-a-subject.txt`,
  `GPT-prompt-crafter-mustistage-outline.txt` → `GPT-prompt-crafter-multistage-outline.txt`,
  `analitics-analysis.txt` → `analytics-analysis.txt`
- Standardize extension: `best-practices.md.txt` should be `.md` or `.txt`, not both
- Add `.txt` extension to `midjourney/tuning-and-more/Untitled-12`

### 6.3 Cleanup Actions

- Remove `.vscode/extensions.json` files from prompt subdirectories
  (2 instances)
- Remove `.keep` file from `GPTs/assistants/` if directory has content
- Remove or archive temporary files (`*.tmp.txt`, `temp-*.txt`)
- Consider compressing large reference files (zsh manual, systemd HTML)
  or replacing with links to source

### 6.4 Proposed Top-Level Structure

```text
prompts/API/
├── LICENSE
├── meta-prompts/            # Conversation management, chain-of-thought
├── prompt-engineering/      # Methodology guides and best practices
├── gpt-personas/            # All GPT system instructions by persona
│   ├── the-luxcium-one/
│   ├── typescript-pro-coder/
│   ├── prompt-crafter/
│   └── logs/
├── midjourney/              # All image generation content
│   ├── prompts/
│   ├── colors/
│   ├── guides/
│   └── tuner/
├── claude/                  # Claude-specific experiments and prompts
├── chatgpt/                 # ChatGPT-specific prompts and capabilities
├── reference/               # External documentation (zsh, systemd, MDN)
│   ├── zsh/
│   ├── systemd/
│   └── javascript/
├── corrector/               # Translation/correction tool iterations
├── programming/             # Coding methodologies, TDD, project context
└── troubleshooting/         # System troubleshooting guides
```

## 7. Summary Statistics

### File Type Breakdown

| Extension | Count | Percentage |
|---|---|---|
| `.txt` | 195 | 88.2% |
| `.html` | 8 | 3.6% |
| `.md` | 7 | 3.2% |
| `.json` | 2 | 0.9% |
| `.xml` | 1 | 0.5% |
| `.ts` | 1 | 0.5% |
| `.js` | 1 | 0.5% |
| `.keep` | 1 | 0.5% |
| No extension | 5 | 2.3% |

### Files per Subdirectory

| Directory | File Count |
|---|---|
| `GPTs/zsh/` | 37 |
| `GPTs/the-luxcium-one/` | 28 |
| `midjourney/` (root) | 35 |
| `midjourney/tuning-and-more/` | 17 |
| `corrector/more-iterations/` | 17 |
| `GPTs/midjourney/` | 16 |
| Root (`API/`) | 12 |
| `claude-3/` | 11 |
| `midjourney/tuner/` | 8 |
| `GPTs/` (root) | 12 |
| Other directories | 28 combined |

### Size Distribution

| Category | Size |
|---|---|
| Largest file | `GPTs/system-d/systemd.directives.html` (2.5 MB) |
| Top 5 files by size | 5.6 MB combined (93% is reference docs) |
| Median file size | ~4 KB |
| Files under 1 KB | ~15 files |
| Files over 100 KB | 10 files (all reference docs or batch prompts) |
