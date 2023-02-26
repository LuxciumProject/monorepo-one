#!/bin/bash

REDIS_6383_PING=$(redis-cli -p 6383 PING)
if [ "$REDIS_6383_PING" != 'PONG' ]; then
    /projects/monorepo-one/services/image-scout/docker_run_redis
    if ! /projects/monorepo-one/services/image-scout/docker_run_redis; then
        echo "docker_run_redis failed"
        exit 1
    fi
else
    echo 'already runing an instance of redis-cli <port=6383>'
fi

sleep 2
echo 'Will now monitor:'
redis-cli -p 6383 monitor
