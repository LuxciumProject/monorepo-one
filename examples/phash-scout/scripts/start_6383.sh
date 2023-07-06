#!/bin/bash

if ! command -v redis-cli &>/dev/null; then
    echo "redis-cli does not exist. Please install Redis or make sure redis-cli is in your system PATH."
    exit 1
fi

REDIS_6383_PING=$(redis-cli -p 6383 PING)

if [ "$REDIS_6383_PING" != 'PONG' ]; then
    /projects/monorepo-one/services/image-scout/docker_run_redis
    if ! /projects/monorepo-one/services/image-scout/docker_run_redis; then
        echo "docker_run_redis failed"
        exit 1
    fi
else
    echo 'already running an instance of redis-cli <port=6383>'
fi

# Add a delay to allow time for the Docker container to start up
sleep 2

echo "redis-cli exists. Proceeding with command execution..."
redis-cli -h localhost -p 6383 COMMAND list
redis-cli -h localhost -p 6383 MODULE LIST
echo 'Will now monitor:'
redis-cli -p 6383 monitor
