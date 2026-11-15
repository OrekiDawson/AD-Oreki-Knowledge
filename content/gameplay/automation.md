---
title: "智能自动购买器"
description: "解释 Oreki Edition 自动化的统一节拍、阶段感知、手动优先与开关托管设计"
tags:
  - 玩法
  - 自动化
---


Oreki Edition 的自动化不是一组每帧都去购买的脚本，而是一套分层的调度系统：它只处理当前阶段允许的操作，按目标决定优先级，并且尊重玩家的手动设置。

调度器每 1～60 秒（默认 10 秒）执行一次策略动作，不跟着游戏帧率反复抢操作。每个动作都要先通过阶段判定与 allow() 检查，确认当前阶段允许购买、且不会越阶段解锁；总开关关闭后立即停止，配置修改在下一个节拍生效。玩家手动关闭某个受管开关时，调度层不会马上覆盖，而是等到下一个节拍才按最新策略恢复——这一条是为了避免玩家刚点完就被自动逻辑改回去。所有购买都必须走原版入口并真实扣费，不能直接写资源、挑战完成或成就字段。

## 原版自动化怎样工作

原版的自动化在游戏早期就会解锁，核心概念是 **interval（间隔）** 与 **bulk（单次批量）**：

- **interval** 决定自动器多久执行一次；它不能比游戏更新率更快——移动端更新率固定约 25 毫秒，网页/Steam 可在约 33～200 毫秒之间调整。当 interval 小于更新率时，界面会显示「Instant」，表示每个 tick 都会触发。
- **bulk** 决定一次触发能买多少；例如反物质维度自动器初始为 `×1`，可升级到无限。
- 自动器不能一帧内触发多次，因此实际间隔不会小于更新率。

[来源：社区 Wiki：Automation](https://antimatterdimensions.wiki.gg/wiki/Automation)

这套机制描述的是「**原版自动器本身多快**」。它和 Oreki Edition 额外加入的「策略层多快」是两件事，见下一节。

## 模块分工（Android）

Android 端的自动化已经从历史 Smali 实现迁移到 Kotlin 业务代码，主要模块如下：

| 模块 | 职责 |
| --- | --- |
| `OrekiAutomationScheduler.kt` | 全局统一节拍；提供 `beginFrame()`、`allow(项)`、`noteActed/noteNoop/noteFail` 等接口，决定某一帧是否允许某个受管动作 |
| `OrekiStageAuto.kt` | 「首次无限之后」的阶段自动化：购买、升级、尝试突破等 14 个 public static 入口，所有真实购买动作纳入全局节拍 |
| `OrekiAutobuyerBeat.kt` | 受管项的节拍恢复：只恢复**明确受管**的工作间隔配置，不在下一帧抢写，不碰原版自动器的 `isActive` |
| `OrekiAutoEternityAdoption.kt` | 托管原版「自动永恒」开关：区分「原版 Reality 复位」与「玩家手动关闭」，后者粘滞尊重 |
| `OrekiEcAutomation.kt` | 永恒挑战推进，按原版购买入口与 ABI 调用 |
| `OrekiIu15Sprint.kt` | IU15 冲刺状态机：在干净现实窗口内拦住全部无限维度购买入口 |

这些类的 public static 方法签名必须与原调用点逐字一致（调用方都是 `invoke-static`），否则整条链失效；因此 Kotlin 实现大量使用 `object` + `@JvmStatic` 来对齐字节码形态。

## 原版自动器与 MOD 调度器的关系

可以把两层分开理解：

| 层 | 归属 | 作用 |
| --- | --- | --- |
| 原版自动购买器 | 原版游戏 | 按自己的 interval/bulk 执行购买与重置；MOD 不改变其结算语义 |
| MOD 统一调度器 | Oreki Edition 新增 | 以 1～60 秒（默认 10 秒）的节拍决定「策略动作」何时执行，避免逐帧抢操作 |
| MOD 目标驱动策略 | Oreki Edition 新增 | 根据阶段与目标决定买什么、何时重置；遵守手动优先 |

因此，「原版自动器很快」不等于「MOD 策略会每帧动手」；反过来，MOD 调度器变慢也不代表原版自动器停止工作。排查时需要说明在看哪一层。

## 手动优先与「不抢开关」

一个容易误解的点是：**自动化不应该替玩家打开原版自动器**。当前实现的纪律是：

- 只管理明确的受管项（如某些工作间隔配置），不把原版自动器的启用状态纳入策略范围；
- 玩家手动关闭「自动永恒」后，托管层必须**粘滞尊重**，直到玩家自己重新打开；
- 原版 Reality 结算会把自动永恒开关复位（这是原版设计行为，不是 MOD 写坏），MOD 托管层只负责在**确认是原版复位**时补回开关，并区分玩家手动关闭的情况。

这条区分由 `OrekiAutoEternityAdoption` 落盘到 `oreki_prefs` 实现，不依赖一次性内存标记，因此应用重启后仍然有效。该修复**目前仍在验证中（PR #92）**，不能写成已验证完成。

## 验证与已知限制

验证分几层做。功能层是同一 APK 连续运行 5 分钟，确认 0 FATAL、0 ABI 崩溃、0 ANR，并检查 logcat 里 `OREKI_SCHED`、`OREKI_ACHAUDIT`、`OREKI_GUI` 等标记持续输出。行为层要确认资源真实扣费、购买来自原版入口、阶段切换后行为正确（见 [[stage-gates|阶段门禁]]）。持久化层看重启与读档后的开关状态，尤其是玩家手动关闭的项不被覆盖。这些检查不能只看界面表现，最终以存档字段和日志为准。

阶段判断依赖 GUI 阶段真值（`OrekiGuiStage.kt`），而阶段判定本身出过缺陷，所以自动化是否正确首先取决于阶段判定是否正确；相关排查见 [[stage-gates]]。部分历史模块（例如静默的 `OrekiChallengeAuto`）没有日志，只能靠额外探针观察。完整 180 分钟内的自动化表现目前仍无终局结论，Android 与 Web 的自动化等价性也尚未独立验收（见 [[parity|双端行为一致性]]）。

实际核查时，抓 logcat 确认动作经过 `allow()` 而不是逐帧直调，再对比存档中的资源与购买记录确认扣费真实发生，最后手动关闭总开关或单项配置，确认立即停止且不会被自动恢复。

## 参考资料

- [Android 仓库 Kotlin 业务目录](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/tree/main/app/src/main/kotlin/kajfosz/antimatterdimensions/oreki)
- [docs/FACTS.md 自动化与已修复根因](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/facts/methodology.md#f-10)

- [社区 Wiki：Automation](https://antimatterdimensions.wiki.gg/wiki/Automation)
- [官方网页源码（固定 Commit）](https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/5409e320cecef96a917cca1dfb68f1f183e499ca)

## 相关条目

[[original-vs-mod]] · [[challenges]] · [[stage-gates]] · [[saves]] · [双端行为一致性](/architecture/parity/) · [[2026-11-15-r114-reality-autoeternity]]
