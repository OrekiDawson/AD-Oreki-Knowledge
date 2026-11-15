---
title: "AD-Oreki 技术知识库"
description: "反物质维度 MOD（Oreki Edition）Android / Web 双端技术事实、构建、反混淆与发布状态"
tags:
  - index
---

# AD-Oreki Knowledge Base

反物质维度 MOD（Oreki Edition）技术知识库。**GitHub 是权威事实源，本站是阅读与检索层。**
任何结论都以对应仓库的源码、PR、CI 与 AVD 证据为准；本站在冲突时明确标注待核实。

## 当前重要事实（2026-11-15）

- **R113-01 新档 180 分钟长跑：FAIL。** 已运行 180.1 分钟，未通关；正式 Release 继续 BLOCKED。请见 [[project-status]] 与 [Android PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90)。
- **已完成的 P0 存档/自动化修复** 不等于 180 分钟通关验收成功。页面和结论必须分别引用相应验证证据。

## 快速入口

| 主题 | 页面 |
| --- | --- |
| 项目全景与仓库分工 | [[project-overview]] |
| 当前状态与 P0/P1 | [[project-status]] |
| 已知问题与已推翻结论 | [[known-issues]] |
| 发布状态与四渠道 | [[release-status]] |
| Android 架构 | [[android]] |
| Kotlin 混合运行时 ABI | [[kotlin-runtime]] |
| 目录标准化迁移 | [[directory-migration]] |
| AGP 构建管线 | [[agp]] |
| Signature 回填 | [[signature-backfill]] |
| build_mod.py 退役 | [[build-mod-retirement]] |
| 挑战自动化 | [[challenges]] |
| 智能自动购买器 | [[automation]] |
| 存档兼容 | [[saves]] |
| 阶段门禁 | [[stage-gates]] |
| 协程 ABI 崩溃排查 | [[coroutine-abi]] |
| 来源索引 | [[source-index]] |

## 使用方式

- 顶部搜索框做全文检索（中文分词可用）。
- 右侧大纲定位章节；右栏显示反向链接与知识图谱。
- 每篇技术条目底部有证据区：状态、证据等级、适用版本、来源 Commit。

## 证据元数据约定

状态：已验证 / 进行中 / 已推翻 / 待确认。
证据等级：实测 / 读码 / 推断 / 未知。

> 本站 2026-11-15 建立第一期，覆盖核心主题。完整历史事实仍以 Android 仓库
> <code>docs/FACTS.md</code>（一万余行）与 <code>reports/</code> 为准，逐步迁移而非机械拆分。