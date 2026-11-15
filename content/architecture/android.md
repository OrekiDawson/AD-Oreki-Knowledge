---
title: "Android 架构"
description: "Android 端冻结基线、AGP/Gradle 工程形态、游戏类来源与构建守卫的整体结构"
tags:
  - Android
  - 架构
---


Oreki Edition 的 Android 端以官方 3.21.0 APK 为冻结基线：官方混淆 DEX 保持只读，MOD 新增的 Kotlin 业务代码运行在它之上。这样的组合决定了工程形态和构建方式——游戏类要从官方 DEX 转换而来，新增代码必须对齐官方 ABI，构建时还要有一组 fail-closed 守卫把运行期才暴露的问题提前到编译期。

## 冻结基线

Android 基线固定为官方 3.21.0，长期不自动升级：

| 项 | 值 |
| --- | --- |
| 官方 base APK SHA-256 | `4e9970a808d10b6cc1a1068b078ec3c7d922051086a576c66d071c1216f527ac` |
| 包名 | `kajfosz.antimatterdimensions`（MOD 发布包名为 `com.oreki.antimatterdimensions`） |
| 版本 | 3.21.0，`versionCode 30210000` |
| minSdk / targetSdk | 32 / 37 |

基线标识登记在仓库的 `baseline/versions/3.21/manifest.json`。未经用户明确授权，不得自动升级、合并上游或修改冻结基线；只读监测上游安全与崩溃信息用于评估移植，见 [[project-overview|项目概览]]。

## 工程形态

当前仓库处于**迁移过渡期**：

- 根级 Groovy `build.gradle`（旧链）与 `agp/app`（Kotlin DSL）并存；
- AGP 版本 9.5.1，JDK 21；
- 生产 Kotlin 业务源码已迁入 `app/src/main/kotlin/`（S2-6 完成），见 [[directory-migration|目录标准化迁移]]；
- 游戏类输入由构建脚本从官方 DEX 转换并生成 game jar，见 [[agp|AGP 构建管线]]。

「目录迁移完成」不等于「AGP 原生完整游戏可发布」：正式生产入口仍是受保护门禁下的 AGP 完整游戏构建，而该门禁当前是 BLOCKED（见 [[release-status|发布状态]]）。

## 构建分层

1. **反混淆/转换**：官方 DEX 与补丁 DEX 转 JVM class（enjarify 基线 + 少量 dex2jar 热路径类，见 [[kotlin-runtime|Kotlin 混合运行时 ABI]]）。
2. **ABI 修正**：官方 Kotlin 类统一改名为 `oreki/shadow/kotlin/**`，新增类绑定 shadow 形态。
3. **Signature 回填**：恢复 Gson 泛型签名（见 [[signature-backfill|Signature 回填]]）。
4. **整包 D8 → DEX**：再由 AGP 打包资源、Manifest 与签名。
5. **构建守卫（fail-closed）**：A 批 ABI、类集合精确性、继承层级可解析、dash 类名还原无残留、plain Kotlin 引用为 0。

守卫的意义是把「会在运行期才暴露的 ABI 问题」提前到构建期失败，而不是等 AVD 上出现 `NoSuchFieldError` 或逻辑线程 livelock。

## 关键约束

- 包名固定 `com.oreki.antimatterdimensions`，签名证书固定 `95960bce…3197`，见 [[apk-signing|APK 签名与升级兼容]]。
- `versionCode` 必须严格大于历史发布最大值（当前 30210000）。
- 不得新增 Java/Smali 游戏业务实现；新业务必须用 Kotlin。
- 官方 3.21.0 DEX 是只读基线，修改通过已核实 ABI 的适配层完成，方法见 [[dex-abi|DEX 与 ABI 反混淆]]。

## 现状与边界

基线身份、工程双入口、构建分层与守卫内容都已核实，本地完整游戏 APK 可以产出，并有 AVD 运行记录。受限的是正式发布链路：受保护 Candidate 构建尚未通过（签名环境未批准，AGP-only 门禁 fail-closed），正式发布为 NOT RUN。

以上描述对应 Android 3.21.0 与 AGP 9.5.1；换到其他基线或工具链版本时，需要重新核实，不能直接套用。

## 参考资料

- [冻结基线 manifest](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/baseline/versions/3.21/manifest.json)
- [docs/FACTS.md 第 6 节（基线与基线管理）](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/facts/build.md#f-6)
- [Android 仓库 AGENTS.md](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/AGENTS.md)

## 相关条目

[[kotlin-runtime]] · [[agp]] · [[directory-migration]] · [[apk-signing]] · [[parity]]
