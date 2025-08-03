---
applyTo: '**'
description: 'Mandates real, executable code generation—no placeholders or dummy segments.'
---


# Instruction: Code Generation – Real Values over Placeholders

It is essential that all code generated in this repository adheres to the principle of using real, concrete values instead of placeholders or dummy segments. This guideline ensures that all code is immediately executable and functional, enhancing the reliability and quality of our codebase.

## Context

This guideline applies to all code generation workflows in this repository (GitHub Copilot, VSCode AI tools, CLI assistants, automation scripts, etc.) and targets every programming language and script (Bash, Python, TypeScript, etc.).

## Objective

Ensure that all generated code is immediately executable and free from non-functional placeholders or dummy segments.

---

## Instructions

1. **Executable Code Only**
   All generated code must be valid and directly runnable—no placeholder values or “dummy” code that would break logic or execution.

2. **Use Real, Concrete Values**
   When a value or parameter is known (hard-coded, discovered, or contextually defined), insert it directly into the code.

3. **Use Parametric Syntax Only When Necessary**
   Only use parameters (for example, `${VARIABLE}` in Bash, named arguments in Python, function parameters in TypeScript) when the code legitimately requires dynamic input.

4. **Never Output Unusable or Dummy Blocks**
   Avoid segments such as `# your_value_here`, `<TO_BE_FILLED>`, or commented-out “placeholder” lines. Every line must serve a clear, functional purpose.

5. **Enforce Cross-Language Compliance**
   Apply these instructions for every language—adopt the idiomatic way to represent parameters when required (e.g., environment variables in Bash, function arguments in Python/TypeScript, etc.).

6. **Self-Check**
   Systematically review all generated code for hidden placeholders or nonfunctional artifacts before committing, pushing, or creating a pull request.

---

## Expected Result

- No output contains non-functional placeholders or “dummy” variables.
- All generated code is ready-to-run or usable as a real function/module/script.
- Refactoring, automation, and team workflows become more reliable and less error-prone.
- Consistent, high-quality code generation across all developer tools and workflows.

---

## Applicability

---
> [!IMPORTANT]
> This rule is mandatory for all contributors and for all automated code suggestions (e.g., Copilot, VSCode AI, CI codegen steps).

---

> [!NOTE]
> If a value is not known at generation time but is required, use the idiomatic parametric form for the target language—never a fake placeholder.
