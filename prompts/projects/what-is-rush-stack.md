# What is Rush Stack?

Rush Stack is a...

- **Mission**: To provide reusable tech for running large-scale monorepos for the web.
- **Open Collaboration**: Among community partners with serious tooling requirements, who got tired of going it alone.
- **Specific Strategy**: Integrates popular tools like Node.js, TypeScript, ESLint, Prettier, Webpack, Jest, etc.
- **Family of Projects**: That fill in the gaps for this strategy.

Although various pieces of this work have been underway for years, we're now bringing them together under a common charter as **Rush Stack**. Track our progress on the [News](https://rushstack.io/news/) page.

## What's in the Stack?

These major tools are developed under the **Rush Stack** umbrella:

- **Rush**: The scalable monorepo build orchestrator.
- **Heft**: An extensible build system that interfaces with Rush.
- **API Extractor**: Coordinates API reviews for library packages and generates `.d.ts` rollups.
- **API Documenter**: Generates your API documentation website.
- **@rushstack/eslint-bulk**: Enables you to roll out new lint rules in your monorepo without cluttering source files with thousands of machine-generated `// eslint-ignore-next-line` directives.
- **@rushstack/eslint-config**: Our standardized ESLint rule set, specifically designed for large-scale TypeScript monorepos.
- **@rushstack/eslint-patch**: A patch that enhances ESLint with better support for large-scale monorepos.
- **@rushstack/eslint-plugin-packlets**: "Packlets" are a lightweight alternative to NPM packages for organizing source files within a single project.
- **Lockfile Explorer**: Helps you investigate and solve version conflicts when working in a Rush monorepo.
- **Rundown**: A tool for optimizing Node.js process startup times.
- **@rushstack/trace-import**: A command-line tool for troubleshooting how modules are resolved by `import` and `require()`.

These projects are built on a common framework of reusable library packages, including:

- **[Rush](https://rushjs.io/)**
- **[Heft](https://heft.rushstack.io/)**
- **[API Extractor](https://api-extractor.com/)**
- **[API Documenter](https://api-extractor.com/pages/setup/generating_docs)**
- **[@rushstack/eslint-bulk](https://www.npmjs.com/package/@rushstack/eslint-bulk)**
- **[@rushstack/eslint-config](https://www.npmjs.com/package/@rushstack/eslint-config)**
- **[@rushstack/eslint-patch](https://www.npmjs.com/package/@rushstack/eslint-patch)**
- **[@rushstack/eslint-plugin-packlets](https://www.npmjs.com/package/@rushstack/eslint-plugin-packlets)**
- **[Lockfile Explorer](https://lfx.rushstack.io/)**
- **[Rundown](https://www.npmjs.com/package/@rushstack/rundown)**
- **[@rushstack/trace-import](https://www.npmjs.com/package/@rushstack/trace-import)**

### Additional Core Packages

- **ts-command-line**: A strict command-line parser with built-in support for tab-completion on PowerShell and Bash.
- **node-core-library**: The core framework used by all our projects.
- **package-deps-hash**: The incremental build engine used by Rush.
- **rig-package**: A system for sharing tool configurations between projects without duplicating config files.
- **stream-collator**: The magic behind how Rush can display real-time log output from concurrent tasks without ugly interleaving of output.
- **tree-pattern**: A pattern matcher for JavaScript tree structures, used by our lint rules.
- **A family of Webpack plugins** useful for building web applications.

## What's the Relationship to Rush?

The **Rush Stack** components are optional extras that you can use with Rush.

As a build orchestrator, **Rush's** job is to:

- Ensure deterministic and reliable package installations (using Yarn, PNPM, or NPM).
- Build your projects in the right order, as fast as possible.
- Apply policies to keep your monorepo running smoothly.
- Manage your publishing workflows.
- Establish a standard repo layout and familiar CLI, to facilitate developers who contribute to many different monorepos.

Beyond this role, **Rush leaves the rest up to you**. Individual projects can build with any toolchain you like. This is very flexible!

However, **flexibility has its downsides**. Node.js tooling is notorious for its bewildering array of options: Choose your compiler. Choose your linter. Choose your bundler, your package manager, your task engine, test runner, test assertion library, and so on. Once you've placed your bets, integrating all these pieces turns out to be a software project of its own. As you scale up, these costs can add up fast!

In **summer of 2019**, we launched **Rush Stack** with the aim to provide a reusable solution for this broader set of problems. You can still use **Rush** by itself, of course. But if you're tired of going it alone, we invite you to:

- Trade your flexibility for an **opinionated approach** backed by tooling experts who run huge monorepos.
- Join forces with the **open community** that's investing in this approach.

> **Help us to "go deep"** with integrations, optimizations, documentation, and polish to achieve a world-class developer experience.
