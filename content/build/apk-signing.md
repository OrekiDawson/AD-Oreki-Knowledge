---
title: "APK 签名与升级兼容"
description: "解释包名、签名证书、versionCode 与覆盖安装的约束，以及为什么签名环境是发布门禁的一部分"
tags:
  - 构建
  - 签名
  - 发布
---


Android 应用的「升级」不是替换文件，而是系统按**包名 + 签名证书 + versionCode** 判断能否覆盖安装。对 MOD 来说，这三项一旦变化，轻则无法覆盖安装，重则让玩家的存档与更新链断开。本条目解释这些约束，以及为什么签名环境本身是发布门禁的一部分。

## 三项硬约束

| 项 | Oreki Edition 的值 | 说明 |
| --- | --- | --- |
| 包名 | `com.oreki.antimatterdimensions` | 不得改变；改变等于变成另一个应用，无法覆盖升级 |
| 签名证书 SHA-256 | `95960bce0d8806124d72755d827fcd9216919cac29147635767a967360ed3197` | 必须与原版一致，否则系统拒绝覆盖安装 |
| `versionCode` | 历史已发布最大值 `30210000`（R103） | 新发布必须**严格大于**该值 |

注意区分两个 `versionCode`：

- **原版基线**的 `versionCode` 是 3.21.0 自带的 `30210000`；
- **MOD 独立发布**的 `versionCode` 是项目自己的发布序号，要求严格递增，且必须与原版基线分开记录。

两者混用会导致「看起来升级了、实际系统认为没有更新」或无法回退到已验证稳定版。

## 为什么签名环境是门禁

正式 APK 必须在受保护的 CI/CD 环境中构建、签名、验签，不允许手动上传或本地签名冒充。Android 仓库的候选构建工作流在 `candidate-unified.yml` 中使用 `environment: android-signing`，需要仓库所有者批准后才会执行签名步骤。

截至 2026-11-15，该环境仍处于等待批准状态（[Run 43679508810](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/actions/runs/43679508810) 的构建 Job 自 05:05Z 起 waiting），因此正式候选构建为 **BLOCKED**。这是需要人工操作的阻塞，不是代码缺陷。见 [[2026-11-15-signing-blocked|签名阻塞历史记录]]。

## 升级兼容还依赖什么

签名与包名只解决「能不能覆盖安装」，不解决「装上去能不能读旧档」。存档兼容是另一个维度（见 [[saves|存档兼容与自动保存]]）：字段类型漂移、泛型签名丢失、晚期存档互读都会影响升级后的可用性。因此发布门禁同时要求：

- 覆盖安装成功；
- 旧档可读、可继续写；
- 新增字段不会让旧版本静默重置；
- 四渠道分发的是**同一个 APK 的同一 SHA-256**。

## 已确认与未确认

- **已确认**：包名、证书与历史 `versionCode` 基线；签名环境等待批准的 Run 状态；2026-11-12 曾完成四渠道同一 APK 发布（见 [历史归档](/history/)）。
- **未确认**：本轮任何新 APK 的签名、验签与覆盖升级（NOT RUN）；AGP-only 门禁仍 fail-closed。
- **禁止**：不得手动上传 APK、不得关闭签名环境审批、不得绕过 Ruleset 或 Required Checks。

## 如何核查

1. 用 `apksigner verify --print-certs` 检查证书 SHA-256 是否为 `95960bce…3197`。
2. 用 `aapt2 dump badging` 或 `apkanalyzer` 核对包名与 `versionCode`。
3. 在测试机上先用旧版本建立存档，再覆盖安装新版本，确认存档可读。
4. 对照四个渠道的 APK SHA-256 是否一致。

## 相关条目

[[release-status]] · [[ci-cd]] · [[saves]] · [[2026-11-15-signing-blocked]]
