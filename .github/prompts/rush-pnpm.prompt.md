<!-- .github/prompts/rush-pnpm.prompt.md -->

# Rush and PNPM Guidelines

## Package Management Rules

- Inside monorepo: **Use `rush add -m -p <package>`** for adding dependencies.
- Outside monorepo: Use **PNPM (`pnpm add <package>`)**.
- NEVER use `npm`, `yarn`, or `npx`.

## Rush Commands

- **Install dependencies:** `rush update`
- **Build all packages:** `rush build`
- **Add a package:** `rush add -m -p <package>`
- **Remove a package:** `rush remove -p <package>`
- **Publish packages:** `rush publish`

## PNPM Best Practices

- Use `pnpm add -D <package>` for dev dependencies.
- Use `pnpm update <package>` to sync dependencies.
