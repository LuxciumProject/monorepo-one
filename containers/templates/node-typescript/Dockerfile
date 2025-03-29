# Multi-stage build for Node.js/TypeScript development environment
FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Install pnpm (as required by .clinerules)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Development stage
FROM base AS development

# Install development dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy source files
COPY . .

# Expose default ports (adjust as needed)
EXPOSE 3000
EXPOSE 9229

# Command to run development server
CMD ["pnpm", "run", "dev"]

# Production stage
FROM base AS production

# Set environment variables
ENV NODE_ENV=production

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN pnpm install --prod

# Copy built files (assuming TypeScript compilation)
COPY dist/ .

# Command to run production server
CMD ["node", "index.js"]
