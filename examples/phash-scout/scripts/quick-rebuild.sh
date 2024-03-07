#!/bin/bash
# shellcheck disable=SC2046
docker rm --force $(docker ps -aq) 2>/dev/null
docker rmi --force $(docker images -aq) 2>/dev/null
# docker builder prune --force 2>/dev/null

REDIS_MOUNT="${HOME}"/DATA/redis/6383

docker build --tag luxcium-imagescout:0.1.1b /projects/monorepo-one/services/image-scout/
# docker run --interactive --tty --rm --publish 6383:6383 --volume "${REDIS_MOUNT}":/data --name imgscout-b --entrypoint /bin/bash luxcium-imagescout:0.1.1b
# docker run --rm --publish 6383:6383 --volume "${REDIS_MOUNT}":/data --name imgscout-b luxcium-imagescout:0.1.1b
docker run --detach --rm --publish 6383:6383 --volume "${REDIS_MOUNT}":/data --name imgscout-b luxcium-imagescout:0.1.1b

# --detach
# --interactive --tty
# --rm

sleep 2
redis-cli -p 6383 PING OK
