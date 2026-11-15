# 维护说明

## 仓库形态

薄仓库：只保存 `content/`（Markdown）、`quartz.config.yaml`、`scripts/`、`.github/`。
构建时由 `scripts/bootstrap-quartz.sh` 克隆**固定版本**的官方 Quartz 5 源码（pin 在脚本内），再叠加本仓库内容。

> 本地 Node 26 构建会触发 esbuild service SIGBUS。CI 已固定 Node 24；本地请使用 Node 24（`.node-version` 也指向 24.x）。若本机默认是 Node 26，可用 nvm 安装 24 后在构建 shell 中切换。

## 规则文件

- 唯一权威编写规则：`content/wiki-rules.md`（公开页面 `/wiki-rules`）。
- `docs/CONTENT_QUALITY.md` 是兼容入口，只保留摘要与指向；`docs/ARTICLE_TEMPLATE.md` 是编辑模板。
- 不要在两处同时维护规则正文；要改规则就改 `content/wiki-rules.md`。

## 日常流程

1. 修改/新增 Markdown（必须含 frontmatter `title`；专题条目要有中文导语与就近来源）。
2. 内部链接用 `[[页面名]]`；CI 会检查断链。
3. 专题条目写当前有效结论；时间线、逐日改动与轮次结案写进 `content/history/`。
4. PR -> `KB PR check`（构建 + 内容检查 + 产物检查）。
5. 合并 main -> `Deploy wiki to GitHub Pages`（构建、部署、线上验收）。

## 内容检查（`scripts/check-content.mjs`）

机器可判断的规则会被 CI 拦截，当前包括：

- frontmatter 与 `title` 存在，规则页标题固定；
- 普通条目标题不带命名空间前缀；
- 内部 `[[链接]]` 可达；
- 敏感信息与私有路径扫描；
- 未审核 AI 草稿不得作为正式内容被引用；
- 反日志化：普通条目不得出现「## R113-01」这类轮次章节，新增条目必须有主题导语；
- 历史归档必须位于 `content/history/` 且带「历史」标签，其他目录不得伪装成历史。

流畅性、解释深度与事实真实性仍依靠人工复核，CI 不做逐字审计。

## AI 工作流（与 README 保持一致）

| 工作流 | 触发 | 作用 |
| --- | --- | --- |
| ai-first-pr.yml | PR 创建（当日首个 PR 才实际调用模型） | 只读分析 PR diff、描述与页面目录，生成结构化知识整理报告；不提交文件、不合并 |
| ai-knowledge-sync.yml | 仅 `workflow_dispatch` 手动 | 对比来源 Commit，调用 DeepSeek 生成待审草稿 PR |
| ai-knowledge-qa.yml | 仅 `workflow_dispatch` 手动 | 检索 Wiki + 拉取原始证据，DeepSeek 生成带引用回答 |
| deploy-wiki.yml | main push / 手动 | 构建并部署 Pages，线上验收 |

AI 关键词索引在 `pr-check.yml` 与 `deploy-wiki.yml` 中随构建生成，不再有独立的 `ai-index-build.yml`。
密钥：仅 `DEEPSEEK_API_KEY`（Repository Secret），只注入 AI 工作流；PR 工作流不接触密钥。

## 历史归档工作流

1. 把带明确时间性的材料写进 `content/history/`，文件名以日期开头（如 `2026-11-15-....md`），`tags` 含「历史」。
2. 历史条目写清「当时结论 / 现在是否仍然有效 / 适用版本」，并链接原始 PR、Run 或报告。
3. 专题页用「历史变化」或「参考资料」按需链接历史条目，不复制整段历史。
4. `content/history/index.md` 是归档索引，负责分类与检索入口。

## 安全约束

- 不提交 Token、私钥、用户存档、私人路径、内部服务器地址。
- `scripts/check-content.mjs` 会扫描 `cfat_`/`ghp_`/`sk-`/私钥/`/home/oreki/` 等模式，命中即失败。
- AI 生成的草稿 PR 必须人工逐条核对来源 Commit 后合并；工作流禁止自动合并。
- 不在 `pull_request_target` 中执行外部 PR 代码。

## 回滚

- 站点回滚：main 上 revert 对应合并提交，推送后自动重新部署。
- 来源状态回滚：删除 `.ai/state.json` 中对应条目即可让下次同步重新处理该来源。
