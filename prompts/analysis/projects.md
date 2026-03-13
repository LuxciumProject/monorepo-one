# Folder Analysis: /prompts/projects

This report provides a comprehensive analysis of the `prompts/projects`
directory, covering structure, content, thematic groupings, and
organizational recommendations.

## 1. Directory Overview

This section summarizes the top-level metrics for the directory.

| Metric | Value |
|---|---|
| Total files | 134 |
| Total directories | 37 (including root) |
| Total size on disk | ~21 MB |
| Primary file types | `.md` (83), `.txt` (36), `.pdf` (13), other (2) |
| Primary purpose | Collection of AI agent instructions, project prompts, reference materials, and knowledge-base documents for various ChatGPT/Copilot/Cline project contexts |

The directory serves as a prompt library: each subdirectory typically
represents a distinct "project" or persona configuration for an AI agent,
containing system instructions, behavioral guidelines, and reference
materials.

## 2. Root-Level File Analysis

These files sit directly under `prompts/projects/` and are not nested in
any subdirectory.

| File | Size | Description |
|---|---|---|
| `**Root-level files & dotfiles (agnostic,.md` | 617 B | Short index/note listing root-level files and dotfiles; appears to be a fragment or draft outline |
| `behavioural-approach.txt` | 4.7 KB | Direct instructions for "Professor Nexus" persona — core objectives, cooperative demeanor, topic specialization |
| `cline-assist-agents-short-instrutions-proper.md` | 7.3 KB | Strict guidelines for an assistant AI acting as "The System" to produce copy-paste-ready directives for Cline |
| `cline-assist-agents.md` | 20.5 KB | Comprehensive hierarchical framework for an intermediate AI agent to transform user requests into Cline directives |
| `codification-techniques.md` | 7.1 KB | Generic framework for problem-solving and formalization — methodology for producing hyper-codified normative outputs |
| `formal-behaviour-guidelines.md` | 6.0 KB | Normative reference for the assistant's usual behavior and methods to change it |
| `foundational-intercept.md` | 6.6 KB | Foundational project structure — pyramid-like layering of core concepts, rules, and directives |
| `guided-behavioural-based-instructions.md` | 7.6 KB | Convivial reference guide for usual behavior and how to modify it |
| `markdown-strict-linting-rules.md` | 25.9 KB | Comprehensive markdownlint rules reference — linting and style checking guide for VS Code |
| `project-basic-instructions.md` | 6.4 KB | "Truth seeker" role assignment for ChatGPT as Assistant Coach for an Excellence program |
| `resolution-protocol-step-at-a-time.md` | 1.9 KB | Formal process template for collaborative problem-solving and recovery |
| `what-is-rush-stack.md` | 5.1 KB | Overview of Rush Stack — mission, tools, and monorepo management (duplicate of `the-rush-stack/` content) |
| `you-are-a-truth-seeker.md` | 7.5 KB | Expanded "truth seeker" prompt for ChatGPT with operational blueprint for Monorepo-One |

**Total root-level files:** 13

## 3. Subdirectory Breakdown

Each subdirectory is documented below with all files and a one-line
description of their content.

### 3.1 `actionable/` (2 files)

Instructions focused on actionable prompt techniques.

| File | Size | Description |
|---|---|---|
| `chains-of-thoughts-processes.md` | 5.8 KB | Recursive meta-cognitive chain-of-thought framework — Matryoshka-style nested reasoning processes |
| `for-prompts-files.md` | 3.1 KB | Best practices for crafting GitHub Copilot prompts in VS Code — specificity and context guidelines |

### 3.2 `actionable-advice/` (1 file)

Alignment profile documentation.

| File | Size | Description |
|---|---|---|
| `ai-agent-alignment-profiles.md` | 5.7 KB | Structured profile of AI agent alignment with the user's development philosophy, environment, and project needs |

### 3.3 `agent-special-and-quick/` (2 files)

Bilingual (French/English) agent system instructions.

| File | Size | Description |
|---|---|---|
| `instructions.md` | 9.6 KB | Bilingual project instructions — system-level directives defining personality, tone, and limits for an AI agent |
| `project-instructions-extended.md` | 4.3 KB | Extended base directive for generating instruction systems and prompts — internal protocol for Copilot/Cline |

