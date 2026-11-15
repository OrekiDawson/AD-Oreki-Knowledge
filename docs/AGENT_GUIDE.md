# Agent 检索指引

## 规则与事实的读取顺序

1. 本知识库的**唯一权威编写规则**是 `content/wiki-rules.md`（网站 `/wiki-rules`）。旧入口 `docs/CONTENT_QUALITY.md` 已改为兼容页，只做摘要与指向。
2. 工程规则与交付门禁不在本仓库：Android 端见 [AD-Oreki-Edition-Android](https://github.com/OrekiDawson/AD-Oreki-Edition-Android) 的 `AGENTS.md` 与 `docs/DELIVERY_RULES.md`，Web 端见 [AD-Oreki-Edition-Web](https://github.com/OrekiDawson/AD-Oreki-Edition-Web) 对应文件。本仓库不复制这些规则，避免漂移。
3. 按关键词检索本站：顶部搜索框，或静态接口 `/static/contentIndex.json`、`/static/knowledge-index.json`（pages / chunks / terms 倒排，支持中文二元词）。
4. 找到专题页后，查看正文中就近的「参考资料」与页底证据区，**回到 GitHub 原始 Commit、PR、Run 与 AVD 报告核对**。

## 内容地图

| 目录 | 读者会在这里找到 |
| --- | --- |
| `content/` 根目录 | 首页、游戏总览、正式规则、版权说明 |
| `content/getting-started/` | 入门指南：项目概览、阅读与更新流程、读者版编写规范 |
| `content/current/` | 当前状态：项目状态、发布状态、已知问题 |
| `content/architecture/` | Android/Web 架构、Kotlin 混合运行时 ABI、双端一致性、目录迁移 |
| `content/reverse-engineering/` | 混淆 DEX 的语义映射与 ABI 适配方法 |
| `content/build/` | AGP/Gradle 构建体系、APK 签名、CI/CD 门禁、Signature 回填、R8、build_mod.py 退役 |
| `content/gameplay/` | 玩法机制：无限与永恒、现实与时间研究、天神、挑战、自动购买器、存档、阶段门禁 |
| `content/troubleshooting/` | 协程 ABI 崩溃与存档兼容的排查方法 |
| `content/references/` | 来源索引与术语表 |
| `content/history/` | 历史归档：按日期与事件记录当时结论，**不代表现行状态** |

## 判断纪律

- 状态：已验证 / 进行中 / FAIL / BLOCKED / 待确认 / 已推翻；证据等级：实测 / 读码 / 推断 / 未知。
- `content/ai-drafts/` 下的页面是 AI 抽取草稿，**不能**直接当权威事实，也不进入公开站点。
- `content/history/` 是历史归档，**不能**代替现行技术解释；引用前先确认它标注的「是否仍然有效」。
- 历史结论保留但标注状态；不得用新旧段落推断旧结论失效，也不得把「修复已提交」当成 PASS。
- 不在知识库里修改 GitHub 已验证结论后反向引用为权威。
