#!/bin/sh

REDIS_6383_PING=$(redis-cli -p 6383 PING)
if [ "$REDIS_6383_PING" != 'PONG' ]; then
    services/image-scout/docker_run_redis
else
    echo 'already runing an instance of redis-cli <port=6383>'
fi
sleep 2
echo 'Will now monitor:'
redis-cli -p 6383 monitor
