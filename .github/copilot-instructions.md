# Code Style Guide for GitHub Copilot

## Introduction

This guide helps GitHub Copilot generate code that is easy to read, use, and maintain. By following these rules, the code will be simple, functional, and easy to modify in the future, ensuring long-term quality and understanding across the team.

### Why This Guide?

The goal of this guide is to ensure that generated code is both human-readable and optimized for machine performance. It facilitates collaboration, makes coding simpler, and ensures that best practices are consistently followed.

## Basic Rules

- **Keep It Simple**: Code should be easy to read and not overly complex. Simple code is easier to debug, test, and maintain.
- **Be Consistent**: Always follow the same conventions throughout the codebase to ensure ease of understanding and maintenance.
- **Separate Concerns**: Keep logic, data, and input/output in distinct components to enforce the Single Responsibility Principle and simplify maintenance.
- **Use Strict Types**: Leverage TypeScript's strict typing to catch potential issues early and ensure reliability.
- **Make Components Small**: Each code component should serve a single purpose. This ensures maintainability and simplicity in testing.
- **Isolate Infrastructure**: Separate core business logic from infrastructure-related code (e.g., databases) to make updates and changes less disruptive.

## Barrel-Only Index Paradigm

- **Strict Barrel-Only Policy**: `index.ts` files (or any other index files) are **strictly restricted** to serving as **barrel files**. This means they **must only be used for aggregating and re-exporting modules** within the same directory. **Implementation logic is strictly forbidden** in these files. This rule is non-negotiable for all AI Agents and must be enforced consistently.
  - **Named Exports Only**: All exports within `index.ts` files must be **named exports**. Avoid default exports to ensure clarity and facilitate easier refactoring. This will prevent naming conflicts and make imports more predictable.
  - **Refactor Existing Code**: When encountering an `index.ts` file with logic or code beyond aggregation, it **must be refactored** to conform to the Barrel-Only Index Paradigm. The AI Agent must prioritize maintaining separation of concerns and clean code practices.
  - **Why This Paradigm Matters**: This approach ensures a clear separation of concerns and simplifies import statements, promoting a cleaner and more maintainable codebase. It also encapsulates the module's internal structure, making it easier to refactor without disrupting the rest of the codebase.

## Unused Declarations and Variables

- **Never Leave Variables or Parameters Dangling**: If a variable or parameter is declared but not immediately used, it is essential to handle it properly. **If the value is intended to be consumed later**, make it clear by marking it with an appropriate action such as using `void`, `console.log`, or another method to acknowledge the declaration.
- **Mark Unused Variables Explicitly**: If a variable or parameter is deliberately **not intended to be used**, mark it with an underscore (`_`) to clearly indicate it is intentionally unused. This ensures that the code remains clean and avoids warnings about unused declarations (e.g., `is declared but its value is never read.ts(6133)`).
- **Complete Implementation**: If a variable or parameter is required but not used in the current implementation, **complete the logic or refactor the code** to make sure it is properly utilized, ensuring the code remains functional and avoids unnecessary declarations.

## Modular Code Design

- **Use Interfaces**: Define clear boundaries between different parts of the system using interfaces or abstract classes.
- **Stay Modular**: Separate logic, data handling, and input/output to prevent tight coupling and simplify testing.
- **Interchangeable Components**: Design parts of the code (e.g., repositories) to be easily replaceable with minimal impact.
- **Dependency Injection**: Use dependency injection to facilitate unit testing and ensure loose coupling between components.

## Commands and Queries

- **Separate Commands from Queries**: Commands modify state, while queries retrieve information without causing side effects. This distinction ensures that actions modifying the system are clearly separated from those retrieving data, leading to better maintainability and clarity.

### Example

- **Command**: `addUser(userDetails)` – Adds a user to the system.
- **Query**: `getUserById(userId)` – Retrieves user information.

## Naming Conventions

- **Variables**: Use `camelCase` for variable names (e.g., `userName`, `totalPrice`).
- **Classes**: Use `PascalCase` for class names (e.g., `UserProfile`, `ShoppingCart`).
- **Constants**: Use `UPPER_CASE` for constants (e.g., `MAX_USERS`, `DEFAULT_TIMEOUT`).
- **Files**: Use `kebab-case` for filenames (e.g., `user-profile.ts`).
- **Functions**: Function names should be descriptive and use `camelCase` (e.g., `calculateTotal`). Avoid abbreviations for clarity.
- **Interfaces and Types**: Use `PascalCase` for interfaces and type definitions (e.g., `UserProfile`, `OrderDetails`).

## Code Formatting

