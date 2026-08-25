# Recursive Project Initializer

The repository contains Rush projects, nested `projects/` directories, standalone package roots, and Git submodules. `scripts/recursive-project-initializer.mjs` discovers all of them and applies the repository's first-initializer contract without replacing existing project documentation.

## Completion contract

For each discovered project root, the initializer ensures the following structure exists:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.clinerules/README.md` unless a legacy `.clinerules` file already occupies that path
- `.vscode/settings.json` with the required Copilot and chat-file settings
- `README.md`
- `memory-bank/chatmodes/README.md`
- `memory-bank/instructions/README.md`
- `memory-bank/prompts/README.md`
- `memory-bank/activeContext.md`
- `memory-bank/projectbrief.md`
- `memory-bank/productContext.md`
- `memory-bank/systemPatterns.md`
- `memory-bank/techContext.md`
- `memory-bank/progress.md`

Existing files are preserved. Existing `.vscode/settings.json` data is retained and only missing required keys are added.

## Discovery

The initializer combines four sources:

1. The repository root.
2. Every active project in `rush.json`.
3. Directories containing common project markers such as `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, Maven or Gradle manifests, and `rush-project.json`.
4. Projects found recursively under any directory named `projects`, plus recursively initialized Git submodules declared by `.gitmodules`.

Generated dependencies and caches such as `node_modules`, `.next`, `dist`, build outputs, virtual environments, and vendor directories are excluded.

## Usage

Initialize submodules first so their nested repositories can be inspected and updated:

```bash
git submodule update --init --recursive
```

Preview gaps without modifying files:

```bash
node scripts/recursive-project-initializer.mjs --check
```

Create missing scaffolding and repeat discovery until no further files are added:

```bash
node scripts/recursive-project-initializer.mjs --write
```

The write operation performs up to eight passes by default and then runs a final independent verification pass. It exits with code `2` if any project remains incomplete or inaccessible.

Change the fixed-point limit when required:

```bash
node scripts/recursive-project-initializer.mjs --write --max-passes=20
```

Exclude Git submodules for a parent-repository-only operation:

```bash
node scripts/recursive-project-initializer.mjs --write --no-submodules
```

Run against a detached test fixture or alternate checkout:

```bash
node scripts/recursive-project-initializer.mjs --write --root=/path/to/repository
```

## Outputs

`PROJECTS.generated.md` is regenerated in write mode. It records every discovered project, its discovery source, package name when supplied by Rush, and its completion status.

Changes created inside a submodule belong to that submodule repository. Commit and publish those submodule changes first, then update the parent repository's gitlink commits.

## Verification sequence

Use the following sequence after generation:

```bash
node scripts/recursive-project-initializer.mjs --write
node scripts/recursive-project-initializer.mjs --check
git status --short
git submodule foreach --recursive 'git status --short'
```

A complete result has `incomplete projects: 0` and a successful check exit code.
