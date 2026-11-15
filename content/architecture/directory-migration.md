---
title: "目录标准化迁移"
description: "Issue #61：从双 Gradle/脚本布局到标准 AGP 工程的分阶段迁移"
tags:
  - android
  - migration
---

# 目录标准化迁移

长期目标：把历史双 Gradle/脚本布局整理为标准 AGP 9.5.1 工程（Issue #61）。自 R113-01 起，
它与 Issue #52（退役 build_mod.py）并列为最高工程架构主线。

## 阶段划分

| 阶段 | 内容 | 状态 |
| --- | --- | --- |
| S0/S1 | 盘点、依赖与消费者核对 | 完成 |
| S2-6 | 生产 Kotlin 源码迁入 <code>app/src/main/kotlin/</code> | **PASS**（PR #83） |
| S3 | 根级正式 AGP 入口切换 | NOT RUN |
| S4 | 退役旧 Groovy 入口与 build_mod.py | NOT RUN |

## S2-6 实际结果

- 36 个 <code>.kt</code> 用 <code>git mv</code> 迁移，保留 Git 历史。
- 全部消费者同步：AGP sourceSets、根 build.gradle、build_mod.py、命名守卫、Rust 指纹、R8 keepgen、
  教程链、调度检查、CI 路径过滤与测试。
- 验证：同一 game jar 重建的 AGP 完整游戏 APK 与迁移前**逐字节相同**
  （<code>15a21f5d57c4b2e0c513398a17944a512b95fe17d186036dc1e234c395958d17</code>）。
- 命名增量守卫支持 rename 配对：36 moved / 历史违规 15 / 当前 15 / 无新增。
- CI 目录门禁：<code>scripts/check_directory_layout.py</code>，迁移后 phase=nested-new。

## 迁移纪律

- 一次一个可验收闭包，小 PR、Required Checks。
- 旧/新并存期必须显式声明 Source Sets，避免重复类。
- 未切换根级正式入口前，不得声称迁移全部完成。
- 不移动 <code>build/</code>、<code>release/</code>、<code>savestates/</code>、冻结基线与唯一证据。

## 证据

状态：S2-6 已验证；S3/S4 未开始
证据等级：实测（APK 逐字节一致）
适用版本：Android 3.21.0
来源 Commit：<code>ae734966bf712faca3ff7bbb389d8724a8efe7e5</code>（PR #83）

## 相关

[[android]] · [[agp]] · [[build-mod-retirement]]