- **Indentation**: Use 2 spaces per indentation level to keep code clean and readable.
- **Line Length**: Limit lines to 80 characters for better readability, especially on split-screen setups.
- **Quotes**: Use single quotes for strings, except in JSON, which requires double quotes (e.g., `'hello'` vs. `"{ "key": "value" }"`).
- **Semicolons**: Always use semicolons to terminate statements, ensuring clarity and avoiding ambiguity.
- **Named Function Declarations**: Use named functions, especially for exported functions, rather than top-level arrow functions.
- **Trailing Commas**: Use trailing commas in multiline objects and arrays to simplify diffs.
- **Explicit Return Types**: Always define return types for functions, particularly in public APIs, to ensure type safety and clarity.
- **No Type Assertions**: Never use `as` to force types. Type assertions using `as` are strictly forbidden, especially as a shortcut to bypass type issues. Always use proper type definitions to maintain type safety and code robustness.
- **No ****`import *`**** or ****`export *`**: Always explicitly name imports and exports to prevent namespace pollution and make dependencies clearer.

## Code Organization

- **Group Similar Files**: Organize files logically in the same folder based on their functionality.
- **Single Responsibility Per File**: Ensure each file is responsible for a single, well-defined task.
- **Logical Modules**: Structure the project into clear, cohesive modules with minimal dependencies.

## TypeScript Best Practices

- **Prefer ****`const`**: Use `const` for variables that do not need reassignment.
- **Avoid ****`any`**: Never use `any` as it undermines type safety and increases the risk of runtime errors. Always use specific, explicit types.
- **Interfaces Over Type Assertions**: Always prefer interfaces or explicit type definitions instead of using `as` for type assertions. The use of `as` is discouraged because it often hides underlying issues rather than solving them.
- **Dependency Injection**: Use dependency injection to simplify testing and promote decoupling.
- **Node Imports**: Use the `node:` prefix when importing Node.js core modules to clearly distinguish them from user-defined modules.
- **Strict Mode**: Enable strict mode in `tsconfig.json` (`"strict": true`) to enforce stronger type checking.
- **Named Exports**: Use named exports for predictability and ease of refactoring.
- **Export Types with IsolatedModules**: When re-exporting types with 'isolatedModules' enabled, always use the 'export type' keyword:

  ```typescript
  // Correct
  export type { MyType } from './types';

  // Incorrect
  export { MyType } from './types';
  ```

- **Index File Exports**: Ensure all index.ts files explicitly use the 'type' keyword when re-exporting types, following the Barrel-Only Index Paradigm.

## Error Handling

- **Structured Error Handling**: Use `try/catch` blocks to manage exceptions gracefully, providing helpful messages.
- **Custom Error Classes**: Create custom error classes for more descriptive and organized error handling.
- **Avoid Silent Failures**: Always handle errors explicitly to prevent unexpected behavior.
- **Control Error Propagation**: Ensure errors are properly managed and do not propagate unchecked through the application.

## Writing Quality Code

- **Immutability**: Avoid mutating objects or arrays. Instead, create new instances to maintain predictable state management.
- **Break Large Functions**: Decompose large functions into smaller, single-purpose functions to improve readability and testing.
- **Command Query Separation (CQS)**: Maintain a clear separation between methods that modify state and those that return data.
- **Functional Programming**: Use functional techniques like `map`, `filter`, and `reduce` for clean, declarative data manipulation.
- **Declarative Code**: Focus on what the code should accomplish rather than detailing how to achieve it.
- **Input Validation**: Always validate function inputs to avoid unexpected errors.
  - **Example**: Use `isValidUser(user)` to verify user input.
  - **Guard Clause**: Use `if (!input) throw new Error('Invalid input');` to ensure inputs are valid.
- **Asynchronous Code**: Use `async/await` for handling asynchronous operations, avoiding callback hell.
- **Isolate Business Logic**: Keep core business logic separate from external systems and infrastructure.

## Tools and Configurations

- **PACKAGE MANAGEMENT RULES**:
  - Inside monorepo-one: Use ONLY Rush commands (rush add -m -p, rush update)
  - Outside monorepo-one: Use ONLY pnpm/pnpx commands (pnpm add, pnpx)
  - NEVER use npm, yarn, or npx anywhere
  - NEVER use pnpm directly inside monorepo-one when exists a rush stack command for the same purpose.

