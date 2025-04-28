# Development Process Guidelines

---

## Code Style & Structure

- Deprecate and forbid TypeScript enums; use union types or constant objects  
- Always insert a comment at the top of each source file indicating its path  
- Use single quotes for JavaScript/TypeScript, double quotes for JSX; enforce semicolons  
- Forbid `export * from` syntax; require explicit, named imports and exports  
- Favor pure functions and small, composable units; apply MIPAD, IDPAC and HMBBD architectural patterns  
- Indent shell scripts (Zsh) with 2 spaces; quote variable expansions; validate inputs in functions  

---

## Documentation & Markdown Formatting

- Inline code for short snippets; fenced code blocks for anything multi-line or copyable  
- Always use `~~~` as the outermost fence; reserve ``` for nested blocks only  
- Employ headers (H1–H6) only when structurally justified; avoid gratuitous or consecutive headings  
- Restrict to single-level lists; never nest lists  
- Use descriptive link text; never show raw URLs  
- Use tables only for structured data comparisons, not for layout  
- Separate major sections with horizontal rules (`---`)  
- Include images with meaningful alt text  
- Strikethrough deprecated content; use _italics_ for secondary emphasis and **bold** sparingly  
- Summaries should end with two contrasting pairs of key points  

---

## Project Configuration & Tooling

- **Next.js ≥ 15**  
  ```bash
  pnpx create-next-app@latest my-next-app \
    --ts --tailwind --eslint --app --src-dir \
    --import-alias "@/*" --turbopack \
    --use-pnpm --disable-git --yes
  ```  
- **Dev Container**  
  - Base image on Node.js 20 or 22  
  - Use `npm` as the package manager  
  - Provide a one-click template for rapid VS Code launch  
- **GitHub Copilot (VSCE)**  
  - `.github/copilot-instructions.md` for global guidance  
  - `.github/prompts/*.prompt.md` for reusable, tech-agnostic prompts  
  - `.clinerules/` for local structuring principles  
  - Centralize extension settings in workspace `settings.json`  
- **Codex CLI**  
  - Default to `model=gpt-4.1-mini`, `provider=openai`, `auto-edit=disabled`, `fullAutoErrorMode=ask-user`, `project-doc=codex.md`  
  - On file-write failures, output full content in a fenced block for manual save  

---

## TypeScript & Schema Generation

- Place all interfaces under `src/types/`, one file per logical group, with a barrel `index.ts`  
- Define base interfaces for each Questrade API endpoint; extend for requests vs responses  
- Auto-generate missing interface files, grouped by module (auth, markets, symbols, etc.)  
- Create strict Zod schemas (v4+) and export JSON via `toJSONSchema()`  
- Never use `export *`; require explicit named exports/imports  
- Apply the `@/*` import alias consistently  

---

## Testing & Validation

- Lint shell scripts with `zsh -n` before execution  
- Validate Zod schemas against sample data  
- Use built-in VS Code linters and formatters configured in workspace settings  

---

## Encoding & Localization

- Default to UTF-8 encoding for all documents, code, and exports  
- Use `en-CA`/`fr-CA` conventions for dates and numbers  
- Display food energy as “Calories” (big C); body weight in pounds; other measures in metric  