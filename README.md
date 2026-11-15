# AD-Oreki Knowledge Base

反物质维度 MOD（Oreki Edition）技术知识库。GitHub 是权威事实源，本仓库是 Quartz 5 知识展示与检索层。

- 站点：https://wiki.oreki.net（自定义域名；默认地址 https://orekidawson.github.io/AD-Oreki-Knowledge/）
- 构建：Quartz 5 + Node 24（本地 Node 26 时 esbuild service 会 SIGBUS，请用 Node 24 构建）
- 内容：content/ 下 Markdown，frontmatter + 证据区
- 检查：scripts/check-content.mjs（页面/链接/敏感信息/术语）、scripts/verify-build.mjs（产物）
- 验收：scripts/acceptance.cjs（Chromium 手机视口，搜索/导航/反向链接/图谱/暗色/溢出）

## 本地构建

~~~bash
npm ci
npx quartz plugin install --from-config
node scripts/check-content.mjs
npx quartz build
node scripts/verify-build.mjs
~~~

## 部署

push main -> .github/workflows/deploy-wiki.yml -> GitHub Pages（artifact: public/）。
PR 触发 pr-check.yml（不部署）。

## AI 功能：只保留必要的自动化

**唯一自动调用大模型的 PR 流程**：`.github/workflows/ai-first-pr.yml`。

- 按北京时间（UTC+8）PR **创建日期**判断当日首个 PR，计入历史已关闭 PR 和 Dependabot；其他 PR 的 AI job 显示 `SKIPPED`，普通 `pr-check.yml` 构建照常执行。
- 当日首个 PR：由可信 main 脚本只读分析 GitHub API 的 PR diff、PR 描述和现有 Wiki 页面目录，向 DeepSeek 发起一次结构化知识整理（失败允许有限重试）。报告显示在 Actions Job Summary，Artifact 保存 90 天。
- 整理内容：**实际变更、知识条目更新计划、历史事实冲突、P0/P1/P2 风险、缺失证据及最小验证、最终知识整理判定**。提示词在 `scripts/ai/pr-review-prompt.mjs`；报告结构由 `scripts/ai/pr-review-report.mjs` 校验。
- 模型只能提出建议，不能提交文件、修改 PR 或自动合并。PR 输入只当不可信数据，绝不检出或执行 PR 代码，不将密钥提供给 PR。
- 当日已有成功的 `kb-ai-YYYY-MM-DD` Artifact 时，重跑也跳过；无法核实、密钥缺失或模型失败必须显示 `FAIL`，不得假报 `SKIPPED`。
- **跨日首次 PR AI 模型调用尚需真实运行证据**；仅通过单元测试或 SKIPPED 路径不代表真实 DeepSeek 调用 PASS。

其他非必要 AI 自动触发已收敛：

- `ai-knowledge-sync.yml`：不再每天自动跑，只在维护人员主动点击 `workflow_dispatch` 时调用 DeepSeek 生成待审草稿 PR。
- `ai-knowledge-qa.yml`：不再在 Issue 创建/打标签时自动消耗模型，只允许维护人员主动运行问答。
- 独立 `ai-index-build.yml` 已删除。非模型的关键词索引仍在 `pr-check.yml` 和 `deploy-wiki.yml` 中构建，无须额外执行第三份 CI；`scripts/ai/build-index.mjs` 保留。
- 原有来源、历史证据和 AI 草稿不删除，知识库事实始终由 GitHub 原始来源和正式审核决定。

## 强制 HTTPS

正式域名：**https://wiki.oreki.net**。GitHub Pages 必须启用服务器端 `Enforce HTTPS`，不能用 Quartz 链接或浏览器端 JavaScript 跳转代替。

仓库管理员在 [Settings → Pages](https://github.com/OrekiDawson/AD-Oreki-Knowledge/settings/pages) 中确认：

1. Custom domain 为 `wiki.oreki.net`，DNS 的 `wiki` CNAME 指向 `orekidawson.github.io`。
2. GitHub Pages 的 HTTPS 证书签发完成后，选中 **Enforce HTTPS**。
3. 完成后重新运行 `.github/workflows/deploy-wiki.yml`，`verify-online` 必须通过。

`scripts/verify-https.sh` 会从 GitHub Pages API 检查 `https_enforced=true`，并使用正常 TLS 证书校验访问 HTTPS 页面，确认 HTTP 请求收到指向相同域名 HTTPS 的 301/302/307/308 跳转。证书尚未签发、设置未开启或出现 HTTP 回退时，验收明确 FAIL，不得以 HTTP 200 代替。

GitHub Actions 的普通 `GITHUB_TOKEN` 不具备修改 Pages 管理设置所需的 Administration 写权限，因此正式 Enforce HTTPS 开关由具有仓库管理权限的账户操作，不向 Actions 添加个人管理员 Token。

## 内容质量门禁

正式知识条目的验收标准见 [docs/CONTENT_QUALITY.md](docs/CONTENT_QUALITY.md)。核心标准是：**可点击的固定来源、具体机制和验证步骤、事实等级、适用范围、最新状态**，不能以页面数量或构建 PASS 代替事实正确性。

未经人工审核的 AI 草稿仍存于 GitHub 的 `content/ai-drafts/` 供回查，但不得发布到 Quartz、公开搜索索引或问答检索。当前状态必须以真实上游 PR / 运行报告为准。

## 内容纪律

- 不编造 Commit、行号、ABI 描述符与测试结果。
- 被推翻结论保留历史解释，标注「旧结论 → 新证据 → 当前判断」。
- 不把私有构建产物、用户存档、Token、内部路径写入公开仓库。
