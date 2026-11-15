---
title: "反物质维度MOD 技术知识库"
description: "《反物质维度》Oreki Edition MOD 的中文技术百科：玩法机制、双端架构、构建与交付、故障排查与历史归档"
tags:
  - index
---


本站是《反物质维度》Oreki Edition MOD 的**中文技术百科**，按主题解释游戏机制、Android/Web 双端架构、构建与发布链路，以及排查方法。**GitHub 的源码、Commit、PR、Run 与设备报告才是事实依据**；本站是阅读与检索层，冲突时以原始证据为准。

> **原创文字许可**：本站有权授权的原创百科文字采用[知识共享 署名-相同方式共享 4.0 国际（CC BY-SA 4.0）](https://creativecommons.org/licenses/by-sa/4.0/)。第三方材料和软件按各自许可。详见[[copyright|版权与许可]]。

## 先读什么

1. **[[antimatter-dimensions|《反物质维度》游戏总览]]**：不熟悉原版游戏时，先理解反物质、无限、永恒、现实这几个成长层。
2. **[[project-overview|项目概览]]**：了解 MOD 的仓库分工、冻结基线与交付目标。
3. **当前状态**：[[project-status|当前项目状态]] 与 [[release-status|发布状态]] 只写现行结论，并标注最后核实时间。

## 按主题浏览

顺序与左侧目录一致（1→11）：

1. **游戏总览**：[[antimatter-dimensions|《反物质维度》游戏总览]]——反物质、无限、永恒、现实与天神。
2. **入门指南**：[入门指南](/getting-started/)——如何使用知识库、编写指南与项目概览。
3. **原版 Wiki 中文翻译**：[原版 Wiki 中文翻译](/original/)——逐篇翻译原版游戏条目，保留公式、表格与解锁条件，逐页标注修订与 CC BY-SA 4.0 许可。
4. **MOD 玩法与机制**：[MOD 玩法与机制](/gameplay/)——[[original-vs-mod|原版与 MOD 对照]]、[[progression-infinity-eternity|无限与永恒]]、[[reality-time-studies|现实与时间研究]]、[[celestials|天神系统]]、[[challenges|挑战与真实结算]]、[[automation|智能自动购买器]]、[[saves|存档兼容]]、[[stage-gates|阶段门禁]]。
5. **当前项目状态**：[[project-status|当前项目状态]]与[[release-status|发布状态]]——只写现行结论，标注最后核实时间。
6. **架构与运行时**：[架构与运行时](/architecture/)——[[android|Android 架构]]、[[kotlin-runtime|Kotlin 混合运行时 ABI]]、[[web|Web 架构]]、[[parity|双端一致性]]、[[directory-migration|目录迁移]]。
7. **逆向与语义映射**：[逆向与语义映射](/reverse-engineering/)——混淆 DEX 的 ABI 适配与证据方法。
8. **构建与交付**：[构建与交付](/build/)——[[agp|AGP]]、[[apk-signing|签名]]、[[ci-cd|CI/CD]]、[[r8|R8]]、[[signature-backfill|Signature 回填]]、[[build-mod-retirement|build_mod.py 退役]]。
9. **故障排查**：[故障排查](/troubleshooting/)——[[coroutine-abi|协程 ABI 崩溃]]与[[save-compatibility|存档兼容]]排查。
10. **参考资料**：[参考资料](/references/)——[[source-index|来源索引]]与[[terminology|术语表]]。
11. **历史归档**：[历史归档](/history/)——按日期与事件记录的当时判定，**不代表当前状态**。

## 站务

- 正式编写规则：**[[wiki-rules|反物质维度MOD Wiki:知识库规则]]**（首页、左侧目录与页脚常驻入口）。
- 版权与转载：[[copyright|版权与许可]]。
- 贡献流程：[[how-to-use|如何使用本知识库]]。

## 当前重要事实（最后核实 2026-11-15 21:25 UTC+8）

- **新档 180 分钟真实通关：最近完整跑次 FAIL；新长跑进行中。** 最近一次完整长跑运行 10,805.8 秒未通关（`creditsFinished=false`、`realities=2`）；2026-11-15 20:07:19 起的新真新档长跑截至 21:22 已推进到 `realities=6`、`creditsFinished=false`，**终局 NOT RUN**。见 [[project-status|当前项目状态]] 与 [Android PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90)。
- **正式发布：BLOCKED。** PR #92 的评审会话未解决（#93 已于 2026-11-15 13:21Z 合并）（按 Lead 2026-11-15 21:05 核实，此前「等待 android-signing 批准」的记录不准确），且 AGP-only 门禁 fail-closed；源码 CI 通过不能推断可发布。
- **修复已提交 ≠ 已验证。** R114-01 的 Reality 修复（PR #92）仍在验证中，尚未合并、尚未发布。

## 阅读约定

状态标记：已验证 / 进行中 / FAIL / BLOCKED / 待确认 / 已推翻。证据等级：实测 / 读码 / 推断 / 未知。引用时请连同**适用版本与最后核实时间**一起看；状态页可能过期，历史归档不代替现行技术解释。