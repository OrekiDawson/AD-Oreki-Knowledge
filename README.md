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

## 内容纪律

- 不编造 Commit、行号、ABI 描述符与测试结果。
- 被推翻结论保留历史解释，标注「旧结论 → 新证据 → 当前判断」。
- 不把私有构建产物、用户存档、Token、内部路径写入公开仓库。