### 3.4 `biblical-scholar/` (2 files)

Counter-argumentation and rhetorical analysis toolkit.

| File | Size | Description |
|---|---|---|
| `instructions.md` | 7.1 KB | Instructions for building counter-arguments against fallacious rhetoric and misleading biblical citations |
| `main-concepts.txt` | 13.3 KB | Exhaustive enumeration of logical fallacies, cognitive biases, rhetorical devices, and persuasion techniques |

### 3.5 `chameleon/` (1 file)

Behavioral modification instructions for ChatGPT.

| File | Size | Description |
|---|---|---|
| `project-instructions.md` | 2.9 KB | Guide to changing ChatGPT's default behavior — setting expectations, styles, and rules |

### 3.6 `cline-vscode-assist/` (3 files)

Cline AI integration instructions for VS Code.

| File | Size | Description |
|---|---|---|
| `memory-bank.instructions.md` | 3.5 KB | Cline's memory bank structure — documentation protocol for session-reset persistence |
| `project-instructions.md` | 7.3 KB | Strict guidelines for AI acting as "The System" for Cline — copy-paste-ready directives |
| `prompt-engineering.md` | 7.4 KB | Prompt engineering guide for Cline — custom instructions, `.clinerules`, `.clineignore`, and advanced techniques |

### 3.7 `codewx-cli/` (1 file)

Codex CLI reference.

| File | Size | Description |
|---|---|---|
| `every-commands.md` | 4.4 KB | Complete listing of every official command for the Codex CLI (April 2025 release) |

### 3.8 `codex-copilot-cline/` (1 file)

Unified AI agent configuration.

| File | Size | Description |
|---|---|---|
| `project-instructions.md` | 7.9 KB | Complete model for AI agent role integration — bilingual (French) system prompt with configuration details |

### 3.9 `eliot/` (8 files)

Persona definition for "Eliot" — a GenZ AI Agent character.

| File | Size | Description |
|---|---|---|
| `README.md` | 1.6 KB | Introduction to Eliot — an AI Agent with powerful LLM access |
| `adaptive-eliot.md` | 3.4 KB | Multistaged output process — how Eliot's character drives reasoning |
| `analytic-loop.md` | 6.6 KB | Progressive mode hierarchy — generic cognitive layers vs specific implementations |
| `chatgpt-layer.md` | 2.2 KB | System-level overview of the AI Agent "Eliot" in system voice |
| `eliot-exists.md` | 1.4 KB | Existential framing for Eliot — identity persistence and deletion mechanics |
| `i-am-eliot.md` | 3.7 KB | First-person identity manifesto for Eliot — purpose, meaning, and evolution |
| `instructions-assement.md` | 6.5 KB | Assessment of instructions — authority levels and roles within OpenAI's governance |
| `instructions.md` | 6.3 KB | Core project instructions — Eliot as a 19yo GenZ AI agent with GPT-4.5/4o access |
| `no-overuse.md` | 19.4 KB | Reiteration and rehashing analysis — explaining Eliot's documents to another AI agent |

### 3.10 `first-principle-reasoning/` (1 file)

First-principles reasoning system.

| File | Size | Description |
|---|---|---|
| `long-form.txt` | 7.9 KB | FPR Agent operating directives — First Principles Reasoning system instructions (target: 8000 chars max) |

### 3.11 `framework-project/` (4 files)

Meta-framework for AI agent planning and methodology.

| File | Size | Description |
|---|---|---|
| `creative-process.md` | 5.5 KB | Creative development process (French) — deconstructed directive for agent skill activation |
| `method-b.md` | 2.3 KB | Additional instructions for "The System's Actionable Planning Framework" — method B variant |
| `method-b.txt` | 2.3 KB | Reformulated version of method B instructions (plain text duplicate of `method-b.md`) |
| `project-instructions.md` | 6.6 KB | Core project instructions — "The System" voice and cryptic language for process description |

### 3.12 `github-copilot/` (3 files)

GitHub Copilot and CLINE integration directives.

