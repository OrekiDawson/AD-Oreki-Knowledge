---
title: "反物质维度MOD Wiki:挑战自动化与真实结算"
description: "挑战入口、真实结算边界与 5 分钟验收口径"
tags:
  - gameplay
  - android
---

# 挑战自动化与真实结算

## 入口与范围

覆盖普通挑战、无限挑战、永恒挑战（EC）与膨胀研究条件；自动化不得越过阶段门禁。

## 入口

MOD 新增类 OrekiChallengeAuto 在游戏 tick 中执行：

- tryNormal()：普通挑战
- tryInfinity()：无限挑战
- fillEcRequirement / respecForEc：EC 相关研究条件

## 真实结算要求

- 所有挑战必须通过原版真实结算入口完成，不得直接设置完成状态。
- 不得伪造挑战完成、资源、成就或阶段解锁。
- 自动化只加速真实流程，不改变结算语义。

## 5 分钟验收口径（R113-01）

在同一 APK 上连续运行 5 分钟，要求：

- 0 FATAL / NoSuchFieldError / NoSuchMethodError / ClassCastException / ANR
- 自动化保持响应，真实进度推进
- 与存档写读在同一 APK 上同时通过

## 证据

状态：已验证（功能性，同一 APK）
证据等级：实测（AVD logcat + 存档）
适用版本：Android 3.21.0 / Oreki Edition
来源 Commit：ae734966bf712faca3ff7bbb389d8724a8efe7e5（PR #88）
说明：修复前该路径在新档约 6 秒必崩 NoSuchFieldError；修复后 5 分钟 0 ABI 崩溃。

## 相关

[[automation]] · [[stage-gates]] · [[kotlin-runtime]] · [[coroutine-abi]]
