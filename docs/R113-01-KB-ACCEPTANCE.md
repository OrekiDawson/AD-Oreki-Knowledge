# R113-01-KB 验收记录（2026-11-15）

| 项 | 状态 | 证据 |
| --- | --- | --- |
| GitHub 仓库 | PASS | https://github.com/OrekiDawson/AD-Oreki-Knowledge |
| Quartz 5 站点 | PASS | 25 篇专题页 + AI 草稿；main 多轮合并 |
| CI 构建（KB PR check） | PASS | run 43684448731 / 43703319727 等 |
| Pages 部署 | PASS | deploy-wiki run 43683986727 / 43703684012 |
| 自定义域名 DNS | PASS | CNAME wiki.oreki.net → orekidawson.github.io（DNS only）；CAA 允许 letsencrypt/digicert |
| 自定义域名 HTTPS | PASS | 证书 CN=wiki.oreki.net（Let's Encrypt，有效期至 2027-02-13）；https 200；http 301 → https；https_enforced=true；deploy run 43703684012 严格门禁 PASS |
| 中文全文搜索 | PASS | contentIndex 61→67 页；6/6 中文术语命中（Playwright 手机视口） |
| 反向链接 / 图谱 / 暗色 / 代码高亮 | PASS | Playwright + 页面探测 |
| AI 同步调用 DeepSeek | PASS | run 43683649400：3 calls，prompt 8196 / completion 2343 tokens |
| AI 生成知识条目 + 来源 | PASS | PR #7：18 条事实，含 commit 与原文摘录 |
| AI 草稿经 CI 后合并上线 | PASS | PR #7 → main 28a53600；线上 /ai-drafts/… 200；搜索命中 |
| AI 异步问答 | PASS | Issue #10；run 43684157060/43684157489；回答含 repo@commit 引用 |
| HTTPS 每日监测工作流 | PASS | https-certificate-monitor.yml + scripts/https-monitor.mjs + 11/11 单测；真实 run 更新 Issue #9 |
| 敏感信息扫描 | PASS | check-content.mjs（cfat_/ghp_/sk-/私钥/内部路径） |
| 网站完全静态 | PASS | 无后端/数据库；搜索与索引均为静态 JSON |
| 不自动合并 AI PR | PASS | 工作流仅创建 PR；合并均人工 |

## 最终状态（2026-11-15 18:50，证书已签发）

- GitHub Pages 已签发 wiki.oreki.net 证书：CN=wiki.oreki.net，issuer Let's Encrypt，有效期至 2027-02-13（约 89 天）。
- https_enforced=true；https://wiki.oreki.net/ 200；http://wiki.oreki.net/ 301 → https://wiki.oreki.net/。
- 每日监测本地实跑 overall=PASS（18 项检查全部 PASS）；deploy-wiki 严格 HTTPS 门禁 run 43703684012 PASS。
- 结论：HTTPS 由 BLOCKED 转为 PASS；Issue #9 由监测工作流在 PASS 后自动关闭。