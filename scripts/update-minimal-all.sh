#!/bin/sh
pwd
rush add -p tslib@latest -p webpack@latest -p ts-jest@latest -p jest@latest -p ts-loader@latest -p ts-node@latest -p tsconfig-paths@latest -p typescript@latest --dev --exact --make-consistent --all
rush add -p @types/node@~18 --dev --make-consistent --all
rush purge --unsafe
rush update --full --recheck --network-concurrency 20
rush rebuild --verbose --ignore-hooks --timeline
rush check --verbose
pwd
