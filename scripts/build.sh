#!/bin/sh

tsc --noEmit false --generateCpuProfile ./lib/performance/tools.cpuprofile || exit 1
