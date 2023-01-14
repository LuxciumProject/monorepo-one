#!/usr/bin/env bash

# In this script, the first argument passed to the command line is used to specify the package.tgz file located on the local file system, and the constants NODE_VERSION and TYPESCRIPT_VERSION are set at the top of the script. You can modify these constants to match your requirements.
# The CMD command is set to install the package.tgz file located in the /app directory of the container, which is mapped to the package.tgz file on the local file system.
# Please note that this is an example and you should test it in your environment and adjust it accordingly.
# You can now copy and paste these two files into your project and use them as is or customize them to fit your needs.

# Constants
PACKAGE_PATH=$1
NODE_VERSION=18
TYPESCRIPT_VERSION=4.2

# Build the image
docker build \
  --build-arg NODE_VERSION=$NODE_VERSION \
  --build-arg TYPESCRIPT_VERSION=$TYPESCRIPT_VERSION \
  -t my-test-image \
  -f /path/to/Dockerfile . ||
  { echo "docker build failed" && exit 1; }

# Run the container
docker run \
  -it --rm \
  -v $PACKAGE_PATH:/app/package.tgz \
  -e NODE_ENV=development \
  my-test-image ||
  { echo "docker run failed" && exit 1; }
