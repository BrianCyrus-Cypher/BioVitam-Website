#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  readonly husky_env="$(dirname "$0")/husky.env"
  [ -f "$husky_env" ] && . "$husky_env"

  if [ "$husky_skip_hooks" = "1" ]; then
    echo "husky - skip hooks (env)"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    echo "husky - skip hooks (~/.huskyrc)"
    exit 0
  fi

  readonly hook_name="$(basename "$0")"
  if [ -n "$HUSKY" ] && [ "$HUSKY" = "0" ]; then
    echo "husky - skip hooks (env)"
    exit 0
  fi

  [ -f "$HUSKY_GIT_PARAMS" ] && . "$HUSKY_GIT_PARAMS"
fi
