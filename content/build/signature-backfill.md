---
title: "Signature 回填与 Gson 存档"
description: "恢复泛型 Signature 以避免存档字段类型漂移"
tags:
  - build
  - savestate
---

# Signature 回填与 Gson 存档

## 问题

enjarify 不输出泛型 Signature。Gson 反序列化 List<T> 时缺少实际类型参数，
会把元素读成 LinkedTreeMap 等错误类型，导致存档字段类型漂移甚至静默重置。

典型受害字段：

- Player$Laitela.dimensions（List<DarkMatterDimensionState>）
- Glyph.effects（List<reality.glyphs.a>）

## 方案

1. 用 dex2jar 对官方 DEX 生成参考 jar（保留泛型）。
2. SigBackfill(ASM) 把参考 jar 的 Signature 回填到 game jar。
3. javap fail-closed 校验关键类签名存在且符合期望。
4. 回填后重跑整包 D8。

## 现有结果

- Player$Laitela 期望 Ljava/util/List<L...DarkMatterDimensionState;>;：PASS
- Glyph 期望 Ljava/util/List<L...reality/glyphs/a;>;：PASS
- 旧候选（未回填）对照为 0 处，可作负向验证。

## 证据

状态：已验证
证据等级：实测（javap + D8 + AVD 存档读写）
适用版本：Android 3.21.0
来源 Commit：ae734966bf712faca3ff7bbb389d8724a8efe7e5

## 相关

[[saves]] · [[save-compatibility]] · [[agp]]
