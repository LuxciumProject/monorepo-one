# What is Rush Stack?

Rush Stack is a...

Mission to provide reusable tech for running large scale monorepos for the web
Open collaboration among community partners with serious tooling requirements, who got tired of going it alone
Specific strategy that integrates popular tools like Node.js, TypeScript, ESLint, Prettier, Webpack, Jest, etc.
Family of projects that fill in the gaps for this strategy
Although various pieces of this work have been underway for years, we're now bringing them together under a common charter as Rush Stack. Track our progress on the News page.

## What's in the stack?

These major tools are developed under the **Rush Stack** umbrella:

- [Rush](https://rushjs.io/): the scalable monorepo build orchestrator
- [Heft](https://heft.rushstack.io/): an extensible build system that interfaces with Rush
- [API Extractor](https://api-extractor.com/): coordinates API reviews for library packages, and generates .d.ts rollups
- [API Documenter](https://api-extractor.com/pages/setup/generating_docs): generates your API documentation website
- [@rushstack/eslint-bulk](https://www.npmjs.com/package/@rushstack/eslint-bulk): enables you to roll out new lint rules in your monorepo without having to clutter up source files with thousands of machine-generated // eslint-ignore-next-line directives
- [@rushstack/eslint-config](https://www.npmjs.com/package/@rushstack/eslint-config): our standardized ESLint rule set, specifically designed for large scale TypeScript monorepos
- [@rushstack/eslint-patch](https://www.npmjs.com/package/@rushstack/eslint-patch): a patch that enhances ESLint with better support for large scale monorepos
- [@rushstack/eslint-plugin-packlets](https://www.npmjs.com/package/@rushstack/eslint-plugin-packlets): "Packlets" are a lightweight alternative to NPM packages for organizing source files within a single project
- [Lockfile Explorer](https://lfx.rushstack.io/): helps you investigate and solve version conflicts when working in a Rush monorepo
- [Rundown](https://www.npmjs.com/package/@rushstack/rundown): a tool for optimizing Node.js process startup times
- [@rushstack/trace-import](https://www.npmjs.com/package/@rushstack/trace-import): Our command-line tool for troubleshooting how modules are resolved by import and require()

The projects are built on a common framework of reusable library packages, which includes:

- [ts-command-line](https://www.npmjs.com/package/@rushstack/ts-command-line): a strict command-line parser whose options/docs can be augmented by toolchain packages with built-in support for tab-completion on PowerShell and Bash
- [node-core-library](https://www.npmjs.com/package/@rushstack/node-core-library): the core framework used by all our projects
- [package-deps-hash](https://www.npmjs.com/package/@rushstack/package-deps-hash): the incremental build engine used by Rush
- [rig-package](https://www.npmjs.com/package/@rushstack/rig-package): a system for sharing tool configurations between projects without duplicating config files
- [stream-collator](https://www.npmjs.com/package/@rushstack/stream-collator): the magic behind how Rush can display real-time log output from concurrent tasks, without ugly interleaving of the output
- [tree-pattern](https://www.npmjs.com/package/@rushstack/tree-pattern): a pattern matcher for JavaScript tree structures, used by our lint rules
- [a family of webpack plugins](https://github.com/microsoft/rushstack/tree/main/webpack) useful for building web applications

## What's the relationship to Rush?

The "**Rush Stack**" components are optional extras that you can use with Rush.

As a build orchestrator, Rush's job is to:

- Ensure deterministic and reliable package installations (using Yarn, PNPM, or NPM)
- Build your projects in the right order, as fast as possible
- Apply policies to keep your monorepo running smoothly
- Manage your publishing workflows
- Establish a standard repo layout and familiar CLI, to facilitate developers who contribute to many different monorepos

Beyond this role, Rush leaves the rest up to you. Individual projects can build with any tool chain you like. This is very flexible!

But flexibility has its downsides. Node.js tooling is notorious for its bewildering array of options: Choose your compiler. Choose your linter. Choose your bundler, your package manager, your task engine, test runner, test assertion library, and so on. Once you've placed your bets, integrating all these pieces turns out to be a software project of its own. As you scale up, these costs can add up fast!

In summer of 2019, we launched **Rush Stack** with the aim to provide a reusable solution for this broader set of problems. You can still use Rush by itself, of course. But if you're tired of going it alone, we invite you to:

- Trade your flexibility for an opinionated approach backed by tooling experts who run huge monorepos
- Join forces with the open community that's investing in this approach
- Help us to "go deep" with integrations, optimizations, documentation, and polish to achieve a world class developer experience

## Heft references and links to browse now

Heft is a config-driven toolchain that invokes other popular tools such as TypeScript, ESLint, Jest, Webpack, and API Extractor. You can use it to build web applications, Node.js services, command-line tools, libraries, and more. Heft builds all your JavaScript projects the same way: A way that works.

### Introduction

- [Overview](/)
- [Getting started](/pages/intro/getting_started/)
- [Heft architecture](/pages/intro/architecture/)
- [Using rig packages](/pages/intro/rig_packages/)
- [Heft command line](/pages/intro/cli/)

### Heft tutorials

- [Hello world](/pages/tutorials/hello_world/)
- [Adding more tasks](/pages/tutorials/adding_tasks/)
- [Everyday Heft commands](/pages/tutorials/everyday_commands/)
- [Interfacing with Rush](/pages/tutorials/heft_and_rush/)

### Advanced topics

- [@rushstack/heft-config-file](/pages/advanced/heft-config-file/)

### Heft plugins

- [(package index)](/pages/plugins/package_index/)
- [API Extractor](/pages/plugins/api-extractor/)
- [Copy files](/pages/plugins/copy-files/)
- [Delete files](/pages/plugins/delete-files/)
- [Dev certificate](/pages/plugins/dev-cert/)
- [Jest](/pages/plugins/jest/)
- [ESlint / TSLint](/pages/plugins/lint/)
- [Node.js service](/pages/plugins/node-service/)
- [Run script](/pages/plugins/run-script/)
- [Sass](/pages/plugins/sass/)
- [Serverless Stack](/pages/plugins/serverless-stack/)
- [Storybook](/pages/plugins/storybook/)
- [TypeScript](/pages/plugins/typescript/)
- [Webpack](/pages/plugins/webpack/)

### Heft config files

- [Environment variables](/pages/configs/environment_vars/)
- [api-extractor-task.json](/pages/configs/api-extractor-task_json/)
- [heft.json](/pages/configs/heft_json/)
- [node-service.json](/pages/configs/node-service_json/)
- [rig.json](/pages/configs/rig_json/)
- [sass.json](/pages/configs/sass_json/)
- [typescript.json](/pages/configs/typescript_json/)
- [Other config files](/pages/configs/other_files/)

### Support

- [Help](/pages/support/help/)
- [What's new](/pages/support/news/)
- [Contributing](/pages/support/contributing/)
