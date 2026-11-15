---
title: "build_mod.py 退役"
description: "Issue #52：彻底退役旧 Python 补丁构建链"
tags:
  - build
  - migration
---

# build_mod.py 退役

## 目标

最终删除 scripts/build_mod.py：正式构建、Candidate/Verify/Release 都不得依赖它
或其换名包装。正式构建以 AGP 9.5.1 + Gradle Kotlin DSL + Kotlin 业务源码为核心。

## 当前状态

| 项 | 状态 |
| --- | --- |
| 依赖清单与函数分级 | 进行中（见 docs/BUILDMOD_RETIREMENT_LEDGER.md） |
| 资源/Manifest 迁移 | 部分 |
| 教程与生成绑定 | 部分 |
| 业务补丁迁移 | 部分（Kotlin 重建） |
| 删除文件 | NOT RUN（需 AGP 原生完整游戏验收） |

## 纪律

- 退役不得牺牲玩家真实结算、阶段门禁、自动购买器、UI、存档或双端等价。
- 历史报告中的引用保留，不重写历史。
- 删除后 CI 需阻止正式构建重新引用旧脚本。

## 证据

状态：进行中
证据等级：读码 + 构建证据

## 相关

[[agp]] · [[directory-migration]] · [[ci-cd]]
