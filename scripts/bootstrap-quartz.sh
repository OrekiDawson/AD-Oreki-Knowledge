#!/usr/bin/env bash
# 薄仓库构建准备：clone 固定版本的官方 Quartz 5 源码，再叠加本仓库内容。
# 用法: bash scripts/bootstrap-quartz.sh <target_dir>
set -euo pipefail
TARGET="${1:-.quartz-build}"
PIN="7cfb0796165c848be5438117e9806802123bf676"
rm -rf "$TARGET"
git clone --depth 1 --branch v5 https://github.com/jackyzha0/quartz.git "$TARGET"
ACTUAL="$(git -C "$TARGET" rev-parse HEAD)"
if [ "$ACTUAL" != "$PIN" ]; then
  echo "FAIL: Quartz v5 tip ${ACTUAL} 与固定版本 ${PIN} 不一致；请人工审核后更新 scripts/bootstrap-quartz.sh" >&2
  exit 1
fi
rm -rf "$TARGET/content"
cp -r content "$TARGET/content"
cp quartz.config.yaml "$TARGET/quartz.config.yaml"
mkdir -p "$TARGET/scripts"
cp -r scripts/. "$TARGET/scripts/"
cp README.md "$TARGET/README.md"
echo "Quartz source ready at $TARGET (pin $PIN)"