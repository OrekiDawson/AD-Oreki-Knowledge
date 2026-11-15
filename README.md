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