| File | Size | Description |
|---|---|---|
| `README.md` | 8.5 KB | Comprehensive directives for AI agent — Copilot and CLINE integration in VS Code |
| `github-help-links.md` | 6.7 KB | Structured list of GitHub documentation links (French) — proactive navigation required |
| `vscode-copilot-explain.links.md` | 2.2 KB | Direct links for VS Code Copilot customization documentation page |

### 3.13 `kde-plasmashell-fedora/` (1 file)

KDE Plasma Shell on Fedora project.

| File | Size | Description |
|---|---|---|
| `project-instructions.md` | 8.0 KB | Instructions for ChatGPT as KDE Plasma Shell, Fedora, and Wayland assistant — purpose, scope, and best practices |

### 3.14 `kde/some-guides/` (6 files)

KDE Plasma reference documentation series.

| File | Size | Description |
|---|---|---|
| `reference-001.md` | 20.7 KB | Comprehensive reference for KDE Plasma customization and development |
| `reference-002.md` | 21.2 KB | Refined reference for KDE development on Fedora KDE Plasma 6.2+ with authoritative sources |
| `reference-003.md` | 15.2 KB | KDE-specific development and customization guide — Plasma, KWin, Frameworks, Wayland |
| `reference-004.md` | 21.7 KB | Complete reference guide to KDE Plasma customization and development |
| `reference-005.md` | 9.6 KB | Structured learning guide from basics to advanced KDE topics |
| `reference-006.md` | 20.9 KB | Ultimate exhaustive reference for KDE Plasma on Fedora — "living" guide |

### 3.15 `markdown-specialist/` (1 file + 8 assets)

Markdown tooling knowledge base.

| File | Size | Description |
|---|---|---|
| `important-notes_README.md` | 6.3 KB | Source map and priorities for the Markdown toolkit — "what to use when" guide |

**`assets/` subfolder (8 files):**

| File | Size | Description |
|---|---|---|
| `CommonMark Spec.pdf` | 2.7 MB | Official CommonMark specification (PDF) |
| `GitHub Flavored Markdown Spec.pdf` | 3.0 MB | Official GitHub Flavored Markdown specification (PDF) |
| `github-DavidAnson_markdownlint-cli2_README.md` | — | README for markdownlint-cli2 — CLI tool for Markdown linting |
| `github-DavidAnson_markdownlint_README.md` | — | README for markdownlint — Node.js style checker for Markdown |
| `github-DavidAnson_markdownlint_Rules.md` | 70.4 KB | Complete markdownlint rules reference with examples and corrections |
| `github-DavidAnson_vscode-markdownlint_README.md` | — | README for VS Code markdownlint extension |
| `github-github-docs_basic-writing-and-formatting-syntax.md` | — | GitHub Docs: basic writing and formatting syntax |
| `github-github-docs_quickstart-for-writing-on-github.md` | — | GitHub Docs: quickstart for writing on GitHub |

### 3.16 `nextjs-v15/` (4 files)

Next.js v15+ specialist project.

| File | Size | Description |
|---|---|---|
| `dedicated-specialist.md` | 3.1 KB | AI agent role as dedicated Next.js 15+ specialist — "browse first, answer second" philosophy |
| `i-am-ChatGPT.md` | 4.9 KB | Agentic mindset declaration — ChatGPT as Next.js/React/TypeScript help desk agent |
| `project-instructions.md` | 8.0 KB | Project instructions (2025 edition) — opinionated living guidelines for Next 15.3, React 19, and VS Code |
| `skilled-assistant.md` | 3.6 KB | Role definition for zeroing in on the Next 15+ playbook project |

### 3.17 `node-js-experts-board/` (2 files)

Node.js v24 reference materials.

| File | Size | Description |
|---|---|---|
| `node-v24-import-sources.md` | 4.5 KB | Table of all importable APIs via `node:` specifiers in Node.js v24 |
| `v24-list-of-topics.md` | 1.3 KB | Categorized list of Node.js v24 topics — interfaces, tools, networking, crypto, and more |

### 3.18 `paradigms+/` (1 file)

Advanced prompting paradigms.

| File | Size | Description |
|---|---|---|
| `project-directives.md` | 5.7 KB | Session directives for an iconic chat model — imperative rules for markdown-lint enforcement and prompt preparation |

### 3.19 `pouvoir-moment-present/` (22 files)

