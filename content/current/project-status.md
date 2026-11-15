---
title: "当前项目状态"
description: "R113-01 轮内状态：P0 功能闭环、发布仍 BLOCKED"
tags:
  - status
---

# 当前项目状态

最后核实：2026-11-15（UTC+8）。P0 技术闭环来源 <code>ae734966bf712faca3ff7bbb389d8724a8efe7e5</code>；180 分钟长跑结果由 Android main <code>d950d1102f13e81f78dfdcdfb308359ee3eb1633</code> 的 [R113-01 实测报告](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/d950d1102f13e81f78dfdcdfb308359ee3eb1633/reports/R113-01/180min-RESULT.md) 更新。

## 里程碑

| 项 | 状态 |
| --- | --- |
| 目录标准化 S2-6（Kotlin 源码迁入 app/src/main/kotlin） | PASS，PR #83 已合并 |
| A 批 25 类协程 ABI 绑定 + 构建期 fail-closed 守卫 | PASS，PR #87 已合并 |
| Kotlin 混合运行时 P0（存档 + 挑战自动化） | **功能闭环 PASS**，PR #88 已合并 |
| 新档自动存档（≤90s 首写） | PASS：40.2s 首写 |
| HOME 保存 / 重启读取 | PASS |
| 挑战自动化 5 分钟 | PASS（0 FATAL / NoSuchField / NoSuchMethod / CCE / ANR） |
| 合法晚期存档（realities=12、Lai Tela、11 glyph）读写 | PASS |
| 完整新档 ≤180 分钟真实通关 | **FAIL：180.1 分钟未通关，creditsFinished=false、realities=2、fullGameCompletions=0**（Android PR #90） |
| 受保护 Candidate / Verify / Release 与四渠道发布 | BLOCKED（等待通关验收与门禁） |

## 关键产物

- P0 修复候选 APK：<code>f2f72a61e96ff4f2cf14defa7e35fb5a70c24cab57322478128343059a9c5982</code>
- game jar：<code>dec24f57614967e81b37f856cb52e589e35aa8697e719fb88c84e2164b63adc8</code>（15,344 类）
- 构建守卫：A 批 ABI、Signature（Player Laitela / Glyph）、整包 D8、hierarchy、dash rename 全 PASS

## 已知阻塞

1. **R113-01 长跑已结束且 FAIL**：10,805.8 秒（180.1 分钟），未通关。属于进度推进/通关节奏问题，不是本轮已修复的协程 ABI 崩溃；Release 保持 BLOCKED。详情见 [Android PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90) 和 [实测报告](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/d950d1102f13e81f78dfdcdfb308359ee3eb1633/reports/R113-01/180min-RESULT.md)。
2. AGP 与 Smali 之间晚期存档互读尚未做（NOT RUN）。
3. 正式 CI 候选需要与本地 APK 同 SHA 才能进入 Verify 与 Release。

## 长跑结果的独立证据

- [R113-01/180min-RESULT.md](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/d950d1102f13e81f78dfdcdfb308359ee3eb1633/reports/R113-01/180min-RESULT.md)：时长、creditsFinished、realities、结论。
- [Android PR #90](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/pull/90)：报告及 AVD 最终存档/采样记录，已合并至 <code>d950d1102f13e81f78dfdcdfb308359ee3eb1633</code>。
- **范围限制**：本页此前记录的“P0 自动存档/ABI 崩溃修复 PASS”不等于“180 分钟通关 PASS”；本次实测只能证明该长跑目标 FAIL。

## 相关

[[known-issues]] · [[release-status]] · [[kotlin-runtime]] · [[saves]]