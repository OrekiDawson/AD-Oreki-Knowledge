---
title: "反物质维度MOD Wiki:Android 架构"
description: "AGP 9.5.1 工程、Gradle Kotlin DSL 与游戏类输入"
tags:
  - android
  - architecture
---

# Android 架构

## 工程形态

- 根级：Groovy <code>build.gradle</code>（旧链）与 <code>agp/app</code>（Kotlin DSL）并存。
- AGP 版本：9.5.1；Gradle 9.8.x；JDK 21。
- 生产 Kotlin 业务源码：<code>app/src/main/kotlin/</code>（S2-6 迁移完成，见 [[directory-migration]]）。
- 游戏类输入：由 <code>scripts/agp/build_fullgame_sig.sh</code> 生成的 game jar（见 [[agp]]）。

## 构建分层

1. 反混淆/转换：官方 DEX 与补丁 DEX 转 JVM class（enjarify / dex2jar 混合）。
2. ABI 修正：72 个官方 Kotlin 类 shadow 改名为 <code>oreki/shadow/kotlin/**</code>；新增类统一绑定。
3. Signature 回填：恢复 Gson 泛型签名（见 [[signature-backfill]]）。
4. 整包 D8 → DEX；AGP 打包资源、Manifest 与签名。
5. 构建守卫 fail-closed：A 批 ABI、类集合、层级、dash 类名、plain kotlin 引用。

## 关键约束

- 包名固定 <code>com.oreki.antimatterdimensions</code>，签名证书 <code>95960bce...</code>。
- versionCode 必须严格大于历史发布最大值（当前 30210000）。
- 不得新增 Java/Smali 游戏业务实现；新业务必须 Kotlin。
- 官方 3.21.0 DEX 为只读基线，所有修改通过已核实 ABI 的适配层完成。

## 证据

状态：已验证（构建与 AVD 验收）
证据等级：实测 + 读码
适用版本：Android 3.21.0 / Oreki Edition
来源 Commit：<code>ae734966bf712faca3ff7bbb389d8724a8efe7e5</code>
关联 PR：#83（目录迁移）、#87（A 批 ABI）、#88（J8 混合转换）

## 相关

[[kotlin-runtime]] · [[agp]] · [[directory-migration]] · [[dex-abi]]