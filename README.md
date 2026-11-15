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

push main -> .github/workflows/deploy.yml -> GitHub Pages（artifact: public/）。
PR 触发 pr-check.yml（不部署）。

## 每天首次 PR 的 AI 知识整理

- 普通 PR 都执行 `pr-check.yml` 的 Quartz 构建，**不因 AI 跳过而略过正常 CI**。
- `.github/workflows/ai-first-pr.yml` 在 PR CI 完成后运行：按 **北京时间 UTC+8**，从所有历史 PR（包括已关闭、Dependabot）选出当日**最早创建**的一个。
- 当日首次 PR：从 GitHub API 只读取得改动，调用 **一次** DeepSeek 整理知识主题、需要核实的证据和链接建议；结果写入 GitHub Actions **Job Summary**，并保存 `kb-ai-YYYY-MM-DD` Artifact。
- 当日其他 PR：判定 Job 显示 **SKIPPED**，`AI 整理` Job 显示跳过，**不会调用模型或消耗 AI Token**。首次 PR 后续重新触发也会根据已成功的当日 Artifact 跳过。
- 模型任务运行在受信任的 `main` 上；**不检出、不执行 PR 代码**，仅以只读权限分析 PR diff。API Key 保留在 `DEEPSEEK_API_KEY` Secrets，模型不会提交文件、自动合并 PR 或修改正式知识。
- 缺少密钥、GitHub API 无法判断首个 PR、AI 失败时显示 **FAIL**，不得冒称 SKIPPED。AI 建议是辅助整理，不等于真实证据或代码审查 PASS。
- 原有 `ai-knowledge-sync.yml` 的定时同步是另一项任务，不受本 PR 触发限额影响；如需要全部 AI 调用每天只一次，应另行调整定时同步策略。

## 强制 HTTPS

正式域名：**https://wiki.oreki.net**。GitHub Pages 必须启用服务器端 `Enforce HTTPS`，不能用 Quartz 链接或浏览器端 JavaScript 跳转代替。

仓库管理员在 [Settings → Pages](https://github.com/OrekiDawson/AD-Oreki-Knowledge/settings/pages) 中确认：

1. Custom domain 为 `wiki.oreki.net`，DNS 的 `wiki` CNAME 指向 `orekidawson.github.io`。
2. GitHub Pages 的 HTTPS 证书签发完成后，选中 **Enforce HTTPS**。
3. 完成后重新运行 `.github/workflows/deploy-wiki.yml`，`verify-online` 必须通过。

`scripts/verify-https.sh` 会从 GitHub Pages API 检查 `https_enforced=true`，并使用正常 TLS 证书校验访问 HTTPS 页面，确认 HTTP 请求收到指向相同域名 HTTPS 的 301/302/307/308 跳转。证书尚未签发、设置未开启或出现 HTTP 回退时，验收明确 FAIL，不得以 HTTP 200 代替。

GitHub Actions 的普通 `GITHUB_TOKEN` 不具备修改 Pages 管理设置所需的 Administration 写权限，因此正式 Enforce HTTPS 开关由具有仓库管理权限的账户操作，不向 Actions 添加个人管理员 Token。

## 内容纪律

- 不编造 Commit、行号、ABI 描述符与测试结果。
- 被推翻结论保留历史解释，标注「旧结论 → 新证据 → 当前判断」。
- 不把私有构建产物、用户存档、Token、内部路径写入公开仓库。
