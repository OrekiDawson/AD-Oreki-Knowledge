---
title: "CI/CD 与受保护门禁"
description: "公开源码检查、受保护候选构建、独立验签与四渠道发布的流水线分工和失败处理原则"
tags:
  - CI
  - 发布
---


正式构建、签名、验签与发布必须走受保护的 GitHub Actions 流水线，而不是在本机手动打包上传。理解流水线分工，才能判断「现在到底卡在哪一步」。本条目解释工作流职责、门禁冻结点与常见误区。

## 工作流分工

| 工作流 | 作用 | 是否受保护 |
| --- | --- | --- |
| `ci.yml` | 公开源码规范与回归检查（Required Check） | 否（公开源码） |
| `candidate-unified.yml` | 完整游戏候选构建，输入为 `main` 上的精确 SHA | 是，`android-signing` 环境 |
| `verify-unified.yml` | 独立验证候选 APK 的 SHA 与签名 | 是 |
| `release-validate-unified.yml` | 发布流程验证（不发布） | 是 |
| `release-unified.yml` | 四渠道正式发布 | 是，`stable-release` 环境 |
| `release-gate-unified.yml` | 发布门禁评审 | 是，`android-release-review` 环境 |

候选构建只接受公开 `main` 上、且已有成功源码 CI 的精确 SHA；它不会构建任意分支或未经验证的提交。

## 硬规则

- 正式构建/签名/验签/发布必须走 CI/CD；禁止直推绕过、跳过检查、关闭 Ruleset、手动上传 APK。
- 发布用 APK 必须四渠道同一 SHA-256。
- 受保护 Runner 不执行不可信公开 PR 代码；Secrets 不进 Git。
- 失败修流水线，不修门禁；不得删除测试、吞异常或改预期来制造 PASS。
- 有强制人工批准的环境（如 `android-signing`），必须获得批准，不能由自动化替代。

## 当前阻塞点

1. **签名环境未批准**：Run [43679508810](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43679508810) 的构建 Job 自 2026-11-15T05:05Z 起 waiting，等待 `android-signing` 环境批准。
2. **AGP-only 门禁 fail-closed**：本地静态复核 `python3 scripts/enforce_agp_only.py candidate` 退出码 1；工作流仍含旧链调用。
3. **真实通关未达成**：180 分钟长跑 FAIL（最近完整跑次），新长跑进行中。

推断（INFERRED）：即使批准签名环境，候选构建也可能因 AGP-only 门禁失败；这尚未在 Run 中实际发生。

## 记录字段

一次可追溯的发布应记录：源码 SHA、Candidate Run ID、Verify Run ID、APK SHA-256、证书 SHA-256、包名、`versionCode`/`versionName`、AVD 验收结果、存档与结算结论。缺任何一项都不能称为「已发布稳定版」。

## 容易误判的地方

- **源码 CI PASS ≠ 候选构建 PASS**：前者只检查公开源码。
- **候选构建 PASS ≠ 可发布**：还要独立验签、AVD 验收与发布门禁。
- **本地构建 PASS ≠ 受保护构建 PASS**：本地产物没有签名环境与独立验签记录。
- **工作流 waiting ≠ 失败**：需要人工批准的 Job 会长时间等待，不能写成 FAIL 或 PASS。

## 已确认与未确认

- **已确认**：工作流分工与保护环境；Run 43679508810 的等待状态；AGP-only 静态复核失败；2026-11-12 曾完成一次四渠道发布（见 [历史归档](/history/)）。
- **未确认**：本轮候选构建、验签与发布（BLOCKED / NOT RUN）。

## 相关条目

[[release-status]] · [[apk-signing]] · [[agp]] · [[2026-11-15-signing-blocked]]
