---
title: "智能自动购买器"
description: "解释 Oreki Edition 自动化的统一节拍、阶段感知、手动优先与开关托管设计"
tags:
  - 玩法
  - 自动化
---


Oreki Edition 的自动化不是一组「每帧买买买」的脚本，而是围绕**统一节拍、阶段感知与手动优先**设计的分层系统。本条目解释它的设计目标、模块分工与验收方式，以及为什么「自动化跑起来了」不等于「结算正确」。

## 设计目标

1. **阶段感知**：只购买当前阶段允许的内容，不越阶段解锁页面或功能。
2. **目标驱动**：根据当前目标选择购买优先级，而不是固定顺序刷满。
3. **手动优先**：玩家手动修改受管配置后，不逐帧抢写；等到下一个调度节拍再用最新策略值恢复。
4. **开关可控**：总开关关闭立即停止；间隔 1～60 秒可调，配置及时生效。
5. **不伪造**：不误重置、不伪造购买记录、不直接写结算字段。

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

## 验收方式

- **功能性**：同一 APK 连续运行 5 分钟，0 FATAL / 0 ABI 崩溃 / 0 ANR，自动化标记持续输出（`OREKI_SCHED`、`OREKI_ACHAUDIT`、`OREKI_GUI` 等）。
- **行为**：资源真实扣费、购买来自真实入口、阶段切换后行为正确（见 [[stage-gates|阶段门禁]]）。
- **持久化**：重启与读档后开关状态符合预期；玩家手动关闭不被覆盖。
- **不越界**：自动化不得直接写挑战完成、成就、阶段解锁或资源字段。

## 已知限制

- 自动化的**阶段感知依赖 GUI 阶段真值**（`OrekiGuiStage.kt`），而阶段判定本身曾是缺陷来源；见 [[stage-gates]]。
- 部分历史模块（如静默的 `OrekiChallengeAuto`）缺少日志，排查时需要专门的探针。
- **未验证**：新长跑（2026-11-15 20:07 起）仍在进行，自动化在完整 180 分钟内的表现没有终局结论；Android 与 Web 自动化是否等价也尚未独立验收（见 [[parity|双端行为一致性]]）。

## 如何核查

1. 抓 logcat 中的调度标记，确认动作经过 `allow()` 而不是逐帧直接调用。
2. 对比存档中的资源与购买记录，确认扣费真实发生。
3. 手动关闭总开关或单项配置，确认立即停止且不被自动恢复。

## 参考资料

- [Android 仓库 Kotlin 业务目录](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/tree/main/app/src/main/kotlin/kajfosz/antimatterdimensions/oreki)
- [docs/FACTS.md 自动化与已修复根因](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/FACTS.md#L424)

- [社区 Wiki：Automation](https://antimatterdimensions.wiki.gg/wiki/Automation)
- [官方网页源码（固定 Commit）](https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/5409e320cecef96a917cca1dfb68f1f183e499ca)

## 相关条目

[[original-vs-mod]] · [[challenges]] · [[stage-gates]] · [[saves]] · [双端行为一致性](/architecture/parity/) · [[2026-11-15-r114-reality-autoeternity]]
