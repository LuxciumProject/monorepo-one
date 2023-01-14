#!/usr/bin/env bash

# Constants
PACKAGE_PATH=$1
NODE_VERSION=18
TYPESCRIPT_VERSION=4.2
IMAGE_NAME="my-test-image"
IMAGE_LABEL="test-image"
CONTAINER_NAME="my-test-container"
CONTAINER_LABEL="test-container"

function build_image {
  # Build the image
  echo "Building the image..."
  docker build \
    --label $IMAGE_LABEL \
    --build-arg NODE_VERSION=$NODE_VERSION \
    --build-arg TYPESCRIPT_VERSION=$TYPESCRIPT_VERSION \
    -t $IMAGE_NAME \
    -f /path/to/Dockerfile . ||
    { echo "docker build failed" && exit 1; }
}

function run_container {
  # Run the container
  echo "Running the container..."
  docker run \
    --label $CONTAINER_LABEL \
    --name $CONTAINER_NAME \
    -it --rm \
    -v $PACKAGE_PATH:/app/package.tgz \
    -e NODE_ENV=development \
    -eDEBUG=true \
    $IMAGE_NAME ||
    { echo "docker run failed" && exit 1; }
}

function exec_container {
  # Execute command inside the container
  echo "Executing command inside the container..."
  docker exec -it $CONTAINER_NAME npm run test
}

# Build the image
build_image

# Run the container
run_container

# Execute command inside the container
exec_container

# This script takes one argument, the path to the package.tgz file, and uses it to mount it as a volume when running the container. The script also sets the NODE_VERSION and TYPESCRIPT_VERSION build-args when building the image and the DEBUG and NODE_ENV environment variables when running the container.

# As you can see in this updated version of the script, constants have been added for the image name, image label, container name, and container label. These can be modified at the top of the script to give different names and labels to different images and containers when building and running multiple instances of them at the same time. This will make it easier to differentiate and manage them. Additionally, I have also added the --label flag to the docker build and docker run commands to set the labels for the image and container respectively.

# MIT Copyright © 2023 · LUXCIUM · (Benjamin Vincent Kasapoglu) · All Rights Reserved

# This script has been created by Benjamin Vincent Kasapoglu with the help of ChatGPT, a large language model trained by OpenAI. For more information on ChatGPT, please visit https://openai.com/blog/chatgpt/
