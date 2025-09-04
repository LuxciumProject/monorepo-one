# Project Structure Overview

## Project Root

- **APIs/**: Contains integrations with external services and API implementations. This folder should maintain a consistent structure for API definitions and documentation to ensure clarity and ease of use across different services.

- **backend/**: Houses server-side application logic and services. Each service should follow a modular design, allowing for easy updates and maintenance. Consistent naming conventions and documentation practices should be enforced here.

- **frontend/**: Contains client-side application code. This folder should adhere to a component-based architecture, promoting reusability and maintainability. Consistent styling and state management practices should be established across sub-projects.

- **library/**: Shared modules, utilities, and helper functions. This folder should focus on reusable code, with clear documentation and versioning to avoid conflicts between different projects.

- **services/**: Microservices and operational modules. Each microservice should be independently deployable and follow a consistent API design. Documentation should be provided for each service to facilitate integration.

- **examples/**: Complete example projects and usage demos. This folder should provide clear, well-documented examples of how to use the various components and services in the monorepo.

- **prompts/**: Contains prompt templates and user interaction guidance. This folder should maintain a consistent format for prompts to ensure clarity and ease of use.

## Scripts and Automation

- **scripts/**: Automation scripts and tooling that drive builds or deployments. Scripts should be well-documented and follow a consistent naming convention to facilitate easy usage.

## Unused or Archived

- **backup/**: Backup copies or archival content for reference or recovery. This folder should be organized to allow easy retrieval of archived content.

- **infrastructure/**: Infrastructure configurations or ancillary services. This folder should maintain clear documentation of infrastructure setups and configurations.

## Configuration and Environment

- **docker/**: Container definitions and Docker-related configurations. This folder should include Dockerfiles and docker-compose files, with clear instructions for building and running containers.

- **containers/**: Additional container orchestration or setup files. This folder should maintain a consistent structure for orchestration files to facilitate deployment.

## Documentation

- **docs/**: Project documentation and guides. This folder should be organized by topic, with clear navigation and up-to-date information.

## Development Tools

- **.vscode/**: VS Code editor configuration and settings. This folder should include settings that enhance the development experience for all team members.

- **.github/**: GitHub-specific settings (e.g., workflows, issue templates). This folder should maintain clear documentation of workflows and templates to ensure consistency in project management.

- **memory-bank/**: Assets or utilities for caching/storage, as per your project intent. This folder should be organized to facilitate easy access to cached data.

## Miscellaneous

- **static/**: Static assets for websites or UI components. This folder should maintain a consistent structure for static files to ensure easy access and updates.

- **private/**: Internal or sensitive configurations not intended for external use. This folder should be secured and documented to prevent unauthorized access.

## Common and Shared Resources

- **common/**: Shared configuration files and utilities that don’t belong to a single project. This folder should maintain a consistent structure for shared resources to facilitate easy access.

- **.git/**: Git repository configuration (version control). This folder is automatically managed by Git and should not be modified manually.

# Recommendations for Improvement

1. **Standardize Documentation**: Ensure that all folders have a README file that outlines the purpose and structure of the folder, along with any relevant usage instructions.

2. **Consistent Naming Conventions**: Establish and enforce naming conventions across all folders and files to improve clarity and maintainability.

3. **Automated Testing**: Implement automated testing for all services and components to ensure reliability and facilitate continuous integration.

4. **Version Control for Shared Libraries**: Use versioning for shared libraries in the `library/` folder to avoid conflicts and ensure compatibility across projects.

5. **Centralized Configuration Management**: Consider centralizing configuration management to streamline updates and reduce duplication across services.

6. **Improved CI/CD Workflows**: Enhance CI/CD workflows in the `.github/` folder to automate testing and deployment processes, ensuring faster and more reliable releases.

7. **Security Best Practices**: Implement security best practices for sensitive configurations in the `private/` folder to prevent unauthorized access.

## Monorepo-wide structural analysis (2025-09-03)

This section documents the discovered patterns, similarities, differences, and improvement opportunities across the monorepo, based on a full inventory of Rush configuration, packages, configs, and tests.

### Summary

- Package manager: Rush v5.151.0 with PNPM v10.15.0, Node.js v22.18.0.
- Projects are registered in `rush.json` under these groups: `backend`, `frontend`, `APIs`, `library`, `services`, `examples`, and `infrastructure`.
- Strong modularity: many independent packages across folders with variable maturity.

### Registered Rush projects (by group)

- Backend: `backend/api/api-package`, `backend/api/comments`, `backend/api/posts`, `backend/scratch`.
- Frontend: `frontend/home` (@luxcium/home-nextjs), `frontend/quick-start` (@luxcium/quick-start).
- APIs: `APIs/anthropic`, `APIs/groq-cloud`, `APIs/openai`, plus historical `APIs/anthropic_old`, `APIs/sonnet-3-5`.
- Library: `library/*` including bigintString, colors-tools, boxing-tools, boxed-list, human-size, object-with-expectations, parallel-mapper, restraining-zalgo, mapping-tools, tools.
- Services: image-pipeline, mongo-service, phash-compute, redis-services, rpc-worker-pool, scan-directories, service-one, service-two.
- Examples: casecobra-master, phash-scout, template, open-ai, gpu-stuff, mcp-servers, playground, node-js, typescript.
- Infrastructure: `infrastructure/dev`.

### Cross-cutting configuration inventory

- TypeScript configs found in most subprojects: `tsconfig.json` present across APIs, backend, frontend, library, services, and examples.
- ESLint configs: mix of `eslint.config.mjs` and legacy `.eslintrc.*`; standardize on flat config where practical.
- Jest configs: widespread under `config/jest.config.*` with some project-level variants; testing files are present in many libraries and apps.

### Group-specific patterns and gaps

#### APIs

- Packages: `@luxcium/anthropic-api`, `@luxcium/groq-cloud`, `@luxcium/openai-api`, legacy `anthropic_old`, experimental `sonnet-3-5`.
- Scripts are consistent: `build`, `install`, `path`, `test`.
- Improvement: align devDependencies versions and enable shared base tsconfig and jest presets from `common/`.

#### Backend

- `backend/api/api-package` is the most feature-rich (Docker scripts, test matrix, lint/format, multiple start modes).
- `backend/api/comments` and `posts` are slimmer with similar scripts.
- Improvement: centralize Docker and testing presets; ensure consistent CI targets for all.

#### Frontend

- Mix of Next.js apps (`frontend/home`, `frontend/quick-start`, several under `frontend/projects/*`) and CRA-style React apps.
- Improvement: converge on current Next.js setup where applicable; remove or archive old CRA ejectors; standardize ESLint flat config and TS strict settings.

#### Library

- Packages are mostly small, focused utilities with light runtime deps; heavy devDependencies footprint.
- Some use internal dependencies (e.g., `@luxcium/restraining-zalgo`).
- Improvement: unify `exports` maps, enable `types` output, and enforce Barrel-Only Index Paradigm; add README summaries and examples per library.

#### Services

- Broad range: Node services plus specialized builds (`image-scout` C++/CMake in repo though not Rush-registered), and operational services (redis-services, mongo-service).
- `rpc-worker-pool` stands out with Docker and docs scripts; others have minimal scripts.
- Improvement: create a service template with health checks, Dockerfile, lint/test, and standardized `config/jest.config.json`.

#### Examples

- Many example apps; structure varies widely.
- Improvement: tag examples that are reference-quality versus scratch; add README badges and quick-starts; consider pruning or archiving outdated examples.

### Standardization blueprint

- Create shared presets in `common/`:
	- `common/config/eslint/eslint.config.mjs` (flat config baseline)
	- `common/config/jest/base.jest.config.cjs`
	- `common/config/ts/tsconfig.base.json`
- Update subprojects to extend these presets and reduce duplication.
- Normalize output directories to `dist/` for TS builds; ensure `types` emission.
- Adopt consistent scripts: `build`, `dev`, `lint`, `lint:fix`, `test`, `test:coverage`, `typecheck`, `start` (where relevant).

### Rush and PNPM notes

- Use `rush update` (without `--debug`) as `--debug` is ambiguous in this version; prefer `--debug-package-manager` when needed.
- Keep `pnpm-workspace.yaml` in sync with `rush.json` and avoid a root `package.json` (repository rule).

### Next steps checklist

- [ ] Add shared presets under `common/config` and wire at least 3 representative projects (one per group).
- [ ] Normalize ESLint to flat config where feasible.
- [ ] Ensure all libraries export `types` and follow Barrel-Only Index Paradigm.
- [ ] Introduce a `service-template` with health checks and Dockerfile.
- [ ] Add missing READMEs across libraries/services with usage examples.

### References

- Rush config: `rush.json`
- Project registration: see `projects` array in `rush.json`
- Lint/Type/Test inventories gathered via workspace scans (2025-09-03)

## Audit snapshot (2025-09-04)

These automated audits help track standardization progress. Scripts live in `scripts/audits/`.

### README presence

Missing READMEs detected:

- library: `library/mapping-tools/backup/examples/open-ai`, `library/mapping-tools/backup/temp/docker`
- services: `services/rpc-worker-pool/docker`, `services/service-one`, `services/service-two`
- backend: `backend/api/comments`, `backend/api/posts`, `backend/scratch`
- frontend: `frontend/projects/federal-container`
- examples: `examples/open-ai`

Run: scripts/audits/readme-audit.sh

### Barrel-only index violations

Index files containing implementation or forbidden exports:

- `library/restraining-zalgo/src/index.ts`
- `library/mapping-tools/src/index.ts` (also uses export *)
- `library/mapping-tools/backup/*/src/index.ts` (templates/examples)
- `library/parallel-mapper/src/index.ts`
- `library/tools/src/index.ts` (export *, default, imports)
- `library/bigintString/src/index.ts`
- `library/human-size/src/index.ts`
- `library/boxed-list/src/index.ts`
- `library/colors-tools/src/index.ts`

Run: scripts/audits/barrel-index-audit.sh

### Services containerization

Dockerfile presence by service:

- HAS: `services/image-scout`, `services/redis-services`, `services/rpc-worker-pool`
- MISSING: `services/image-pipeline`, `services/mongo-service`, `services/phash-compute`, `services/questrade-ts`, `services/scan-directories`, `services/service-one`, `services/service-two`, `services/typescript`

Run: scripts/audits/services-dockerfiles-audit.sh

### Test counts per group

Snapshot of test files:

- library: 169
- services: 13
- backend: 1
- frontend: 1
- APIs: 1
- examples: 16

Run: scripts/audits/test-counts-audit.sh
