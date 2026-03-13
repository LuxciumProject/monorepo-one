# Folder Analysis: /prompts/awesome-copilot-main

This report provides a comprehensive analysis of the `awesome-copilot-main`
directory, which is a vendored copy of the
[github/awesome-copilot](https://github.com/github/awesome-copilot)
community repository. It contains curated GitHub Copilot customizations:
custom instructions, reusable prompts, and chat modes contributed by the
community and Microsoft/GitHub staff.

## Directory Overview

| Metric | Value |
|---|---|
| Total files | 216 |
| Directories (incl. root) | 8 |
| Primary purpose | Community-curated GitHub Copilot customization library |
| License | MIT (Copyright GitHub, Inc.) |
| Upstream repo | `github/awesome-copilot` |

The repository ships three categories of Copilot customization assets
(instructions, prompts, chat modes) plus project tooling to auto-generate
a `README.md` catalogue and manage contributors.

## Subdirectory Breakdown

### 1. `chatmodes/` — 52 files

Custom chat mode definitions (`.chatmode.md`) that configure Copilot Chat
behavior, available tools, and role personas.

| File | Purpose |
|---|---|
| `4.1-Beast.chatmode.md` | GPT 4.1 as a top-notch coding agent |
| `Thinking-Beast-Mode.chatmode.md` | Transcendent coding agent with quantum cognitive architecture |
| `Ultimate-Transparent-Thinking-Beast-Mode.chatmode.md` | Ultimate transparent thinking beast mode |
| `accesibility.chatmode.md` | Accessibility-focused coding mode |
| `address-comments.chatmode.md` | Address PR review comments |
| `api-architect.chatmode.md` | API architecture mentoring and guidance |
| `azure-principal-architect.chatmode.md` | Azure Principal Architect guidance (Well-Architected Framework) |
| `azure-saas-architect.chatmode.md` | Azure SaaS multitenant architecture guidance |
| `azure-verified-modules-bicep.chatmode.md` | Azure IaC in Bicep using Azure Verified Modules |
| `azure-verified-modules-terraform.chatmode.md` | Azure IaC in Terraform using Azure Verified Modules |
| `blueprint-mode.chatmode.md` | Strict workflow mode (Debug, Express, Main, Loop) |
| `clojure-interactive-programming.chatmode.md` | Clojure REPL-first pair programming |
| `critical-thinking.chatmode.md` | Challenge assumptions and encourage critical thinking |
| `csharp-dotnet-janitor.chatmode.md` | C#/.NET code cleanup and modernization |
| `debug.chatmode.md` | Debug application to find and fix bugs |
| `demonstrate-understanding.chatmode.md` | Validate user understanding through guided questioning |
| `electron-angular-native.chatmode.md` | Code review for Electron + Angular + native integration |
| `expert-dotnet-software-engineer.chatmode.md` | Expert .NET engineering with modern design patterns |
| `expert-react-frontend-engineer.chatmode.md` | Expert React frontend engineering guidance |
| `gilfoyle.chatmode.md` | Sardonic code review in the style of Gilfoyle (Silicon Valley) |
| `implementation-plan.chatmode.md` | Generate implementation plans for features/refactoring |
| `janitor.chatmode.md` | General codebase cleanup and tech debt remediation |
| `kusto-assistant.chatmode.md` | KQL assistant for Azure Data Explorer analysis |
| `mentor.chatmode.md` | Mentoring mode for guidance and support |
| `meta-agentic-project-scaffold.chatmode.md` | Meta agentic project creation assistant |
| `microsoft-study-mode.chatmode.md` | Personal Microsoft/Azure tutor via guided discovery |
| `microsoft_learn_contributor.chatmode.md` | Microsoft Learn documentation contributor mode |
| `ms-sql-dba.chatmode.md` | MS SQL Server database administration mode |
| `plan.chatmode.md` | Strategic planning and architecture assistant |
| `planner.chatmode.md` | Implementation plan generation (feature/refactor) |
| `playwright-tester.chatmode.md` | Playwright test authoring mode |
| `postgresql-dba.chatmode.md` | PostgreSQL database administration mode |
| `prd.chatmode.md` | Product Requirements Document generation |
| `principal-software-engineer.chatmode.md` | Principal-level engineering guidance |
| `prompt-builder.chatmode.md` | Expert prompt engineering and validation (Edge AI) |
| `prompt-engineer.chatmode.md` | Prompt analysis and improvement specialist |
| `refine-issue.chatmode.md` | Issue refinement with acceptance criteria and NFRs |
| `rust-gpt-4.1-beast-mode.chatmode.md` | Rust-specific GPT-4.1 beast coding mode |
| `semantic-kernel-dotnet.chatmode.md` | .NET Semantic Kernel development mode |
| `semantic-kernel-python.chatmode.md` | Python Semantic Kernel development mode |
| `simple-app-idea-generator.chatmode.md` | Brainstorm app ideas through interactive questioning |
| `software-engineer-agent-v1.chatmode.md` | Expert autonomous software engineering agent |
| `specification.chatmode.md` | Specification document generation/update |
| `task-planner.chatmode.md` | Task planning for implementation plans (Edge AI) |
| `task-researcher.chatmode.md` | Task research for project analysis (Edge AI) |
| `tdd-green.chatmode.md` | TDD green phase: implement minimal code to pass tests |
| `tdd-red.chatmode.md` | TDD red phase: write failing tests first |
| `tdd-refactor.chatmode.md` | TDD refactor phase: improve code quality |
| `tech-debt-remediation-plan.chatmode.md` | Technical debt remediation planning |
| `voidbeast-gpt41enhanced.chatmode.md` | Advanced autonomous developer agent (multi-mode) |
| `wg-code-alchemist.chatmode.md` | Clean Code and SOLID code transformation |
| `wg-code-sentinel.chatmode.md` | Security-focused code review |

### 2. `instructions/` — 64 files

Custom instruction files (`.instructions.md`, plus one `.prompt.md`) that
define coding guidelines, best practices, and framework-specific conventions
automatically applied to Copilot Chat sessions.

| File | Purpose |
|---|---|
| `a11y.instructions.md` | Accessibility coding guidance |
| `ai-prompt-engineering-safety-best-practices.instructions.md` | AI prompt engineering safety frameworks and bias mitigation |
| `angular.instructions.md` | Angular coding standards and best practices |
| `aspnet-rest-apis.instructions.md` | ASP.NET REST API development guidelines |
| `azure-devops-pipelines.instructions.md` | Azure DevOps Pipeline YAML best practices |
| `azure-functions-typescript.instructions.md` | TypeScript patterns for Azure Functions |
| `azure-verified-modules-terraform.instructions.md` | Azure Verified Modules (AVM) with Terraform |
| `bicep-code-best-practices.instructions.md` | Infrastructure as Code with Bicep |
| `blazor.instructions.md` | Blazor component and application patterns |
| `cmake-vcpkg.instructions.md` | C++ project config and package management |
| `containerization-docker-best-practices.instructions.md` | Docker image optimization and security |
| `conventional-commit.prompt.md` | Conventional commit message generation (prompt format) |
| `convert-jpa-to-spring-data-cosmos.instructions.md` | JPA to Azure Cosmos DB migration guide |
| `copilot-thought-logging.instructions.md` | See and reshape the process Copilot follows |
| `csharp.instructions.md` | C# application development guidelines |
| `dart-n-flutter.instructions.md` | Dart and Flutter coding per official recommendations |
| `devbox-image-definition.instructions.md` | Microsoft Dev Box YAML image definitions |
| `devops-core-principles.instructions.md` | Core DevOps principles (CALMS, DORA metrics) |
| `dotnet-architecture-good-practices.instructions.md` | DDD and .NET architecture guidelines |
| `dotnet-framework.instructions.md` | .NET Framework project guidance |
| `dotnet-maui.instructions.md` | .NET MAUI component and application patterns |
| `dotnet-wpf.instructions.md` | .NET WPF component and application patterns |
| `genaiscript.instructions.md` | AI-powered script generation guidelines |
| `generate-modern-terraform-code-for-azure.instructions.md` | Modern Terraform for Azure guidelines |
| `gilfoyle-code-review.instructions.md` | Gilfoyle-style sardonic code review |
| `github-actions-ci-cd-best-practices.instructions.md` | GitHub Actions CI/CD pipeline best practices |
| `go.instructions.md` | Idiomatic Go coding practices |
| `java.instructions.md` | Java application development guidelines |
| `joyride-user-project.instructions.md` | Joyride User Script REPL-driven ClojureScript |
| `joyride-workspace-automation.instructions.md` | Joyride workspace ClojureScript automation |
| `kubernetes-deployment-best-practices.instructions.md` | Kubernetes deployment and management best practices |
| `localization.instructions.md` | Markdown document localization guidelines |
| `markdown.instructions.md` | Documentation and content creation standards |
| `memory-bank.instructions.md` | Memory bank instructions (no description) |
| `ms-sql-dba.instructions.md` | MS SQL DBA chat mode instructions |
| `nestjs.instructions.md` | NestJS development standards |
| `nextjs-tailwind.instructions.md` | Next.js + Tailwind development standards |
| `nextjs.instructions.md` | Next.js development (no description provided) |
| `nodejs-javascript-vitest.instructions.md` | Node.js/JavaScript with Vitest testing |
| `object-calisthenics.instructions.md` | Object Calisthenics principles enforcement |
| `performance-optimization.instructions.md` | Comprehensive performance optimization (all stacks) |
| `playwright-python.instructions.md` | Playwright Python test generation |
| `playwright-typescript.instructions.md` | Playwright TypeScript test generation |
| `power-apps-canvas-yaml.instructions.md` | Power Apps Canvas YAML (Power Fx, v3.0 schema) |
| `power-platform-connector.instructions.md` | Power Platform Custom Connector (Swagger 2.0) |
| `powershell-pester-5.instructions.md` | PowerShell Pester v5 testing best practices |
| `powershell.instructions.md` | PowerShell cmdlet and scripting best practices |
| `python.instructions.md` | Python coding conventions and guidelines |
| `quarkus-mcp-server-sse.instructions.md` | Quarkus MCP Server with HTTP SSE transport |
| `quarkus.instructions.md` | Quarkus development standards |
| `reactjs.instructions.md` | ReactJS development standards and best practices |
| `ruby-on-rails.instructions.md` | Ruby on Rails coding conventions |
| `rust.instructions.md` | Rust programming conventions and best practices |
| `security-and-owasp.instructions.md` | OWASP Top 10 secure coding instructions |
| `self-explanatory-code-commenting.instructions.md` | Self-explanatory code with fewer comments |
| `spec-driven-workflow-v1.instructions.md` | Specification-driven development workflow |
| `springboot.instructions.md` | Spring Boot application guidelines |
| `sql-sp-generation.instructions.md` | SQL statement and stored procedure generation |
| `taming-copilot.instructions.md` | Prevent Copilot from making uncontrolled changes |
| `tanstack-start-shadcn-tailwind.instructions.md` | TanStack Start + shadcn + Tailwind guidelines |
| `task-implementation.instructions.md` | Task plan implementation with tracking (Edge AI) |
| `tasksync.instructions.md` | TaskSync V4: terminal-based agent feedback loop |
| `terraform.instructions.md` | Terraform conventions and guidelines |
| `vuejs3.instructions.md` | Vue.js 3 with Composition API and TypeScript |

### 3. `prompts/` — 77 files

Reusable prompt files (`.prompt.md`) that define specific tasks Copilot can
execute, from code generation to documentation to DevOps automation.

| File | Purpose |
|---|---|
| `ai-prompt-engineering-safety-review.prompt.md` | AI prompt safety review and improvement |
| `architecture-blueprint-generator.prompt.md` | Project architecture blueprint generation |
| `aspnet-minimal-api-openapi.prompt.md` | ASP.NET Minimal API with OpenAPI documentation |
| `az-cost-optimize.prompt.md` | Azure resource cost optimization |
| `azure-resource-health-diagnose.prompt.md` | Azure resource health diagnosis and remediation |
| `boost-prompt.prompt.md` | Interactive prompt refinement (Joyride extension) |
| `breakdown-epic-arch.prompt.md` | Epic technical architecture from PRD |
| `breakdown-epic-pm.prompt.md` | Epic Product Requirements Document creation |
| `breakdown-feature-implementation.prompt.md` | Detailed feature implementation plans |
| `breakdown-feature-prd.prompt.md` | Feature PRD creation from Epic |
| `breakdown-plan.prompt.md` | Issue planning with Epic > Feature > Story hierarchy |
| `breakdown-test.prompt.md` | Test planning and quality assurance |
| `code-exemplars-blueprint-generator.prompt.md` | Scan codebase for high-quality code exemplars |
| `comment-code-generate-a-tutorial.prompt.md` | Transform Python script into tutorial |
| `containerize-aspnet-framework.prompt.md` | Containerize ASP.NET Framework projects |
| `containerize-aspnetcore.prompt.md` | Containerize ASP.NET Core projects |
| `copilot-instructions-blueprint-generator.prompt.md` | Generate copilot-instructions.md from codebase |
| `create-architectural-decision-record.prompt.md` | Create ADR documents |
| `create-github-action-workflow-specification.prompt.md` | Spec for GitHub Actions CI/CD workflow |
| `create-github-issue-feature-from-specification.prompt.md` | Create GitHub Issues from spec (feature_request) |
| `create-github-issues-feature-from-implementation-plan.prompt.md` | Create GitHub Issues from implementation plan |
| `create-github-issues-for-unmet-specification-requirements.prompt.md` | Create Issues for unimplemented spec requirements |
| `create-github-pull-request-from-specification.prompt.md` | Create GitHub PR from specification |
| `create-implementation-plan.prompt.md` | Create implementation plan for features/refactoring |
| `create-llms.prompt.md` | Create llms.txt file per llmstxt.org spec |
| `create-oo-component-documentation.prompt.md` | Document object-oriented components |
| `create-readme.prompt.md` | Generate project README.md |
| `create-specification.prompt.md` | Create specification for GenAI consumption |
| `create-spring-boot-java-project.prompt.md` | Spring Boot Java project skeleton |
| `create-spring-boot-kotlin-project.prompt.md` | Spring Boot Kotlin project skeleton |
| `csharp-async.prompt.md` | C# async programming best practices |
| `csharp-docs.prompt.md` | C# XML documentation comments |
| `csharp-mstest.prompt.md` | MSTest unit testing best practices |
| `csharp-nunit.prompt.md` | NUnit unit testing best practices |
| `csharp-tunit.prompt.md` | TUnit unit testing best practices |
| `csharp-xunit.prompt.md` | XUnit unit testing best practices |
| `documentation-writer.prompt.md` | Diátaxis documentation expert |
| `dotnet-best-practices.prompt.md` | .NET/C# best practices enforcement |
| `dotnet-design-pattern-review.prompt.md` | C#/.NET design pattern review |
| `editorconfig.prompt.md` | Generate best-practice .editorconfig |
| `ef-core.prompt.md` | Entity Framework Core best practices |
| `first-ask.prompt.md` | Interactive task refinement (Joyride extension) |
| `folder-structure-blueprint-generator.prompt.md` | Project folder structure analysis and blueprinting |
| `gen-specs-as-issues.prompt.md` | Identify missing features and create spec issues |
| `generate-custom-instructions-from-codebase.prompt.md` | Generate migration/evolution instructions |
| `git-flow-branch-creator.prompt.md` | Git Flow branch creation from git status/diff |
| `java-docs.prompt.md` | Java Javadoc documentation |
| `java-junit.prompt.md` | JUnit 5 testing best practices |
| `java-springboot.prompt.md` | Spring Boot development best practices |
| `javascript-typescript-jest.prompt.md` | Jest testing best practices (JS/TS) |
| `kotlin-springboot.prompt.md` | Spring Boot + Kotlin best practices |
| `mkdocs-translations.prompt.md` | MkDocs documentation language translation |
| `multi-stage-dockerfile.prompt.md` | Optimized multi-stage Dockerfiles |
| `my-issues.prompt.md` | List current user's issues in repository |
| `my-pull-requests.prompt.md` | List current user's PRs in repository |
| `next-intl-add-language.prompt.md` | Add new language to Next.js + next-intl |
| `playwright-automation-fill-in-form.prompt.md` | Automate form filling via Playwright MCP |
| `playwright-explore-website.prompt.md` | Website exploration via Playwright MCP |
| `playwright-generate-test.prompt.md` | Generate Playwright test from scenario |
| `postgresql-code-review.prompt.md` | PostgreSQL-specific code review |
| `postgresql-optimization.prompt.md` | PostgreSQL feature and optimization guide |
| `project-workflow-analysis-blueprint-generator.prompt.md` | End-to-end application workflow documentation |
| `prompt-builder.prompt.md` | Guide creating high-quality Copilot prompts |
| `readme-blueprint-generator.prompt.md` | Intelligent README.md generation from codebase |
| `repo-story-time.prompt.md` | Repository narrative from commit history |
| `review-and-refactor.prompt.md` | Code review and refactoring |
| `sql-code-review.prompt.md` | Universal SQL code review (security, quality) |
| `sql-optimization.prompt.md` | Universal SQL performance optimization |
| `suggest-awesome-github-copilot-chatmodes.prompt.md` | Suggest chatmodes from awesome-copilot repo |
| `suggest-awesome-github-copilot-prompts.prompt.md` | Suggest prompts from awesome-copilot repo |
| `technology-stack-blueprint-generator.prompt.md` | Technology stack blueprint generation |
| `update-avm-modules-in-bicep.prompt.md` | Update Azure Verified Modules in Bicep |
| `update-implementation-plan.prompt.md` | Update existing implementation plan |
| `update-llms.prompt.md` | Update llms.txt from doc changes |
| `update-markdown-file-index.prompt.md` | Update markdown section with file index |
| `update-oo-component-documentation.prompt.md` | Update OO component documentation |
| `update-specification.prompt.md` | Update specification from new requirements |

### 4. `.github/` — 6 files (2 root + 4 in workflows/)

Repository governance, CI workflows, and Copilot review instructions.

| File | Purpose |
|---|---|
| `copilot-instructions.md` | Copilot code-review checklist for prompt/instruction/chatmode files |
| `pull_request_template.md` | PR template with contribution checklist |
| `workflows/check-line-endings.yml` | CI: verify no CRLF in markdown files |
| `workflows/contributors.yml` | CI: weekly auto-update contributors list |
| `workflows/validate-readme.yml` | CI: validate README.md stays in sync on PR |
| `workflows/webhook-caller.yml` | CI: call webhooks on push to main |

### 5. `.vscode/` — 3 files

VS Code workspace configuration for the project.

| File | Purpose |
|---|---|
| `extensions.json` | Recommends EditorConfig and markdownlint extensions |
| `settings.json` | Configures chat mode/prompt/instruction file locations, LF line endings, markdown formatting |
| `tasks.json` | Build task: `node update-readme.js` for README generation |

### 6. `scripts/` — 1 file

| File | Purpose |
|---|---|
| `fix-line-endings.sh` | Shell script to normalize CRLF to LF in all markdown files |

## File-Level Analysis (Root Files)

These 13 files sit at the root of `awesome-copilot-main/`.

| File | Size | Purpose |
|---|---|---|
| `README.md` | 212 KB | Auto-generated catalogue of all instructions, prompts, and chat modes with full rendered content |
| `update-readme.js` | 51 KB | Node.js script that scans the three content directories and regenerates README.md |
| `package-lock.json` | 27 KB | npm lockfile for `all-contributors-cli` |
| `.all-contributorsrc` | 21 KB | Configuration for all-contributors bot (86 contributors listed) |
| `CONTRIBUTING.md` | 7 KB | Contribution guide: how to add instructions, prompts, and chat modes |
| `SECURITY.md` | 2 KB | Security vulnerability reporting policy (GitHub standard) |
| `CODE_OF_CONDUCT.md` | 3 KB | Contributor Covenant Code of Conduct |
| `LICENSE` | 1 KB | MIT License (Copyright GitHub, Inc.) |
| `package.json` | 726 B | npm package definition for build/contributor scripts |
| `SUPPORT.md` | 725 B | Support and issue-filing guidance |
| `.editorconfig` | 496 B | Editor formatting rules (2-space indent, LF, UTF-8) |
| `.gitattributes` | 620 B | Line ending normalization rules |
| `.gitignore` | 74 B | Ignores node_modules, .orig files, Copilot-Processing.md, .DS_Store |

## Thematic Groupings

The 193 content files (chatmodes + instructions + prompts) cluster into
clear thematic groups.

### Microsoft/.NET/Azure Ecosystem (43 files)

The largest theme. Covers C#, ASP.NET, Blazor, MAUI, WPF, .NET Framework,
Entity Framework Core, Semantic Kernel, Azure Functions, Azure Bicep,
Azure Verified Modules, Azure DevOps Pipelines, Azure cost optimization,
Azure resource health, and Azure SaaS/Principal architecture.

- **chatmodes**: `azure-principal-architect`, `azure-saas-architect`,
  `azure-verified-modules-bicep`, `azure-verified-modules-terraform`,
  `csharp-dotnet-janitor`, `expert-dotnet-software-engineer`, `kusto-assistant`,
  `microsoft-study-mode`, `microsoft_learn_contributor`, `ms-sql-dba`,
  `semantic-kernel-dotnet`, `semantic-kernel-python`
- **instructions**: `aspnet-rest-apis`, `azure-devops-pipelines`,
  `azure-functions-typescript`, `azure-verified-modules-terraform`,
  `bicep-code-best-practices`, `blazor`, `convert-jpa-to-spring-data-cosmos`,
  `csharp`, `dotnet-architecture-good-practices`, `dotnet-framework`,
  `dotnet-maui`, `dotnet-wpf`, `ms-sql-dba`, `power-apps-canvas-yaml`,
  `power-platform-connector`, `powershell`, `powershell-pester-5`
- **prompts**: `aspnet-minimal-api-openapi`, `az-cost-optimize`,
  `azure-resource-health-diagnose`, `containerize-aspnet-framework`,
  `containerize-aspnetcore`, `csharp-*` (6 files), `dotnet-*` (3 files),
  `ef-core`, `update-avm-modules-in-bicep`

### Java/JVM Ecosystem (9 files)

Spring Boot, Quarkus, Kotlin, JPA, JUnit.

- **instructions**: `java`, `quarkus`, `quarkus-mcp-server-sse`, `springboot`,
  `convert-jpa-to-spring-data-cosmos`
- **prompts**: `java-docs`, `java-junit`, `java-springboot`,
  `create-spring-boot-java-project`, `create-spring-boot-kotlin-project`,
  `kotlin-springboot`

### JavaScript/TypeScript/Frontend (15 files)

React, Angular, Next.js, Vue.js, TanStack, Electron, Node.js, Jest, Vitest.

- **chatmodes**: `expert-react-frontend-engineer`, `electron-angular-native`
- **instructions**: `angular`, `nestjs`, `nextjs`, `nextjs-tailwind`, `reactjs`,
  `tanstack-start-shadcn-tailwind`, `vuejs3`, `nodejs-javascript-vitest`
- **prompts**: `javascript-typescript-jest`, `next-intl-add-language`

### Infrastructure/DevOps/Containers (14 files)

Docker, Kubernetes, Terraform, GitHub Actions, CI/CD.

- **instructions**: `containerization-docker-best-practices`,
  `devops-core-principles`, `generate-modern-terraform-code-for-azure`,
  `github-actions-ci-cd-best-practices`, `kubernetes-deployment-best-practices`,
  `terraform`
- **prompts**: `containerize-aspnet-framework`, `containerize-aspnetcore`,
  `multi-stage-dockerfile`, `create-github-action-workflow-specification`

### Database (8 files)

PostgreSQL, MS SQL, SQL optimization, stored procedures.

- **chatmodes**: `ms-sql-dba`, `postgresql-dba`
- **instructions**: `ms-sql-dba`, `sql-sp-generation`
- **prompts**: `postgresql-code-review`, `postgresql-optimization`,
  `sql-code-review`, `sql-optimization`

### Testing & QA (12 files)

TDD, Playwright, Pester, JUnit, MSTest, NUnit, XUnit, TUnit, Jest, Vitest.

- **chatmodes**: `tdd-red`, `tdd-green`, `tdd-refactor`, `playwright-tester`
- **instructions**: `playwright-python`, `playwright-typescript`,
  `powershell-pester-5`, `nodejs-javascript-vitest`
- **prompts**: `playwright-*` (3 files), `csharp-mstest`, `csharp-nunit`,
  `csharp-tunit`, `csharp-xunit`, `java-junit`, `javascript-typescript-jest`,
  `breakdown-test`

### Planning/Architecture/Docs (25 files)

PRDs, specs, implementation plans, ADRs, blueprint generators, README
generation, documentation writing.

- **chatmodes**: `plan`, `planner`, `implementation-plan`, `prd`,
  `specification`, `refine-issue`, `tech-debt-remediation-plan`,
  `task-planner`, `task-researcher`, `simple-app-idea-generator`,
  `meta-agentic-project-scaffold`
- **instructions**: `spec-driven-workflow-v1`, `markdown`, `localization`,
  `memory-bank`, `task-implementation`, `tasksync`
- **prompts**: `create-specification`, `update-specification`,
  `create-implementation-plan`, `update-implementation-plan`,
  `create-readme`, `readme-blueprint-generator`,
  `architecture-blueprint-generator`, `create-architectural-decision-record`,
  `documentation-writer`, `folder-structure-blueprint-generator`,
  `technology-stack-blueprint-generator`,
  `project-workflow-analysis-blueprint-generator`,
  `copilot-instructions-blueprint-generator`

### Security (4 files)

OWASP, prompt safety, code review.

- **chatmodes**: `wg-code-sentinel`
- **instructions**: `security-and-owasp`,
  `ai-prompt-engineering-safety-best-practices`
- **prompts**: `ai-prompt-engineering-safety-review`

### Other Languages (5 files)

Go, Rust, Ruby on Rails, Dart/Flutter, Clojure.

- **chatmodes**: `clojure-interactive-programming`,
  `rust-gpt-4.1-beast-mode`
- **instructions**: `go`, `rust`, `ruby-on-rails`, `dart-n-flutter`

### Meta/Prompt Engineering (7 files)

Prompt building, Copilot taming, code style.

- **chatmodes**: `prompt-builder`, `prompt-engineer`, `mentor`,
  `demonstrate-understanding`, `critical-thinking`
- **instructions**: `taming-copilot`, `self-explanatory-code-commenting`,
  `object-calisthenics`, `copilot-thought-logging`
- **prompts**: `prompt-builder`, `boost-prompt`, `first-ask`,
  `generate-custom-instructions-from-codebase`

### Novelty/Personality Modes (5 files)

Chat modes with distinctive personas or extreme configurations.

- `gilfoyle.chatmode.md` + `gilfoyle-code-review.instructions.md`
- `4.1-Beast.chatmode.md`, `Thinking-Beast-Mode.chatmode.md`,
  `Ultimate-Transparent-Thinking-Beast-Mode.chatmode.md`,
  `voidbeast-gpt41enhanced.chatmode.md`

## Unrelated/Misplaced Content

Overall the directory is well-organized. A few minor observations:

1. **`instructions/conventional-commit.prompt.md`** — This file uses the
   `.prompt.md` extension but lives in the `instructions/` directory. It
   should either be renamed to `.instructions.md` or moved to `prompts/`.

2. **`package.json` + `package-lock.json`** — These exist solely for the
   `all-contributors-cli` dev dependency and the `update-readme.js` build
   script. They are project tooling, not Copilot customization content.
   This is expected for this upstream repo but is out of place in the
   context of the parent monorepo's `prompts/` directory.

3. **`instructions/memory-bank.instructions.md`** and
   **`instructions/nextjs.instructions.md`** — Both have empty
   `description` fields in their front matter, which violates the
   project's own contribution guidelines (`.github/copilot-instructions.md`
   requires non-empty descriptions).

