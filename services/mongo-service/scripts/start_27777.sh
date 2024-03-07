#!/usr/bin/bash

# REDIS_6383_PING=$(redis-cli -p 6383 PING)
# if [ "$REDIS_6383_PING" != 'PONG' ]; then
#     services/image-scout/docker_run_redis
# else
#     echo 'already runing an instance of redis-cli <port=6383>'
# fi
# sleep 2
# echo 'Will now monitor:'
# redis-cli -p 6383 monitor
# # 27777:27017

function main() {
    SCRIPT_DIR=$(getSource)
    cd "$SCRIPT_DIR" || return
    MONGO_MOUNT=var/DATA/mongo/27777

    (docker container rm local-mongo) >/dev/null ||
        (docker container stop local-mongo) >/dev/null &&
        (docker container rm local-mongo) >/dev/null

    docker run --detach --interactive --tty --rm --publish 27777:27017 --volume "${MONGO_MOUNT}":/data --name local-mongo mongo || return 55
}
#
function getSource() {
    SOURCE=${BASH_SOURCE[0]}
    while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
        DIR=$(cd -P "$(dirname "$SOURCE")" >/dev/null 2>&1 && pwd)
        SOURCE=$(readlink "$SOURCE")
        [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
    done
    (cd -P "$(dirname "$SOURCE")" >/dev/null 2>&1 && pwd)
}

# pwd
# main
# pwd

# unset -f main
# unset -f getSource
# abef1c86-dfe3-4944-8e27-4656a247e62d