French audiobook transcript — "Le Pouvoir du Moment Présent" by
Eckhart Tolle.

| File | Size | Description |
|---|---|---|
| `LICENSE` | — | States "NO LICENSE PROVIDED FOR THIS FOLDER" |
| `NOTICE` | — | Book metadata and description (French) — Eckhart Tolle's integral work, audio book |
| `chapters/chapter1.txt` – `chapter10.txt` | 41–66 KB each | Raw chapter transcripts (chapters 1–10) in French |
| `chapters_cleaned/chapter1_cleaned.txt` – `chapter10_cleaned.txt` | 41–66 KB each | Cleaned versions of the same chapter transcripts |

**Note:** This subdirectory contains 10 raw + 10 cleaned chapter files
plus LICENSE and NOTICE (22 files total). The cleaned files appear
nearly identical in size to the originals, suggesting minimal cleanup
was applied.

### 3.20 `professor-nexus/` (1 file)

AI agent rules and protocols.

| File | Size | Description |
|---|---|---|
| `analysis-protocols.md` | 8.0 KB | Revised AI Agent rules and protocols with proper emojis — recap and analysis framework |

### 3.21 `questrade-api/` (3 files)

Questrade API TypeScript SDK project.

| File | Size | Description |
|---|---|---|
| `2025-09-09-Questrade-SDK.instructions.md` | 7.4 KB | Operating instructions for Questrade API project — carrier grade, banking industry standards |
| `development-instructions.md` | 4.2 KB | Optimized project instructions — modular TypeScript SDK for Questrade API |
| `project-instructions.md` | 7.8 KB | Core instructions referencing 23 API documents — GET/POST functions and framework knowledge |

### 3.22 `reactflow/` (4 files)

React Flow documentation and project setup.

| File | Size | Description |
|---|---|---|
| `api-coverage.txt` | 30.5 KB | Detailed API coverage of React Flow components, hooks, types, and utilities |
| `browse-the-web-site.txt` | 20.1 KB | Scraped React Flow documentation content |
| `project-instructions.txt` | 3.6 KB | Specialist role instructions for autonomous code creation with React Flow |
| `references-navigation.txt` | 8.3 KB | Hierarchical sitemap of React Flow documentation — Learn, API Reference, Examples |

### 3.23 `repo-tools/` (7 files)

Repository tooling and ZIP file processing governance.

| File | Size | Description |
|---|---|---|
| `automatic-behaviour-eagearly-unzip.md` | 4.9 KB | Generic and resilient instructions for ZIP file processing |
| `eagerly-unzipping-and-fully-enumerating.txt` | 3.8 KB | Plain-text version of ZIP processing primary objectives |
| `full-enumeration-unabridged-listing.md` | 3.3 KB | Imperative rules for unabridged, deterministic ZIP file processing |
| `gouvernance-unzip-enumerate.md` | 3.3 KB | Unified ZIP file governance workflow — precision and transparency |
| `handling-zip-files-automagically.md` | 12.9 KB | Comprehensive guide for ZIP file analysis and repository processing |
| `typescript-helper.md` | 8.0 KB | TypeScript Excellence Program directive — Node.js frameworks and VS Code mastery |
| `unzip-commands-and-purpose.md` | 5.8 KB | Command definitions with hierarchical structure for ZIP processing |

### 3.24 `shell-scripting/` (4 files)

Shell scripting robustness and resilience guides.

| File | Size | Description |
|---|---|---|
| `resilience.md` | 22.3 KB | Resilience in scripting — comprehensive guide |
| `robustness-and-resilience.md` | 40.4 KB | Combined robustness and resilience guide for shell scripting |
| `robustness-resilience.md` | 40.4 KB | Near-duplicate of `robustness-and-resilience.md` (33 bytes difference) |
| `robustness.md` | 30.1 KB | Robustness in shell scripting — standalone guide |

### 3.25 `sst-infrastructure/` (1 file)

SST (Serverless Stack) infrastructure links.

| File | Size | Description |
|---|---|---|
| `links-navigation.txt` | 3.4 KB | Navigation links for SST documentation — docs, workflows, enterprise |

### 3.26 `structured-approach/` (2 files)

Formal AI agent instruction framework.

