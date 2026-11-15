---
title: "反物质维度MOD Wiki:如何使用本知识库"
description: "Agent 与人类读者的检索、验证与更新流程"
tags:
  - guide
---

# 如何使用本知识库

## Agent 读取流程

1. 先读现行规则：<code>~/.dsh/AGENTS.md</code>、仓库 <code>AGENTS.md</code>、<code>docs/DELIVERY_RULES.md</code>。
2. 用关键词在本站检索（如「协程 ABI」「存档」「挑战」）。
3. 打开专题页，查看证据区的来源 Commit / PR / Run。
4. **回到原始 GitHub 证据核对**：源码、PR diff、CI 日志、AVD 报告。
5. 以当前源码与真实运行证据决策；本站文字不是更高权威。

## 人类读者

- 左侧目录按「入门 / 现状 / 架构 / 构建 / 玩法 / 排查 / 历史 / 参考」组织。
- 顶部搜索支持中文；右侧有页面大纲、反向链接和图谱。

## 文章文风与格式

正式文章按[[editorial-guidelines|知识库编写规范]]书写：简体中文、百科式自然段、可查证的直接来源，文章末尾可放少量“供 AI 检索（简要摘要）”。不得用 AI 输出替代面向人的解释。

## 更新流程（人工审核制）

1. 在 Android/Web 仓库以 PR 完成实际开发与验证。
2. 回到本仓库，仅更新受影响的专题页：结论、证据区、来源 Commit。
3. 被推翻的结论保留「旧结论 → 新证据 → 当前判断」。
4. 中文 Commit + PR，通过 Markdown/链接/敏感信息检查与 Quartz 构建后才合并部署。

## 禁止

- 不得悄悄修改 GitHub 已验证结论再反向引用为权威。
- 不得编造 Commit、行号、测试报告或 ABI 描述符。
- 不得把私有构建产物、用户存档、Token、内部地址写进公开站点。

## 相关

[[source-index]] · [[project-status]]