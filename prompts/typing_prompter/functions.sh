#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# functions.sh

generate_random_delay() {
  local min_delay="$1"
  local max_delay="$2"

  awk -v min="$min_delay" -v max="$max_delay" 'BEGIN{srand(); print min+rand()*(max-min)}'
}
