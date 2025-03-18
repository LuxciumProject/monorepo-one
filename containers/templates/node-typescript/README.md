# Node.js/TypeScript Development Container

This is a Docker template for Node.js/TypeScript development environments using pnpm as the package manager.

## Features

- Node.js 20 LTS base
- pnpm for fast, disk-space efficient package management
- TypeScript support out of the box
- Development and production multi-stage builds
- Hot reload support
- Debugging capabilities
- Volume mounting for local development
- Optimized for VS Code development

## Prerequisites

- Docker
- Docker Compose
- VS Code (recommended)

## Quick Start

1. Copy this template to your project:

   ```bash
   cp -r containers/templates/node-typescript/* your-project-directory/
   ```

2. Start the development container:

   ```bash
   docker compose up --build
   ```

3. Access your application:
   - Main app: <http://localhost:3000>
   - Debug port: 9229

## Development Commands

### Start Development Server

```bash
docker compose up
```

### Start with Debug Mode

```bash
# Uncomment the debug command in docker-compose.yml first
docker compose up
```

### Install New Dependencies

```bash
docker compose exec app pnpm install <package-name>
```

### Run Tests

```bash
docker compose exec app pnpm test
```

### Build Production Image

```bash
docker build --target production .
```

## Configuration

### Environment Variables

- `NODE_ENV`: Set to 'development' by default
- `PNPM_HOME`: Configured for optimal pnpm cache usage

### Ports

- 3000: Main application
- 9229: Debug port

### Volumes

- `.:/app`: Mounts your local source code
- `node_modules:/app/node_modules`: Persists node_modules

## Best Practices

1. Always use pnpm for package management
2. Utilize multi-stage builds for production
3. Keep development and production dependencies separate
4. Use volume mounting for local development
5. Leverage TypeScript's strict mode
6. Follow the project's established code style

## Debugging

1. Uncomment the debug command in docker-compose.yml
2. Use VS Code's built-in debugger
3. Add breakpoints in your code
4. Start the container with docker compose up

## Production Build

For production deployment:

```bash
docker build --target production -t your-app-name:latest .
docker run -p 3000:3000 your-app-name:latest
```

## Customization

1. Modify the Dockerfile for additional dependencies
2. Update docker-compose.yml for different port mappings
3. Adjust .dockerignore for project-specific files
4. Configure environment variables as needed
