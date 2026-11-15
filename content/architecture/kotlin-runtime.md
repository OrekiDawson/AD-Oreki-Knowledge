---
title: "Kotlin 混合运行时 ABI"
description: "官方混淆 Kotlin 运行时与 AGP 新编译代码的二进制边界，以及 J8 混合转换"
tags:
  - android
  - kotlin
  - abi
---

# Kotlin 混合运行时 ABI

在 Android 版《反物质维度》MOD 中，新增的 Kotlin 代码必须与官方游戏原有的、经过混淆处理的程序共同运行。本条目解释两者为什么会发生兼容问题，以及目前通过什么方法避免游戏卡死或崩溃。

这里的**二进制接口（ABI）**指程序运行时实际使用的类名、字段名、方法参数和返回值。两个类即使在源代码中承担相同作用，只要这些接口不同，运行时也可能找不到需要的字段或方法。


## 问题背景

AGP 完整游戏由两部分组成：

1. 官方 3.21.0 混淆 DEX 转换而来的游戏类；
2. MOD 新增 Kotlin 业务类（约 25 个）。

两者对 Kotlin 运行时的 ABI 假设不同，直接混用会出现：

- <code>NoSuchFieldError: EmptyCoroutineContext.a</code>（官方字段名是 a，stdlib 是 INSTANCE）
- <code>NoSuchMethodError: ContinuationImpl.&lt;init&gt;(Lrj0;Lek0;)V</code>（默认包混淆参数类型）

## 真实描述符（已核实）

| 符号 | 官方 DEX 形态 | AGP stdlib 形态 |
| --- | --- | --- |
| EmptyCoroutineContext | 静态字段 <code>a</code> | <code>INSTANCE</code> |
| ContinuationImpl 构造器 | <code>(Lrj0;Lek0;)V</code> | <code>(Lkotlin/coroutines/Continuation;Lkotlin/coroutines/CoroutineContext;)V</code> |
| CoroutineSingletons | <code>a</code> | <code>COROUTINE_SUSPENDED</code> |

<code>rj0</code> = kotlin.coroutines.Continuation，<code>ek0</code> = CoroutineContext（默认包混淆名）。

## 解决路线（R113 定稿）

- 72 个官方 Kotlin 类被统一改名为 <code>oreki/shadow/kotlin/**</code>，新增类全部绑定 shadow 形态。
- 构建期守卫 <code>scripts/agp/check_a_batch_abi.py</code> 对 A 批 5 类逐条断言 ABI，违反即构建失败。
- **官方类转换必须保持 R107 J8 混合形态**：enjarify 为基线，少量协程调度热路径类（ox0/gk0/dc2/tf2/vf2/t01）
  用 dex2jar 版本。全量 enjarify 会让逻辑线程在 SpeedrunMilestone 协程链 livelock；
  全量 dex2jar 会因 <code>new 子类 + invoke-direct 父类构造器</code> 被改写而 ART VerifyError。

## 证据

状态：已验证
证据等级：实测（AVD 线程栈 + 构建守卫）
适用版本：Android 3.21.0 / AGP 9.5.1
来源：[Android PR #88](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/88)，合并 Commit [ae734966bf712faca3ff7bbb389d8724a8efe7e5](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/commit/ae734966bf712faca3ff7bbb389d8724a8efe7e5)
验证：本地 APK f2f72a61；新档首写 40.2s；5 分钟自动化 0 ABI 崩溃

## 相关

[[coroutine-abi]] · [[agp]] · [[android]] · [[dex-abi]]

## 供 AI 检索（简要摘要）

- 主题：Android 3.21.0 官方混淆 Kotlin 与 AGP 新编译 Kotlin 的二进制接口兼容。
- 当前结论：对官方 Kotlin 类使用隔离命名，并维持经过设备验证的 J8 混合转换路径。
- 状态及范围：局部修复已实测；适用 Android 3.21.0 / AGP 9.5.1。
- 主要来源：[Android PR #88](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/88)，[[coroutine-abi]]。
- 容易误判之处：协程 ABI 与自动存档测试通过，不等于已达到 180 分钟真实通关或正式发布要求。
