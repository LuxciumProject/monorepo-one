# Assistance with Copilot's Custom Instructions in VS Code

Here’s an explicit, structured **recap** of all the ways I _(The AI Agent, your
assistant)_ can help you _(the developer, my user)_ with Copilot’s custom
instructions in VS Code, along with an explanation of each point, what I might
have missed, and a complete summary—organized for learning and reference.

---

## **Enumeration: What I Can Help With**

1. **Explain what custom instructions and prompt files are.**
2. **Show how to define custom instructions for different tasks/scenarios.**
3. **Guide you to use instruction files in Markdown.**
4. **Help create `.github/copilot-instructions.md` for global rules.**
5. **Help create one or more `.instructions.md` files for specific scopes/tasks.**
6. **Explain the role of the `applyTo` property in instruction file headers.**
7. **Demonstrate how to reference other instruction files within a file.**
8. **Show how to use the VS Code Command Palette to create instruction files.**
9. **Explain how to manage workspace and user-level instructions.**
10. **Explain how to configure Copilot to use instruction files in `settings.json`.**
11. **Show how to define scenario-specific instructions in `settings.json` (codegen, test, review, commit, PR).**
12. **Demonstrate referencing instruction files from VS Code settings.**
13. **Create instruction file templates (examples for TypeScript, React, general coding, etc.).**
14. **Explain best practices for writing effective instructions.**
15. **Demonstrate version control and sharing strategies for instruction files.**
16. **Show how to attach instructions to chat or prompt files for specific tasks.**
17. **Clarify that instruction files affect code generation, not inline completions.**
18. **Explain cross-editor support (VS Code, Visual Studio, GitHub.com).**
19. **Break down instruction files into manageable, modular units for your workflow.**

---

## **Details for Each Point and My Assistance Strategy**

### 1. Explain what custom instructions and prompt files are

* **Strategy:** Give plain-language definitions and contrasts; provide use cases.

### 2. Show how to define custom instructions for different tasks/scenarios

* **Strategy:** Enumerate each scenario and give example instructions.

### 3. Guide you to use instruction files in Markdown

* **Strategy:** Show required structure and Markdown tips.

### 4. Help create `.github/copilot-instructions.md` for global rules

* **Strategy:** Always include this file, and scaffold its basic structure.

### 5. Help create `.instructions.md` files for specific scopes/tasks

* **Strategy:** Create modular instruction files (e.g., per language, per folder).

### 6. Explain the role of the `applyTo` property in instruction file headers

* **Strategy:** Show how to use Front Matter for targeting (with examples).

### 7. Demonstrate how to reference other instruction files within a file

* **Strategy:** Provide examples with Markdown links for DRY principles.

### 8. Show how to use the VS Code Command Palette to create instruction files

* **Strategy:** Guide you through `Chat: New Instruction File` workflow.

### 9. Explain how to manage workspace and user-level instructions

* **Strategy:** Contrast `.github/instructions/` (workspace) vs. profile (user).

### 10. Explain how to configure Copilot to use instruction files in `settings.json`

* **Strategy:** Give exact settings JSON and where to put it.

### 11. Show how to define scenario-specific instructions in `settings.json`

* **Strategy:** Examples for all keys (codegen, test, review, commit, PR).

### 12. Demonstrate referencing instruction files from VS Code settings

* **Strategy:** Show both text and file references in settings.

### 13. Create instruction file templates

* **Strategy:** Generate templates by language/framework/role on demand.

### 14. Explain best practices for writing effective instructions

* **Strategy:** Summarize all VS Code docs tips; reinforce clarity and modularity.

### 15. Demonstrate version control and sharing strategies for instruction files

* **Strategy:** Suggest storage, naming, and versioning practices.

### 16. Show how to attach instructions to chat or prompt files for specific tasks

* **Strategy:** Demonstrate both Quick Pick and Command Palette methods.

### 17. Clarify that instruction files affect code generation, not inline completions

* **Strategy:** Always distinguish these roles when discussing Copilot config.

### 18. Explain cross-editor support

* **Strategy:** Point out that `.github/copilot-instructions.md` works in VS Code, Visual Studio, and GitHub.com.

### 19. Break down instruction files into manageable, modular units

* **Strategy:** Propose file breakdowns and chunked instructions for better scaling, learning, and DRY.

---

## **What Else Might Be Missing?**

* **Real-world example files for your specific stack (Node.js, TypeScript, functional programming, etc.).**
* **A workflow checklist for initializing a project with all best practices (instructions, settings, sync).**
* **A troubleshooting guide for when instructions are not picked up by Copilot.**
* **Guidance on collaborative workflows (merging instruction files, resolving conflicts, etc.).**

---

## 🧑🏻‍🏫📋 **Complete Section Summary & Synthesis**

* I can guide you through every step of customizing Copilot’s chat and codegen responses in VS Code using instruction files and prompt files.
* I will generate, review, and organize `.github/copilot-instructions.md` and `.instructions.md` files for any scope or scenario you specify—ensuring clear, modular, and DRY content.
* I will show you how to enable, manage, and share these files, and version control them for team use.
* I will help you set the required VS Code settings for all types of custom instructions and keep you aware of their scope and behavior.
* My outputs and guidance will always follow the official VS Code documentation and best practices, breaking down every step for learning, copying, and reusing as needed.
* If you have a specific stack or workflow, I will tailor my examples and templates to your preferences.
* For every clause or scenario in the docs, I’ll propose a concrete implementation and assistance strategy, so you’re never left guessing.
* If something is missing, I’ll adapt and fill the gap with real-world, ready-to-use solutions.

---

If you want to dive into **one** of the sub-clauses or start with an actual file template, just name the scenario or file and I’ll deliver a practical output in the next turn!
