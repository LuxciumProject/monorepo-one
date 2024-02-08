#!/usr/bin/env bash
function do_the_thing() {
  sleep 0
}

pwd
CWD_=$(pwd)
builtin cd /projects/monorepo-one/
builtin cd backend/scratch
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd frontend/home
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/bigintString
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/colors-tools
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/boxed-list
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/object-with-expectations
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/human-size
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/parallel-mapper
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/mapping-tools
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/restraining-zalgo
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd library/tools
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/phash-compute
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/scan-directories
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/rpc-worker-pool
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/redis-services
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/service-one
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/service-two
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd services/mongo-service
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd examples/phash-scout
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd examples/template
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd examples/open-ai
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd examples/gpu-stuff
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd examples/playground
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd examples/node-js
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd backend/api/api-package
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd backend/api/comments
do_the_thing
builtin cd /projects/monorepo-one/
builtin cd backend/api/posts
do_the_thing
builtin cd $CWD_
pwd
