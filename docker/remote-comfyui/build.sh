#!/bin/bash
# now that we created the Dockerfile, we can build the image using this script
# move into the folder containing this script
cd "$(dirname "$0")" || exit
PORT=${1:-8181} # 8182 is the secondary port for this ComfyUI configuration.

# build the image
# docker build -t myimage .
# docker build -t comfyui .
docker build --build-arg DEFAULT_PORT="${PORT}" -t comfyui .
