# AGENTS.md：反物质维度 MOD 中文知识库

> 适用范围：本仓库 `OrekiDawson/AD-Oreki-Knowledge` 的所有 AI Agent、自动化编辑器和维护者。正式站点：<https://wiki.oreki.net/>。
>
> **本文件是仓库操作入口，不是第二套百科编写规范。** 一切公开内容以 [`content/wiki-rules.md`](content/wiki-rules.md) 为唯一权威规则；冲突时优先执行该规则，不要复制或暗改它。

## 1. 先读规则，再动文件

每次任务先读与改动相关的真实文件，不依赖旧对话或历史报告替代当前状态：

1. [`README.md`](README.md) 和 [`content/wiki-rules.md`](content/wiki-rules.md)：项目定位、正式公开规则。
2. [`docs/AGENT_GUIDE.md`](docs/AGENT_GUIDE.md)：内容地图、检索方式和事实判断。
3. [`docs/ARTICLE_TEMPLATE.md`](docs/ARTICLE_TEMPLATE.md)：中文专题与历史条目模板。
4. 翻译工作额外读取 [`docs/translation/POLICY.md`](docs/translation/POLICY.md)、[术语表](docs/translation/glossary.md) 和来源清单。
5. 构建、部署或自动化工作读取 [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) 及对应脚本、Workflow。
6. 需要核实游戏事实时，访问 Android、Web 对应源码、固定 Commit、PR、Issue、Actions Run 和真实 AVD/浏览器运行证据。

`docs/CONTENT_QUALITY.md` 只是兼容入口，**不要在其中维护另一份规则正文**。工程交付规则仍归属 Android/Web 源码仓库，本仓库不代替它们下开发决策。

## 2. 写作定位：读者优先，准确可查

- 正文、标题、图注、表格说明和标签以**自然简体中文**撰写；代码、命令、API、DEX/ABI 描述符和专有名词保留准确原文，首次出现时解释。
- 普通条目使用自然中文标题，例如“自动购买器”“存档兼容”，**不要加**“反物质维度MOD Wiki:”前缀。仅公开规则页使用固定名称 **`反物质维度MOD Wiki:知识库规则`**。
- 一篇专题解释一个独立主题：是什么、为什么、如何运作、目前已确认什么、局限与如何核查。先解释机制，再给技术细节，不能把开发者日志直接当正文。
- 自然段优先；表格用于真实对照，列表用于步骤。不使用空洞套话、AI 风格口号、模板占位或为增加页数而机械拆分。
- 每项关键数字、版本、状态、机制与结论应在**相关陈述附近**附可点击的一手来源。优先固定 Commit 的具体文件或报告，必要时补充 PR、Actions Run、设备证据及上游官方资料。
- 明确区分：**已证实事实、来源作者声明、合理推断、待核实、历史已推翻结论**。静态读码、构建成功、运行通过、真实新档通关、正式发布属于不同结论，不能互相冒充。
- 不伪造 Commit、行号、SHA、ABI、公式、测试、截图和引用；来源打不开或当前版本不符，标明待核实，必要时不发布该断言。
- 发现旧结论错误时，修正现行专题，并保留简洁的“旧结论 → 新证据 → 当前判断”；不删除具有价值的历史证据。

## 3. 原版、MOD 和历史必须分区

| 目录 | 内容归属 |
| --- | --- |
| `content/original/` | 原版《反物质维度》Wiki 的中文翻译，严格忠实原文，不混入 MOD 数值或规则 |
| `content/gameplay/`、`architecture/`、`build/` 等 | MOD 现行玩法、架构、构建及可查证的技术机制 |
| `content/current/` | 当前状态、已知问题及发布状态，写明适用版本与最后核实时间 |
| `content/history/` | 有日期的开发事件、轮次、Release Notes、旧判定和历史归档 |
| `content/ai-drafts/` | 待人工核实的 AI 草稿，**不属于正式公开知识** |

- 不在普通专题里无限追加 R 编号、Commit 清单、每天的修复流水账或 CI 记录；开发原始过程留在源码仓的 `reports/`、Issue 和 PR。
- 不为同一事实不断开重复条目。优先修改已有专题并给出来源；必要时通过“相关条目”链接。
- 历史条目放在 `content/history/`，`tags` 包含“历史”；写清**当时结论、是否仍有效、适用版本和现行专题链接**。
- 目录显示名称以中文 `index.md` 的 `title` 为准，**不为改展示名称而随意改路径或 URL**。确需迁移须配置 alias、检查旧链接与导航。
- 公开条目必须在 YAML frontmatter 中设置准确的中文 `title`、非空的中文 `description` 和至少一个 `tags` 标签，并使用有效的 `[[内部链接]]`；三项缺失均会触发 `scripts/check-content.mjs` 检查失败。

## 4. 原版翻译、版权与审校等级

执行 `docs/translation/POLICY.md` 和正式知识库规则：

