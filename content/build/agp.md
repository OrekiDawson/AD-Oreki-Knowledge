---
title: "反物质维度MOD Wiki:AGP 构建管线"
description: "从官方 DEX 到 AGP 完整游戏 APK 的可追溯管线"
tags:
  - build
  - agp
---

# AGP 构建管线

## 单命令入口

~~~bash
bash scripts/agp/build_fullgame_sig.sh
  --official-apk <官方 3.21.0 base APK>
  --staged-apk  build/gradle-stage/unsigned.apk
  --dex2jar     <d2j-dex2jar.sh>
  --asm-jar     <asm-9.10.1.jar>
  --tools-dir   <私有 staging 目录>
  --outdir      build/<轮次> --variant off
~~~

## 步骤（build_fullgame_sig.sh）

| 步骤 | 内容 |
| --- | --- |
| [1/4] | 官方 APK 的 classes*.dex 用 dex2jar 转参考 jar（Signature 来源） |
| [2/4] | agp_gamejar2.py：enjarify 官方/补丁输入 → 混合（J8）→ shadow remap → 补丁类覆盖 → 逐类 D8 → 整包 D8 → Signature 回填与校验 |
| [2.5/4] | A 批协程 ABI fail-closed 守卫 |
| [3/4] | AGP Release 构建（默认 R8 OFF） |
| [4/4] | 输出 build-receipt.json（输入/产物 SHA-256 与类数） |

## 关键事实（R113-01）

- 官方类基础必须保持 **enjarify 基线 + 热路径 dex2jar 替换**（默认 ox0,gk0,dc2,tf2,vf2,t01）；
  全量 enjarify 会 livelock，全量 dex2jar 会 VerifyError。
- 补丁类检测用 enjarify 对 enjarify 比较；最终 jar = 官方基础 + 仅补丁类覆盖。
- 构建守卫：class_set 精确、hierarchy 父类可解析、dash 类名还原无残留、plain kotlin 引用为 0。

## 证据

状态：已验证
证据等级：实测（本地构建 + AVD）
适用版本：AGP 9.5.1 / Android 3.21.0
来源 Commit：ae734966bf712faca3ff7bbb389d8724a8efe7e5（PR #88）
验证：APK f2f72a61…，jar dec24f57…，A 批/Signature/整包 D8 全 PASS

## 相关

[[android]] · [[kotlin-runtime]] · [[signature-backfill]] · [[ci-cd]]
