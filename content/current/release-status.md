---
title: "发布状态"
description: "发布事实截至 2026-11-16、发布策略核对截至 2026-11-17：Android 正式 GitHub Release 与四渠道核实边界"
tags:
  - 发布
---

本页回答「哪个 Android APK 已经发布、证据是什么、四渠道是否全部完成」。**GitHub Release 页面存在、CI 工作流成功与本地四渠道实物核验须分开判断。**

**证据时点：正式发布事实核实于 2026 年 11 月 16 日（UTC+8）；发布策略核对于 2026 年 11 月 17 日。**

## 当前可下载的版本

[Android 3.21.0（a12b5cd6）GitHub Release](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/releases/tag/android-update-3.21.0-a12b5cd6) 已于 **2026-11-16 05:04（UTC+8）** 发布，APK 文件名 `AD-Oreki-Edition-3.21.0.apk`，大小 **81,587,691 字节**，SHA-256：

`a12b5cd620280465805ec844ea9a8554277e51d87d769dde4120fa5db842da87`

这是本页核对到的最新 GitHub Release，**不再将 R103 写作最新版本**。下载后可自行比对 SHA-256；发布名称里的短哈希只是完整 SHA 的前缀。

## 四渠道状态与证据等级

| 渠道 | 截至本次核实的结果 |
| --- | --- |
| GitHub Releases | **已发布**：链接与 APK 资产公开可查 |
| OneDrive | **正式发布作业 SUCCESS**，本页未单独重新下载校验 |
| Google Drive | **正式发布作业 SUCCESS**，本页未单独重新下载校验 |
| 本地 SSH/SFTP | **待独立核实**，不因前三渠道成功就自动标 PASS |

[正式发布工作流 #43761268754](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43761268754) 的两个作业均为 SUCCESS：① 匹配锁定验收、候选 Artifact 与验签回执；② 将精确 APK 发布到 GitHub Releases、OneDrive 和 Google Drive。**这能证明 CI 侧完成发布作业，但无法代替对本地 SFTP 的独立证据检查。**

## 对应的构建与验证

- [候选构建 #43735315296](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43735315296)：PASS。
- [候选独立验证 #43735739171](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43735739171)：PASS。
- [正式发布 #43761268754](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43761268754)：SUCCESS。
- 版本身份：本页所述已发布 MOD 的 `versionCode` 为 `30210001`；[2026-11-17 核对的当前发布策略](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/scripts/release-gate-policy.json)记录 `lastPublishedVersionCode=30210001`、下一候选 `versionCode=30210002`（**未证明发布**）。官方 3.21.0 基线 `30210000` 不作为此次 MOD 新发布号。

**验证边界：** 当前 Wiki 尚未逐项读取这版 APK 对应的八项 AVD 场景、完整 180 分钟发布级运行记录和本地 SSH/SFTP 拉取回执，因此本页不额外声明它们全部独立 PASS。需要进一步核查时应直接读取上述 Run 的 Artifact 与项目报告，不以发布标题代替证据。

## 旧报告怎么办

早期的 R113-01 新档长跑 FAIL、R114-01 的 PR 审查阻塞与 AGP-only 拦截都应按**发生时的版本和时间**阅读；它们不能直接作为本次发布仍 BLOCKED 的理由。历史材料见 [[2026-11-15-r113-180min-fail|当时的长跑失败]]、[[2026-11-12-r103-release-baseline|R103 旧版记录]]。

[[project-status|项目当前进展]] · [[ci-cd|CI/CD 与发布门禁]] · [[apk-signing|签名与升级]] · [[known-issues|待核实事项]]
