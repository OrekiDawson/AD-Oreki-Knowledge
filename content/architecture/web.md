---
title: "Web 架构"
description: "Web 端冻结上游、Playwright 验证与 oreki.net 部署边界"
tags:
  - web
  - architecture
---

# Web 架构

## 基线

- 冻结上游：<code>IvarK/AntimatterDimensionsSourceCode</code> @ <code>5409e320cecef96a917cca1dfb68f1f183e499ca</code>。
- 产品入口：<code>https://oreki.net</code>（游戏正式站）。
- 部署副本：<code>web/_deploy/site/</code>，不是源码入口。

## 验证方式

- Node + Chromium/Playwright；Android Chrome 默认手机视口优先。
- 真实点击、DOM、console、存档与阶段行为检查。
- 环境隔离：Web CI 独立，不因 Android P0 阻塞已验证 Web 的部署。

## 与 Android 的关系

双端行为等价（阶段解锁、挑战结算、自动购买器、资源扣费、成就链、教程）。
Web 修复不能仅凭「版本号相同」宣称等价，必须有真实浏览器行为证据。

## 证据

状态：已知 P1 已修复（窄屏通知条遮挡、侧栏最新资源刷新）
证据等级：实测（Playwright）
适用版本：Web 冻结上游

## 相关

[[project-overview]] · [[automation]] · [[source-index]]