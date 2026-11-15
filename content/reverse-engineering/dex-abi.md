---
title: "DEX 与 ABI 反混淆"
description: "官方混淆 DEX 的类/方法/字段映射与调用边界"
tags:
  - reverse-engineering
  - abi
---

# DEX 与 ABI 反混淆

## 约束

- 官方 3.21.0 DEX 是只读基线；修改必须通过已核实 ABI 的适配层。
- 修改混淆 ABI 前必须确认真实调用关系、完整描述符、参数与返回值。
- 无法唯一确认时停止，不猜字段或方法别名。

## 现有成果

- JADX 全量导出、first-party 类索引（docs/deobfuscation/data/first-party-3.21-index.csv）。
- 默认包混淆名（rj0 = Continuation、ek0 = CoroutineContext 等）已登记。
- 语义映射与 Kotlin 重建成果固定于 3.21.0，不因上游发版重置。

## 使用方式

- 新业务代码优先 Kotlin；确需 ABI 适配时集中到适配层，命名语义化。
- 混淆标识符只用于必要的 ABI 适配，不扩散到业务逻辑。

## 证据

状态：已验证（多轮）
证据等级：读码 + 实测
适用版本：Android 3.21.0

## 相关

[[kotlin-runtime]] · [[signature-backfill]] · [[source-index]]
