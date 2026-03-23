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
