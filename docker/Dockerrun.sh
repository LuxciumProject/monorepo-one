#!/usr/bin/env bash

docker run -e TEST_PACKAGE_FILE=mapping-tools-0.0.0-ALPHA-UNSAFE-v6.0.0x.tgz -e TEST_COMMAND="node /path/to/compiled/javascript/project.js runTests" my-ts-image