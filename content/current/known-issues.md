---
title: "已知问题与已推翻结论"
description: "当前有效问题清单，以及被新证据推翻的历史判断"
tags:
  - issues
  - history
---

# 已知问题与已推翻结论

## 当前有效问题

| 问题 | 状态 | 处理 |
| --- | --- | --- |
| 180 分钟通关验证 | 进行中 | 新档真实墙钟长跑，AUTO 驱动，完成前保持 BLOCKED |
| AGP 与 Smali 晚期存档互读 | NOT RUN | 下一轮在 smali 稳定版与 AGP 候选间互导晚期存档 |
| R8 ON 正式化 | 未启用 | 需完整游戏与发布门禁后单独评估（[[r8]]） |
| build_mod.py 退役 | 长期目标 | 依赖 AGP 原生完整游戏（[[build-mod-retirement]]） |

## 已推翻或需更正的结论

### 1. 「全量 shadow 破坏存档是保存链断裂/异常被吞」

- 旧结论（R112）：全量 shadow 重映射后不写档，怀疑保存链断裂或异常被吞。
- 新证据（R113 AVD 线程栈）：逻辑线程 Runnable 卡在 SpeedrunMilestone 协程链，tick 停止；
  不是保存链断裂，也不是异常被吞。
- 当前判断：混合运行时调度类字节码差异导致 livelock，已由 [[kotlin-runtime]] 的 J8 混合转换修复。

### 2. 「旧 AGP 候选存档正常」

- 旧结论（R112）：早期 AGP 候选能正常写档，可用于对照。
- 新证据：<code>bf1c413b</code> 新档约 6s 崩溃；注入真实存档后同样冻结、0 写档。
- 当前判断：存档正常对照必须用 smali 稳定版（f388dc50）或已验证的 R110 构建（18716d87）。

### 3. 「shadow 集合覆盖不足（H2 假设）」

- 旧结论：25 个新增类可能引用 shadow 集合之外的 kotlin 类。
- 新证据：静态清点 25 类的 plain kotlin 引用 100% 落在 72 类 shadow 集合，kotlinx 引用为 0。
- 当前判断：H2 反驳；真正问题是新类需统一绑定 shadow 形态（PR #87 已修复）。

## 相关

[[project-status]] · [[coroutine-abi]] · [[save-compatibility]]