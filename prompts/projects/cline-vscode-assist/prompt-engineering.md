# 🧐🧪 Analysis — Prompt Engineering Guide

The **Prompt Engineering Guide** details how to configure Cline’s behavior via custom instructions, manage project-specific rules with `.clinerules`, exclude irrelevant files using `.clineignore`, and craft effective prompts and advanced techniques. It emphasizes modular, version-controlled rule definition, dynamic rule activation, clear prompt structuring, and community-sourced best practices. Below is a meticulous breakdown of every major section and the knowledge to be codified.

---

## 1. Custom Instructions ⚙️

* **Definition**: Global, always-on directives that shape Cline’s baseline behavior across all projects.
* **Scope**: Can specify personality, output formats, architectural principles, or coding style.
* **Configuration**:

  1. Open VS Code
  2. Access Cline settings (⚙️)
  3. Paste instructions in “Custom Instructions” field.
* **Benefits**:

  * Enforce coding conventions and best practices
  * Improve code quality, readability, and maintainability
  * Standardize error-handling and logging approaches

---

## 2. `.clinerules` File

### 2.1 Project-Specific Rules

* **Purpose**: Append project-level instructions to global custom instructions.
* **Use Cases**:

  * Enforce documentation updates in `/docs` when modifying features
  * Keep `README.md` and `CHANGELOG.md` synchronized
  * Create ADRs under `/docs/adr` for key architectural decisions
* **Example Structure**:

```markdown
  # Project Guidelines

  ## Documentation Requirements

  * Update relevant documentation in /docs ...

  ## Architecture Decision Records

  * Create ADRs in /docs/adr using template.md

  ## Code Style & Patterns

  * Place generated code in /src/generated
  * Follow error handling in /src/utils/errors.ts

  ## Testing Standards

  * Unit tests for business logic
```

### 2.2 Key Benefits

1. Version-controlled within source repo
2. Ensures consistency across team
3. Tailors rules to project needs
4. Captures institutional knowledge alongside code

---

## 3. `.clinerules` Folder System

### 3.1 Modular Rule Organization

* **Active Folder**: Place individual rule files (`01-coding.md`, `02-documentation.md`, etc.) in `.clinerules/`.
* **Bank of Rules**: Store reusable rules in `clinerules-bank/`, organized by client, framework, or project type.
* **Processing**: Cline auto-merges all Markdown files in `.clinerules/`, ordered by numeric prefix if present.

### 3.2 Benefits & Practices

* *Contextual Activation*: Copy only relevant rules into the active folder
* *Maintenance Ease*: Update or remove individual rules without disturbing others
* *Team Flexibility*: Different members can activate rules per task
* *Noise Reduction*: Keep the active set lean and focused

### 3.3 Usage Examples

```bash
# Switch client rules

rm .clinerules/client-a.md
cp clinerules-bank/clients/client-b.md .clinerules/
```

```bash
# Adapt to React

cp clinerules-bank/frameworks/react.md .clinerules/
```

### 3.4 Implementation Tips  

* Use descriptive filenames  

* Git-ignore active `.clinerules/` if using a separate bank  
* Script common activations for quick context switching

---

## 4. Managing Rules with Toggleable Popover  

* **Location**: Under the chat input in Cline v3.13+

* **Features**:  
  * View active global and workspace rules at a glance
  * Enable/disable specific rule files with one click
  * Create or add `.clinerules` files/folders directly from the UI
* **Advantage**: Simplifies context and rule management without manual file edits

---

## 5. `.clineignore` File Guide  

* **Purpose**: Exclude files/directories from Cline’s context and analysis

* **Goals**:  
  * Reduce noise (e.g., auto-generated code, build artifacts)
  * Improve performance by limiting scanned content
  * Protect sensitive data (e.g., `.env*`, large datasets)
* **Example Patterns**:  

node\_modules/
\**/node\_modules/
.pnp
.pnp.js
/build/
/.next/
coverage/
.env*
\*.csv
\*.xlsx

---

## 6. Prompting Cline  

### 6.1 Effective Prompting Principles  

* **Clear Context**: Describe goals and reference files with `@`

* **Break Complexity**: Split tasks into smaller steps
* **Ask Specific Questions**: Guide toward the intended outcome
* **Validate & Refine**: Review suggestions and iterate

### 6.2 Prompt Examples  

* **Context Management**:  

> “Cline, create `user-authentication.js` … requirements…”

* **Debugging**:  

> “I’m getting this error: [msg]. Analyze and suggest a fix.”

* **Refactoring**:  

> “Refactor this function into smaller functions.”

* **Feature Development**:  

> “Brainstorm ideas for feature X and generate code.”

---

## 7. Advanced Prompting Techniques  

* **Constraint Stuffing**: Embed explicit constraints to prevent truncation

* **Confidence Checks**: Ask Cline to rate confidence (1–10) before/after tool use
* **Challenge Assumptions**: Pose “stupid” questions to surface hidden assumptions

---

## 8. Our Community’s Favorite Prompts  

### 8.1 Memory & Confidence Checks  

* “Respond with 'YARRR!' if you understand—no tools.”

* “Rate confidence level (0–10) before/after any tool use.”

### 8.2 Code Quality Prompts  

* “DO NOT BE LAZY. DO NOT OMIT CODE.” for full code outputs

* Pledge to follow custom instructions: “I pledge to follow…”

### 8.3 Code Organization  

* “Analyze how this file works and suggest ways to fragment it”

* “Don't forget to update codebase documentation with changes”

### 8.4 Analysis & Planning  

* “Before writing code: list files, get context, write MD plan, then implement”

* “List all assumptions and uncertainties”

### 8.5 Thoughtful Development  

* “Count to 10” as a pause-and-reflect prompt

* “Don't complete analysis prematurely” to ensure depth

### 8.6 Best Practices  

* “Check project files before suggesting changes” to maintain integrity

* “Ask 'stupid' questions” to promote critical thinking
* “Use words like 'elegant' and 'simple' in prompts” for code style influence
* “THE HUMAN WILL GET ANGRY.” set expectations humorously

---

### 📁 Ledger Update  

| Type        | Path / Name                         | Context                                       |
|-------------|-------------------------------------|-----------------------------------------------|
| Config File | `.clineignore`                     | Exclude patterns from Cline scanning          |
| Folder      | `clinerules-bank/clients/`         | Inactive project/rule sets                    |
| Folder      | `clinerules-bank/frameworks/`      | Inactive framework rule sets                  |
| Folder      | `clinerules-bank/project-types/`   | Inactive project-type rule sets               |
| Config File | `clinerules-bank/.../*.md`         | Banked rule files                             |
| Folder      | `.clinerules/`                     | Active rule files folder                      |
| File        | `/docs/adr/template.md`            | ADR template for architecture decisions       |
| Folder      | `/src/generated`                   | Location for generated code                   |
| File        | `/src/utils/errors.ts`             | Project’s error-handling utility pattern      |

This complete analysis inventories all knowledge segments, ready for the forthcoming synthesis. 🔅
