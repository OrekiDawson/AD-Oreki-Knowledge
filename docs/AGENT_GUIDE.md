# Agent 检索指引

## 读取顺序

1. 仓库 `AGENTS.md` 与 `docs/DELIVERY_RULES.md`（权威规则）。
2. 本知识库按关键词检索（https://wiki.oreki.net 顶部搜索）。
3. 找到专题页后，查看页底「证据」区的来源仓库/Commit/文件。
4. 回到 GitHub 原始 Commit 与 PR/CI/AVD 证据核对。

## 静态检索接口

- Quartz 全文索引：`/static/contentIndex.json`
- AI 关键词索引：`/static/knowledge-index.json`（pages / chunks / terms 倒排，支持中文二元词）

## 判断纪律

- 状态：已验证 / 进行中 / 已推翻 / 待确认；证据等级：实测 / 读码 / 推断 / 未知。
- `ai-drafts/` 下的页面是 AI 抽取草稿，**不能**直接当权威事实。
- 历史结论保留但标注状态；不得用新旧段落推断旧结论失效。
- 不在知识库里修改 GitHub 已验证结论后反向引用为权威。