#!/bin/sh
pwd

## The "rush update" command installs the dependencies described in
## your package. json files, and updates the shrinkwrap file as
## needed. (This "shrinkwrap" file stores a central inventory of
## all dependencies and versions for projects in your repo. It is
## found in the "common/config/rush" folder.)
## Note that Rush always performs a single install for all projects
## in your repo.
## You should run "rush update" whenever you start working in a Rush
## repo, after you pull from Git, and after you modify a
## package.json file. If there is nothing to do, "rush update" is
## instantaneous.
## NOTE: In certain cases "rush install" should be used instead of
## "rush update" -- for details, see the command help for
## "rush install".

# -p, --purge   Perform "rush purge" before starting the installation
# --full        Normally "rush update" tries to preserve your
#               existing installed versions and only makes the
#               minimum updates needed to satisfy the package.json
#               files. This conservative approach prevents your PR
#               from getting involved with package updates that are
#               unrelated to your work. Use "--full" when you really
#               want to update all dependencies to the latest
#               SemVer-compatible version. This should be done
#               periodically by a person or robot whose role is to
#               deal with potential upgrade regressions.

rush update -p --full

# https://rushjs.io/pages/commands/rush_update/

## This command assumes that the package.json file for each project
## contains a "scripts" entry for "npm run build" that performs a
## full clean build. Rush invokes this script to build each project
## that is registered in rush.json. Projects are built in parallel
## where possible, but always respecting the dependency graph for
## locally linked projects. The number of simultaneous processes
## will be based on the number of machine cores unless overridden
## by the --parallelism flag. (For an incremental build, see
## "rush build" instead of "rush rebuild".)

# -v, --verbose    Display the logs during the build,
#                  rather than just

rush rebuild -v

# https://rushjs.io/pages/commands/rush_rebuild/
pwd
