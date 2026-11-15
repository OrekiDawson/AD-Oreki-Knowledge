---
title: "反物质维度MOD Wiki:发布状态"
description: "四渠道交付、发布门禁与当前 BLOCKED 原因"
tags:
  - release
---

# 发布状态

## 当前状态

| 交付渠道 | 状态 |
| --- | --- |
| GitHub Releases | BLOCKED（未通过发布门禁） |
| OneDrive | NOT RUN |
| Google Drive | NOT RUN |
| 本地 SSH/SFTP | NOT RUN |

R113-01 轮内**未发布任何 Android 包**。本轮 [180 分钟新档长跑](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/d950d1102f13e81f78dfdcdfb308359ee3eb1633/reports/R113-01/180min-RESULT.md) 已明确 **FAIL**（creditsFinished=false；realities=2；fullGameCompletions=0）。P0 存档/自动化修复的局部 PASS 不代表通关目标 PASS；Release 必须继续 BLOCKED。最近一个仍有效的稳定版是 R103 的历史产物，
不得把实验候选或历史 APK 重新命名冒充新版本。

## 发布门禁（全部门禁通过才可发布）

1. Kotlin ABI P0 闭环（已 PASS）。
2. 挑战自动化正常（已 PASS）。
3. 自动存档正常（已 PASS）。
4. 新旧存档读取兼容（部分 PASS，跨构建互读 NOT RUN）。
5. 未通关晚期 glyph 路径验证（部分 PASS）。
6. 冷启动与进程重启 PASS。
7. 无关键崩溃、ANR（候选阶段 PASS）。
8. 原包名 <code>com.oreki.antimatterdimensions</code>、原签名证书。
9. versionCode 正确递增（历史最大 30210000）。
10. AGP 来源可追溯。
11. R113 候选真实 ≤180 分钟通关（**FAIL**：已完成 180.1 分钟实测，但未通关；详见 [PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90)）。
12. 受保护 Candidate / Verify / Release 门禁通过。

## 门禁流程

~~~
public main SHA -> candidate-unified -> verify-unified -> release-validate-unified -> release-unified
~~~

所有正式构建、签名、验签与发布必须在受保护 CI/CD 环境执行，禁止手动上传 APK 或绕过 Ruleset。

## 相关

[[ci-cd]] · [[project-status]] · [[source-index]]