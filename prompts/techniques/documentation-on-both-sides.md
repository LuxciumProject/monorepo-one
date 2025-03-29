# Documentation of Internal and External Facets of a Black Box

Every modular component must be documented on both its inward-facing (internal) and outward-facing (external) interfaces. This dual documentation model ensures both safe integration by consumers and maintainable development by contributors. The approach outlined here is aligned with the Hyper-Modular Black-Boxes Design (HMBBD) specification and is intended to support both human and automated agents.

## Purpose

The purpose of this guide is to formalize the expectations for both internal and external documentation. Each module must clearly present its interface for consumption and its internal logic for development. These documentation layers must be written in precise English and follow a structure that allows compatibility with AI-based assistants, automated documentation generators, and static analysis tools.

## External Documentation

External documentation serves as the only source of truth for integration. It must define the module’s contract without disclosing internal behavior or implementation specifics. Consumers must be able to use the module solely based on this interface specification.

This documentation must cover public functions, APIs, commands, or components with detailed type annotations, parameter descriptions, output formats, and error conditions. Side effects and invariants must also be described when applicable. All inputs and outputs should be typed explicitly using the language’s native type system or formal schemas when relevant. Minimal working examples should be included and must demonstrate correct and expected usage.

All outputs should be suitable for static publication or ingestion by automated agents. The recommended structure includes a `README.md` at the module root and a `docs/public/` directory for expanded material. The documentation must remain stable and version-controlled.

## Internal Documentation

Internal documentation is directed at those who develop, maintain, or extend the component. It must describe the internal logic, implementation details, constraints, and design decisions. This includes not only how the system behaves, but also why it behaves that way.

Documentation must be embedded in the source code where possible, using the native conventions of the programming language in use. Each function, method, and module must include a description of its purpose, parameters, return values, side effects, and failure modes. Supplementary design notes may be maintained in dedicated directories (e.g., `docs/internal/`) to describe high-level architectural structure, data flow, or protocol expectations.

Design rationale, edge case handling, logging facilities, test entry points, internal data flows, and failure strategies must be explicitly documented. Internal comments must not substitute for structural or conceptual documentation.

## Separation of Concerns

Internal and external documentation must be maintained independently. No internal assumption should leak into external documentation, and no implementation constraint should be presumed by the consumer unless formally specified in the external contract.

Internal documentation can evolve with refactoring, whereas external documentation is subject to versioning and must change only when the public interface changes. This separation guarantees encapsulation and allows internal systems to change without breaking downstream consumers.

## Language and Tooling

The documentation must be written in structured English using consistent terminology. Internal documentation must follow language-specific conventions:

- TypeScript: TSDoc (`/** */`) + TypeDoc.
- Python: PEP 257 docstrings (`""" """`) + Sphinx or pdoc.
- Shell: `##`-style comments + shdoc or markdown overlays.
- React: Typed props + react-docgen or equivalent.

External documentation must be written in Markdown and must adhere to CommonMark and GitHub Flavored Markdown specifications. All fenced code blocks must specify a language. Markdown files must be structured with correct heading levels, spacing, and semantic clarity. Code examples should be validated and copy-paste ready.

Documentation generation and publication must be automated when tooling is available. Metadata and interface contracts (e.g., OpenAPI, GraphQL SDL, JSON Schema) must be exportable and synchronizable.

## Synchronization and Lifecycle

Documentation must be updated synchronously with changes to the codebase. Any modification to behavior, structure, or exposed functionality requires corresponding updates in both internal and external documentation. This synchronization must be enforced at the level of code review and continuous integration.

Unmaintained or misleading documentation is considered a functional defect. Clear guidelines and checklists must be included in contribution protocols to ensure documentation quality across all modules.

CI pipelines must verify documentation presence, consistency, and correctness. Automated steps must regenerate static documentation, perform linting, and validate interface consistency.

## Validation and Structure

The documentation must be auditable. Markdown files must pass linters such as `markdownlint` with critical rules enforced, including heading levels, spacing, code block fences, and absence of consecutive headers. No heading may be present without at least one paragraph of text.

Each module must expose a minimal set of documentation artifacts:

- `README.md`: containing the public interface.
- Source-embedded documentation: for all functional units.
- `docs/internal/`: for extended design notes.
- Machine-readable specs: where applicable (e.g., OpenAPI, JSON schemas).

This structure enables traceability, clarity, and long-term maintainability across the full lifecycle of the component.

## Conformance Rules

Each documentation artifact must conform to applicable linting rules:

- Markdown: MD001, MD018, MD031, MD040, MD041 (at minimum).
- TypeScript: eslint-plugin-tsdoc.
- Python: pydocstyle or flake8-docstrings.
- Shell: header format validation (e.g., shfmt + shdoc).

All documentation must be tested, built, and distributed through reproducible automated processes.

## Access and Organization

Documentation must be versioned alongside the source code. External documentation is placed under `docs/public/`, and internal material under `docs/internal/`. Source-level documentation is stored inline within implementation files, using the preferred comment format of the language.

Navigation and access must be supported by both humans and machine agents. Linking between public and internal references should be clear and explicit without intermixing the boundaries.

Documentation must be indexed at the project level, either in the main `README.md` or in a dedicated module index, to ensure discoverability and auditability.
