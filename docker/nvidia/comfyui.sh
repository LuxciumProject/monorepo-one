#!/usr/bin/env bash

# This script is used to run the stable-diffusion experiment on a single machine.
# shellcheck disable=SC1091
# source /projects/monorepo-one/docker/nvidia/build.sh
docker run --gpus='"device=1"' --network="host" \
  -v /home/luxcium/seagate/models:/app/models \
  -v /projects/monorepo-one/static/stable-diffusion/ComfyUI/custom_nodes:/app/custom_nodes \
  -v /projects/monorepo-one/static/stable-diffusion/ComfyUI/input:/app/input \
  -v /projects/monorepo-one/static/stable-diffusion/ComfyUI/output:/app/output \
  -e PORT=8181 comfyui
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
#   CMD [ "curl", "-f", "http://localhost:8181/health" ]
