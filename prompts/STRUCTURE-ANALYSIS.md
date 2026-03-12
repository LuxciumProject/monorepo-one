# Prompts Folder: Structure Analysis

This document provides a comprehensive analysis of the current
`/prompts` directory in the monorepo. It serves as the foundational
reference for understanding the existing organization before any future
optimization or restructuring. Every folder, subfolder, and file has
been examined and characterized below.

> **Note on methodology**: File and directory counts in this document
> are approximate, gathered through automated directory traversal and
> manual inspection performed in March 2025. Counts marked with `~`
> indicate totals that may vary slightly due to hidden files, symlinks,
> or transient content. Filenames are documented exactly as they appear
> on disk, including any existing typos or inconsistencies in the
> original names.

## Table of Contents

- [Prompts Folder: Structure Analysis](#prompts-folder-structure-analysis)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Top-Level Statistics](#top-level-statistics)
  - [Root-Level Files](#root-level-files)
    - [ChatGPT Memories and User Profile](#chatgpt-memories-and-user-profile)
    - [AI Instruction and Prompt Engineering](#ai-instruction-and-prompt-engineering)
    - [Programming Concepts and Learning](#programming-concepts-and-learning)
    - [Vocabulary and Meta-Analysis](#vocabulary-and-meta-analysis)
    - [Technical Documentation and System Info](#technical-documentation-and-system-info)
    - [Drafts and Miscellaneous](#drafts-and-miscellaneous)
    - [Documentation and Licensing](#documentation-and-licensing)
  - [Major Directories](#major-directories)
    - [API — AI Model Configurations and Prompt Libraries](#api--ai-model-configurations-and-prompt-libraries)
    - [LuxciumOne — Custom Development Framework](#luxciumone--custom-development-framework)
    - [awesome-copilot-main — GitHub Copilot Resource Collection](#awesome-copilot-main--github-copilot-resource-collection)
    - [chatgpt — ChatGPT Interaction Framework](#chatgpt--chatgpt-interaction-framework)
    - [projects — Specialized AI Agent Configurations](#projects--specialized-ai-agent-configurations)
  - [Smaller Directories](#smaller-directories)
    - [Agent and Model Configuration](#agent-and-model-configuration)
    - [Memories and Knowledge Persistence](#memories-and-knowledge-persistence)
    - [Prompt Engineering Techniques](#prompt-engineering-techniques)
    - [Development Guidelines](#development-guidelines)
    - [Reference and Tooling](#reference-and-tooling)
    - [Temporary and Placeholder](#temporary-and-placeholder)
  - [Thematic Groupings Across the Folder](#thematic-groupings-across-the-folder)
    - [Group A — AI Model System Prompts](#group-a--ai-model-system-prompts)
    - [Group B — Development Methodology](#group-b--development-methodology)
    - [Group C — Persona and Behavioral Frameworks](#group-c--persona-and-behavioral-frameworks)
    - [Group D — Memory and Session Persistence](#group-d--memory-and-session-persistence)
    - [Group E — Image Generation](#group-e--image-generation)
    - [Group F — Linguistic and Vocabulary Tools](#group-f--linguistic-and-vocabulary-tools)
    - [Group G — Output Formatting and Structured Reasoning](#group-g--output-formatting-and-structured-reasoning)
    - [Group H — Technology-Specific References](#group-h--technology-specific-references)
    - [Group I — System and Hardware Documentation](#group-i--system-and-hardware-documentation)
    - [Group J — Copilot and IDE Integration](#group-j--copilot-and-ide-integration)
  - [File Type Distribution](#file-type-distribution)
  - [Observations for Future Optimization](#observations-for-future-optimization)

## Overview

The `/prompts` folder is a large, organically grown collection of AI
prompt resources, system instructions, memory banks, project
configurations, and reference materials. It spans multiple AI models
(OpenAI GPT-3.5/4/5, Claude, Midjourney, GitHub Copilot), multiple
domains (web development, functional programming, image generation,
linguistics), and multiple formats (plain text, markdown, PDF, JSON,
YAML, shell scripts).

The folder contains approximately **1,080 files** across
**160 directories**. It was built incrementally over time as new AI
tools, projects, and workflows were adopted.

## Top-Level Statistics

| Metric | Count |
|---|---|
| Total files | ~1,080 |
| Total directories | ~160 |
| Root-level files | 37 |
| Root-level subdirectories | 33 |
| Primary file types | `.txt` (534), `.md` (374), `.pdf` (48) |
| Secondary file types | `.json` (13), `.html` (9), `.sh` (8) |

## Root-Level Files

The 37 files at the root of `/prompts` break down into the following
logical clusters.

### ChatGPT Memories and User Profile

These files store user-specific context, preferences, and memories that
were exported from or created for ChatGPT sessions. They form a personal
knowledge base about the user (Benjamin), his technical environment, and
his interaction preferences.

| File | Description |
|---|---|
| `4o-130-memories.txt` | French-language profile: identity, system environment (KDE Plasma, ZSH), ChatGPT preferences |
| `4o-51-memories.txt` | English-language session notes: TypeScript preferences, coding style, current projects |
| `4o-65-more-memories.txt` | Comprehensive memories: technical preferences, monorepo details, learning paths, lifestyle |
| `4o-additional-system.txt` | Bilingual system instructions: formatting preferences, language consistency rules |
| `4o-approach-00b.txt` | GPU/NVIDIA driver troubleshooting notes, xorg.conf configuration, stack-based task tracking |
| `curent-memories.txt` | Current AI preprocessing context, automated chaining guidelines, "Biogram" concept definitions |

### AI Instruction and Prompt Engineering

Files that define how AI agents should behave, including command
structures, meta-prompting techniques, and reasoning frameworks.

| File | Description |
|---|---|
| `4o-approach.txt` | Multi-perspective rephrasing examples demonstrating tone, voice, and perspective variation |
| `4o-commands.txt` | 40+ special command directives (`/seek`, `/browse`, `/evaluate`, `/CoT`, `/plan`) for controlling ChatGPT |
| `4o-special-instructions.txt` | Initial context-setting instructions in English and French for proactive tool usage |
| `dummy-rules-dump.md` | French-language analysis of AI instruction approaches: hierarchical asymmetry, imperatives, service contracts |
| `instructions-for-assistant.md` | Chain-of-thought reasoning deconstruction: 7 steps from comprehension to summarization |
| `tought-precesse.md` | Chain-of-thought analysis of how AI agents reason through system updates (7 key steps) |
| `act-as-a-reducer.txt` | 8-step text reduction methodology preserving meaning and intention |
| `image-prompt.txt` | 14 best practices for AI image generation prompts |

### Programming Concepts and Learning

Files documenting functional programming explorations, book references,
and code-related prompts.

| File | Description |
|---|---|
| `functor-like.txt` | Reflective writing on functional programming: functors, custom "boxing" constructs, biological analogies |
| `functor-like-edited.txt` | Polished version of the above with corrected spelling and grammar |
| `mastering-javascript-functional-programming-third-edition.txt` | Table of contents from Federico Kereki's book on FP with TypeScript |
| `5Untitled-3.txt` | Enhanced Promise class specification: Promise A+ compatibility, lazy evaluation, cancellation |
| `5Untitled-4.txt` | JSON meta-prompt for rewriting the Promise class specification with better structure |

### Vocabulary and Meta-Analysis

Files exploring abstract conceptual terminology and semantic
relationships.

| File | Description |
|---|---|
| `meta-words.txt` | Categorized list of meta-conceptual terms (abstract, reflexive, higher-order, recursive) |
| `meta-words-list-2.txt` | Expanded version with additional categories and cross-disciplinary approaches |
| `meta-analytics.txt` | Comparative analysis of two meta-word categorization approaches |

### Technical Documentation and System Info

Files documenting tools, system packages, and driver configurations.

| File | Description |
|---|---|
| `GIT-LFS-OVERVIEW.md` | Comprehensive guide on Git LFS: health checks, file tracking, best practices |
| `codex-help.txt` | Codex CLI documentation: flags, approval modes, usage examples |
| `instrutions-dump-codex.txt` | Guide for teaching Codex-CLI agent preferences across sessions |
| `dnf-list-installed.txt` | Fedora Linux installed packages listing |
| `nvidia-assist-drivers-20241109.txt` | Conversation about model specs, context windows, Ollama installation with NVIDIA GPU |
| `SUBSCRIPT.txt` | XCompose keyboard mapping for subscript numbers and mathematical symbols |

### Drafts and Miscellaneous

| File | Description |
|---|---|
| `Untitled-3.txt` | Guide on multi-pass text summarization methodology with tone preservation |
| `shirt-test.txt` | GPT-3.5 vs GPT-4 reasoning comparison on a logic puzzle (wet shirt drying time) |
| `prompt-the-ambiance.txt` | Meta-memory preservation request for complete session recap |
| `list-all-now.txt` | Directory listing of the prompts folder with timestamps |
| `prompt-tree-list.txt` | Nested directory listing of prompts folder structure |
| `Compose` | Likely a Docker Compose or XCompose configuration fragment |

### Documentation and Licensing

| File | Description |
|---|---|
| `README.md` | Main documentation: directory purpose, subdirectories overview, Luxcium License, copyright notice |
| `LICENSE` | Luxcium License with no permissions granted, special ChatGPT interaction clause |

## Major Directories

These five directories contain the majority of the content and form
the structural pillars of the collection.

### API — AI Model Configurations and Prompt Libraries

**Path**: `prompts/API/`
**Files**: ~218 across 26 subdirectories
**Purpose**: Central repository for AI model-specific system prompts,
custom GPT configurations, and image generation templates.

#### Subdirectory Breakdown

| Subdirectory | Files | Description |
|---|---|---|
| `GPTs/` | ~92 | Custom GPT instruction sets organized by persona |
| `GPTs/zsh/` | ~40 | Complete Z-Shell manual (26 chapters + indices) |
| `GPTs/the-luxcium-one/` | 24 | "The Luxcium One" custom GPT with meta-prompting and role commands |
| `GPTs/midjourney/` | 17 | Midjourney prompt crafting utilities (versions v0-2 through v0-4b) |
| `GPTs/pro-coder/` | — | Professional TypeScript/programming assistant instructions |
| `GPTs/typescript-assistant/` | — | TypeScript function overloading and testing guidance |
| `GPTs/next-js/` | — | Next.js-specific assistant instructions |
| `GPTs/system-d/` | — | Systemd directives and documentation |
| `GPTs/assistants/` | — | Basic GPT assistant instruction sets |
| `midjourney/` | ~27 | Image generation prompts, color palettes (24/100/120 colors), filmmaker lists, templates |
| `midjourney/tuner/` | 8 | Style tuner configurations and HTML scraping data |
| `midjourney/tuning-and-more/` | 14 | Additional tuning iterations and experimentation files |
| `claude-3/` | 12 | Claude-3 system prompts: meta-prompts, capability enumerations, persona prompts |
| `gpt-3.5-turbo/` | 8 | GPT-3.5 fine-tuning docs, big-K variants, tone templates |
| `gpt-4/` | 2 | Sentence correction methodology, logic puzzles |
| `corrector/` | 18 | Text correction/translation rules with 17 iterative refinement attempts |
| `ChatGPT-v4.1/` | 2 | VS Code Copilot custom instruction guides |
| `chat-gpt/` | 2 | Browser capabilities documentation |
| `test-driven/` | 1 | TypeScript TDD best practices |
| `troubleshooting/` | 3 | NVMe storage optimization guides |
| `OpenAI/` | 1 | Documentation links |

**Root-level files** (12): Programming step methodologies
(`7-steps-programming.txt`, `9-steps-programming.txt`,
`think-step-by-step.txt`), monorepo topology
(`_@_Monorepo-topology.txt`), RPC worker pool docs, instruction
templates, LICENSE.

**Logical sub-groups within API/**:

- **Model-specific configs**: `claude-3/`, `gpt-3.5-turbo/`, `gpt-4/`,
  `ChatGPT-v4.1/`
- **Custom GPT personas**: `GPTs/the-luxcium-one/`, `GPTs/pro-coder/`,
  `GPTs/typescript-assistant/`
- **Image generation**: `midjourney/`, `GPTs/midjourney/`
- **Reference manuals**: `GPTs/zsh/`, `GPTs/system-d/`
- **Text processing**: `corrector/`

### LuxciumOne — Custom Development Framework

**Path**: `prompts/LuxciumOne/`
**Files**: ~109 across 10 subdirectories
**Purpose**: Defines the Luxcium development philosophy, MIPAD
methodology, and specialized assistant prompts for TypeScript/Node.js
projects.

#### Subdirectory Breakdown

| Subdirectory | Files | Description |
|---|---|---|
| `MIPAD/` | ~45 | **Core methodology**: Modular Incremental Programming And Development |
| `MIPAD/blogs-atempts/` | 6 | Blog draft variations for MIPAD/HMBBD/IDPAC concepts |
| `MIPAD/condensate-versions/` | 3 | Condensed markdown versions of the three pillars |
| `MIPAD/docs/` | 6 | Full markdown documentation for the methodology |
| `MIPAD/step-by-step-aproach/` | 8 | Iterative and modular implementation guides |
| `MIPAD/step-by-step-aproach/with-gpt-4/` | ~10 | GPT-4, Haiku, Opus, Sonnet optimized versions |
| `next-js/` | 5 | Next.js 14+ App Router authoritative directives |
| `next-js/use-client-instructions/` | 7 | Deep dive into the `'use client'` directive |
| `gpu-acessors/` | 18 | Emoji-named GPU computation strategy files (medal/ribbon tiers) |
| `hermes/` | 8 | OpenAI assistant framework (versions v2.5 through v2.7.3) |
| `code-crafter/` | 2 | Complexity management guides for AI collaboration |
| `linguistic/` | 1 | Multi-dimensional word analysis framework |
| `redis-keys/` | 2 | Functional programming approach to Redis key generation |
| `programming-concepts/` | 1 | Modular pipeline structure patterns (bilingual) |
| `synonyms-sets/` | 2 | Set theory notation for synonym organization |

**Root-level files** (21): Senior assistant configurations
(`senior-assistant-dev.txt`,
`$_performant-senior-assistant-dev.txt`), mapping-tools
documentation (5 compression variants), TypeScript converter/reducer
lemmatized versions, best practices, LICENSE.

**MIPAD explained**: The methodology has three pillars.

- **MIPAD** (Modular Incremental Programming And Development) — The
  unified approach combining the two pillars below.
- **HMBBD** (Hyper-Modular Black Box Design) — Treats
  modules/functions as black boxes with defined inputs/outputs.
- **IDPAC** (Incremental Development Pseudocode As Code) — Starts
  with valid pseudocode that is also valid TypeScript/Python, builds
  incrementally.

**Logical sub-groups within LuxciumOne/**:

- **Methodology core**: `MIPAD/` and all its sub-directories
- **Framework-specific**: `next-js/`, `redis-keys/`,
  `programming-concepts/`
- **AI agent definitions**: `hermes/`, root-level
  `senior-assistant-dev.txt`
- **GPU infrastructure**: `gpu-acessors/`
- **Linguistic tools**: `linguistic/`, `synonyms-sets/`

### awesome-copilot-main — GitHub Copilot Resource Collection

**Path**: `prompts/awesome-copilot-main/`
**Files**: ~220 across 7+ subdirectories
**Purpose**: A community-driven, MIT-licensed collection of GitHub
Copilot customizations spanning chat modes, reusable prompts, and
persistent instructions for 20+ programming languages and 30+
frameworks.

#### Subdirectory Breakdown

| Subdirectory | Files | Description |
|---|---|---|
| `chatmodes/` | 52 | Pre-configured conversational personas (`.chatmode.md` files) |
| `prompts/` | 77 | One-shot task-oriented templates (`.prompt.md` files) |
| `instructions/` | 63 | Technology/domain-specific persistent guidelines (`.instructions.md` files) |
| `.github/` | 3 | Copilot config, PR template, workflows |
| `.vscode/` | — | VS Code workspace settings |
| `scripts/` | 1 | Line ending normalizer |

**Chatmodes coverage** (52 files): Specialist engineers (.NET, React,
Rust, Clojure, PostgreSQL), workflow modes (TDD red/green/refactor,
debugging, planning), thinking modes (critical thinking, "beast
modes"), role-play (mentor, task researcher, prompt engineer),
Azure-specific (architect, Learn contributor, Bicep/Terraform).

**Prompts coverage** (77 files): Planning and analysis (specs,
implementation plans, architecture blueprints), code generation
(Spring Boot, Docker, GitHub workflows), code review (.NET, SQL,
PostgreSQL), documentation (READMEs, ADRs, API docs), DevOps
(containerization, Terraform, Azure), meta-prompts (prompt
engineering, custom instruction generation).

**Instructions coverage** (63 files): Languages (C#, Java, Python, Go,
Rust, TypeScript), frameworks (React, Angular, Vue.js, Next.js,
Blazor, NestJS, Spring Boot), cloud/DevOps (Azure, Kubernetes,
Docker, GitHub Actions, Terraform), cross-cutting (security/OWASP,
accessibility, performance, localization, Markdown).

**Supporting files**: `README.md` (207 KB, full index of all 192
resources), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
`SUPPORT.md`, `package.json` (build scripts), `update-readme.js`
(auto-generates TOC).

### chatgpt — ChatGPT Interaction Framework

**Path**: `prompts/chatgpt/`
**Files**: ~127 across 15+ subdirectories
**Purpose**: Reference library of AI behavior patterns, conversation
frameworks, role-based personas, and technical specifications for
configuring ChatGPT interactions.

#### Subdirectory Breakdown

| Subdirectory | Files | Description |
|---|---|---|
| `acting-as/` | ~20 | Role-based AI behavior definitions |
| `acting-as/a-senior-developer/` | ~21 | Extensive senior developer prompt with team leadership and best practices |
| `acting-as/a-corrector/` | 2 | Verbal forms and text neutralization corrections |
| `backward-analysis/` | 5 | Structured protocols for summarizing multi-turn conversations |
| `edits/` | 2 | Text modification utilities (correction, translation) |
| `exports/` | — | Output and export guidelines |
| `jq/` | 2 | jq command-line JSON processor documentation |
| `la_lexica/` | 4 | French-language framework defining 32 bidirectional relationships between user, system, agent, and collective |
| `memories/` | 1 | Dated session memory snapshot |
| `more-prompts/` | ~40 | Versioned main prompts, computer specs, custom instructions, studies |
| `more-prompts/computer-specs/` | — | Hardware configuration details (GPU, RAM, CPU, motherboard) |
| `more-prompts/rpc-worker-project/` | — | RPC worker pool project prompts |
| `output-rules/` | 3 | Output formatting standards (fencing, actionable plans, biograms) |
| `previous-topics-saved/` | — | Archived conversation topics (algebraic structures, TypeScript tuples, Vagrant) |
| `professeur-nexus/` | 5 | "Professor Nexus" academic AI agent with structured thinking tools |
| `scripts/` | 1 | System information shell script |
| `templates_for_code_creation.md/` | 2 | Code creation templates and folder structures |
| `with-tasks/` | 1 | Task-based workflow definitions |
| `words-lists/` | 1 | Vocabulary collections for giving directives |

**Root-level files**: System hardware information (RAM, topology, hard
drives, GPU), motherboard and CPU documentation, Fedora setup guides,
handling code instructions, troubleshooting notes.

**Logical sub-groups within chatgpt/**:

- **Persona definitions**: `acting-as/`, `professeur-nexus/`
- **Conversation management**: `backward-analysis/`, `memories/`,
  `previous-topics-saved/`
- **Output control**: `output-rules/`, `edits/`, `exports/`
- **Linguistic framework**: `la_lexica/`, `words-lists/`
- **System documentation**: root-level hardware files,
  `more-prompts/computer-specs/`
- **Prompt library**: `more-prompts/`

### projects — Specialized AI Agent Configurations

**Path**: `prompts/projects/`
**Files**: ~200 across 37+ subdirectories
**Purpose**: Production-ready AI agent configurations for specific
domains (development, finance, theology, DevOps) and technologies
(Next.js, Node.js, Questrade API, tmux).

#### Projects by Category

**AI Agent Personas** (7 projects):

| Project | Description |
|---|---|
| `eliot/` | GenZ AI assistant personality (19-year-old, friendly, uses 3-section intro format) |
| `supreme/` | Neutral, emotionless AI directives in French and English (15 directives) |
| `chameleon/` | Adaptive, context-responsive behavioral instructions |
| `thought-process/` | Meta-analytical thinking with explicit reasoning externalization |
| `structured-approach/` | Transparency, exhaustiveness, and iterative review framework |
| `first-principle-reasoning/` | Foundation-based logical derivation |
| `pouvoir-moment-present/` | Presence-based instructions with 10 original + 10 cleaned chapter files |

**Developer and Coding Assistants** (7 projects):

| Project | Description |
|---|---|
| `cline-vscode-assist/` | VS Code Cline AI integration with memory bank and prompt engineering |
| `codex-copilot-cline/` | Unified Copilot + Cline integration framework |
| `github-copilot/` | GitHub Copilot setup, links, and documentation |
| `codewx-cli/` | CLI code execution tools and command enumeration |

**Technology-Specific Projects** (9 projects):

| Project | Description |
|---|---|
| `nextjs-v15/` | Next.js 15 + React 19 best practices with App Router patterns |
| `node-js-experts-board/` | Node.js v24 expertise and import sources |
| `reactflow/` | React Flow library API coverage and navigation |
| `sst-infrastructure/` | Serverless Stack (SST) infrastructure links |
| `shell-scripting/` | Bash robustness and resilience patterns |
| `kde/`, `kde-plasmashell-fedora/` | KDE Plasma desktop configuration on Fedora |
| `tmux/` | Terminal multiplexer documentation (12 PDF manual pages) |

**Specialized Domain Agents** (5 projects):

| Project | Description |
|---|---|
| `questrade-api/` | Financial trading API integration with 23+ documents and TypeScript SDK |
| `biblical-scholar/` | Theological and rhetorical analysis with fallacy detection |
| `professor-nexus/` | Academic multi-stage research protocols |
| `template-project/` | Prompt generation templates |
| `framework-project/` | Creative and methodological framework development |

**Behavioral and Guideline Frameworks** (7 projects):

| Project | Description |
|---|---|
| `actionable/` | Chain-of-thoughts and process files |
| `actionable-advice/` | AI agent alignment profiles |
| `agent-special-and-quick/` | Quick reference instructions for agents |
| `paradigms+/` | Directive paradigms collection |

**Repository and Tooling** (4 projects):

| Project | Description |
|---|---|
| `repo-tools/` | ZIP file processing, enumeration, and unzipping automation |
| `markdown-specialist/` | Markdown linting rules and strictness enforcement (includes 8 spec PDFs) |
| `word-tools/` | Word processing and concept expansion |
| `The Rush Stack./` | Monorepo build system documentation |

**Root-level files**: `project-basic-instructions.md` (foundation for
all projects), several behavioral and guidance documents, Cline agent
frameworks.

## Smaller Directories

These directories are smaller but serve distinct purposes in the
collection.

### Agent and Model Configuration

| Directory | Files | Description |
|---|---|---|
| `claude-anthropic/` | 5 | Claude/Anthropic system prompts for configuration management, HTML manipulation, TypeScript transformations |
| `cline/` | 3 | Cline AI assistant config with PLAN/ACT models and persistent Memory Bank documentation |
| `codex_cli/` | 1 | GPT-5-Codex system instructions for containerized coding agent |
| `gpt-5/` | 5 | GPT-5 canonical prompt templates, rhetorical escalation patterns, header variations |
| `gpt-5-codex/` | 3 | GPT-5-Codex workflow definitions and sandboxing policies |
| `riley-novak/` | 12 | Riley Novak personal AI agent configuration with custom instructions, validators, and persona files |
| `agnostic-cutom-instructions/` | 1 | Foundational agnostic assistant instructions (relationship dynamics, interaction values) |
| `custom-instructions/` | 10 | LLM-optimized instruction sets (Claude, Llama), techniques for overcoming limitations |

### Memories and Knowledge Persistence

| Directory | Files | Description |
|---|---|---|
| `memories/` | 15 | Timestamped memory banks (2024–2025) storing user profile, interests, learning goals, interaction preferences |
| `notebok-lm/` | 8 | NotebookLM source materials with character bios, tech stack docs, and resource links for audio/podcast generation |

### Prompt Engineering Techniques

| Directory | Files | Description |
|---|---|---|
| `headers/` | 12 | Structured header sections (Analysis, Thought Process, Synthesis, Chain of Thought, Summary) for improving LLM output |
| `techniques/` | 6 | Contrastive learning approaches, bidirectional documentation, and special instruction sets |
| `meta/` | 9 | Meta-analysis toolkit: summarization, literary element identification, session checkpoint templates |

### Development Guidelines

| Directory | Files | Description |
|---|---|---|
| `development-instructions/` | 3 | Code style rules (TypeScript/Node.js), markdown standards, Next.js 15+ configuration |
| `coding-best-practices/` | 1 | Quality grades reference (consumer to military/government grade) |
| `comparaison/` | 1 | Comparative discussion about AI-assisted Next.js code generation |

### Reference and Tooling

| Directory | Files | Description |
|---|---|---|
| `github-copilot/` | 2 | Jupyter notebook configuration with Copilot, VS Code resource links |
| `references/` | 2 | GitHub Copilot customization guides, LLM steering and modulation techniques |
| `openai-api/` | 1 | OpenAI API reference YAML (responses, conversations, streaming, authentication) |
| `scripts/` | 2 | System capabilities shell script and documentation |
| `typing_prompter/` | 5 | Bash shell project for character-by-character text display with random delays |
| `vocabulary/` | 3 | Modifier affixes organized by grade (substandard to transcendent) |
| `mono-repo-descritors/` | 2 | Naming conventions for monorepo components |

### Temporary and Placeholder

| Directory | Files | Description |
|---|---|---|
| `temp-stuff/` | 17 | Untitled scratch files with no clear organization (staging area) |
| `midjourney/` | 5 | Small collection of Midjourney job IDs and prompt lists (separate from `API/midjourney/`) |
| `data/` | 0 | Empty placeholder directory |
| `markdown/` | 0 | Empty placeholder directory |

## Thematic Groupings Across the Folder

Looking across all directories, the following cross-cutting themes
emerge. Each theme pulls content from multiple directories, revealing
implicit organizational patterns that span the current folder
structure.

### Group A — AI Model System Prompts

Content that configures how specific AI models behave.

- `API/claude-3/` — Claude-3 system prompts
- `API/gpt-3.5-turbo/` — GPT-3.5 fine-tuning and tones
- `API/gpt-4/` — GPT-4 sentence correction
- `API/ChatGPT-v4.1/` — VS Code Copilot instructions
- `claude-anthropic/` — Claude/Anthropic task prompts
- `gpt-5/` — GPT-5 canonical prompts
- `gpt-5-codex/` — GPT-5-Codex workflow
- `codex_cli/` — Codex CLI system instructions
- Root files: `4o-special-instructions.txt`, `4o-commands.txt`

### Group B — Development Methodology

Content that defines coding practices, frameworks, and architectural
patterns.

- `LuxciumOne/MIPAD/` — Core MIPAD/HMBBD/IDPAC methodology
- `LuxciumOne/next-js/` — Next.js 14+ standards
- `LuxciumOne/programming-concepts/` — Pipeline architecture
- `LuxciumOne/code-crafter/` — Complexity management
- `development-instructions/` — TypeScript/Node.js style rules
- `coding-best-practices/` — Quality grades
- `API/test-driven/` — TDD practices
- `awesome-copilot-main/instructions/` — 63 technology guidelines
- `awesome-copilot-main/prompts/` — 77 development task templates

### Group C — Persona and Behavioral Frameworks

Content that defines AI agent personalities and behavioral rules.

- `projects/eliot/` — GenZ assistant persona
- `projects/supreme/` — Neutral, impersonal directive
- `projects/chameleon/` — Adaptive behavior
- `projects/thought-process/` — Meta-analytical reasoning
- `projects/structured-approach/` — Transparent analysis
- `projects/first-principle-reasoning/` — Foundation-based logic
- `chatgpt/acting-as/` — Role-based behavior definitions
- `chatgpt/professeur-nexus/` — Academic agent persona
- `riley-novak/` — Personal agent configuration
- `LuxciumOne/hermes/` — Hermes assistant framework
- `API/GPTs/the-luxcium-one/` — Custom GPT persona

### Group D — Memory and Session Persistence

Content that preserves context across AI sessions.

- `memories/` — 15 timestamped memory banks
- `chatgpt/memories/` — Session snapshots
- Root files: `4o-130-memories.txt`, `4o-51-memories.txt`,
  `4o-65-more-memories.txt`, `curent-memories.txt`
- `cline/` — Memory Bank template
- `projects/cline-vscode-assist/` — Memory bank instructions

### Group E — Image Generation

Content related to Midjourney and AI image generation.

- `API/midjourney/` — Templates, color palettes, filmmaker lists,
  tuner configs (~27 files)
- `API/GPTs/midjourney/` — Prompt crafting versions v0-2 through
  v0-4b (~17 files)
- `midjourney/` — Job IDs and prompt lists (5 files)
- Root file: `image-prompt.txt` — 14 best practices

### Group F — Linguistic and Vocabulary Tools

Content exploring language, semantics, and word relationships.

- `LuxciumOne/linguistic/` — Multi-dimensional word analysis
- `LuxciumOne/synonyms-sets/` — Set theory synonym organization
- `chatgpt/la_lexica/` — French-language 32-arrow relationship model
- `chatgpt/words-lists/` — Directive vocabulary
- `vocabulary/` — Modifier affixes (substandard to transcendent)
- Root files: `meta-words.txt`, `meta-words-list-2.txt`,
  `meta-analytics.txt`

### Group G — Output Formatting and Structured Reasoning

Content that shapes how AI agents structure their responses.

- `headers/` — Analysis, Thought Process, Synthesis, Chain of Thought,
  Summary sections
- `chatgpt/output-rules/` — Fencing, actionable plans, biograms
- `techniques/` — Contrastive learning, bidirectional documentation
- `meta/` — Summarization toolkit, literary elements, session
  checkpoints
- Root files: `instructions-for-assistant.md`,
  `tought-precesse.md`, `act-as-a-reducer.txt`

### Group H — Technology-Specific References

Content serving as reference documentation for specific tools.

- `API/GPTs/zsh/` — Complete Z-Shell manual (~40 files)
- `API/GPTs/system-d/` — Systemd documentation
- `API/troubleshooting/` — NVMe optimization guides
- `projects/tmux/` — Terminal multiplexer manuals (12 PDFs)
- `projects/shell-scripting/` — Bash patterns
- `projects/kde/`, `projects/kde-plasmashell-fedora/` — Desktop
  environment
- `projects/reactflow/` — React Flow library reference
- `openai-api/` — API reference YAML

### Group I — System and Hardware Documentation

Content documenting the physical computing environment.

- `chatgpt/more-prompts/computer-specs/` — GPU, RAM, CPU,
  motherboard specs
- Root-level `chatgpt/` files: `system-ram.txt`,
  `system-topology.txt`, hard drive docs
- `LuxciumOne/gpu-acessors/` — GPU computation strategies
- Root file: `dnf-list-installed.txt` — Installed packages
- Root file: `nvidia-assist-drivers-20241109.txt` — NVIDIA driver
  conversation

### Group J — Copilot and IDE Integration

Content specifically for GitHub Copilot and VS Code integration.

- `awesome-copilot-main/` — Complete Copilot customization library
  (chatmodes, prompts, instructions)
- `github-copilot/` — Notebook configuration, VS Code links
- `references/` — Copilot customization guides, LLM steering
- `projects/github-copilot/` — Copilot setup documentation
- `projects/cline-vscode-assist/` — Cline AI integration
- `projects/codex-copilot-cline/` — Unified Copilot + Cline
- `notebok-lm/` — NotebookLM resource links

## File Type Distribution

| Extension | Count | Percentage | Primary Use |
|---|---|---|---|
| `.txt` | ~534 | 49% | Plain text prompts, instructions, memories |
| `.md` | ~374 | 35% | Markdown documentation, structured guides |
| `.pdf` | ~48 | 4% | Technical manuals (tmux, Markdown spec) |
| `.json` | ~13 | 1% | Configuration and schema files |
| `.html` | ~9 | 1% | Web content, scraped data |
| `.sh` | ~8 | 1% | Shell scripts and automation |
| `.yml`/`.yaml` | ~5 | <1% | API references, CI workflows |
| `.js`/`.mjs` | ~6 | <1% | Build scripts, pricing calculators |
| `.ts` | ~1 | <1% | TypeScript example code |
| `.py` | ~1 | <1% | Python teleprompter script |
| Other | ~80 | 7% | LICENSE files, configs, images, untitled files |

## Observations for Future Optimization

This section captures structural observations that may inform future
reorganization. No changes are proposed here — this is purely
analytical.

1. **Duplicate Midjourney content** exists across three locations:
   `API/midjourney/`, `API/GPTs/midjourney/`, and `midjourney/`. The
   root-level `midjourney/` has only 5 files and could potentially
   be consolidated.

2. **Memory files are spread** across `memories/`,
   `chatgpt/memories/`, and 6+ root-level files
   (`4o-*-memories.txt`, `curent-memories.txt`). A unified memory
   location would simplify session management.

3. **Model-specific prompts span multiple directories**: GPT-5 content
   is in `gpt-5/`, `gpt-5-codex/`, and `codex_cli/`.
   Claude content is in `API/claude-3/` and `claude-anthropic/`.
   These could be grouped by model.

4. **The `awesome-copilot-main/` directory is a self-contained
   third-party collection** with its own LICENSE (MIT),
   `package.json`, CI workflows, and contributor management. It
   operates as an embedded subproject. Its MIT license differs from
   the Luxcium License applied to the rest of the `/prompts` folder.

5. **Naming inconsistencies** include typos (`tought-precesse.md`,
   `agnostic-cutom-instructions`, `mono-repo-descritors`,
   `notebok-lm`) and mixed conventions (some folders use
   `kebab-case`, others use `PascalCase` or have periods in names
   like `The Rush Stack./`).

6. **Empty directories** (`data/`, `markdown/`) and scratch files
   (`temp-stuff/` with 17 untitled files) could be cleaned up.

7. **Behavioral and persona frameworks** are distributed across
   `projects/` subfolders (eliot, supreme, chameleon,
   thought-process, etc.) and `chatgpt/acting-as/`. A dedicated
   persona section could unify these.

8. **Technology-specific instructions** exist in both
   `awesome-copilot-main/instructions/` (63 files covering 20+
   languages) and scattered files in `LuxciumOne/next-js/`,
   `API/test-driven/`, `development-instructions/`. The scope
   overlaps in areas like Next.js and TypeScript.

9. **Root-level file proliferation**: 37 files at the prompts root
   without subdirectory grouping creates a flat namespace that
   could benefit from categorization.

10. **Bilingual content** (French and English) appears throughout
    without a consistent organizational pattern. Some files are
    fully French, some fully English, some bilingual.
