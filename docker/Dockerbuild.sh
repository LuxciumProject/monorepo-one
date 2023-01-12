#!/usr/bin/env bash

docker build --build-arg NODE_VERSION=18 --build-arg TYPESCRIPT_VERSION=4.0.3 -t my-ts-image .
