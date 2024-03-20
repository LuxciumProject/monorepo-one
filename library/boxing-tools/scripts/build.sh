#!/usr/bin/bash

tsc --noEmit false || exit 15
prettier --write "dist/**/*.{js,mjs,cjs,jsx}" || exit 13
echo -e "\n\033[32m―0K―\033[0m\n"
exit 0
