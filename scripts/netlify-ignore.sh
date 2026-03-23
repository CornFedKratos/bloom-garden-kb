#!/usr/bin/env bash

# Netlify build ignore script
# Exit 0 = skip build, Exit 1 = proceed with build
#
# Only triggers a Netlify build when frontend-relevant files change.
# To force a build regardless, include [build] in the commit message
# or trigger manually from the Netlify dashboard.

set -euo pipefail

# Force build if commit message contains [build]
COMMIT_MSG=$(git log -1 --format="%s")
if echo "$COMMIT_MSG" | grep -q '\[build\]'; then
  echo "Commit message contains [build] — proceeding with build."
  exit 1
fi

# Frontend paths that should trigger a build
WATCH_PATHS=(
  "pages/"
  "components/"
  "styles/"
  "public/"
  "netlify.toml"
  "next.config.js"
  "tailwind.config.js"
  "postcss.config.js"
  "tsconfig.json"
  "package.json"
  "package-lock.json"
)

# Check if any watched paths changed since the last deployed commit
# $CACHED_COMMIT_REF is set by Netlify to the last successfully built commit
DIFF_FILES=$(git diff --name-only "$CACHED_COMMIT_REF" HEAD)

for path in "${WATCH_PATHS[@]}"; do
  if echo "$DIFF_FILES" | grep -q "^${path}"; then
    echo "Frontend change detected in ${path} — proceeding with build."
    exit 1
  fi
done

echo "No frontend changes detected — skipping build."
exit 0
