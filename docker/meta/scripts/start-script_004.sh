#!/usr/bin/env bash

# Constants
PACKAGE_PATH=$1
NODE_VERSION=18
TYPESCRIPT_VERSION=4.2

function build_image {
  # Build the image
  echo "Building the image..."
  docker build \
    --build-arg NODE_VERSION=$NODE_VERSION \
    --build-arg TYPESCRIPT_VERSION=$TYPESCRIPT_VERSION \
    -t my-test-image \
    -f /path/to/Dockerfile . ||
    { echo "docker build failed" && exit 1; }
}

function run_container {
  # Run the container
  echo "Running the container..."
  docker run \
    --name my-test-container \
    -it --rm \
    -v $PACKAGE_PATH:/app/package.tgz \
    -e NODE_ENV=development \
    -e DEBUG=true \
    my-test-image ||
    { echo "docker run failed" && exit 1; }
}

function exec_container {
  # Execute command inside the container
  echo "Executing command inside the container..."
  docker exec -it my-test-container npm run test
}

# Build the image docker run -e NODE_ENV=development -e DEBUG=true my-image
build_image

# Run the container
run_container

# Execute command inside the container
exec_container

# This script takes one argument, the path to the package.tgz file, and uses it to mount it as a volume when running the container. The script also sets the NODE_VERSION and TYPESCRIPT_VERSION build-args when building the image and the NODE_ENV environment variable when running the container
