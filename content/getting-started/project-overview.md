---
title: "反物质维度MOD Wiki:项目概览"
description: "反物质维度 MOD 的双端仓库、冻结基线与交付目标"
tags:
  - overview
---

# 项目概览

反物质维度（Antimatter Dimensions）MOD，产品名 **Oreki Edition**，Android 与 Web 双端并行。

## 仓库分工

| 仓库 | 职责 |
| --- | --- |
| OrekiDawson/AD-Oreki-Edition-Android | Android 源码、构建链、基线、AVD 验收与发布 |
| OrekiDawson/AD-Oreki-Edition-Web | Web 源码、Playwright 验证、oreki.net 部署 |
| OrekiDawson/AD-Oreki-Unified | 统一管理：规则、事实索引、报告、交接（不含子仓库源码） |
| OrekiDawson/AD-Oreki-Knowledge | 本知识库（Quartz 5 + GitHub Pages） |

## 冻结基线

- Android：官方 3.21.0，base APK SHA-256 <code>4e9970a808d10b6cc1a1068b078ec3c7d922051086a576c66d071c1216f527ac</code>，
  versionCode <code>30210000</code>，minSdk 32 / targetSdk 37。
- Web：冻结上游 <code>IvarK/AntimatterDimensionsSourceCode</code> @ <code>5409e320cecef96a917cca1dfb68f1f183e499ca</code>。
- 未经用户授权不得自动升级、合并上游或修改冻结基线（见 [[source-index]]）。

## 交付目标

1. 全新建档真实墙钟 ≤180 分钟合法通关（禁止伪造资源/进度/结算）。
2. 双端行为等价：阶段解锁、挑战结算、自动购买器、资源扣费、成就链、教程。
3. 存档安全：原版/MOD、Android/Web、Android 与 Smali 跨构建兼容。
4. 正式发布走受保护 Candidate / Verify / Release 门禁，四渠道同一 APK SHA-256。

## 相关

[[project-status]] · [[android]] · [[saves]] · [[terminology]]