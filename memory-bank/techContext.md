# Technical Context and Environment

## Development Environment

### Operating System

- Base: Fedora Linux
- Package Management: dnf (dnf5)
- System Integration: systemd

### Primary Technologies

- **Languages**:
  - TypeScript (Primary)
  - Python
  - Shell Scripting
- **Runtime**: Node.js v22+
- **Package Manager**: pnpm

## Monorepo Configuration

### Rush Setup

- Version: 5.148.0
- Package Manager: pnpm 9.15.3
- Node.js Support: >=16.20.2 <17 || >=18.20.4 <19 || >=20.18.0 <21 || >=22.11 <23
- Project folder depth: min 2, max 3
- Enforces consistent versioning

### Root Level Configuration

- Build/Package: `rush.json`, `pnpm-workspace.yaml`, `.nvmrc`
- Version Control: `.gitignore`, `.gitattributes`, `.gitmodules`
- Code Style: `.editorconfig`, `.prettierrc.cjs`, `.prettierignore`
- Development: `.vscode/`, `monorepo-one.code-workspace`
- AI Support: `.clinerules`, `memory-bank/`

## Project Structure

### Primary Containers

- `APIs/` - API integrations
- `backend/` - Server applications
- `frontend/` - Client applications
- `library/` - Reusable utilities
- `services/` - Microservices
- `examples/` - Reference implementations

### Container Rules

- Independent package.json per container
- Isolated development environments
- Container-specific build configs
- Clear dependency boundaries

## Technology Stack

### Frontend

- TypeScript
- React/Next.js potential
- Modern web standards
- Responsive design principles

### Backend

- Node.js
- Express/Fastify
- gRPC support
- Microservice architecture

### Database & Persistence

- Redis for caching
- MongoDB potential
- Flexible ORM strategies
- Polyglot persistence support

### DevOps & Infrastructure

- Docker containerization
- Kubernetes potential
- CI/CD pipeline integration
- Automated testing frameworks

## Development Tools

### Primary IDE

- VSCode as primary editor
- Standardized editor settings
- Integrated development features
- Consistent workspace configuration

### Code Quality

- ESLint for code quality
- Prettier for consistent formatting
- TypeScript strict mode
- Docker for environment consistency

## Dependency Management

- pnpm workspace configuration
- Centralized dependency tracking
- Strict version control
- Minimal external dependency approach
- Rush-managed inter-container dependencies

## Performance Considerations

- Lazy loading strategies
- Efficient memory management
- Concurrent processing support
- Minimal computational overhead

## Security Frameworks

- SELinux context awareness
- Input validation strategies
- Least-privilege container design
- Comprehensive error handling

## Monitoring & Observability

- Centralized logging
- Performance metrics tracking
- Error reporting mechanisms
- Distributed tracing potential

## Continuous Integration

- Automated testing
- Build verification
- Deployment validation
- Quality gate enforcement

## Maintenance Processes

- Regular dependency updates
- Security patch management
- Compatibility verification
- Documentation maintenance
