# 维护说明

## 仓库形态

薄仓库：只保存 `content/`（Markdown）、`quartz.config.yaml`、`scripts/`、`.github/`。
构建时由 `scripts/bootstrap-quartz.sh` 克隆**固定版本**的官方 Quartz 5 源码（pin 在脚本内），再叠加本仓库内容。

> 本地 Node 26 构建会触发 esbuild service SIGBUS，请使用 Node 24（CI 已固定 24）。

## 日常流程

1. 修改/新增 Markdown（必须含 frontmatter `title` 与证据区）。
2. 内部链接用 `[[页面名]]`；CI 会检查断链。
3. PR -> `KB PR check`（构建 + 内容检查 + 产物检查）。
4. 合并 main -> `Deploy wiki to GitHub Pages`（构建、部署、线上验收）。

## AI 工作流

| 工作流 | 触发 | 作用 |
| --- | --- | --- |
| ai-knowledge-sync.yml | 每日 20:00 UTC / 手动 | 对比来源 Commit，调用 DeepSeek 生成草稿，自动开 PR（不自动合并） |
| ai-knowledge-qa.yml | Issue 打上 `ai-qa` 标签 / 手动 | 检索 Wiki + 拉取原始证据，DeepSeek 生成带引用回答，回复 Issue |
| ai-index-build.yml | main 的 content 变更 | 生成 `quartz/static/knowledge-index.json`（中文二元关键词倒排） |
| deploy-wiki.yml | main push / 手动 | 构建并部署 Pages，线上验收 |

密钥：仅 `DEEPSEEK_API_KEY`（Repository Secret），只注入 AI 工作流；PR 工作流不接触密钥。

## 安全约束

- 不提交 Token、私钥、用户存档、私人路径、内部服务器地址。
- `scripts/check-content.mjs` 会扫描 `cfat_`/`ghp_`/`sk-`/私钥/`/home/oreki/` 等模式，命中即失败。
- AI 生成的草稿 PR 必须人工逐条核对来源 Commit 后合并；工作流禁止自动合并。
- 不在 `pull_request_target` 中执行外部 PR 代码。

## 回滚

- 站点回滚：main 上 revert 对应合并提交，推送后自动重新部署。
- 来源状态回滚：删除 `.ai/state.json` 中对应条目即可让下次同步重新处理该来源。