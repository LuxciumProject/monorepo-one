#!/bin/sh
tsc --noEmit false --generateCpuProfile "./out/performance/out.cpuprofile" || exit 1
