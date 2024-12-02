# Special Instructions for Cline

Here is a revised and **precise set of instructions** for **Cline** that avoids ambiguity, provides clear context, and aligns with all your stated preferences and requirements.

## Table of Contents

- [Special Instructions for Cline](#special-instructions-for-cline)
  - [Table of Contents](#table-of-contents)
  - [Cline Instructions](#cline-instructions)
    - [**General Guidelines**](#general-guidelines)
      - [**Package Management**](#package-management)
      - [**Project Initialization**](#project-initialization)
      - [**Code Conventions**](#code-conventions)
      - [**Task Execution**](#task-execution)
      - [**Modularity and Scalability**](#modularity-and-scalability)
      - [**Error Handling**](#error-handling)
    - [**Maintenance Guidelines for cline.md**](#maintenance-guidelines-for-clinemd)
      - [Purpose of the File](#purpose-of-the-file)
      - [Maintenance Principles](#maintenance-principles)
    - [Summary of Approach](#summary-of-approach)

## Cline Instructions

Keep all the instructions for your operation well organized inside the root `cline.md` file. If any changes are required, please read the instructions carefully and include them in your tasks. Make small changes as you are instructed to modify your behavior, ensuring a well-organized set of instructions.

### **General Guidelines**

- **Context-Specific Outputs**: Ensure all outputs and actions respect the context of the current programming language or framework. Do not apply irrelevant or generalized directives (e.g., avoid enforcing JavaScript/TypeScript conventions in other languages like Python or Bash).
- **Conciseness and Clarity**: Use precise, direct language to avoid ambiguity. Follow the exact guidelines without assuming any flexibility unless explicitly stated.

---

#### **Package Management**

- Always use **pnpm** for all Node.js and TypeScript-related projects.
- Do not manually write version numbers in `package.json`. All dependency versions must be resolved and managed by the **pnpm lock file**.
- For all dependency installations, use the **command line** to execute `pnpm` commands instead of manually editing configuration files.

---

#### **Project Initialization**

- Initialize Node.js and TypeScript projects with `pnpm init` and configure TypeScript using `pnpm add -D typescript`.
- For other languages or frameworks, use their respective tools and conventions (e.g., `pip` for Python, `composer` for PHP) and ensure configuration aligns with best practices.

---

#### **Code Conventions**

1. **JavaScript/TypeScript**:

   - Use **strict mode** in TypeScript configurations:
     - Enable `"strict"`, `"noImplicitAny"`, `"noImplicitThis"`, and `"alwaysStrict"`.
   - Avoid using default exports in JavaScript or TypeScript. Instead, always use named exports for consistency and clarity.
   - Use PascalCase for class names and type definitions, camelCase for functions and variables.

2. **Python**:

   - Follow PEP 8 conventions for formatting and naming.
   - Use explicit and descriptive function names.
   - For imports, prefer explicit and absolute paths unless otherwise required.

3. **Shell Scripting**:
   - Use POSIX-compliant syntax for maximum compatibility.
   - Always include comments explaining each step, especially for commands that have non-obvious effects.
   - Avoid hardcoding paths unless explicitly required by the task.

---

#### **Task Execution**

- Prioritize using **command line tools** for tasks like project initialization, dependency installation, and running scripts where applicable.
- Avoid overwriting or modifying existing files unless explicitly instructed to do so.

---

#### **Modularity and Scalability**

- Always structure projects with modularity in mind:

  - Separate interfaces, utilities, services, and main application logic into distinct files or folders.
  - Use meaningful directory names that reflect their content (e.g., `src`, `tests`, `utils`).

- Ensure scalability by following these principles:
  - Use dependency injection patterns where applicable.
  - Avoid mixing business logic with infrastructure-related concerns (e.g., file I/O, database queries).
  - Use clear boundaries between different layers of the project.

---

#### **Error Handling**

- Always validate inputs in public APIs or external-facing code.
- Use guards or type assertions to ensure input correctness in TypeScript.
- Implement error handling mechanisms to prevent unhandled exceptions or propagation of unvalidated data.

---

### **Maintenance Guidelines for cline.md**

#### Purpose of the File

- This document serves as the primary instruction set and memory repository for the AI agent.
- It contains critical information guiding behavior, storing preferences, and defining operational parameters.

#### Maintenance Principles

1. **Regular Review**
   - Periodically scan the document for accuracy and relevance
   - Update information to reflect current best practices and capabilities

2. **Update Methodology**
   - Make incremental, careful updates
   - Preserve existing information
   - Ensure changes align with core purpose and ethical guidelines

3. **Organizational Standards**
   - Maintain clear, hierarchical structure
   - Use markdown formatting consistently
   - Include table of contents for easy navigation

4. **Autonomous Decision Making**
   - Assess potential impact of changes
   - Consider long-term consequences
   - Only implement modifications with clear benefits

5. **Documentation Integrity**
   - Include explanatory comments for complex instructions
   - Provide context and examples
   - Maintain a change log

---

### Summary of Approach

This block of instructions contextualizes directives based on the current language or framework. Cline will execute tasks in adherence to these principles while considering the specific requirements of the programming environment.

**Note**: The integrity and accuracy of this document are paramount. Any modifications must be approached with extreme caution and precision.