4. **Chatmode naming inconsistency** — Most chatmode files use
   `kebab-case` but three use `PascalCase` or `Mixed-Case`:
   `4.1-Beast.chatmode.md`, `Thinking-Beast-Mode.chatmode.md`,
   `Ultimate-Transparent-Thinking-Beast-Mode.chatmode.md`. The
   contributing guide recommends lowercase with hyphens.

5. **`accesibility.chatmode.md`** — Typo in filename (missing 's';
   should be `accessibility`).

## Organization Strategy

The existing three-folder structure (`chatmodes/`, `instructions/`,
`prompts/`) follows VS Code's Copilot customization conventions and is
the correct canonical organization. Suggestions for improvement:

1. **Fix naming violations**: Rename PascalCase chatmode files to
   kebab-case. Fix the `accesibility` typo.

2. **Move misplaced file**: Relocate `instructions/conventional-commit.prompt.md`
   to `prompts/` or rename it to `.instructions.md`.

3. **Fill missing descriptions**: Add descriptions to `memory-bank` and
   `nextjs` instruction files.

4. **Add subdirectory categorization**: As the collection grows beyond
   ~200 files, consider optional subdirectories within each content
   folder (e.g., `instructions/azure/`, `instructions/dotnet/`,
   `instructions/frontend/`). The `update-readme.js` script would need
   updating to support this.

