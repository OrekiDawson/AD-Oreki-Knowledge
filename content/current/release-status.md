---
title: "发布状态"
description: "四渠道交付、发布门禁、android-signing 环境阻塞与 AGP-only fail-closed 的现行状态"
tags:
  - 发布
---


本页说明 Oreki Edition 现在**能不能发布**、被什么卡住、以及每条判断的来源。发布结论只认受保护流水线与真实设备验收，不能由源码 CI 通过或本地构建成功推断。

最后核实：**2026-11-15 21:25（UTC+8）**。

## 当前状态

| 交付渠道 | 状态 |
| --- | --- |
| GitHub Releases | **BLOCKED**（候选构建未通过门禁） |
| OneDrive | NOT RUN |
| Google Drive | NOT RUN |
| 本地 SSH/SFTP | NOT RUN |

2026-11-15 没有发布任何新的 Android 包。最近一次仍然有效的正式稳定版是 R103 的历史产物（APK SHA-256 `3d924271…`、`versionCode 30210000`），见 [[2026-11-12-r103-release-baseline|R103 历史记录]]；不得把实验候选或历史 APK 改名冒充新版本。

## 为什么仍然 BLOCKED

### 1. 真实通关目标未达成（FAIL）

**最近一次完整** 180 分钟长跑为 **FAIL**：10,805.8 秒时 `creditsFinished=false`、`realities=2`、`fullGameCompletions=0`。证据见 [180min-RESULT.md](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/d950d1102f13e81f78dfdcdfb308359ee3eb1633/reports/R113-01/180min-RESULT.md) 与 [[2026-11-15-r113-180min-fail|历史记录]]。

2026-11-15 20:07:19 起的新真新档长跑仍在进行：截至 21:22（UTC+8）`realities=6`、`creditsFinished=false`，**终局 NOT RUN**。阶段性推进说明 Reality 复位死锁已被打破，但**没有产生通关结论**，因此发布门禁仍未满足。

### 2. 评审会话未解决（按 2026-11-15 21:05 核实更正）

**此前的记录不准确**：本页曾把阻塞写成「`android-signing` 等待仓库所有者批准」。经 Lead 在 2026-11-15 21:05（UTC+8）核实，PR #92 / #93 此前阻塞的准确原因是**未解决的评审会话**，目前正在修复中；它不是「缺少审批」，也不是代码编译失败。

历史上确实存在一个等待 `android-signing` 环境的候选 Run：[43679508810](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43679508810)（验证 Job success；「构建、签名并证明候选 APK」Job 自 2026-11-15T05:05:00Z 起 waiting）。该记录保留为历史观察，但**不是当前阻塞的准确根因**。

当前状态：评审会话修复中（NOT RESOLVED）；在评审会话解决、AGP-only 门禁通过、真实通关验收完成之前，Candidate / Verify / Release 仍为 **BLOCKED**。

### 3. AGP-only 门禁 fail-closed（CONFIRMED，静态复核）

在本地对 Android 仓库执行：

~~~bash
python3 scripts/enforce_agp_only.py candidate
~~~

退出码 `1`，首个失败项为 `AGP_ONLY_BLOCKED: AGP still builds a bridge or a different package`。同时 `candidate-unified.yml` 仍调用 `buildKotlinDex`、`assembleRelease`、`installToRelease`，而门禁要求生产工作流调用 `bash ./gradlew -p agp :app:assembleRelease` 并禁止这些旧链入口。

**推断（INFERRED）**：即使人工批准签名环境，候选构建也很可能仍因 AGP-only 门禁而 FAIL；该结果尚未在 Run 中实际发生，不能写成「已经失败」。

## 发布门禁清单（全部通过才可发布）

| 门禁 | 状态 |
| --- | --- |
| 协程 ABI P0 闭环 | PASS（[[kotlin-runtime]]） |
| 挑战自动化 5 分钟功能性 | PASS（[[challenges]]） |
| 自动存档新档首写与重启读取 | PASS（[[saves]]） |
| 新旧存档读写的跨构建互读 | 部分 PASS；晚期互读 **NOT RUN** |
| 冷启动与进程重启 | PASS（候选阶段） |
| 候选阶段无关键崩溃 / ANR | PASS（5 分钟功能性范围） |
| 原包名与原签名证书 | 未变（`com.oreki.antimatterdimensions` / `95960bce…`），见 [[apk-signing]] |
| `versionCode` 严格递增 | 尚未产生新发布；历史最大值 30210000 |
| AGP 来源可追溯 | 本地产物可追溯；**受保护候选构建被门禁阻断** |
| 新档 ≤180 分钟真实通关 | **FAIL**（最近完整跑次）；新长跑进行中（NOT RUN） |
| 受保护 Candidate / Verify / Release | **BLOCKED** |

## 门禁流程

~~~text
public main SHA
  -> candidate-unified（评审会话修复中 + AGP-only 门禁）
  -> verify-unified（独立验签与 SHA 校验）
  -> release-validate-unified（发布前校验，不发布）
  -> release-unified（四渠道发布，同一 SHA-256）
~~~

所有正式构建、签名、验签与发布必须在受保护 CI/CD 环境执行；禁止手动上传 APK、绕过 Ruleset 或跳过 Required Checks。详见 [[ci-cd|CI/CD 与受保护门禁]]。

## 容易误判的地方

- **源码 CI PASS ≠ 候选构建 PASS ≠ 已发布。** 三条结论需要分别的 Run 证据。
- **本地构建成功 ≠ 可发布**：本地 APK 没有受保护签名与独立验签记录。
- **修复已提交 ≠ 已修复上线**：PR #92 仍 OPEN，功能验收进行中。
- **历史 APK 仍可下载 ≠ 当前版本可发布**：R103 是历史稳定版，不是本轮产物。

## 相关条目

[[project-status]] · [[ci-cd]] · [[apk-signing]] · [[2026-11-15-signing-blocked]]
