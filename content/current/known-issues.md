---
title: "已知问题与已推翻结论"
description: "当前仍有效的工程问题清单，以及被新证据推翻的历史判断与现行处理方式"
tags:
  - 问题
---


本页把「仍然有效的问题」和「已经被推翻的旧结论」分开列出：前者需要继续处理，后者只保留必要的解释与证据，避免后来者重复走错路。过程细节与当时判定在[历史归档](/history/)。

最后核实：**2026-11-15 21:25（UTC+8）**。

## 当前有效问题

| 问题 | 状态 | 处理与证据 |
| --- | --- | --- |
| 新档 180 分钟真实通关 | **FAIL**（最近完整跑次）；新长跑进行中，终局 **NOT RUN** | [[2026-11-15-r113-180min-fail|历史记录]]；[PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90) |
| 第 2 次现实后 `realities` 卡在 2 | **已提交修复；真实新档已推进到 realities=6（阶段性，非终局）** | [PR #92](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/92)；[[2026-11-15-r114-reality-autoeternity|历史记录]] |
| 独立阶段门禁验收（当前 MOD 构建） | **NOT RUN** | 历史轮次有 PASS 记录，但不是本轮复验；见 [[stage-gates]] |
| AGP↔Smali 晚期存档互读 | **NOT RUN** | 早中期跨构建写读曾 PASS；见 [[saves]] |
| PR #92 / #93 评审会话未解决 | **BLOCKED**（按 Lead 2026-11-15 21:05 核实；修复中） | 此前「等待 android-signing 批准」的记录已更正，见 [[release-status]] |
| AGP-only 生产门禁 fail-closed | **CONFIRMED（静态）**；候选构建被阻断 | `scripts/enforce_agp_only.py` 退出码 1 |
| R8 ON 正式化 | 未启用 | Release 默认 R8 OFF；见 [[r8]] |
| `build_mod.py` 退役 | 长期目标，进行中 | 依赖 AGP 原生完整游戏验收；见 [[build-mod-retirement]] |

## 已推翻或需更正的结论

### 1. 「全量 shadow 破坏存档是保存链断裂或异常被吞」

- 旧结论（R112）：全量 shadow 重映射后不写档，怀疑保存链断裂或异常被吞。
- 新证据（R113 AVD 线程栈）：逻辑线程 Runnable 卡在 SpeedrunMilestone 协程链，tick 停止——不是保存链断裂。
- 当前判断：混合运行时调度类字节码差异导致 livelock，已由 J8 混合转换修复；机制见 [[kotlin-runtime]]，历史见 [[2026-11-15-r113-p0-livelock]]。

### 2. 「旧 AGP 候选存档正常」

- 旧结论（R112）：早期 AGP 候选能正常写档，可用于对照。
- 新证据：`bf1c413b` 新档约 6 秒崩溃；注入真实存档后同样冻结、0 写档。
- 当前判断：存档对照必须使用 smali 稳定版（`f388dc50`）或已验证的 R110 构建（`18716d87`）。

### 3. 「shadow 集合覆盖不足（H2 假设）」

- 旧结论：25 个新增类可能引用 shadow 集合之外的 Kotlin 类。
- 新证据：静态清点 25 类的 plain Kotlin 引用 100% 落在 72 类 shadow 集合内，kotlinx 引用为 0。
- 当前判断：H2 被反驳；真正问题是新类需统一绑定 shadow 形态（PR #87 已修复）。

### 4. 「阶段门禁已验证」

- 旧结论：状态页曾把「阶段门禁」写成整体已验证。
- 新证据：现有 PASS 记录来自 R101 的**非法永恒页签直达/恢复**等历史轮次，且当前 MOD 构建没有做过独立阶段门禁验收；R114-01 长跑仍在进行。
- 当前判断：**历史轮次有 PASS 记录，当前构建的独立阶段门禁验收为 NOT RUN**。见 [[stage-gates]]。

### 5. 「天神策略叶子缺失已解决，因此通关只差时间」

- 旧结论（PR #91 后）：叶子补齐、`unknownLeaf=0`，阶段机恢复推进。
- 新证据：60 分钟新档 `realities` 仍为 2、`canReality=false` 持续、RM 顶到原版硬上限。
- 当前判断：叶子问题已解决，但通关仍受「现实后自动永恒复位」影响，转入 R114-01 处理。见 [[2026-11-15-celestial-leaves-fix]]。

## 相关条目

[[project-status]] · [[release-status]] · [历史归档](/history/) · [[stage-gates]]
