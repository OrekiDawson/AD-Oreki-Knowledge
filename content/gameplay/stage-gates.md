---
title: "反物质维度MOD Wiki:阶段门禁"
description: "阶段解锁点、非法直达与页面恢复约束"
tags:
  - gameplay
  - android
---

# 阶段门禁

## 汇聚点（Android）

- bm4.g() / h()：阶段判定
- ll2.g()：门禁聚合
- MainActivity.W8()：页面切换前置检查

## 约束

- 不得通过 MOD 自动化越阶段解锁页面或功能。
- 非法直达必须被拦截并恢复到合法页面。
- 阶段变化后资源、页签、自动化行为必须一致。

## 验收

- 新档首次大坍缩、Break 前后、永恒页签直达与恢复。
- 结合 frame-observer 与 logcat、player.json 联合取证。

## 证据

状态：已验证（历史轮次）
证据等级：实测 + 读码
适用版本：Android 3.21.0

## 相关

[[challenges]] · [[automation]] · [[android]]
