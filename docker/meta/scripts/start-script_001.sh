#!/usr/bin/env bash

# Build the image
docker build \
  --build-arg NODE_VERSION=${NODE_VERSION:-18} \
  -t my-test-image \
  -f /path/to/Dockerfile . || \
  { echo "docker build failed" && exit 1; }

# Run the container
docker run \
  -it --rm \
  -p ${PORT:-3000}:${PORT:-3000} \
  -v /path/to/package.tgz:/app/package.tgz \
  -e NODE_ENV=${NODE_ENV:-development} \
  my-test-image || \
  { echo "docker run failed" && exit 1; }

# Execute commands inside the container
docker exec -it my-test-container-1 npm test || \
  { echo "docker exec failed" && exit 1; }
