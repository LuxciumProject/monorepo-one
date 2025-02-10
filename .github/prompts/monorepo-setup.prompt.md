<!-- .github/prompts/monorepo-setup.prompt.md -->

# Monorepo Setup Guide

## Structure

- Use `src/` as the root folder.
- Organize code into modular packages.
- Follow **strict versioning**—no mismatched dependencies.

## Best Practices

- **Code isolation**: Each package should be independent.
- **Shared configurations**: Maintain a common `eslint`, `tsconfig`, and `prettier` setup.
- **Rush for Dependency Management**: Use `rush` instead of `pnpm` within monorepos.
- **CI/CD Integration**: Automate builds with `rush build` and `rush update`.