- 逐页核对原文 URL、页面 ID、修订 ID、作者/历史、抓取时间与许可；保留可见“来源与许可”块。
- 原站允许授权的内容遵守 **CC BY-SA 4.0** 及署名、改编说明、相同方式共享义务；本站原创可授权文字亦按该许可公开。软件和第三方素材按各自原有许可处理。
- **不转载原站图片、图标、截图、导航模板或许可不明的第三方材料**；对应位置说明媒体未转载。许可不明标 `BLOCKED`，不能先发布后补手续。
- 原版翻译不得添加 MOD 机制；MOD 条目不能把原版 Wiki 的译文当作 MOD 实测来源。
- 术语统一使用 `docs/translation/glossary.md`。保留原版数字、公式、解锁条件和章节结构；发现原文错误加明确译者注，不偷偷改写原文。
- 翻译状态严格区分 `TRANSLATED`、`STRUCTURE CHECKED`、`REVIEWED`、`VERIFIED AGAINST GAME`。**结构检查不等于逐段语义审校**；没有页面级记录不得标 `REVIEWED`，没有源码/运行证据不得标 `VERIFIED AGAINST GAME`。
- 一次翻译批次原则上 5–10 篇，更新来源清单与许可记录；不可为了提升覆盖率虚报审校等级或随意覆盖人工审校成果。

## 5. 改动流程和最小必要验证

1. 确认用户目标与改动范围，检索现有文章、历史、来源和未合并 PR；避免重复工作与覆盖其他 Agent 的修改。
2. 仅修改必要文件。专题事实、翻译、网站功能、CI/CD 与规则分别按其归属处理；不无差别重写 README、全部条目或翻译清单。
3. 新/改正文对照原始来源，检查中文导语、事实状态、准确的固定引用、许可、frontmatter、站内链接与旧 URL。
4. **内容类改动**：至少运行适用的内容检查；**翻译类**：额外执行翻译校验；**构建/模板/导航/部署类**：按风险进行完整构建、产物校验和必要浏览器验证。已有 PR CI 可提供同等证据时不机械重复运行。
5. 使用正常分支和 PR 流程，保留可追溯的中文变更说明与证据。PR 检查通过并完成实质审阅后再合并；CI 绿灯不能证明事实正确或许可合规。
6. 合并后由现有部署工作流发布；如触及网站呈现或 HTTPS，核查真实线上结果。不因“已 Push”就宣称正式发布 PASS。

本仓库使用 **Quartz 5 + Node 24**；Node 26 曾触发 esbuild SIGBUS，不要未经验证把构建环境切换过去。当前 CI 的实际构建步骤是：

```bash
node scripts/check-translation.mjs
bash scripts/bootstrap-quartz.sh .quartz-build
cd .quartz-build
npm ci
npx quartz plugin install --from-config
node scripts/check-content.mjs
npx quartz build
node scripts/verify-build.mjs
```

以上命令只在有必要时按范围执行；文档单文件修改优先复用 PR CI。页面导航、搜索、反向链接、深浅色与手机溢出等用户可见改动，再按 `scripts/acceptance.cjs` 所需的 Chromium 手机视口验证。核对当前脚本和 CI 后再确定具体参数，不猜测不存在的命令。

## 6. AI 自动化、任务协作与成本

- **当前唯一计划中的 AI 工作流**为 `.github/workflows/ai-knowledge-sync.yml`：北京时间每日 18:30 的 `schedule`，仅整理白名单来源变化，生成 `content/ai-drafts/` 草稿和待审核 PR；不自动合并、不修改正式正文。
- 余额低于 ¥10、余额无法核实、模型凭据不可用或不在允许时段时，不调用模型。没有有效来源变化或存在待审草稿时跳过，不为了消耗配额制造内容。
- **不要擅自恢复** Wiki 的 PR 首次 AI 审查、Kody/Kodus 审查、AI 问答、独立 AI 检索索引或额外定时 AI 工作流；站内搜索使用 Quartz 原生能力。
- Agent 可提出修改草稿，但不得把机器生成或格式检查视为人工事实审阅。任何正式内容须经可追溯的来源和正常 PR 审阅。
- 多 Agent 并行时明确文件归属，避免同时修改同一文章、来源清单或站点配置；任务委派与结果留文件记录。没有有效工作时允许结束，不用前台长时间 `sleep` 或频繁空轮询占用 Lead。

## 7. 发布、安全与收口

- 现有 `.github/workflows/pr-check.yml` 负责 PR 检查；`deploy-wiki.yml` 在合规的 main 更新后构建并发布 GitHub Pages。**不得绕过检查或直接篡改公开生成物**。
- 正式域名为 `https://wiki.oreki.net`；必须由 GitHub Pages 服务器端启用 `Enforce HTTPS`，并由现有 `verify-https.sh` 验证证书与 HTTP→HTTPS 跳转。不能用客户端 JavaScript 跳转代替。
- 禁止提交密钥、Token、私钥、用户存档、私人工作路径、内部地址、受限制素材和未核实来源。
- 文档/规则/Workflow 修改遵循仓库现有 PR 审阅流程，不弱化安全检查、来源校验或 GitHub Pages 部署门禁。
- 如改动需要仓库管理员专属权限，记录明确阻塞及操作路径，禁止绕过权限或引入高权限长期密钥。
- 交付总结写明：修改文件、关键来源与实际结论、验证命令和结果、PR/Commit、部署状态，以及尚未核实的部分。使用 `PASS / FAIL / BLOCKED / NOT RUN`，**未执行的不写 PASS**。
- 完成当前授权工作后安全收口，不擅自扩大任务范围或修改无关源码仓库。

**最终标准：知识库是一部供人阅读、能逐项追溯来源的中文百科，不是开发日志仓库，也不是 AI 生成内容的展示橱窗。**
