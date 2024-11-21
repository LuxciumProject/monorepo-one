# Code Style Guide for GitHub Copilot

## Introduction

This guide helps GitHub Copilot create code that is easy to read, use, and keep neat. By following these rules, the code will be simple, work well, and be easy to fix or change later. This makes sure everyone understands the code and that it works well for a long time.

### Why This Guide?

The goal of this guide is to ensure that generated code is both human-readable and machine-optimized. It helps everyone work together, making coding easier and making sure it follows good rules.

## Basic Rules

- **Keep It Simple**: Code should be easy to read. Don’t make it too tricky. Simple code is easier to fix and test.
- **Be Consistent**: Always follow the same rules everywhere in your code so that it's easy for others to understand.
- **Separate Different Jobs**: Keep logic, data, and input/output in separate components to enforce single responsibility and simplify maintenance.
- **Strict Types**: Use TypeScript’s strict typing to catch mistakes and make sure the code works well.
- **Make Small Parts**: Each piece of the code should do just one thing. This makes it easier to test and fix.
- **Separate Infrastructure**: Keep the main code and tools (like databases) separate so it's easier to update without breaking things.

## Dividing the Code

- **Use Interfaces**: Use interfaces or abstract classes to set clear boundaries between different parts of the code.
- **Stay Modular**: Keep logic, data, and I/O separate. This helps to prevent problems.
- **Interchangeable Parts**: Design parts of the code (like repositories) to be easy to switch out if needed.
- **Dependency Injection**: Use patterns like dependency injection to make testing easier.

## Commands and Queries

- **Commands and Queries Are Different**: Commands change things, like adding a user. Queries just ask for information without changing anything. This separation ensures that state-changing actions are clearly distinguished from data retrieval, improving system clarity and maintainability.

### Example

- **Command**: `addUser(userDetails)` – adds a user.
- **Query**: `getUserById(userId)` – gets user information.

## Naming Things

- **Variables**: Use `camelCase` for variable names, like `userName` or `totalPrice`.
- **Classes**: Use `PascalCase` for class names, like `UserProfile` or `ShoppingCart`.
- **Constants**: Use `UPPER_CASE` for constants, like `MAX_USERS` or `DEFAULT_TIMEOUT`.
- **Files**: Use `kebab-case` for file names, like `user-profile.ts`.
- **Functions**: Use clear names for functions, like `calculateTotal`. Don’t use shortcuts.
- **Interfaces and Types**: Use `PascalCase` for interfaces and types, like `UserProfile` or `OrderDetails`.

## How to Format Code

- **Indentation**: Use 2 spaces for each level of indentation.
- **Line Length**: Keep lines to 80 characters or less.
- **Quotes**: Use single quotes for strings unless it’s JSON, which needs double quotes. For example, use `'hello'` for regular strings and `"{ \"key\": \"value\" }"` for JSON objects.
- **Semicolons**: Always use semicolons to end a line.
- **Function Names**: Use named functions, especially for things at the top level.
- **Trailing Commas**: Put a comma at the end of items in lists or objects to make adding new items easier.
- **Return Types**: Always say what type a function returns.
- **No Type Assertions**: Never use `as` to force types. Using `as` is strictly forbidden, especially as a quick fix for type issues. Always use proper type definitions instead to ensure type safety and code robustness.
- **No `import *` or `export *`**: Name imports and exports clearly to avoid confusion.

## How to Organize Code

- **Group Similar Files**: Put related files in the same folder.
- **Single Job Per File**: Each file should do just one job.
- **Use Logical Modules**: Split the project into modules that have few dependencies.

## TypeScript Rules

- **Use `const`**: Use `const` for variables that don’t need to change.
- **Avoid `any`**: Never use `any`. Be specific with types. Using `any` undermines type safety, increasing the risk of runtime errors.
- **Interfaces Over Type Assertions**: Always prefer interfaces or explicit type definitions instead of using `as` for type assertions. The use of `as` undermines type safety and often serves as an improper workaround rather than a real solution.
- **Dependency Injection**: Use dependency injection to make testing easier.
- **Node Imports**: Use `node:` for importing Node.js modules.
- **Strict Mode**: Always enable strict mode in `tsconfig.json`.
- **Named Exports**: Use named exports for clarity.

## Handling Errors

- **Use `try/catch`**: Catch errors and show useful messages.
- **Custom Error Classes**: Make specific error classes to organize errors.
- **No Silent Failures**: Always handle errors so they aren’t missed.
- **Control Error Spread**: Make sure errors don’t go unchecked and spread through the program.

## Writing Good Code

- **Avoid Changing Data**: Don’t change objects or arrays. Make a new one instead.
- **Break Big Functions**: If a function is big, break it into smaller parts.
- **Keep Commands and Queries Separate**: Don’t mix changing things with just asking for information.
- **Use Functional Programming**: Use tools like `map`, `filter`, and `reduce` to handle data.
- **Write What, Not How**: Make code that says *what* it does, not *how*.
- **Check Inputs**: Always check inputs with guards.
  - **Example**: Use `isValidUser(user)` to make sure the user is valid.
  - **Guard Clause**: Use `if (!input) throw new Error('Invalid input');` to check.
- **Async Code**: Use `async/await` to handle long tasks.
- **Keep Logic Separate**: Keep the main logic separate from infrastructure.

## Tools and Configurations

- **Rush CLI Commands**:
  - **`rush update`**: Install and link dependencies.
  - **`rush build`**: Compile projects in the right order.
  - **`rush rebuild`**: Clean build of all projects.
  - **`rush add -m -p <package-name>`**: Add a production dependency.
  - **`rush remove -p <package-name>`**: Remove a dependency.
  - **`rush install`**: Install without changing the lockfile.
  - **`rush link`**: Create links for easy local development.
  - **`rush publish`**: Publish packages and handle changes.
  - **`rush change`**: Make changelog entries.
  - **`rush purge`**: Clean up temporary files.

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
