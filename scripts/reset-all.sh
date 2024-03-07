#!/bin/sh

rush purge
rush update
rush rebuild


# Starting "rush check"

#
#   ^5.39.0
#    - @luxcium/bigintstring
#    - home-react
#    - home-react-two
#    - service-one
#    - service-two
#   ^5.36.1
#    - api-server
#   5.39.0
#    - scratch-server

# @typescript-eslint/parser
#   ^5.39.0
#    - @luxcium/bigintstring
#    - home-react
#    - home-react-two
#    - service-one
#    - service-two
#   ^5.36.1
#    - api-server
#   5.39.0
#    - scratch-server

# eslint
#   ^8.25.0
#    - @luxcium/bigintstring
#    - api-server
#    - home-react
#    - home-react-two
#    - service-one
#    (and 1 others)
#   8.25.0
#    - scratch-server

# eslint-import-resolver-typescript
#   ^3.5.1
#    - @luxcium/bigintstring
#    - api-server
#    - home-react
#    - home-react-two
#    - service-one
#    (and 1 others)
#   3.5.1
#    - scratch-server

# eslint-plugin-simple-import-sort
#   ^8.0.0
#    - @luxcium/bigintstring
#    - api-server
#    - home-react
#    - home-react-two
#    - service-one
#    (and 1 others)
#   8.0.0
#    - scratch-server

# nodemon
#   ^2.0.20
#    - @luxcium/bigintstring
#    - home-react
#    - home-react-two
#    - service-one
#    - service-two
#   ^2.0.19
#    - api-server
#   2.0.20
#    - scratch-server

# Found 6 mis-matching dependencies!

# rush add -p @typescript-eslint/eslint-plugin -p @typescript-eslint/parser -p eslint -p eslint-import-resolver-typescript -p eslint-plugin-import -p eslint-plugin-simple-import-sort -p nodemon --dev --all --make-consistent

#  WARN  Issues with peer dependencies found
# ../../services/phash-convertor
# └─┬ eslint-import-resolver-typescript 3.5.1
#   └── ✕ missing peer eslint-plugin-import@"*"
# Peer dependencies that should be installed:
#   eslint-plugin-import@"*"

# ../../services/redis-services
# └─┬ eslint-import-resolver-typescript 3.5.1
#   └── ✕ missing peer eslint-plugin-import@"*"
# Peer dependencies that should be installed:
#   eslint-plugin-import@"*"

# ../../utils/human-size
# └─┬ eslint-import-resolver-typescript 3.5.1
#   └── ✕ missing peer eslint-plugin-import@"*"
# Peer dependencies that should be installed:
#   eslint-plugin-import@"*"

# Copying "/home/luxcium/projects/monorepo-one/common/temp/pnpm-lock.yaml"
#   --> "/home/luxcium/projects/monorepo-one/common/config/rush/pnpm-lock.yaml"

