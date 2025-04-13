# 🗂️ Optimized Project Instructions for Questrade TypeScript SDK

## 🟢 1. Overall Project Vision and Objectives

Clarity of purpose: develop a modular, robust, production-ready TypeScript package centered on the Questrade API. It should support Node.js, browser-based, and Next.js applications, while being extendable to other languages.

### 1.1 Purpose and Scope

- Clearly defined use-cases and targeted deliverables
- Scope boundaries established for initial implementation with planned extension points

### 1.2 Strategic Flexibility

- Modular design for future-proofing and optional feature toggling
- Native support for enhancements like real-time streaming and complex strategies

---

## 🔷 2. Project-Level Technical Guidelines

### 2.1 Core Architectural Principles

- Modular composition: authentication, REST, error handling, market data
- Dependency injection and strict separation of concerns

### 2.2 Mandatory Best Practices

- **No Enums**: Use Union Types or Constant Objects exclusively
- Strong TypeScript typing with defined interfaces
- Barrel exports from `src/types/index.ts`
- Markdown documentation with consistent headings and code blocks

### 2.3 Development Standards

- Clean code principles (SOLID, DRY, KISS)
- Git integration and VSCode-centric workflows

---

## 🔑 3. Questrade API Implementation Guidelines

### 3.1 Authentication and Authorization

- OAuth 2.0 support (Authorization Code and Implicit flows)
- Lifecycle management for `access_token` and `refresh_token`
- Secure storage, TLS-only communications, and revocation support

### 3.2 Error Handling and Robustness

- Alignment with Questrade error model
- Type-safe mappings and structured error responses

### 3.3 API Endpoint Implementation

- Full support for all 16 documented GET endpoints
- POST templates where applicable, with scalable extension strategy
- Strong validation and interface typing for all responses

### 3.4 Rate Limiting and Throttling

- Respect documented API limits (per second, per hour)
- Parse and apply headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## ⚙️ 4. TypeScript Preferences and Structural Requirements

### 4.1 Structural Requirements

- Enums are **forbidden**; replaced by unions or object literals
- `strict` mode enforced in `tsconfig.json`

### 4.2 Interface and Type Management

- Centralized types under `src/types/`
- Runtime validation (e.g., Zod or io-ts) when needed

---

## 🛠️ 5. Development Environment and Workflow Standards

### 5.1 Tools and Environment

- Fedora Linux, KDE Plasma, Zsh, Docker, Dev Containers
- VSCode with GitHub Copilot, `.github/copilot-instructions.md` included

### 5.2 Automation Scripts

- Bash automation for setup and environment bootstrapping
- Dev Containers for reproducible development

---

## 🧩 6. Session-Level Operational Instructions

### 6.1 Iterative Development

- One or two core topics per session
- Each session concludes with documented outcomes and decisions

### 6.2 Collaboration and Improvement

- Flexibility to revisit decisions and evolve structures
- Self-correcting, feedback-driven development process

---

## 🔮 7. Future-Proofing and Extensibility

### 7.1 Advanced Features

- Ready hooks for real-time streaming integration
- Structures for advanced strategies (multi-leg, Greeks, analytics)

### 7.2 Language and Platform Interoperability

- Standards that allow usage from Python, JS, Next.js, and more

---

## 📚 8. Documentation and Knowledge Management

### 8.1 Documentation Standards

- Well-structured markdown files (README, CONTRIBUTING, etc.)
- JSDoc or TSDoc for inline comments

### 8.2 Continuous Sync with Official Docs

- Regular review of Questrade updates
- Periodic alignment with latest API behavior

---

## ✅ 9. Final Integration and Delivery

### 9.1 Packaging and Distribution

- Clean build and packaging via npm
- Versioning strategy with clear semantic milestones

### 9.2 Testing and Validation

- Integration tests under real conditions
- Criteria for alpha, beta, and stable releases

---

## 🚀 10. Continuous Evolution Strategy

- Embrace feedback and update iteratively
- Sustain long-term adaptability across evolving user needs and technologies
