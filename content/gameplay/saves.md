---
title: "反物质维度MOD Wiki:存档兼容与自动保存"
description: "自动保存周期、跨构建读写与合法晚期存档"
tags:
  - gameplay
  - savestate
---

# 存档兼容与自动保存

## 自动保存行为（smali 稳定版对照）

- 冷启动进入游戏后约 65 秒首写 player.json，之后约每 30 秒一次。
- playerBackup 约 60 秒一次；HOME 触发立即再写。
- 说明周期存档与 onPause/onStop 两条通道都存在。

## R113 修复后候选（APK f2f72a61）

- 新档首写 40.2 秒，HOME 保存与 force-stop 后文件保留。
- 进程重启后正常加载并继续写档。
- 合法晚期存档（realities=12、Lai Tela、11 glyph，SHA 75f570c5…）读取正常；
  120 秒后应用写回新档（SHA 01e67bf8…，29,912 字节合法 JSON）。

## 跨构建

- 早中期存档 AGP 写、Smali 读回写：PASS（历史轮次）。
- 晚期存档 AGP 与 Smali 互读：NOT RUN（待补）。

## 证据

状态：新档与晚期读写已验证；跨构建晚期互读未完成
证据等级：实测（AVD）
适用版本：Android 3.21.0 / Oreki Edition
来源 Commit：ae734966bf712faca3ff7bbb389d8724a8efe7e5（PR #88）

## 相关

[[save-compatibility]] · [[signature-backfill]] · [[challenges]]
