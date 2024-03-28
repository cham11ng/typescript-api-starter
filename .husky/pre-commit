#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged

# check if the .env file exist
if [ ! -f .env ]; then
  exit 0
fi

npx sync-dotenv
