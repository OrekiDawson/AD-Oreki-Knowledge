---
title: "当前项目状态"
description: "Android/Web 双端项目在 2026-11-15 的真实里程碑、长跑结果、待验证修复与发布阻塞"
tags:
  - 状态
---


本页回答「现在到底完成了什么」。它只写**当前有效结论**，每条都附可点击来源，并在有变化时更新；过程记录与当时判定移入[历史归档](/history/)，不混在状态页里。

最后核实：**2026-11-15 22:10（UTC+8）**。此后如有新的长跑、PR 或流水线结果，本页可能过期，引用前请回到原始链接确认。

## 一句话结论

Android 端已修复协程 ABI 崩溃与混合运行时 livelock，功能闭环可用；最近一次**完整** 180 分钟长跑仍为 FAIL。R114-01 的 Reality 修复仍在真实新档验证中：前序验证跑次（2026-11-15 20:07:19 起）已观察到 `realities` 从 0 推进到 9，但在 21:52 后被**最终跑次接替**，未产生终局 verdict。最终 180 分钟跑次于 **2026-11-15 22:04:55（UTC+8）** 开始，预计 **2026-11-16 01:04:55** 结束，**终局 NOT RUN**。**正式发布仍为 BLOCKED**（评审会话未解决 + AGP-only 门禁 fail-closed）。Web 端与知识库部署独立运行，不受 Android 发布阻塞影响。

## 里程碑与真实状态

| 项 | 状态 | 证据 |
| --- | --- | --- |
| 生产 Kotlin 源码迁入 `app/src/main/kotlin/`（目录迁移 S2-6） | PASS | [PR #83](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/83)，合并 `ca619e7d` |
| A 批协程 ABI 统一绑定 shadow + 构建期 fail-closed 守卫 | PASS | [PR #87](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/87)，合并 `7c9a1d4f` |
| 混合运行时 P0（存档 + 自动化功能闭环） | PASS（功能） | [PR #88](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/88)，合并 `ae734966`；[[2026-11-15-r113-p0-livelock|历史记录]] |
| 新档自动存档（≤90 秒首写） | PASS（40.2 秒首写） | [P0 闭环报告](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/ae734966bf712faca3ff7bbb389d8724a8efe7e5/reports/R113-01/P0-CLOSURE.md) |
| HOME 保存 / force-stop 保留 / 重启读取 | PASS | 同上 |
| 挑战自动化 5 分钟（0 FATAL / 0 ABI 崩溃 / 0 ANR） | PASS（功能性） | 同上；[[challenges|挑战与真实结算]] |
| 合法晚期存档（realities=12、Lai'tela、11 glyph）读写 | PASS | 同上；[[saves|存档兼容与自动保存]] |
| AGP↔Smali 晚期存档互读 | **NOT RUN** | 尚未执行；见 [[saves]] |
| 新档 ≤180 分钟真实通关 | **FAIL** | 2026-11-15 长跑 10,805.8 秒未通关；[[2026-11-15-r113-180min-fail|历史记录]]、[PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90) |
| 第 2 次现实后 `realities` 卡在 2 的修复 | **已提交，长跑验证中**（realities 2→6 已观察，终局 **NOT RUN**） | [PR #92](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/92)（OPEN）；[[2026-11-15-r114-reality-autoeternity|历史记录]] |
| 新真新档 180 分钟长跑（最终跑次，2026-11-15 22:04:55 起） | **进行中，终局 NOT RUN** | 见下节 |
| 独立阶段门禁验收（当前 MOD 构建） | **NOT RUN** | 见 [[stage-gates]] |
| 受保护 Candidate / Verify / Release 门禁 | **BLOCKED** | 见 [[release-status]] |
| 四渠道正式发布 | **NOT RUN** | 最近一次有效稳定版仍是 R103 |

## 最终 180 分钟长跑（2026-11-15 22:04:55 起）

真新档（`pm clear` 后全新存档）**最终** 180 分钟长跑于 **2026-11-15 22:04:55（UTC+8）** 开始，APK SHA-256 `f7f900ae61f41a52f1c0308c1a044e171d2d6914d059f487669a841cdeb8c51a`（`build/r114-final`，AGP 9.5.1 / R8 OFF），证据目录 `reports/R114-01/avd-evidence/fresh-180min-final/`，计划 180 分钟，预计 **2026-11-16 01:04:55** 前后结束。

截至本页最后核实时间，**尚无终局 verdict（NOT RUN）**；本页不写 PASS/FAIL，等 verdict 产出后更新。

### 前序验证跑次（20:07:19 起，已被最终跑次接替）

- 开始于 2026-11-15 20:07:19，APK `d75ac31d…`；观察到 `realities` 从 0 推进到 9（第 9 次现实发生在 t≈6015 秒前后）。
- 该跑次在 21:52 左右被停止/接替，**未生成 `verdict.json`**，因此**不构成通关判定**；其数据只作为「Reality 复位死锁已被打破」的阶段性证据。
- 证据目录：`reports/R114-01/avd-evidence/fresh-180min/`（最后采样 t=6317.0 秒、`realities=9`、`creditsFinished=false`）。

**这些都是过程观察，不是通关结论。** 在最终跑次结束并给出 verdict 之前，本页不会写 PASS，也不会更新「可以发布」。

## 已确认与未确认的边界

- **已确认**：协程 ABI 崩溃已修复；存档与自动化功能闭环；最近一次完整 180 分钟长跑的 FAIL 结论真实存在。
- **已确认（阶段性）**：R114-01 修复组件在真实新档中把 `realities` 从 2 推进到 9（前序跑次），说明「现实后自动永恒复位」的死锁已被打破；但这只是过程数据，**不等于通关 PASS**，也不等于修复已合并或已发布。最终跑次仍在进行（NOT RUN）。
- **已确认（静态）**：AGP-only 门禁对当前仓库执行 `python3 scripts/enforce_agp_only.py candidate` 退出码为 1；候选工作流仍含旧链调用。
- **未确认 / NOT RUN**：最终 180 分钟跑次终局、跨构建晚期存档互读、独立阶段门禁、受保护候选构建、正式发布。
- **推断（INFERRED）**：即使人工批准 `android-signing` 环境，候选构建也很可能因 AGP-only 门禁失败——这是推断，不是在 Run 中已发生的事实。

## 原始证据入口

- Android 仓库：[PR #88](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/88)、[PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90)、[PR #91](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/91)、[PR #92](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/92)
- 长跑与 P0 报告：`reports/R113-01/P0-CLOSURE.md`、`reports/R113-01/180min-RESULT.md`
- 状态类历史记录：[[2026-11-15-r113-180min-fail]]、[[2026-11-15-r114-reality-autoeternity]]

## 相关条目

[[release-status]] · [[known-issues]] · [[stage-gates]] · [[saves]] · [历史归档](/history/)