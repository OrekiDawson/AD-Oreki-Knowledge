---
title: "待核实事项与历史误判"
description: "区分 2026-11-16 新版本的待验证范围与历史 R113/R114 跑次留下的已知问题"
tags:
  - 问题
---

项目进展很快，**历史 BUG 不一定仍存在于最新 APK**。本页只列有明确来源的现行待核实项，以及值得保留的反例，不把“尚未测试”误写成“确认存在 BUG”。

**最后核实：2026 年 11 月 16 日（UTC+8）。**

## 当前最有价值的验证工作

| 主题 | 本次可证实的边界 | 下一步应找的证据 |
| --- | --- | --- |
| Android 3.21.0 新 Release | [a12b5cd6](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/releases/tag/android-update-3.21.0-a12b5cd6) 已发布 | 对应八项 AVD、完整新档计时与发布级结果的固定报告 |
| 本地 SFTP 第四渠道 | GitHub、OneDrive、Google Drive 发布作业 SUCCESS | 本地从可信来源拉取、SHA-256 校验及原子更新回执 |
| Android / Web 行为等价 | 各自运行成功不能证明逐项机制一致 | 相同条件下比对挑战结算、阶段门禁、购买、存档、自动化及 GUI |
| AGP 原生完整游戏 | 混合构建曾运行不等于彻底原生化 | Issue [#25](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/issues/25)、[#61](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/issues/61) 的分闭包验收 |
| R8 ON | 有过构建通过、运行期 ClassCastException 的历史记录 | 以正确输入闭包完成隔离运行验收；详见 [[r8]] |
| `build_mod.py` 退役 | 脚本仍是长期迁移目标，不等于已经删除 | Issue [#52](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/issues/52) 的生产依赖归零与 CI 防回流 |

## 历史问题不能直接冒充当前结论

### R113 的 180 分钟 FAIL

[R113-01 的实测记录](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/d950d1102f13e81f78dfdcdfb308359ee3eb1633/reports/R113-01/180min-RESULT.md) 显示**该跑次** `creditsFinished=false`。这是可信的历史失败，**不是最新 a12b5cd6 APK 的失败证据**。历史页：[[2026-11-15-r113-180min-fail]]。

### 第二次 Reality 后自动永恒停用

旧构建在 `realities=2` 发生自动永恒复位后的停用问题，后续修复在新档中观察到恢复运行。应查看 [[2026-11-15-r114-reality-autoeternity|当时的修复记录]]及其对应 PR，不沿用旧页面中“PR #92 仍在等待评审”的过期陈述。

### 混合运行时 livelock

此前“不能写档可能是异常吞掉”的假设，被 AVD 线程证据修正为混合 Kotlin 协程链路的 livelock。详细机制见 [[kotlin-runtime]]；这是历史定位成果，不意味着最新 APK 正在发生相同问题。

### 阶段门禁的证据范围

“图标不可见”不等于页面真正不可达。需要同时检查合法解锁、非法直达、返回合法页面和真实存档状态，且必须绑定具体 APK，而不是复用其他轮次的 PASS。

## 相关页面

[[project-status]] · [[release-status]] · [[parity]] · [[stage-gates]] · [历史归档](/history/)
