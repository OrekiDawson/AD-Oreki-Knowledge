---
title: "2026-11-15 · R114-01 现实自动永恒复位修复（进行中）"
description: "记录 R114-01 对「第 2 次现实后 realities 卡在 2」的根因定位、已提交修复与进行中的长跑验证"
tags:
  - 历史
  - 现实
  - 进行中
---


> 本页是历史归档，记录**进行中**的修复与验证。修复尚未合并、未发布；最终结果以 [[project-status|当前项目状态]] 为准。

## 事件与时间

2026-11-15 19:58 起，分支 `r114-01/reality-autoeternity` 提交修复，目标是「第 2 次现实后 original 自动永恒复位导致 `realities` 卡在 2」。PR #92 目前为 **OPEN**（GitHub 显示 mergeable=CONFLICTING，属于合并顺序与文件冲突，不代表分支内容无效）。

## 当时结论（截至 2026-11-15 22:10 UTC+8）

| 项 | 状态 |
| --- | --- |
| 根因 | 已用真实 AVD logcat 证据确认：Reality 之后原版自动永恒复位把现实条件重置，导致 `realities` 停在 2 |
| 修复提交 | `70a8329a` → `aadebba7` → `53febade` → `6c7dbb87` |
| PR | [Android PR #92](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/92)（OPEN，未合并、未发布） |
| 功能验收 | **进行中**；前序验证跑次（20:07:19 起）观察到 `realities` 达 9 后于 21:52 被接替，未产生 verdict；**最终** 180 分钟跑次自 2026-11-15 22:04:55 开始（APK `f7f900ae…`），终局 **NOT RUN** |
| 附带修正 | `imaginaryUpgradeBits` 位号改为 Android 移植版内部 id：莱特拉 bit4、佩勒 bit14 |

前序验证跑次已确认的里程碑（20:07–21:52）：首无限/首永恒 275.8 秒；第 1～6 次 Reality 分别在 576.7 / 1218.6 / 1901.2 / 2603.5 / 3285.6 / 3948.6 秒；此后继续推进到 `realities=9`（最后采样 t=6317.0 秒、`creditsFinished=false`）。20:27:22 日志记录托管层 `re-enabled after reality reset realities=2`（`isActive` 由 true→false→true），说明修复在真新档的 Reality 复位后生效。**但该跑次未产生 verdict，已被最终跑次接替；通关结论仍未产生。**

## 后续变化与是否仍然有效

- 修复「已提交、验证中」，**不得写成已修复上线或已通关**。
- 若新长跑最终 FAIL，仍需保留本记录并另立新的历史条目说明结果；若最终 PASS，也要等 PR 合并与门禁复验后才能更新正式状态。
- 前序 180 分钟 FAIL 记录见 [[2026-11-15-r113-180min-fail]]；策略叶子修复见 [[2026-11-15-celestial-leaves-fix]]。

## 原始证据

- [Android PR #92](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/92)
- 修复提交：[`70a8329a`](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/commit/70a8329a)、[`aadebba7`](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/commit/aadebba7)、[`53febade`](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/commit/53febade)、[`6c7dbb87`](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/commit/6c7dbb87)

## 相关条目

[[project-status]] · [[reality-time-studies]] · [[known-issues]]
