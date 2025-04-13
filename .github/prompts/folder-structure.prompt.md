# Folder Structure for the monorepo

## Project Root

APIs/ – Integrations with external services and API implementations.
backend/ – Server-side application logic and services.
frontend/ – Client-side application code.
library/ – Shared modules, utilities, and helper functions.
services/ – Microservices and operational modules.
examples/ – Complete example projects and usage demos.
prompts/ – Prompt templates and user interaction guidance.

## Scripts and Automation

scripts/ – Automation scripts and tooling that drive builds or deployments.

## Unused or Archived

backup/ – Backup copies or archival content for reference or recovery.
infrastructure/ – Infrastructure configurations or ancillary services.

## Configuration and Environment

docker/ – Container definitions and Docker-related configurations.
containers/ – Additional container orchestration or setup files.

## Documentation

docs/ – Project documentation and guides.

## Development Tools

.vscode/ – VS Code editor configuration and settings.
.github/ – GitHub-specific settings (e.g., workflows, issue templates).
memory-bank/ – Assets or utilities for caching/storage, as per your project intent.

## Miscellaneous

static/ – Static assets for websites or UI components.
private/ – Internal or sensitive configurations not intended for external use.

## Common and Shared Resources

common/ – Shared configuration files and utilities that don’t belong to a single project.
.git/ – Git repository configuration (version control).

## Partitioning Local (ignored-by-git)

.pnpm-store/ – Local package store used by PNPM (used outside monorepo-one).
.Trash-1000/ – System-generated trash folder; not part of active development.
