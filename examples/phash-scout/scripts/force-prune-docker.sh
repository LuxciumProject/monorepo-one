#!/bin/bash
# shellcheck disable=SC2046
docker rm --force $(docker ps -aq) 2>/dev/null
docker rmi --force $(docker images -aq) 2>/dev/null
# docker builder prune --force 2>/dev/null
