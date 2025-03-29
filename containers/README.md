# Container Templates

This directory contains optimized Docker templates for different development environments.

## Available Templates

### Node.js/TypeScript (`templates/node-typescript`)

- Optimized for Node.js and TypeScript development
- Uses pnpm as package manager
- Includes development and production configurations
- Hot reload and debugging support
- See [Node.js/TypeScript Template README](templates/node-typescript/README.md)

## Planned Templates

### Python (Coming Soon)

- Python development environment
- Poetry for dependency management
- Development and production configurations
- Hot reload support
- Testing infrastructure

## Usage

Each template directory contains:

- `Dockerfile`: Multi-stage build configuration
- `docker-compose.yml`: Development environment setup
- `.dockerignore`: Optimized ignore rules
- `README.md`: Detailed usage instructions

## Best Practices

1. **Use Templates as Starting Points**
   - Copy the template to your project directory
   - Customize configurations as needed
   - Keep the original template clean

2. **Container Guidelines**
   - Follow multi-stage build patterns
   - Optimize for development and production
   - Maintain proper security practices
   - Use volume mounting for local development

3. **Development Workflow**
   - Use docker compose for development
   - Leverage hot reload capabilities
   - Follow the README instructions in each template

## Contributing

When adding new templates:

1. Follow the established directory structure
2. Include comprehensive documentation
3. Optimize for both development and production
4. Test thoroughly before committing
