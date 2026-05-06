#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")/.."
node backend/news-agent.mjs