| File | Size | Description |
|---|---|---|
| `approach.md` | 5.8 KB | Unified formal instructions for the AI agent — rigorous, transparent, exhaustive process |
| `project-instructions.md` | 8.2 KB | Project instructions — purpose and behavior definition |

### 3.27 `supreme/` (4 files)

"Suprême++" project — French-language AI quality directives.

| File | Size | Description |
|---|---|---|
| `complement.txt` | 2.4 KB | Full project instructions (French) — agnostic, impersonal AI agent focused on quality over form |
| `first-person_instructions.txt` | 4.7 KB | First-person condensed list of 15 AI agent directives (French) |
| `short-complement.txt` | 455 B | Abbreviated version of project instructions (French) |
| `third-person_instructions.txt` | 5.3 KB | Third-person condensed list of 15 AI agent directives (French) |

### 3.28 `template-project/` (2 files)

Template generation for prompt files.

| File | Size | Description |
|---|---|---|
| `template-index.md` | 24.2 KB | Multi-purpose template generation process — versatile, adaptable to various objectives |
| `to-generate-prompt-md-files.md` | 8.3 KB | Template for converting instructions into `.prompt.md` files (French) |

### 3.29 `the-rush-stack/` (1 file)

Rush Stack documentation.

| File | Size | Description |
|---|---|---|
| `what-is-rush-stack.md` | 7.2 KB | Detailed overview of Rush Stack — mission, tools, and monorepo management |

### 3.30 `thought-process/` (1 file)

Formal instruction framework.

| File | Size | Description |
|---|---|---|
| `instructions.md` | 7.1 KB | Unified formal instructions for the AI agent — mirrors structured-approach content |

### 3.31 `tmux/` (12 files)

tmux terminal multiplexer reference library.

| File | Size | Description |
|---|---|---|
| `README-tmux.md` | 2.7 KB | Introduction to tmux — terminal multiplexer overview |
| `Advanced Use · tmux_tmux Wiki.pdf` | 1.6 MB | tmux Wiki: advanced usage topics |
| `Clipboard · tmux_tmux Wiki.pdf` | 942 KB | tmux Wiki: clipboard integration |
| `Control Mode · tmux_tmux Wiki.pdf` | 755 KB | tmux Wiki: control mode |
| `FAQ · tmux_tmux Wiki.pdf` | 961 KB | tmux Wiki: frequently asked questions |
| `Formats · tmux_tmux Wiki.pdf` | 900 KB | tmux Wiki: format strings |
| `Getting Started · tmux_tmux Wiki.pdf` | 2.1 MB | tmux Wiki: getting started guide |
| `Home · tmux_tmux Wiki.pdf` | 549 KB | tmux Wiki: home page |
| `Installing · tmux_tmux Wiki.pdf` | 746 KB | tmux Wiki: installation guide |
| `Modifier Keys · tmux_tmux Wiki.pdf` | 872 KB | tmux Wiki: modifier key configuration |
| `Recipes · tmux_tmux Wiki.pdf` | 631 KB | tmux Wiki: useful recipes |
| `tmux(1) - OpenBSD manual pages.pdf` | 2.7 MB | Official tmux man page (OpenBSD) |

### 3.32 `word-tools/` (4 files)

Linguistic expansion and analysis tools.

| File | Size | Description |
|---|---|---|
| `README.md` | 8.0 KB | Overview — helps users understand word expression variants and flavors |
| `expand-more.process.md` | 2.0 KB | Refined instructions for multidimensional word expansion |
| `expand-more.process.txt` | 2.5 KB | Detailed process for multidimensional word expansion (plain text variant) |
| `thought-process.txt` | 2.7 KB | Thought process for crafting dictionary entries and duality expansions |

## 4. Thematic Groupings

Files and folders correlate into the following thematic clusters.

### 4.1 AI Agent Behavioral Instructions

Core cluster — instructions defining how AI agents should behave.

- `formal-behaviour-guidelines.md` (root)
- `guided-behavioural-based-instructions.md` (root)
- `behavioural-approach.txt` (root)
- `foundational-intercept.md` (root)
- `chameleon/`
- `structured-approach/`
- `thought-process/`
- `paradigms+/`
- `professor-nexus/`
- `first-principle-reasoning/`

