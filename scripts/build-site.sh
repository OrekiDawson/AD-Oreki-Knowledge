#!/usr/bin/env bash
# 本地/CI 构建：薄仓库 + 官方 Quartz 5 源码
set -euo pipefail
TARGET=".quartz-build"
bash scripts/bootstrap-quartz.sh "$TARGET"
cd "$TARGET"
npm ci
npx quartz plugin install --from-config
node scripts/check-content.mjs
npx quartz build
node scripts/verify-build.mjs
echo "site built: $TARGET/public"