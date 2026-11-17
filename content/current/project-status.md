---
title: "当前项目状态"
description: "截至 2026-11-16：Android 新版 GitHub Release、Web 真实新档通关证据、双端体验目标与待核验事项"
tags:
  - 状态
---

这一页只总结**目前可查证的进展**。历史上失败的长跑、已关闭的阻塞和当时的推断会保留在[历史归档](/history/)，但不再充当现行状态。

**最后核实：2026 年 11 月 16 日（UTC+8）**，依据下文链接中的 GitHub 工作流、Release 与事实台账。后续结果请以更新的原始记录为准。

## 目前最重要的三件事

**Android 已产生新的 GitHub Release。** 正式发布工作流 [#43761268754](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43761268754) 的「锁定验收、候选 Artifact 与验签回执」及「发布到 GitHub、OneDrive、Google Drive」作业均为 SUCCESS；[Android 3.21.0（a12b5cd6）](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/releases/tag/android-update-3.21.0-a12b5cd6) 已公开。第四渠道本地 SSH/SFTP 的独立校验记录，本次尚未核对，不能据此声称“四渠道全部独立 PASS”。

**Web 有从全新存档达到真实终局的公开实测。** 线上 `oreki.net` 的记录在墙钟 **742.1 秒**出现 `isGameEnd: false → true`，之后 120 秒仍保持 true。**该测试以默认 10000× 游戏速度开跑，末段动态升档**；不能省略倍率，把此时间描述为原版或正常速度通关。证据见 [Web 线上通关事实](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/facts/web.md#f-55)。

**项目已把“双端行为一致性、用户体验”调整为最高产品目标。** 保留真实墙钟 ≤180 分钟合法通关作为长期回归门槛，不伪造资源、挑战结算或成就。双端“各自曾成功通关”与“同样的游戏行为已逐场景等价验证”不是一回事。

## 当前证据表

| 项目 | 截至本次核实的状态 | 直接来源 |
| --- | --- | --- |
| Android 新版 Candidate 构建 | **PASS**，`30210001` | [构建 Run](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43735315296) |
| Candidate 独立验证 | **PASS** | [验证 Run](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43735739171) |
| Android GitHub Release | **已发布**，APK SHA-256 `a12b5cd620280465805ec844ea9a8554277e51d87d769dde4120fa5db842da87` | [Release 页面](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/releases/tag/android-update-3.21.0-a12b5cd6) |
| 三个云端渠道发布作业 | **SUCCESS（工作流层）**；未在本页逐渠道重下载校验 | [发布 Run](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43761268754) |
| 本地 SSH/SFTP 第四渠道 | **待核实**：缺少本页已核对的独立下载与 SHA 证据 | [[release-status]] |
| Web 新档到达真实终局 | **PASS（所述加速条件）**，线上 742.1 s | [Web 事实与采样口径](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/facts/web.md#f-55) |
| Android 新档 ≤180 分钟通关 | **项目已有达标反馈，公开完整证据待复核**；不将旧 R113 FAIL 当作新构建结论 | [[2026-11-15-r113-180min-fail|历史失败记录]] |
| Android / Web 逐场景行为等价 | **尚不能宣布全部 PASS**，需对齐解锁、资源、挑战、自动化、存档、GUI | [[parity]] |

## 如何理解旧报告

2026-11-15 R113-01 的 180 分钟失败（`creditsFinished=false`）是真实历史结果；它证明**当时的 APK**不达标，不能推断 11 月 16 日已发布的新 APK 或其后的实验也失败。同样，一次成功通关不能取代阶段门禁、存档和跨端一致性验收。

与产品体验直接相关的专题：[[automation|自动化]]、[[stage-gates|阶段门禁]]、[[saves|存档兼容]]、[[parity|双端一致性]]。

## 进一步核对

- [Android Release 与 APK SHA](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/releases/tag/android-update-3.21.0-a12b5cd6)
- [受保护正式发布 Run](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43761268754)
- [Android 发布身份与候选事实](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/facts/release.md#f-candidate-30210001-status)
- [Web 线上真实通关事实](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/facts/web.md#f-55)

[[release-status|发布详情]] · [[known-issues|仍待确认的问题]] · [历史归档](/history/)
