#!/bin/env bash

echo "The present directory is $(pwd)"

destinationPATH="$(dirname -- "$0")"
export destinationPATH
catchupPATH="$(/bin/pwd)"
export catchupPATH

_cd() {
  builtin cd "$destinationPATH" || echo return 1
  local tentativePath="${*:-${catchupPATH}}"
  builtin cd .. || return 2
  printf "The script you are running transferred you to:\n%s\n" "$(pwd)"
  echo ''
  (
    [[ -x $(which lolcat) ]] && (
      pwd | lolcat 2>/dev/null
    )
  ) || (
    [[ -x $(which /bin/pwd) ]] && /bin/pwd
  )
  (
    [[ -x $(which colorls) ]] && (
      colorls -lA --sd -d --gs
    )
  ) || (
    [[ -x $(which /bin/ls) ]] && /bin/ls --color=auto -hal
  )
  (
    [[ -x $(which lolcat) ]] && (
      pwd | lolcat 2>/dev/null
    )
  ) || (
    [[ -x $(which /bin/pwd) ]] && /bin/pwd
  )
  echo ''
}

_cd || echo "FAILED TO CD TO $destinationPATH"
unset -f _cd
