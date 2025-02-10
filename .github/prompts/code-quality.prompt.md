<!-- .github/prompts/code-quality.prompt.md -->

# Code Quality Standards

## Guidelines

Follow these best practices to ensure high-quality, maintainable, and efficient code:

### **Code Formatting**

- Use **2-space indentation** for all code.
- Limit **line length to 80 characters** for readability.
- Always use **semicolons** (`;`) in JavaScript/TypeScript.
- Prefer **single quotes (`'`)** except in JSON, which requires double quotes.
- Enable **strict mode (`"strict": true`)** in TypeScript configurations.
- **No `import *` or `export *`**—always use explicit imports.

### **Modular Design**

- Each file should **serve a single purpose** (Single Responsibility Principle).
- Use **named exports** (`export {}`) instead of default exports.
- Keep components and functions **small and reusable**.
- Follow a **barrel-only index policy**—`index.ts` files should **only re-export** modules.

### **TypeScript Best Practices**

- Prefer `const` over `let` whenever possible.
- Never use `any`; always use **explicit types**.
- Use `node:` prefix for core Node.js imports (e.g., `import fs from 'node:fs'`).
- Define explicit **return types** for functions.
- Use **TypeDoc** for documentation (`@param`, `@returns`, etc.).

### **Error Handling**

- Wrap critical operations in `try/catch` blocks.
- Define **custom error classes** to handle specific cases.
- Never expose raw error messages to users—sanitize and log them securely.