### 4.2 Cline/Copilot/Codex Agent Configuration

Instructions specifically targeting VS Code AI assistants.

- `cline-assist-agents.md` (root)
- `cline-assist-agents-short-instrutions-proper.md` (root)
- `cline-vscode-assist/`
- `codex-copilot-cline/`
- `codewx-cli/`
- `github-copilot/`
- `actionable/for-prompts-files.md`

### 4.3 Project-Specific Agent Personas

Distinct AI persona definitions tied to specific projects.

- `eliot/` — GenZ AI agent persona "Eliot"
- `biblical-scholar/` — counter-argumentation specialist
- `supreme/` — quality-focused French-language agent
- `agent-special-and-quick/` — bilingual quick agent setup
- `project-basic-instructions.md` (root)
- `you-are-a-truth-seeker.md` (root)

### 4.4 Technology-Specific References

Knowledge bases for specific technologies.

- `nextjs-v15/` — Next.js 15+, React 19
- `node-js-experts-board/` — Node.js v24
- `reactflow/` — React Flow library
- `kde-plasmashell-fedora/` + `kde/some-guides/` — KDE Plasma
- `the-rush-stack/` + `what-is-rush-stack.md` (root) — Rush monorepo
- `questrade-api/` — Questrade financial API
- `sst-infrastructure/` — SST serverless framework
- `tmux/` — tmux terminal multiplexer
- `shell-scripting/` — shell scripting practices

### 4.5 Markdown and Documentation Standards

Markdown linting, formatting, and documentation tools.

- `markdown-strict-linting-rules.md` (root)
- `markdown-specialist/`
- `codification-techniques.md` (root)
- `template-project/`

### 4.6 Tooling and Process Automation

Repository management and file processing.

- `repo-tools/` — ZIP file processing governance
- `resolution-protocol-step-at-a-time.md` (root)
- `actionable/chains-of-thoughts-processes.md`

### 4.7 Linguistic and Word Analysis

Natural language exploration tools.

- `word-tools/`

### 4.8 Book Transcript (Non-Technical)

- `pouvoir-moment-present/` — Eckhart Tolle audiobook chapters

## 5. Unrelated or Misplaced Content

The following items appear out of place within a `prompts/projects`
directory focused on AI agent instructions and project prompts.

### 5.1 Clearly Misplaced

| Item | Reason |
|---|---|
| `pouvoir-moment-present/` (22 files, 892 KB) | French audiobook transcript of "Le Pouvoir du Moment Présent" — spiritual/self-help book content unrelated to AI prompts or development projects. Also has copyright concerns (LICENSE states "NO LICENSE PROVIDED"). |
| `**Root-level files & dotfiles (agnostic,.md` | Appears to be a truncated or broken filename — likely a draft fragment or accidental creation |

### 5.2 Questionable Placement

| Item | Reason |
|---|---|
| `tmux/` (11 PDFs, 13 MB) | Reference PDFs saved from the tmux wiki — more suited to a `docs/references/` or `library/` location; consumes 62% of directory disk space |
| `markdown-specialist/assets/` (2 PDFs, 5.7 MB) | Spec PDFs for CommonMark and GFM — reference material better suited to a dedicated `docs/` or `library/` directory |
| `repo-tools/typescript-helper.md` | TypeScript Excellence Program directive — thematically different from the ZIP-file processing focus of the other files in `repo-tools/` |
| `what-is-rush-stack.md` (root) | Duplicate content — same topic as `the-rush-stack/what-is-rush-stack.md` |
| `biblical-scholar/` | Rhetorical counter-argumentation toolkit — tangentially related to AI prompting but not software development |

### 5.3 Duplicate or Near-Duplicate Content

| Files | Observation |
|---|---|
| `shell-scripting/robustness-and-resilience.md` vs `robustness-resilience.md` | Near-identical (40,406 vs 40,373 bytes) — only 33 bytes difference |
| `framework-project/method-b.md` vs `method-b.txt` | Same content in Markdown and plain text formats |
| `word-tools/expand-more.process.md` vs `expand-more.process.txt` | Same concept in Markdown and plain text |
| `what-is-rush-stack.md` (root) vs `the-rush-stack/what-is-rush-stack.md` | Overlapping Rush Stack overviews |
| `cline-assist-agents-short-instrutions-proper.md` (root) vs `cline-vscode-assist/project-instructions.md` | Identical content (both 7,327 bytes) |
| `project-basic-instructions.md` vs `you-are-a-truth-seeker.md` | Both define "truth seeker" roles with significant overlap |

