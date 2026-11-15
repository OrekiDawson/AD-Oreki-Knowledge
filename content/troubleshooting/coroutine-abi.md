---
title: "反物质维度MOD Wiki:协程 ABI 崩溃排查"
description: "NoSuchFieldError / NoSuchMethodError 与逻辑线程 livelock 的定位流程"
tags:
  - troubleshooting
  - kotlin
---

# 协程 ABI 崩溃排查

## 典型症状

1. NoSuchFieldError: No field a of type EmptyCoroutineContext
   - 新类绑定了 AGP stdlib（INSTANCE），官方 DEX 是 a。
2. NoSuchMethodError: ContinuationImpl.<init>(Lrj0;Lek0;)V
   - 定向 remap 后其他引用仍指向现代 stdlib 描述符。
3. 无崩溃但不写档、tick 不推进（livelock）
   - 线程栈停在 SpeedrunMilestone$complete 协程链，kotlinx 调度类字节码与验证构建不一致。

## 定位流程

1. logcat 取崩溃栈与 ABI 错误。
2. kill -3 抓全线程栈，确认逻辑线程是 Runnable 空转还是 Waiting。
3. 对照 smali 稳定版同线程状态。
4. 检查构建管线：官方类转换器是否全量 enjarify（回归点）。
5. 检查 build 守卫：A 批 ABI、plain kotlin 引用、hierarchy、dash 类名。

## 修复要点

- 新增类统一绑定 oreki/shadow/kotlin 形态。
- 官方类保持 J8 混合转换（见 [[kotlin-runtime]]）。
- 守卫 fail-closed，避免把 P0 推到运行期。

## 证据

状态：已修复并验证
证据等级：实测（AVD 线程栈 + 构建守卫）
来源 Commit：ae734966bf712faca3ff7bbb389d8724a8efe7e5（PR #88）

## 相关

[[kotlin-runtime]] · [[challenges]] · [[agp]]
