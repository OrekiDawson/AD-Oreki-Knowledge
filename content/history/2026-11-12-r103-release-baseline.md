---
title: "2026-11-12 · R103 四渠道正式发布与 versionCode 基线"
description: "记录 R103 修复永恒门禁缓存溢出 P0、四渠道发布同一 APK，以及 versionCode 30210000 的历史基线"
tags:
  - 历史
  - 发布
---


> 本页是历史归档，记录当时的发布结论与身份信息，**不代表当前状态**。当前发布状态见 [[release-status|发布状态]]。

## 事件与时间

2026-11-12，Android 端完成 R103 交付：修复 R101 引入的**永恒门禁缓存溢出**回归（合法永恒存档冷启动后没有「永恒」入口、时间研究不可达），重建候选并完成四渠道发布。

## 当时结论

| 项 | 值 |
| --- | --- |
| 源码 SHA | `fa6886232867b4812c857b4829bd784e58bbc80f` |
| 候选 Run / 验证 Run / 发布 Run | `43239315658` / `43240570620` / `43244024960`，均 success |
| APK SHA-256 | `3d92427153b4a8b22c6bc5b281e0a1affe961f5cdbd8f56f0f23053d48397de6` |
| 包名 / 版本 | `com.oreki.antimatterdimensions` / 3.21.0 (30210000) |
| 证书 SHA-256 | `95960bce0d8806124d72755d827fcd9216919cac29147635767a967360ed3197` |
| 交付渠道 | GitHub Releases、OneDrive、Google Drive、本地 SSH/SFTP，同一 APK |

当时判定为 Android 四渠道真实发布 PASS，且这是最近一次仍在生效的正式稳定版依据。

## 后续变化与是否仍然有效

- **仍然有效**：原包名、原签名证书与 `versionCode = 30210000` 仍是「历史已发布最大值」基线；此后每次正式发布都要求 `versionCode` 严格大于它。
- **不再代表当前状态**：R113-01 之后没有新的正式发布，180 分钟通关仍 FAIL，签名环境仍 BLOCKED。不能把 R103 的历史 APK 改名当作新版本。
- 原版基线自身的 `versionCode`（30210000）与 MOD 独立发布 `versionCode` 需分开记录，见 [[apk-signing|APK 签名与升级兼容]]。

## 原始证据

- [R103 交付报告（Android 仓库）](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/docs/R103-%E4%BA%A4%E4%BB%98%E6%8A%A5%E5%91%8A.md)
- [冻结基线与 `versionCode` 清单](https://github.com/OrekiDawson/AD-Oreki-Edition-Android/blob/main/baseline/versions/3.21/manifest.json)

## 相关条目

[[apk-signing]] · [[release-status]] · [[project-overview]]
