#!/usr/bin/env bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $KILO_TOKENS"