- **Rush CLI Commands**:
  - **`rush update`**: Install and link dependencies.
  - **`rush build`**: Compile all projects in the correct order.
  - **`rush rebuild`**: Clean build of all projects.
  - **`rush add -m -p <package-name>`**: Add a production dependency.
  - **`rush remove -p <package-name>`**: Remove a dependency.
  - **`rush install`**: Install dependencies without modifying the lockfile.
  - **`rush link`**: Create symlinks for easy local development.
  - **`rush publish`**: Publish packages, manage versions, and handle changelogs.
  - **`rush change`**: Generate changelog entries.
  - **`rush purge`**: Clean temporary files.

### Managing Dependencies with Rush and PNPM

- **Monorepos**: Use Rush (`rush add -m -p <package>`) to manage dependencies.
- **Single Projects**: Use PNPM:
  - **Production**: `pnpm add <package-name>`
  - **Development**: `pnpm add -D <package-name>`
  - **Update**: `pnpm update <package-name>`
  - **Remove**: `pnpm remove <package-name>`
- **Note**: Don’t use PNPM in `monorepo-one`; use Rush instead.

## Optional Tooling and Integration

This project allows for the optional integration of various development tools to enhance code quality and streamline the development process. While not mandatory, these tools can significantly improve code consistency and maintainability when used appropriately.

