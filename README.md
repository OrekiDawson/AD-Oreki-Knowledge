# 反物质维度MOD 知识库

反物质维度 MOD（Oreki Edition）技术知识库。GitHub 是权威事实源，本仓库是 Quartz 5 知识展示与检索层。

- 站点：https://wiki.oreki.net（自定义域名；默认地址 https://orekidawson.github.io/AD-Oreki-Knowledge/）
- **公开的正式知识库规则**：https://wiki.oreki.net/wiki-rules（网站首页、目录与页脚均可进入）
- **规则页专用名称**：`反物质维度MOD Wiki:知识库规则`；普通条目标题、正文保持自然简体中文，不加前缀，URL 保持不变。
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

## AI 草稿：停止自动生成（2026-11-17）

**Wiki 不再自动调用 DeepSeek 生成知识草稿，也不再由定时任务自动创建草稿 PR。** 原 `.github/workflows/ai-knowledge-sync.yml` 已移除，关闭每日 18:30 的 `schedule` 入口；不创建替代的定时、PR 触发或自动 AI 同步任务。

- 仅在用户明确要求具体条目或资料整理时开展针对性写作，先核实原始来源，再按正常 PR 与内容审阅流程发布。不得为了保持产出自动扫描并批量生成条目。
- 现有 `content/ai-drafts/`、`.ai/state.json`、`evidence/ai-sync/` 及历史 PR 保留供追溯；未审草稿仍不进入公开网站或搜索。
- `scripts/ai/` 为未自动调用的历史实现；不得未经用户新的明确授权恢复工作流或调用模型。
- 普通 `KB PR check`、Quartz 搜索、GitHub Pages 部署及 HTTPS 校验继续工作，不依赖上述 AI 草稿功能。外部 Kody/Codex GitHub App 的实际启用情况以 GitHub 为准，本次不改其审查配置。

## 强制 HTTPS

正式域名：**https://wiki.oreki.net**。GitHub Pages 必须启用服务器端 `Enforce HTTPS`，不能用 Quartz 链接或浏览器端 JavaScript 跳转代替。

仓库管理员在 [Settings → Pages](https://github.com/OrekiDawson/AD-Oreki-Knowledge/settings/pages) 中确认：

1. Custom domain 为 `wiki.oreki.net`，DNS 的 `wiki` CNAME 指向 `orekidawson.github.io`。
2. GitHub Pages 的 HTTPS 证书签发完成后，选中 **Enforce HTTPS**。
3. 完成后重新运行 `.github/workflows/deploy-wiki.yml`，`verify-online` 必须通过。

`scripts/verify-https.sh` 会从 GitHub Pages API 检查 `https_enforced=true`，并使用正常 TLS 证书校验访问 HTTPS 页面，确认 HTTP 请求收到指向相同域名 HTTPS 的 301/302/307/308 跳转。证书尚未签发、设置未开启或出现 HTTP 回退时，验收明确 FAIL，不得以 HTTP 200 代替。

GitHub Actions 的普通 `GITHUB_TOKEN` 不具备修改 Pages 管理设置所需的 Administration 写权限，因此正式 Enforce HTTPS 开关由具有仓库管理权限的账户操作，不向 Actions 添加个人管理员 Token。

## 版权与内容许可

**本站有权授权的原创百科文字采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)**，允许署名转载、改写、翻译和商业使用，改编作品按相同或兼容许可共享。转载应说明作者、具体条目地址、许可链接与修改情况。

- [版权与许可（公开页面）](https://wiki.oreki.net/copyright)
- [原创文字许可范围（仓库文件）](LICENSE-CONTENT.md)
- 本仓库既有 [LICENSE.txt](LICENSE.txt) 中的 **MIT 软件许可及上游版权声明不变**；第三方游戏素材、代码和图片不由本站再授权。

## 中文百科式写作

本站正文以简体中文、通俗解释、客观核查为主。统一依据 [知识库规则全文](content/wiki-rules.md)（旧路径 [docs/CONTENT_QUALITY.md](docs/CONTENT_QUALITY.md) 为兼容入口），新条目参考 [中文知识条目模板](docs/ARTICLE_TEMPLATE.md)。Quartz 网站的 [知识库编写规范](https://wiki.oreki.net/getting-started/editorial-guidelines) 向读者介绍这些原则。

**人类读者优先**：技术名称、API、哈希保持原文并附中文解释；每条重大结论可点到原始证据；不设置单独的 AI 检索摘要，站内检索依赖 Quartz 原生搜索；正文以读者体验为先。

知识库已从中文维基百科的官方方针中选择适合技术文档的原则：中立表述、可供查证、来源质量、禁止无证据推断、文明协作与版权署名。具体改写和原始方针链接统一放在公开的 [知识库规则页](content/wiki-rules.md)，不复制方针原文，也不直接套用百科条目收录门槛。

## 内容质量门禁

正式知识条目的验收标准见 [docs/CONTENT_QUALITY.md](docs/CONTENT_QUALITY.md)。核心标准是：**可点击的固定来源、具体机制和验证步骤、事实等级、适用范围、最新状态**，不能以页面数量或构建 PASS 代替事实正确性。

未经人工审核的 AI 草稿仍存于 GitHub 的 `content/ai-drafts/` 供回查，但不得发布到 Quartz、公开搜索索引或问答检索。当前状态必须以真实上游 PR / 运行报告为准。

## 内容纪律

- 不编造 Commit、行号、ABI 描述符与测试结果。
- 被推翻结论保留历史解释，标注「旧结论 → 新证据 → 当前判断」。
- 不把私有构建产物、用户存档、Token、内部路径写入公开仓库。
