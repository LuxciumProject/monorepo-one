#!/bin/bash
# now that we created the Dockerfile, we can build the image using this script
# move into the folder containing this script
cd "$(dirname "$0")" || exit

# build the image
docker build -t myimage .
