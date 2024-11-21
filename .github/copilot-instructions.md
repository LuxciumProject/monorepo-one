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

## Comments and Annotations

- **Use TSDoc**: Follow TSDoc for writing clear comments.
- **Add Context**: Include the filename and path in comments for more context.

### Types of Comments

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

## Why Use This Guide?

This guide makes sure that GitHub Copilot writes code that is easy to read and fix. It makes sure the code is consistent and high quality, so there’s less work to do later.

## Conclusion

By following these rules, GitHub Copilot will create code that is easier to understand and maintain. Keeping things simple and using good practices will help make the code strong and reliable for everyone.
