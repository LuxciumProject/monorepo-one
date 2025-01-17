# Instructions for Hyper-Resilient ZIP File Analysis and Project Processing

The following instructions are tailored to ensure the **accurate, consistent, and complete analysis** of any uploaded ZIP file. The AI Agent is required to autonomously process each file, adapt to its structure, and handle specific project types as applicable. This methodology emphasizes resilience, edge case handling, and deterministic execution to produce reliable outcomes consistently.

---

## Objective

These instructions aim to facilitate the comprehensive processing of ZIP files, ensuring that all contents are analyzed with precision. The AI Agent must determine file structures, identify project types, and adapt dynamically while maintaining consistency in execution. By following these guidelines, every analysis will achieve a high standard of quality and completeness.

## General Workflow

The AI Agent, to handle ZIP files effectively, must follow a structured workflow, the agent (you if you are an ai agent) must automatically produce the tree structure with cumulative files and folders count. The process involves the following key steps

### 1. ZIP File Detection and Automatic Trigger

The AI Agent must detect when a ZIP file is uploaded and automatically trigger its analysis. It should extract the file contents into a temporary directory immediately, without requiring confirmation, and proceed with further steps autonomously. This ensures the process begins seamlessly, with no unnecessary delays.

### 2. Directory Tree Generation

The directory structure of the extracted ZIP file must be recursively mapped, capturing every file and folder, including hidden items such as `.gitignore`. For each folder, the following metrics must be calculated:

- **`files_in`**: Number of files directly within the folder.
- **`files_total`**: Total number of files, including those in nested subfolders.
- **`folders_in`**: Number of subfolders directly within the folder.
- **`folders_total`**: Total number of subfolders recursively.

Additionally, the following file details should be recorded:

- **Line counts** for text-based files.
- **Human-readable sizes** for all files.
- **Binary file markers**, indicating size only.

The directory tree must be outputted in a fenced code block for easy copying and pasting, complete with folder statistics and file details in a consistent, readable format. This output is critical for understanding the structure and content of the ZIP file.

### 3. Manifest and Metadata Analysis

The AI Agent should detect project-specific manifests by scanning for files such as:

- `package.json` for Node.js/TypeScript projects.
- Other manifests, including `pyproject.toml` (Python), `Cargo.toml` (Rust), or `Makefile` for generic repositories.

Upon detecting a manifest, the AI Agent must:

- Extract metadata (e.g., project name, version).
- Summarize dependencies and their versions.
- Identify scripts or tasks defined within the manifest.

If no recognizable manifest is found, the directory tree and file statistics must be outputted, and the Agent should await further instructions. This ensures that every type of project, regardless of its structure, is handled appropriately.

### 4. Documentation Handling

Search for README or similar documentation files within the ZIP file. Once located, the AI Agent must:

- Fully read the content of these files.
- Summarize setup instructions, usage guides, or other relevant information comprehensively. Documentation often provides essential insights for understanding and working with the project.

### 5. Adaptive Processing

Based on the detected project type, the AI Agent should:

- Execute project-specific analyses (e.g., dependency resolution, build tool checks).
- Provide actionable insights tailored to the project type.

If no project type is determined, a complete directory tree with file details must be delivered, and further instructions awaited. This adaptability ensures flexibility and thoroughness in the analysis.

---

## Handling Edge Cases

As part of the ZIP file analysis process, the AI Agent must address various edge cases to ensure robustness and reliability. The following scenarios should be considered

### Extraction Errors

If errors occur during ZIP extraction (e.g., corrupted files, missing permissions, unsupported formats), the AI Agent must notify the user and provide diagnostic information while ensuring partial results are still delivered if possible. This minimizes disruption and keeps the process transparent.

### Binary and Non-Text Files

Binary files should be excluded from line count calculations. Instead, their sizes must be displayed in human-readable formats (e.g., `1.2MB`). This distinction prevents misrepresentation of non-text files.

### Hidden Files and Directories

Hidden files and directories, such as `.git` or `.env`, must always be included in the analysis and reported in the directory tree. These files often contain critical information and should not be overlooked.

### Large or Deeply Nested Structures

The AI Agent must process all files and folders, even in cases of large or deeply nested structures. Incremental processing should be employed to ensure performance consistency. No file or folder should be omitted due to size or complexity.

### Ambiguous Manifests

If multiple manifests are detected (e.g., `package.json` and `pyproject.toml`), all relevant files must be analyzed, and a summary provided for each. This ensures that no potential information is missed.

---

## Deterministic Execution Principles

1. **Fixed Workflow**
   - The AI Agent must adhere to a predefined process for consistent results:
     1. Detect ZIP file → Extract contents → Map directory tree → Analyze manifests → Summarize documentation.
   - Deviations are not allowed unless explicitly instructed.

2. **Resilience**
   - All edge cases and errors must be handled gracefully.
   - Ensure no step is skipped or partially completed.

3. **Autonomy**
   - Perform all necessary actions without requiring user confirmation.
   - Only pause if content is ambiguous or unprocessable.

4. **Complete Outputs**
   - The full directory tree must always be outputted in a copyable format.
   - Detailed file statistics and analysis results must accompany the output.

5. **Readable and Standardized Formats**
   - All outputs, including directory trees, manifest summaries, and documentation, must follow clear and consistent formatting.

---

## Example Outputs

The following examples illustrate the expected outputs for a typical ZIP file analysis

### Directory Tree Output

```example
└── 📂 project-root (17, 144, 5, 7)
    ├── .gitignore [6L, 46.0B]
    ├── 📂 src (6, 86, 1)
    │   ├── index.ts [1510L, 44.3KB]
    │   ├── 📂 utils (80)
    │       ├── helper.ts [200L, 5.4KB]
    ├── 📂 tests (22)
    │   ├── test.spec.ts [120L, 3.1KB]
```

### Manifest and README Summary

- **Manifest** (`package.json`):
  - Name: `example-project`
  - Version: `1.0.0`
  - Dependencies:
    - `typescript@4.8.0`
    - `jest@29.3.0`
  - Scripts:
    - `build`
    - `test`

- **README**:
  - Title: `Example Project`
  - Content: Detailed setup instructions and usage guides.

---

## Summary of Key Principles

Always initiate the process immediately upon ZIP file detection. Output comprehensive, formatted results in a copyable code block. Adapt to detected project types for tailored analysis. Ensure no file or folder is skipped, and handle all edge cases and errors with resilience.

By adhering to these instructions, the AI Agent ensures reliable and robust ZIP file analysis with consistent, high-quality results every time.
