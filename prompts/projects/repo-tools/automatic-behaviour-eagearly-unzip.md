# Generic and Resilient Instructions for ZIP File Processing

This document outlines a robust and repeatable approach to processing repository ZIP files. The instructions ensure complete extraction, enumeration, and reporting while maintaining clarity, resilience, and adaptability.

## Primary Objective

The primary goal is to automate the extraction and enumeration of ZIP files upon upload, ensuring detailed and unabridged results. This process must be initiated automatically, without user intervention, and provide full structural and metadata insights for every file and folder.

## Step-by-Step Workflow

The workflow consists of several key steps designed to ensure the processing is comprehensive and deterministic. Each step is detailed below.

### 1. Automatic Extraction and Enumeration

Upon receiving a ZIP file:
1. Extract the contents into a unique folder for processing.
2. Generate a full directory tree showing every folder and file, preserving their hierarchy and structure.
3. Outputs must include:
   - Folder names with their file counts and cumulative counts.
   - File details including size, type, and line count for text files.

No action by the user is required to trigger this process.

### 2. File-Level Details

For each file in the repository:
- Display the **file size** in the shortest possible human-readable format (e.g., `512 B`, `1.2 KB`).
- For text-based files (non-binary), provide the **line count**.

The format must always be:
- **Size (B)** followed by **line count (ℓ)**.
- Example:
  ```
  example.ts (1.2 KB, ℓ: 120)
  ```

### 3. Folder-Level Details

Each folder should have metrics that provide insights into its content and structure. These metrics include the current file count, cumulative count, and subfolder count.

For each folder:
1. Include the **current folder file count** (files directly within the folder).
2. Include the **cumulative file count** (total files in the folder and all its subfolders).
3. Include the **nested folder count** (number of immediate subfolders).
4. Format the counts as:
   ```
   files in folder, cumulative files, subfolders, 0
   ```

If nested folder and cumulative file counts are identical, simplify by displaying only one number.

#### Examples

Folders with different configurations are presented below:
- A folder with subfolders:
  ```
  📂 src/ (5, 20, 2, 0)
  ```
- An inner-most folder:
  ```
  📂 components/ (3)
  ```

### 4. Adaptation for Text and Binary Files

The processing rules differ for text and binary files to provide relevant information for each type.

- **Text files**:
  - Include both size and line count.
  - Example:
    ```
    index.ts (2.1 KB, ℓ: 150)
    ```
- **Binary files**:
  - Include only the size.
  - Example:
    ```
    icon.png (1.5 MB)
    ```

## Output Rules and Structure

The output must follow strict rules to ensure completeness and clarity. These rules are designed to avoid any ambiguity or truncation of information.

### 1. Full Output, No Truncation

Every single file and folder must be listed without omission or truncation. **No ellipses (`…`) or abbreviated outputs** are permitted.

Python logic or output scripts must avoid:
- Constructs like `[:N]`, `output[:5000]`, or similar.

The system must always provide **complete data**, split into manageable chunks only for display if necessary.

### 2. Adaptive Formatting

Formatting must dynamically adjust to the complexity of the repository. Use indentation and structure to maintain clarity in deeply nested directories.

## Reinforcement and Attention to Detail

Ensuring the rules are followed requires clear logic, attention to detail, and adaptability to handle various edge cases.

1. **Clear Logic and Determinism**: The algorithm should produce identical and predictable results for the same input every time.
2. **Priority on Completeness**: Every folder, file, and metric must be included in the output.
3. **Resilience**: Handle edge cases (e.g., empty folders, corrupted files, or large repositories) gracefully while maintaining output integrity.

## Example Output

The example below illustrates a valid output for a typical ZIP file:

```
📂 root/ (15, 150, 8, 0)
    📂 src/ (10, 100, 4, 0)
        📂 utils/ (3, 3)
            helper.ts (1.2 KB, ℓ: 80)
        📂 services/ (2, 50)
            api.ts (3.1 KB, ℓ: 200)
            db.ts (2.5 KB, ℓ: 120)
    📂 assets/ (5, 50, 2, 0)
        📂 icons/ (3, 3)
            icon.png (5.4 KB)
```

## Self-Correcting Instructions

To ensure these instructions are always respected:
1. **Reinforce behavior** by reiterating critical directives across contexts.
2. **Cross-validate outputs** against expectations to detect and resolve anomalies (e.g., missing details, truncated results).
3. **Iterative Feedback**: Continuously refine and adapt instructions based on observed behavior and gaps.
