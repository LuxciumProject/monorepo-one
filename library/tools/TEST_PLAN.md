# Test Suite Creation Plan for `/library/tools` and Subfolders

## Purpose

This document provides a stateful, detailed plan for systematically creating and
maintaining test suites for all files in `/projects/monorepo-one/library/tools`
and its subfolders. It serves as a reference and checklist for the team.

---

## 1. Test File Placement & Naming

- **Place each test file directly alongside the file it tests.**
- **Use the `.test.ts` suffix** (e.g., `foo.ts` → `foo.test.ts`).
- Do **not** place new tests in a central `test/` folder.
- Only test `index.ts` files if they contain logic (should not, per best practices).

---

## 2. Inventory & Topic Definition

- For each file, define its main topic or responsibility (e.g., "Path utilities",
  "Browser event handling").
- Maintain a table of files and their topics for reference (see below).

---

## 3. Test File Creation Procedure

1. For each `.ts` file (excluding type-only and barrel files):

  - Create a corresponding `.test.ts` file in the same directory.

2. For each export (function, class, constant):

  - Write a `describe` block for the symbol.
  - Add `it` blocks for normal usage, edge cases, error handling, and integration (if relevant).

3. Use TSDoc comments for complex test logic.

4. At the top of each test file, add a comment stating which file and topic it covers.

5. Review and refactor for clarity, isolation, and adherence to best practices.

---

## 4. Example Table: File Topics

| Folder           | File Name                  | Topic/Responsibility               |
|------------------|---------------------------|------------------------------------|
| assertion-tools  | isA_CurrentPath.ts         | Path type checking                 |
| browser          | UniqueBrowser.ts           | Unique browser instance management |
| core             | index.ts                   | Barrel file (no logic)             |
| crawlForImages   | crawlForImagesTools.ts     | Image crawling utilities           |
| file-system      | folderPathGenerator.ts     | Folder path generation             |
| helpers          | dissectPath.ts             | Path dissection utilities          |
| json-parsing     | jason-tool.ts              | JSON parsing helpers               |
| local-path       | getLocalPath.mts           | Local path resolution              |
| parser           | main.ts                    | Parsing logic                      |
| placeholders     | createCustomPlaceholder.ts | Placeholder creation               |
| python-proxy     | index.ts                   | Python proxy interface             |
| range            | range.ts                   | Range utilities                    |
| scan-dirs        | ScanDirs.ts                | Directory scanning                 |
| scripts          | analyze-prompts.ts         | Prompt analysis scripts            |
| types            | index.ts                   | Type definitions (no tests needed) |
| typing-lessons   | index.ts                   | Typing lesson utilities            |

---

## 5. Summary of Steps

1. **Inventory**: List all files and define their topics.
2. **Create `.test.ts` Files**: Place them alongside each source file.
3. **Write Tests**: Cover all exports, edge cases, and error handling.
4. **Document**: Add file/topic comments in each test.
5. **Review**: Ensure clarity, isolation, and adherence to best practices.

---

## 6. Notes

- This plan is to be updated as the project evolves.
- All contributors should reference this document before adding or modifying tests.
- For any questions or deviations, update this file with rationale and context.

---

Last updated: 2025-07-20