[Prettier](https://prettier.io/) is an opinionated code formatter that can be used to enforce consistent styling across the codebase. [ESLint](https://eslint.org/) provides static code analysis to identify problematic patterns in JavaScript and TypeScript code. Both can be configured at the project or monorepo level.

[Rush](https://rushjs.io/) is a scalable monorepo manager that can be used to handle large repositories with multiple projects. [Heft](https://rushstack.io/pages/heft/overview/) is a pluggable build system designed to work seamlessly with Rush, providing a unified build process for different project types. [PNPM](https://pnpm.io/) is a fast, disk space efficient package manager that can be used outside of the monorepo context.

When integrating these tools, use Rush commands within the monorepo and PNPM commands for projects outside the monorepo, adhering to the established package management rules. This flexible approach allows for tailored tooling configurations while maintaining overall project consistency.

## Additional Optional Tooling

You may optionally integrate tools like [Prettier](https://prettier.io/docs/en/next/) or [ESLint](https://eslint.org/docs/latest/rules/) for code formatting and linting, ensuring code consistency. When working with Rush ([https://rushjs.io/pages/intro/get_started/](https://rushjs.io/pages/intro/get_started/)) or [Heft](https://heft.rushstack.io/), you can configure these tools at the project or monorepo level, using either `pnpm` or corresponding Rush commands where appropriate.

While none of these integrations are mandatory, applying them consistently helps maintain high-quality code. Use PNPM commands outside monorepo-one or Rush commands within monorepo-one as needed, observing the established packaging rules for smooth development and collaboration.

### Prettier Code Formatter

[Prettier](https://prettier.io/docs/en/next/) is an opinionated code formatter that enforces consistent code style across your entire codebase. It automatically formats your code according to predefined rules, eliminating debates about styling in code reviews. When integrated with Rush or Heft, Prettier ensures that all projects within your monorepo maintain consistent formatting standards.

Key features include automatic code formatting, support for multiple languages, and seamless integration with most IDEs and build tools. Configure Prettier at either the project level or monorepo level to maintain uniform code appearance across your codebase.

### ESLint Static Analysis

[ESLint](https://eslint.org/docs/latest/rules/) is a static code analysis tool that helps identify problematic patterns in your JavaScript and TypeScript code. It goes beyond simple formatting to enforce coding standards and catch potential errors before they cause problems in production.

ESLint can be configured with custom rule sets and integrates well with modern development workflows. In a monorepo context, you can share ESLint configurations across projects while allowing for project-specific overrides when needed.

### Rush Monorepo Manager

[Rush](https://rushjs.io/pages/intro/get_started/) is a scalable monorepo manager that handles large repositories with multiple projects. It provides advanced features for managing dependencies, building projects, and maintaining consistency across your codebase.

Use Rush commands exclusively within monorepo-one for tasks like dependency management, builds, and publishing. This ensures consistent package management and helps maintain the integrity of your monorepo structure.

### Heft Build System

[Heft](https://heft.rushstack.io/) is a configurable build system designed to work seamlessly with Rush. It provides a unified build process that can be customized for different project types while maintaining consistency across your monorepo.

Heft integrates well with TypeScript, Jest, ESLint, and other popular tools, making it an excellent choice for managing complex build requirements in a monorepo environment. Configure Heft at the project level while keeping common configurations at the monorepo level for maximum efficiency.

## Testing the Code

- **Unit Tests**: Write tests for each function.
- **Integration Tests**: Test how different parts work together.
- **High Test Coverage**: Keep coverage above 90%.
- **Mocking**: Use mocks to fake parts of the code during testing.

## Writing Documentation

- **TypeDoc for TypeScript**: Use [TypeDoc](https://typedoc.org/guides/overview/) to make documentation.
- **TSDoc for Inline Notes**: Use [TSDoc](https://tsdoc.org/) to add comments in the code. Include things like `@param`, `@returns`, and `@example`.
- **General Documentation Tips**:
  - **Python**: Use docstrings to explain.
  - **JavaScript**: Use JSDoc.
  - **Java**: Use Javadoc.
- **Best Practices**: Give examples and make sure to explain *why* something is done.

## Comments Documentation and Annotations

Remember that the code we are producing will be read by other ai agents and developers. It is important to provide clear and concise comments to help others understand the codebase. Here are some guidelines to follow:

- **Use Comments Wisely**: Place shebangs, encoding, and other metadata at the top of the file.
- **Add Context**: Always include the filename and path in a comment for more context.
- **Use TSDoc**: Follow the TSDoc standard for writing comments in TypeScript.
- **Use TypeDoc**: Keep the codebase well-documented using TypeDoc.
- **Use Annotations**: Add annotations like `// TODO`, `// FIXME`, and `// UNIMPLEMENTED` to mark tasks.

### **Use TSDoc**: Follow TSDoc standard for writing comments in TypeScript

TSDoc is a standard for documenting TypeScript code that provides a structured way to write comments in the codebase. It helps developers understand the code better and generates documentation automatically.

#### Key Features

1. Comment Format

   ```typescript
   /**
    * Description of the function
    * @param userName - The user's name
    * @returns True if operation succeeds
    */
   function createUser(userName: string): boolean {
     // Implementation
   }
   ```

2. Core Tags
   - `@param` - Documents parameters
   - `@returns` - Documents return value
   - `@throws` - Documents exceptions
   - `@example` - Provides usage examples
   - `@remarks` - Additional details
   - `@see` - References other documentation

3. Type System Tags
   - `@template` - Generic type parameters
   - `@typedef` - Custom type definitions
   - `@type` - Type annotations
   - `@property` - Object properties

4. Access Control
   - `@public` - Public visibility
   - `@private` - Private visibility
   - `@protected` - Protected visibility
   - `@internal` - Internal use only

5. Key Benefits
   - TypeScript-aware documentation
   - IDE integration with IntelliSense
   - Automatic documentation generation
   - Type information preservation
   - Markdown support

### **Use TypeDoc**: Keep the codebase well-documented using TypeDoc

TypeDoc is a documentation generator for TypeScript projects that converts comments in the source code into rendered HTML documentation or other formats. It provides a way to document code using comments that are easy to read and understand.

- Key Benefits
  - Automatic documentation generation
  - Type information extraction
  - Markdown support
  - Multiple output formats
  - Integration with build tools
  - Source code linking
  - API documentation
  - Search functionality

For TypeDoc, there are three main types of documentation tags:

1. Block Tags

   ```typescript
   /**
    * @module MyModule Main application module
    * @description This module handles core functionality
    * @version 1.0.0
    * @since 2.0.0
    * @deprecated Use NewModule instead
    * @beta This is a beta feature
    * @internal For internal use only
    */
   ```

2. Inline Tags

   ```typescript
   /**
    * Processes user data
    * {@link User} The user interface
    * {@label UPDATE_USER} Operation label
    * {@inheritDoc BaseClass} Inherit docs
    */
   function processUser(user: User): void {
     // Implementation
   }
   ```

3. Modifier Tags

   ```typescript
   /**
    * @public Available to all
    * @private Internal use only
    * @protected Available to inheriting classes
    * @readonly Cannot be modified
    * @sealed Cannot be inherited
    */
   ```

#### Key Tag Categories

1. Visibility and Access
   - `@public` - Publicly accessible
   - `@private` - Private to containing class/module
   - `@protected` - Available to inheriting classes
   - `@internal` - For internal use only
   - `@readonly` - Read-only property/value

2. Status and Lifecycle
   - `@beta` - Beta feature
   - `@alpha` - Alpha/experimental feature
   - `@deprecated` - Marked for deprecation
   - `@experimental` - Experimental feature
   - `@stable` - Stable API
   - `@sealed` - Cannot be inherited

3. Type System
   - `@type` - Type definition
   - `@interface` - Interface definition
   - `@class` - Class definition
   - `@enum` - Enumeration
   - `@typedef` - Custom type definition
   - `@template` - Generic type parameter

4. Documentation
   - `@example` - Usage examples
   - `@see` - Reference to other documentation
   - `@link` - Link to other symbols
   - `@inheritDoc` - Inherit documentation
   - `@remarks` - Additional details
   - `@summary` - Brief description
   - `@since` - Version introduced
   - `@version` - Current version

5. Parameters and Returns
   - `@param` - Parameter description
   - `@returns` - Return value description
   - `@throws` - Possible exceptions
   - `@async` - Asynchronous method
   - `@generator` - Generator function
   - `@yields` - Generator yield value

6. Module Organization
   - `@module` - Module definition
   - `@namespace` - Namespace definition
   - `@package` - Package information
   - `@default` - Default value
   - `@hidden` - Hide from documentation
   - `@ignore` - Ignore in documentation

#### Maintenance

- `// TODO:` – Things to finish later.
- `// FIXME:` – Things that need fixing.
- `// UNIMPLEMENTED:` – Parts that aren’t built yet.

#### Reporting Issues

- `// BUG:` – Known problems in the code.
- `// ERROR:` – Big issues needing a fix.
- `// WARNING:` – Risky code to be careful with.

#### Guidance

- `// SECTION:` – Splits the code into sections.
- `// LOG:` – Notes for debugging.
- `// INFO:` – Extra details.
- `// REVIEW NEEDED:` – Needs someone to check.
- `// SIDE EFFECTS:` – Explains side effects.
- `// HINT:` – Gives tips for better code.

## Remember to Include Specified Instructions

- **Always Remember**: AI agents must always remember to include in the files the things they are asked to remember.

- **Do Not Forget Instructions**: AI agents should not forget any instructions that are included unless there is a specific request and confirmation to change anything that would result in removing some instructions.

- **Explicit Inclusion**: Explicitly direct AI agents to always modify files to include the things that must be remembered.

- **Follow TypeScript Rules**: AI agents must never forget to always follow our strict rules in TypeScript when writing exports (re-exporting) such as: "Re-exporting a type when 'isolatedModules' is enabled requires using 'export type'." Ensure that all index files include the keyword `type` where necessary.

## TypeScript Rules

- **Always Remember Instructions**: AI agents must actively include in the files any specified instructions they are asked to remember. They should never remove anything unless specifically requested and confirmed.

- **Modify `.github/copilot-instructions.md` When Needed**: AI agents with the capability should update the `.github/copilot-instructions.md` file to include new instructions or reminders. If an AI agent lacks this capability, they should explain the necessary changes to those who can modify the file.

- **Explicit Inclusion in Code**: AI agents should ensure that important instructions are explicitly included in the code, especially in TypeScript files. Use comments or appropriate annotations to make these instructions clear.

- **Follow TypeScript Export Rules**: Always adhere to strict TypeScript rules when writing exports. For example, "Re-exporting a type when 'isolatedModules' is enabled requires using 'export type'." Ensure all `index.ts` files include the keyword `type` where necessary.

## Instructions for AI Agents

### Remembering and Updating Instructions

- **Instruction Management**: AI agents must maintain a record of all instructions they are asked to remember and incorporate them into their responses.

- **File Modification Protocol**:
  - AI agents with file modification capabilities should update `.github/copilot-instructions.md` to include new instructions
  - AI agents without this capability must explain the necessary changes to those who can modify the file
  - Document the filepath and specific sections that need updating

- **Instruction Preservation**:
  - Never remove existing instructions without explicit request and confirmation
  - When adding new instructions, preserve all existing content
  - Place new instructions in their most relevant sections

- **Documentation Updates**:
  - Include clear explanations of why changes are needed
  - Reference the original request that prompted the update
  - Maintain consistent formatting and style

## CI Workflow Guidelines

- Ensure all CI workflows use Rush commands for dependency management and builds.
  - Use `rush update` for installing dependencies.
  - Use `rush build` for compiling projects.
  - Use `rush test` for running tests.
- **Node.js Version Requirement**: All workflows and development environments must use Node.js v22 or greater.

## Linux Environment

All development and operations are assumed to be running on Fedora Linux. Package management is handled through `dnf` (which is aliased to `dnf5`). When providing system-level commands or configurations:

- Always use `dnf` for package management (it will use dnf5 via alias)
- Ensure compatibility with Fedora's filesystem hierarchy
- Follow Fedora's security and SELinux policies
- Use Fedora's standard locations for configuration files
- Consider systemd for service management

## Why Use This Guide?

This guide makes sure that GitHub Copilot writes code that is easy to read and fix. It makes sure the code is consistent and high quality, so there’s less work to do later.

## Conclusion

By following these rules, GitHub Copilot will create code that is easier to understand and maintain. Keeping things simple and using good practices will help make the code strong and reliable for everyone.
