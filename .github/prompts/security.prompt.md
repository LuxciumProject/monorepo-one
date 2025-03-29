<!-- .github/prompts/security.prompt.md -->

# Security Best Practices

## Input Validation

- Always **sanitize user inputs** to prevent SQL injection and XSS attacks.
- Use **strong type validation** in TypeScript.

## Authentication & Authorization

- Always require authentication before sensitive actions.
- Implement **role-based access control (RBAC)**.

## Secure Dependencies

- Regularly run **`pnpm audit`** or equivalent.
- Always update dependencies to patch security vulnerabilities.

## Data Protection

- Encrypt sensitive data **in transit and at rest**.
- Never store credentials in the codebase—use `.env` files instead.
