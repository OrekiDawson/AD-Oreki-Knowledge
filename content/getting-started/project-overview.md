---
title: "项目概览"
description: "反物质维度 MOD 的双端仓库分工、冻结基线、交付目标与当前整体状态"
tags:
  - 概览
---


**Oreki Edition** 是《反物质维度》的修改版本，Android 与 Web 双端并行开发。本条目说明项目由哪些仓库组成、两端各自冻结在什么版本、要达成什么目标，以及当前整体状态。

## 仓库分工

| 仓库 | 职责 |
| --- | --- |
| [AD-Oreki-Edition-Android](https://github.com/OrekiDawson/AD-Oreki-Edition-Android) | Android 源码、构建链、基线、AVD 验收与发布 |
| [AD-Oreki-Edition-Web](https://github.com/OrekiDawson/AD-Oreki-Edition-Web) | Web 源码、Playwright 验证、oreki.net 部署 |
| [AD-Oreki-Knowledge](https://github.com/OrekiDawson/AD-Oreki-Knowledge) | 本知识库（Quartz 5 + GitHub Pages） |

项目另有一个统一管理仓库，保存规则、事实索引、报告与交接，不包含子仓库源码，也不改变各仓库的 CI 与发布门禁。

## 冻结基线

| 端 | 基线 |
| --- | --- |
| Android | 官方 3.21.0；base APK SHA-256 `4e9970a8…`，`versionCode 30210000`，minSdk 32 / targetSdk 37 |
| Web | 上游 `IvarK/AntimatterDimensionsSourceCode` @ `5409e320cecef96a917cca1dfb68f1f183e499ca`（2026-07-17 快照） |

未经用户明确授权，不得自动升级、合并上游或修改冻结基线；允许只读监测上游安全与重大缺陷，用于评估选择性移植。

## 交付目标

1. **全新建档真实墙钟 ≤180 分钟合法通关**：禁止伪造资源、进度、挑战结算或成就。
2. **双端行为等价**：阶段解锁、挑战结算、自动购买器、资源扣费、成就链、教程。
3. **存档安全**：原版/MOD、Android/Web、AGP 与 Smali 跨构建兼容。
4. **正式发布走受保护门禁**：Candidate / Verify / Release，四渠道同一 APK SHA-256。

## 当前整体状态

- Android 端已修复协程 ABI 崩溃与混合运行时 livelock，功能闭环可用；
- **180 分钟真实通关仍未达成**：最近一次完整长跑 FAIL，新的真新档长跑进行中；
- **正式发布仍 BLOCKED**：签名环境待批准 + AGP-only 门禁 fail-closed；
- Web 端与知识库部署独立运行。

详细状态以 [[project-status|当前项目状态]] 与 [[release-status|发布状态]] 为准，历史过程见 [历史归档](/history/)。

## 相关条目

[[antimatter-dimensions]] · [[android]] · [[web]] · [[parity]] · [[source-index]]
