# Tooling and Configuration Guide for GitHub Copilot

## Introduction

This guide provides a comprehensive framework for the effective use of GitHub Copilot, with an emphasis on the essential tools, configurations, and best practices needed to streamline project workflows. It specifically addresses managing dependencies, implementing testing strategies, maintaining documentation, and utilizing code annotations. By adhering to these guidelines, generated code will integrate seamlessly into development workflows, minimize errors, enhance team productivity, and align with best practices for configuration and project maintenance.

### Objective

The primary objective of this guide is to empower developers to effectively use GitHub Copilot alongside key tools such as Rush and PNPM, ensuring that generated code conforms to established project standards. Proper configuration and documentation will mitigate technical debt, facilitate team collaboration, and expedite the onboarding process.

## Tools and Configuration

### Rush CLI Commands

Rush is our preferred tool for managing dependencies in monorepo projects. Below is a list of essential Rush commands, accompanied by scenarios for their appropriate use to help developers unfamiliar with Rush:

- **`rush update`**: Installs and links dependencies. This command should be used after adding new dependencies or when syncing changes after pulling from the repository.
- **`rush build`**: Compiles all projects in the correct dependency order. Use this command before testing to ensure everything is compiled successfully.
- **`rush rebuild`**: Forces a clean build of all projects. Use this command if incremental builds fail or when debugging suspected dependency issues.
- **`rush add -m -p <package-name>`**: Adds a production dependency. Use this command when adding essential libraries for core project functionality.
- **`rush remove -p <package-name>`**: Removes a dependency that is no longer required.
- **`rush install`**: Installs dependencies without updating the lockfile. Use this command in CI environments to ensure consistency while maintaining the integrity of the lockfile.
- **`rush link`**: Creates symlinks for local development, enabling faster iteration and debugging between projects within the monorepo.
- **`rush publish`**: Publishes packages, handles versioning, and generates changelogs. Use this command when preparing a package for release.
- **`rush change`**: Generates changelog entries to track modifications. Use this to document changes for future releases.
- **`rush purge`**: Cleans up temporary files and dependencies, which can be helpful when resetting the environment for troubleshooting or preparing for a fresh build.

### Rush and PNPM for Dependency Management

Effective dependency management is critical for maintaining project consistency. Rush is the preferred solution for monorepos, ensuring consistent dependency management and versioning, while PNPM is used for non-monorepo projects due to its simplicity and efficiency. Follow these guidelines to efficiently manage dependencies:

- **Monorepos**: Use Rush (`rush add -m -p <package>`) for managing dependencies within monorepos to maintain consistent versioning and prevent dependency conflicts.
- **Non-Monorepo Projects**: Use PNPM for managing dependencies outside of monorepos:
  - **Production**: Use `pnpm add <package-name>` to add dependencies required in production environments.
  - **Development**: Use `pnpm add -D <package-name>` to add development-only dependencies.
  - **Updating**: Use `pnpm update <package-name>` to update an existing dependency.
  - **Removing**: Use `pnpm remove <package-name>` to remove an unnecessary dependency.
- **Note**: PNPM must not be used in `monorepo-one`; instead, rely exclusively on Rush for consistency.

## Testing Guidelines

Effective testing is fundamental to maintaining software quality and preventing regressions. Follow these guidelines to ensure comprehensive test coverage:

- **Unit Tests**: Write unit tests for all functions to verify their behavior in isolation. Ensure each component functions as intended by testing individual units without side effects.
- **Integration Tests**: Validate how different modules interact to ensure system cohesion and correctness. This ensures that combined components produce the expected outcomes.
- **High Test Coverage**: Maintain a test coverage of at least 90%. Comprehensive coverage enhances reliability and provides early detection of potential issues, thereby improving system integrity.
- **Mocking Dependencies**: Use mocking techniques to simulate dependencies during unit testing. This practice ensures tests remain isolated and avoids unintended external side effects, leading to more stable tests.

## Documentation Standards

Comprehensive documentation is essential for maintainability and effective onboarding. Follow these standards to ensure consistency:

- **TypeDoc for TypeScript**: Use [TypeDoc](https://typedoc.org/guides/overview/) to generate consistent documentation for TypeScript projects. All exported members, including functions, classes, and modules, must be documented.
- **TSDoc for TypeScript**: Use [TSDoc](https://tsdoc.org/) to create inline documentation. Include tags such as `@param`, `@returns`, and `@example` to provide clear explanations and usage details.
- **General Documentation Guidance**:
  - **Python**: Use structured docstrings, following formats such as reStructuredText or Google style.
  - **JavaScript**: Employ JSDoc for consistent inline documentation of JavaScript code.
  - **Java**: Use Javadoc to document classes, methods, and fields thoroughly.
- **Documentation Best Practices**: Always provide context and examples, especially for complex or non-obvious code. Effective documentation should explain both *why* a piece of code exists and *how* it should be used. For instance, when documenting a function that validates user input, include a description of the validation logic, the rationale behind it, and example usage.

## Commenting and Annotations

Consistent annotations and comments are critical for enhancing code readability and maintaining continuity across contributors. Clear comments also assist in onboarding new developers and ensuring code is understandable by AI tools like GitHub Copilot.

- **Use TSDoc for Comments**: Adhere to [TSDoc](https://tsdoc.org/) standards to create clear, consistent inline comments.
- **Include Filename and Path**: Include the filename and relative path as comments at the top of code blocks when adding examples, providing context for easier navigation and comprehension.

### Tags for Comments

#### Maintenance Tags

- **`// TODO:`** Indicates tasks that need to be completed in the future.
- **`// FIXME:`** Flags sections of code that require improvements or bug fixes.
- **`// UNIMPLEMENTED:`** Notes placeholders for unimplemented features or functionality.

#### Issue Reporting Tags

- **`// BUG:`** Identifies known issues in the code that require resolution.
- **`// ERROR:`** Highlights critical issues that demand immediate attention.
- **`// WARNING:`** Draws attention to potentially risky code or potential pitfalls.

#### Guidance Tags

- **`// SECTION:`** Divides code into logical sections to improve readability.
- **`// LOG:`** Adds debugging or monitoring points for future reference.
- **`// INFO:`** Provides additional context to help understand complex parts of the code.
- **`// REVIEW NEEDED:`** Indicates areas that need peer review or verification.
- **`// SIDE EFFECTS:`** Describes side effects, particularly those impacting global state or other modules.
- **`// HINT:`** Offers suggestions or optimizations to improve code performance or readability.

## Purpose of This Guide

The purpose of this guide is to provide actionable, detailed instructions that enable GitHub Copilot to generate high-quality code through the correct use of tooling and configurations. By following these standards, Copilot can help produce code that integrates seamlessly into existing workflows, reduces the need for rework, and promotes software development best practices.

## Conclusion

By adhering to these guidelines, developers can maximize GitHub Copilot's potential, producing code that is maintainable, consistent, and well-documented. Proper tooling, thorough documentation, and effective use of annotations are vital for ensuring the long-term scalability, reliability, and health of our projects.