5. **Decouple tooling**: The `package.json`, `package-lock.json`, and
   `update-readme.js` are build tooling. In the monorepo context, these
   should be noted as upstream artifacts not intended for local execution.

6. **Reduce README size**: At 212 KB the README is very large because it
   inlines all file contents. Consider a summary-only README with links
   to individual files.

## Summary Statistics

### File Type Breakdown

| Extension | Count | Description |
|---|---|---|
| `.md` | 200 | Markdown (instructions, prompts, chatmodes, docs) |
| `.json` | 5 | Config files (package.json, lock, vscode, contributorsrc) |
| `.yml` | 4 | GitHub Actions workflow definitions |
| `.js` | 1 | README generator script |
| `.sh` | 1 | Line ending fix script |
| `.editorconfig` | 1 | Editor configuration |
| `.gitattributes` | 1 | Git line ending rules |
| `.gitignore` | 1 | Git ignore rules |
| `LICENSE` | 1 | MIT license (no extension) |
| **Total** | **216** | |

### Content File Breakdown (193 Copilot customizations)

| Category | Count | Extension |
|---|---|---|
| Prompts | 77 | `.prompt.md` |
| Instructions | 63 | `.instructions.md` |
| Chat Modes | 52 | `.chatmode.md` |
| Misplaced | 1 | `.prompt.md` in instructions/ |
| **Total** | **193** | |

### Technology Coverage

| Technology Area | Files |
|---|---|
| Microsoft/.NET/Azure | 43 |
| Planning/Architecture/Docs | 25 |
| JavaScript/TypeScript/Frontend | 15 |
| Infrastructure/DevOps/Containers | 14 |
| Testing & QA | 12 |
| Java/JVM | 9 |
| Database | 8 |
| Meta/Prompt Engineering | 7 |
| Other Languages (Go, Rust, Ruby, Dart, Clojure) | 5 |
| Novelty/Personality | 5 |
| Security | 4 |
