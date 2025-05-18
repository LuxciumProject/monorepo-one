# 🧐🧪 Analysis — Prompt Engineering Guide

The **Prompt Engineering Guide** details how to configure Cline’s behavior via custom instructions, manage project-specific rules with `.clinerules`, exclude irrelevant files using `.clineignore`, and craft effective prompts and advanced techniques. It emphasizes modular, version-controlled rule definition, dynamic rule activation, clear prompt structuring, and community-sourced best practices. Below is a meticulous breakdown of every major section and the knowledge to be codified.

---

## 1. Custom Instructions ⚙️

* **Definition**: Global, always-on directives that shape Cline’s baseline behavior across all projects ([Cline][1]).
* **Scope**: Can specify personality, output formats, architectural principles, or coding style ([Cline][1]).
* **Configuration**:

  1. Open VS Code
  2. Access Cline settings (⚙️)
  3. Paste instructions in “Custom Instructions” field ([Cline][1]).
* **Benefits**:

  * Enforce coding conventions and best practices ([Cline][1])
  * Improve code quality, readability, and maintainability ([Cline][1])
  * Standardize error-handling and logging approaches ([Cline][1])

---

## 2. `.clinerules` File

### 2.1 Project-Specific Rules

* **Purpose**: Append project-level instructions to global custom instructions ([Cline][1]).
* **Use Cases**:

  * Enforce documentation updates in `/docs` when modifying features ([Cline][1])
  * Keep `README.md` and `CHANGELOG.md` synchronized ([Cline][1])
  * Create ADRs under `/docs/adr` for key architectural decisions ([Cline][1])
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

1. Version-controlled within source repo ([Cline][1])
2. Ensures consistency across team ([Cline][1])
3. Tailors rules to project needs ([Cline][1])
4. Captures institutional knowledge alongside code ([Cline][1])

---

## 3. `.clinerules` Folder System

### 3.1 Modular Rule Organization

* **Active Folder**: Place individual rule files (`01-coding.md`, `02-documentation.md`, etc.) in `.clinerules/` ([Cline][1]).
* **Bank of Rules**: Store reusable rules in `clinerules-bank/`, organized by client, framework, or project type ([Cline][1]).
* **Processing**: Cline auto-merges all Markdown files in `.clinerules/`, ordered by numeric prefix if present ([Cline][1]).

### 3.2 Benefits & Practices

* *Contextual Activation*: Copy only relevant rules into the active folder ([Cline][1])
* *Maintenance Ease*: Update or remove individual rules without disturbing others ([Cline][1])
* *Team Flexibility*: Different members can activate rules per task ([Cline][1])
* *Noise Reduction*: Keep the active set lean and focused ([Cline][1])

### 3.3 Usage Examples

#### Switch client rules

rm .clinerules/client-a.md
cp clinerules-bank/clients/client-b.md .clinerules/

#### Adapt to React

cp clinerules-bank/frameworks/react.md .clinerules/

### 3.4 Implementation Tips  

* Use descriptive filenames  

* Git-ignore active `.clinerules/` if using a separate bank  
* Script common activations for quick context switching :contentReference[oaicite:23]{index=23}

---

## 4. Managing Rules with Toggleable Popover  

* **Location**: Under the chat input in Cline v3.13+ :contentReference[oaicite:24]{index=24}  

* **Features**:  
  * View active global and workspace rules at a glance :contentReference[oaicite:25]{index=25}  
  * Enable/disable specific rule files with one click :contentReference[oaicite:26]{index=26}  
  * Create or add `.clinerules` files/folders directly from the UI :contentReference[oaicite:27]{index=27}  
* **Advantage**: Simplifies context and rule management without manual file edits :contentReference[oaicite:28]{index=28}

---

## 5. `.clineignore` File Guide  

* **Purpose**: Exclude files/directories from Cline’s context and analysis :contentReference[oaicite:29]{index=29}  

* **Goals**:  
  * Reduce noise (e.g., auto-generated code, build artifacts) :contentReference[oaicite:30]{index=30}  
  * Improve performance by limiting scanned content :contentReference[oaicite:31]{index=31}  
  * Protect sensitive data (e.g., `.env*`, large datasets) :contentReference[oaicite:32]{index=32}  
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

* **Clear Context**: Describe goals and reference files with `@` :contentReference[oaicite:34]{index=34}  

* **Break Complexity**: Split tasks into smaller steps :contentReference[oaicite:35]{index=35}  
* **Ask Specific Questions**: Guide toward the intended outcome :contentReference[oaicite:36]{index=36}  
* **Validate & Refine**: Review suggestions and iterate :contentReference[oaicite:37]{index=37}  

### 6.2 Prompt Examples  

* **Context Management**:  

> “Cline, create `user-authentication.js` … requirements…” :contentReference[oaicite:38]{index=38}  

* **Debugging**:  

> “I’m getting this error: [msg]. Analyze and suggest a fix.” :contentReference[oaicite:39]{index=39}  

* **Refactoring**:  

> “Refactor this function into smaller functions.” :contentReference[oaicite:40]{index=40}  

* **Feature Development**:  

> “Brainstorm ideas for feature X and generate code.” :contentReference[oaicite:41]{index=41}

---

## 7. Advanced Prompting Techniques  

* **Constraint Stuffing**: Embed explicit constraints to prevent truncation :contentReference[oaicite:42]{index=42}  

* **Confidence Checks**: Ask Cline to rate confidence (1–10) before/after tool use :contentReference[oaicite:43]{index=43}  
* **Challenge Assumptions**: Pose “stupid” questions to surface hidden assumptions :contentReference[oaicite:44]{index=44}  

---

## 8. Our Community’s Favorite Prompts  

### 8.1 Memory & Confidence Checks  

* “Respond with 'YARRR!' if you understand—no tools.” :contentReference[oaicite:45]{index=45}  

* “Rate confidence level (0–10) before/after any tool use.” :contentReference[oaicite:46]{index=46}  

### 8.2 Code Quality Prompts  

* “DO NOT BE LAZY. DO NOT OMIT CODE.” for full code outputs :contentReference[oaicite:47]{index=47}  

* Pledge to follow custom instructions: “I pledge to follow…” :contentReference[oaicite:48]{index=48}  

### 8.3 Code Organization  

* “Analyze how this file works and suggest ways to fragment it” :contentReference[oaicite:49]{index=49}  

* “Don't forget to update codebase documentation with changes” :contentReference[oaicite:50]{index=50}  

### 8.4 Analysis & Planning  

* “Before writing code: list files, get context, write MD plan, then implement” :contentReference[oaicite:51]{index=51}  

* “List all assumptions and uncertainties” :contentReference[oaicite:52]{index=52}  

### 8.5 Thoughtful Development  

* “Count to 10” as a pause-and-reflect prompt :contentReference[oaicite:53]{index=53}  

* “Don't complete analysis prematurely” to ensure depth :contentReference[oaicite:54]{index=54}  

### 8.6 Best Practices  

* “Check project files before suggesting changes” to maintain integrity :contentReference[oaicite:55]{index=55}  

* “Ask 'stupid' questions” to promote critical thinking :contentReference[oaicite:56]{index=56}  
* “Use words like 'elegant' and 'simple' in prompts” for code style influence :contentReference[oaicite:57]{index=57}  
* “THE HUMAN WILL GET ANGRY.” set expectations humorously :contentReference[oaicite:58]{index=58}  

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
::contentReference[oaicite:59]{index=59}

[1]: https://docs.cline.bot/prompting/prompt-engineering-guide "Prompt Engineering Guide - Cline"
