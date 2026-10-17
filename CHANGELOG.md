# Changelog

This file is the stable entry point for tracking notable repository changes.
Use it first when the repository moves faster than the rest of the
documentation.

## How To Follow Changes

Use this order to reduce noise and find the changes that matter.

1. Read this file for highlighted updates.
2. Read [memory-bank/progress.md](memory-bank/progress.md) for broader project
   progress.
3. Use Git history on the folder you care about for detailed file-level changes.

```bash
git log --oneline -- library/
git log --oneline -- services/
git log --oneline -- frontend/
```

## Highlighted Updates

### 2026-09-30 Project Creation Scaffold and Rush Lifecycle Migration

Added parent-first project generation with a complete Node/TypeScript scaffold,
explicit no-op lifecycle slots, dependency-range checks and Rush activation.
Removed legacy Yarn selectors and installation-time build hooks from 14
Rush-managed manifests. Added canonical decisions in the memory bank, referenced
by AGENTS.md, CLAUDE.md and Copilot instructions.

The generator and migration tests pass. A full repository installation/build
has not been executed in the implementation environment.


These entries summarize major changes already documented elsewhere in the
repository.

### 2025-07-20 Assertion-Tools Testing Implementation

Assertion tooling reached full test coverage for the documented files. The
work also tightened type guard validation and improved mocking patterns for
Node.js filesystem behavior.

### 2025-02-24 Directory Structure Documentation

The monorepo structure and container organization were documented more
explicitly. This established a clearer baseline for folder ownership and
repository layout.

## Current Limitation

This changelog is still maintained manually. The repository does not yet use a
fully enforced automated changelog workflow across packages.

## Next Improvement

The next useful step is to enable a consistent Rush-based change workflow so
package-level updates can be tracked without relying on memory alone.
