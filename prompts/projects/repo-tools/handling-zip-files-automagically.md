# Comprehensive Guide for ZIP File Analysis and Repository Processing

This document outlines the mandatory steps for analyzing ZIP files containing project repositories. The AI agent must execute these tasks autonomously, without requiring confirmation, to ensure precision, adaptability, and consistency across all analyses.

---

## Purpose

To enable robust and systematic analysis of ZIP files, ensuring all contents are mapped, categorized, and summarized effectively. These steps facilitate complete understanding of the structure, dependencies, and purpose of uploaded repositories.

---

## Workflow Overview

The workflow consists of well-defined steps that guarantee thorough and consistent processing of ZIP files. Each step is designed to adapt to the repository structure while ensuring all key details are captured.

### 1. Automatic Detection and Extraction

Automatic detection and extraction ensure the process begins seamlessly without manual intervention. The AI agent identifies ZIP files and starts processing them instantly.

- **Trigger**: Automatically detect uploaded ZIP files.
- **Action**: Extract the contents into a temporary directory without confirmation or delay.
- **Error Handling**: Notify the user of any extraction issues (e.g., corruption, invalid format) while proceeding with accessible files.

### 2. Directory Tree Generation

Directory tree generation is a critical step where the AI agent maps the entire structure of the extracted files and folders, capturing metrics and details for further analysis. This step ensures a comprehensive view of the repository's organization.

The AI agent must:

- Recursively scan the directory.

- Record metrics for each folder:
  - **File Count**: Number of files directly in the folder.
  - **Total Files**: Cumulative count including nested files.
  - **Folder Count**: Number of immediate subfolders.
  - **Total Folders**: Cumulative subfolder count, recursively.

- Include all files and calculate:
  - **Line Count**: For readable files.
  - **Size**: In human-readable format (e.g., `1.2KB`).
  - **Binary Files**: Indicate size only.

#### Output Example

The following example demonstrates the format of the directory tree output, showcasing folder and file metrics. This example illustrates how information about files and folders is displayed clearly and concisely.

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

**Rules**:

- Skip folders with zero files or lines.
- Display single counts when totals match subtotals.

### 3. Manifest and Metadata Analysis

Manifest and metadata analysis involves identifying key project files and extracting their contents to provide actionable insights. This step helps uncover essential details about the repository's configuration and dependencies.

- **Detect**:
  - `package.json`, `pyproject.toml`, `Cargo.toml`, or equivalent manifests.
- **Extract**:
  - Project name, version, dependencies, and scripts/tasks.
- **Summarize**:
  - Provide a concise overview of manifest content.

### 4. Documentation Review

Documentation files often contain critical information about a project. The AI agent must locate and summarize these files effectively to ensure users can quickly understand the repository's purpose and usage.

- **Locate**:
  - README or equivalent files.
- **Summarize**:
  - Setup instructions, usage guides, and other relevant documentation.

### 5. Adaptive Project Analysis

Based on the detected type of repository, the AI agent should tailor its analysis to provide meaningful insights. This adaptability ensures the analysis remains relevant to the specific needs of each project.

- Perform project-specific evaluations (e.g., dependency resolution).
- Provide tailored insights for identified platforms or frameworks.

---

## Handling Edge Cases

Handling edge cases ensures the analysis process is robust and capable of adapting to unexpected scenarios. Below are some key considerations:

### Corrupted ZIP Files

When encountering corrupted ZIP files, the AI agent should proceed with accessible content and report any issues clearly. This ensures partial results are still provided to the user.

- Proceed with accessible content.
- Report any missing or corrupted files.

### Binary and Non-Text Files

Binary files should be handled differently from text files to avoid misrepresentation of their contents. The AI agent should report sizes only for these files.

- Exclude from line count calculations.
- Report sizes only, in human-readable units.

### Hidden Files

Hidden files, such as `.gitignore` or `.env`, often contain essential information. These files must always be included in the analysis.

- Include hidden files (e.g., `.gitignore`, `.env`) in the analysis.

### Large or Nested Structures

Deeply nested structures or large directories can be challenging to process. The AI agent must ensure that all content is processed, regardless of size or complexity.

- Process all content, irrespective of size or depth.
- Avoid truncating results due to structure complexity.

### Multiple Manifests

If multiple manifests exist within a repository, the AI agent should analyze each independently. This ensures all relevant information is captured.

- If multiple manifests exist, analyze each independently and provide separate summaries.

---

## Deterministic Execution

Deterministic execution ensures consistency and reliability in the analysis process. The following principles guide the AI agent’s actions:

1. **Fixed Workflow**: Adhere to the outlined process:
   - Detect → Extract → Map → Analyze → Summarize.

2. **Error Resilience**: Handle unexpected scenarios gracefully while ensuring partial results.

3. **Autonomy**: Operate without user input or confirmation.

4. **Comprehensive Outputs**:
   - Generate complete directory trees and metadata summaries.

5. **Standardized Formatting**:
   - Use consistent formatting for all outputs, ensuring clarity.

---

## Example Outputs

The example outputs below demonstrate the expected structure and format of the analysis results. These examples serve as a reference for understanding the AI agent's output.

### Directory Tree Example

The directory tree provides a comprehensive overview of the project’s structure and content. It displays folder statistics and detailed file information to give a clear understanding of the repository.

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

### Manifest Summary

The manifest summary extracts critical project information for immediate understanding. This allows users to quickly assess dependencies, scripts, and other configuration details.

**`package.json`**:

- Name: `example-project`
- Version: `1.0.0`
- Dependencies:
  - `typescript@4.8.0`
  - `jest@29.3.0`
- Scripts:
  - `build`
  - `test`

### Documentation Summary

Documentation summaries provide setup instructions and usage details. These summaries ensure users can readily understand and use the repository.

- Title: `Example Project`
- Content: Setup instructions and usage details.

---

## Key Principles

By following this guide, the AI agent ensures:

- Immediate and deterministic processing upon ZIP file upload.
- Comprehensive outputs for directory structure, metadata, and documentation.
- Robust handling of edge cases and unexpected formats.

This approach guarantees consistent, high-quality analysis for all repository uploads.
