---
title: "CI/CD 与受保护门禁"
description: "公开源码检查、受保护候选构建、独立验证与四渠道发布"
tags:
  - ci
  - release
---

# CI/CD 与受保护门禁

## 工作流

| 工作流 | 作用 |
| --- | --- |
| ci.yml | 公开源码规范与回归检查（Required Check） |
| candidate-unified.yml | 受保护完整游戏候选构建（输入 main SHA） |
| verify-unified.yml | 独立验证候选 APK SHA 与签名 |
| release-validate-unified.yml | 发布流程验证（不发布） |
| release-unified.yml | 四渠道正式发布（受保护 Environment） |

## 硬规则

- 正式构建/签名/验签/发布必须走 CI/CD；禁止直推绕过、跳过检查、关闭 Ruleset、手动上传 APK。
- 发布用 APK 必须四渠道同一 SHA-256。
- 受保护 Runner 不执行不可信公开 PR 代码；Secrets 不进 Git。
- 失败修流水线，不修门禁。

## 记录字段

Source SHA、Candidate Run ID、Verify Run ID、APK SHA-256、证书 SHA-256、包名、
versionCode/versionName、AVD 结果、存档与结算结论。

## 证据

状态：已验证（R112/R113 多轮运行）
证据等级：实测（GitHub Actions）

## 相关

[[release-status]] · [[agp]] · [[source-index]]
