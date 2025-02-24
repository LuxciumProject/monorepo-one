# Active Context: Current Project Status

## Current Focus Areas

- Monorepo directory structure analysis and documentation
- Project container organization standardization
- Development workflow optimization

## Project Structure Documentation

### Primary Project Containers

- `APIs/` - API integrations and implementations
- `backend/` - Server-side applications
- `examples/` - Example implementations
- `frontend/` - Client-side applications
- `library/` - Reusable utilities
- `services/` - Microservices and specialized services

### Auxiliary Infrastructure

- `.git/`, `.github/` - Version control and GitHub configurations
- `.pnpm-store/` - Package management
- `.vscode/` - Editor configuration
- `common/` - Shared resources
- `memory-bank/` - Project documentation and context

### Special Purpose & Future Review

- `docker/` - Container configurations (to be reviewed)
- `docs/` - Documentation (purpose under review)
- `infrastructure/` - Future IAC/SST/Pulumi potential
- `private/` - Historical content
- `scripts/` - Monorepo-wide scripts
- `static/` - Legacy configurations
- `prompts/` - AI/LLM related content (semi-organized)

## Critical Rules

- No node_modules directories at root level
- No package.json file at root level
- Maintain clear separation between primary and auxiliary components

## Active Development Streams

### Infrastructure

- pnpm workspace management
- Project container organization
- SELinux integration

### Tooling

- Custom utility library development
- Development environment standardization
- Automated setup scripts

## Immediate Next Steps

1. Document individual project container structures
2. Implement consistent project organization standards
3. Review and clean up legacy components
4. Enhance cross-project utility libraries

## Ongoing Decisions

- Project container organization standards
- Legacy component management strategy
- Development workflow optimization
- Documentation enhancement processes

## Potential Challenges

- Maintaining consistent project structure
- Managing cross-project dependencies
- Ensuring clear separation of concerns
- Handling legacy components effectively

## Recent Achievements

- Documented comprehensive monorepo structure
- Classified project containers and auxiliary components
- Established critical root-level rules
- Created detailed project organization overview

## Collaboration Notes

- Focus on clear project container boundaries
- Maintain organized directory structure
- Follow established root-level rules
- Document all structural decisions

## Decision Log

- 2025-02-24: Documented monorepo structure and organization
- 2025-02-14: Initiated Memory Bank system
- Ongoing: Refining development workflows
