---
title: "Kotlin 混合运行时 ABI"
description: "官方混淆 Kotlin 运行时与 AGP 新编译代码的二进制边界，以及 J8 混合转换"
tags:
  - android
  - kotlin
  - abi
---

# Kotlin 混合运行时 ABI

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
来源 Commit：<code>ae734966bf712faca3ff7bbb389d8724a8efe7e5</code>（PR #88）
验证：本地 APK f2f72a61；新档首写 40.2s；5 分钟自动化 0 ABI 崩溃

## 相关

[[coroutine-abi]] · [[agp]] · [[android]] · [[dex-abi]]