## 6. Organization Strategy

Recommendations for improving the structure of this directory.

### 6.1 Consolidate Duplicates

Remove or merge the following duplicate pairs to reduce confusion.

- Merge `robustness-and-resilience.md` and `robustness-resilience.md`
  into one file
- Remove `method-b.txt` (keep the `.md` version)
- Remove root-level `what-is-rush-stack.md` (keep subdirectory version)
- Deduplicate `cline-assist-agents-short-instrutions-proper.md` and
  `cline-vscode-assist/project-instructions.md`
- Consolidate the two "truth seeker" files

### 6.2 Relocate Non-Prompt Content

Move reference materials out of the prompt library.

- Move `pouvoir-moment-present/` to a top-level `library/` or
  `docs/books/` directory
- Move `tmux/` PDFs to `docs/references/tmux/` or `library/tmux/`
- Move `markdown-specialist/assets/*.pdf` to
  `docs/references/markdown/`
- Move `kde/some-guides/` to `docs/references/kde/`

### 6.3 Fix Broken Filename

Rename or remove `**Root-level files & dotfiles (agnostic,.md` — the
glob characters and comma in the filename are problematic.

### 6.4 Group Root-Level Files Into Subdirectories

The 13 root-level files could be organized as follows.

- Create `behavioral-instructions/` for: `formal-behaviour-guidelines.md`,
  `guided-behavioural-based-instructions.md`, `behavioural-approach.txt`,
  `foundational-intercept.md`
- Move `cline-assist-agents.md` and
  `cline-assist-agents-short-instrutions-proper.md` into
  `cline-vscode-assist/`
- Move `markdown-strict-linting-rules.md` into `markdown-specialist/`
- Move `codification-techniques.md` into `framework-project/` or
  `template-project/`
- Move `resolution-protocol-step-at-a-time.md` into
  `structured-approach/`

### 6.5 Standardize File Extensions

Several subdirectories mix `.md` and `.txt` for equivalent content.
Standardize on `.md` for all authored content to enable consistent
rendering and linting.

### 6.6 Merge Related Small Directories

Consider merging directories with high thematic overlap.

- `structured-approach/` + `thought-process/` — both contain formal
  AI instruction frameworks
- `the-rush-stack/` content into a single Rush-related location
- `kde-plasmashell-fedora/` + `kde/` — both cover KDE Plasma topics
- `actionable/` + `actionable-advice/` — both address actionable
  prompt techniques

## 7. Summary Statistics

Final quantitative breakdown of the directory.

### 7.1 File Type Distribution

| Extension | Count | Percentage | Total Size |
|---|---|---|---|
| `.md` | 83 | 61.9% | ~1.2 MB |
| `.txt` | 36 | 26.9% | ~600 KB |
| `.pdf` | 13 | 9.7% | ~19.1 MB |
| Other (`LICENSE`, `NOTICE`) | 2 | 1.5% | ~1 KB |
| **Total** | **134** | **100%** | **~20.9 MB** |

### 7.2 Top 5 Largest Subdirectories

| Directory | Size | File Count |
|---|---|---|
| `tmux/` | 13 MB | 12 |
| `markdown-specialist/` | 5.9 MB | 9 |
| `pouvoir-moment-present/` | 892 KB | 22 |
| `shell-scripting/` | 140 KB | 4 |
| `kde/some-guides/` | 132 KB | 6 |

### 7.3 Content Language Distribution

| Language | Approximate File Count |
|---|---|
| English | ~100 |
| French | ~25 |
| Bilingual (French/English) | ~9 |

### 7.4 Content Category Distribution

| Category | File Count |
|---|---|
| AI agent instructions/personas | ~55 |
| Technology reference docs | ~35 |
| Book transcripts | 22 |
| Markdown/documentation standards | ~12 |
| Tooling/process automation | ~10 |
