# R113-01-KB 验收记录（2026-11-15）

| 项 | 状态 | 证据 |
| --- | --- | --- |
| GitHub 仓库 | PASS | https://github.com/OrekiDawson/AD-Oreki-Knowledge |
| Quartz 5 站点（25 篇专题页 + AI 草稿） | PASS | main 28a53600，content 25+ 页 |
| CI 构建（KB PR check） | PASS | run 43683077090 / 43683816936 |
| Pages 部署 | PASS | Deploy wiki run 43683986727 |
| 线上默认地址 | PASS | http://wiki.oreki.net/ 200；搜索索引 67 页 |
| 自定义域名 DNS | PASS | Cloudflare CNAME wiki.oreki.net -> orekidawson.github.io（proxied=false） |
| 自定义域名 HTTPS | BLOCKED | 证书尚未签发，https 返回 000；http 正常 |
| 中文全文搜索（6 术语） | PASS | Playwright 手机视口 6/6 命中 |
| 反向链接 / 图谱 / 暗色 / 代码高亮 | PASS | Playwright + 页面探测 |
| AI 同步调用 DeepSeek | PASS | run 43683649400，3 次调用，prompt 8196 / completion 2343 tokens |
| AI 生成知识条目 + 来源 | PASS | PR #7（18 条事实，带 commit 与原文摘录） |
| AI 草稿 PR 经 CI 后合并并上线 | PASS | PR #7 合并 28a53600；线上 /ai-drafts/… 200；搜索命中 |
| AI 异步问答 | PASS | Issue #10；运行 43684157060/43684157489；回答含 repo@commit 引用 |
| 敏感信息扫描 | PASS | check-content.mjs（cfat_/ghp_/sk-/私钥/内部路径）在每次构建执行 |
| 网站完全静态 | PASS | 无后端/数据库；搜索与索引均为静态 JSON |
| 不自动合并 AI PR | PASS | 工作流仅创建 PR；合并均人工执行 |
| 页面数 / 断链 | PASS | verify-build 62 HTML；check-content 断链检查通过 |