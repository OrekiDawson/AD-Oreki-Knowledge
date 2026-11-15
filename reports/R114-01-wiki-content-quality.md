# R114-01 · 原版翻译内容质量纠正报告（wiki-translation）

- 时间：2026-11-15（Asia/Singapore）
- 仓库：OrekiDawson/AD-Oreki-Knowledge；分支 `docs/r114-content-quality`（基于 main aef7e15）
- 触发：用户反馈译文仍有未解释的动态模板文本、繁体残留、外链未中文化、状态虚高

## 1. 修复内容

| # | 文件 | 问题 | 处理 | 证据 |
| --- | --- | --- | --- | --- |
| 1 | ow-pelle.md | `[无限/永远/永恒]`、`[真空/空洞/虚空]`、`{value}` 未解释 | 新增「词形变换与占位符说明」节（7 条词形链英文对照 + 依据）；引言与裂痕表补就地说明；原占位符保留 | 原站模板 + 游戏内 forever 字符串（Infinite\|Forever\|Eternal，官方中文 无尽之地｜永恒流转｜不息轮回）+ navigation.js riftNames |
| 2 | ow-eternity.md | 繁体「基礎」；公式变量中文化；按钮语义歧义；外链未中文化 | 全文重写校对：基础；`IP_{\text{highest this Eternity}}`+中文解释；「首次解锁第 8 个无限维度」；17 处外链改内链；补原文两处拼写错误说明 | 原站 revid 3118 逐段对照 |
| 3 | 34 篇译文 | 指向原站已译标题的英文外链 | 批量改中文内部链接（目标页不存在则保留外链） | 406 处 |
| 4 | ow-infinity.md:54 | 「基礎」 | 「基础」 | 繁体专用字集扫描 0 残留 |
| 5 | ow-v.md / ow-ra.md | `{req}` / `{天神名}` 占位符无说明 | 表格前补占位符说明段 | 原站模板 |

## 2. 状态诚实化

- 全部 35 篇正文由 REVIEWED 改为 **STRUCTURE CHECKED**（REVIEWED 0 / VERIFIED 0），与 #32 四级定义一致；不再用结构计数冒充审校。
- Pelle、Eternity 已完成逐段对照，另留页面级记录：`docs/translation/reviews/pelle.md`、`eternity.md`，待独立复核后升格。
- 覆盖率口径：已审校 **0/68（0.0%）**、结构核对 **35/68（51.5%）**；与 wiki-editorial PR #32 的四级定义一致。

## 3. 验证（本地真实执行，Node v24.22.3 / Quartz pin 7cfb0796）

| 检查 | 结果 |
| --- | --- |
| check-content | PASS（86 页） |
| check-translation | PASS（0/68 REVIEWED、35 TRANSLATED、BLOCKED 0） |
| build-index | PASS（pages=85 chunks=362） |
| npx quartz build | PASS（Parsed 85 / Emitted 372 files / 158 HTML；无 [links] 告警） |
| verify-build | PASS（158 HTML、类目/旧 URL/新条目） |
| acceptance.cjs（Chromium 412×915） | PASS（bad: []） |
| 内链完整性 | 清理 og-image 误报后，/original/ 内链目标全部存在 |

## 4. 未完成

- 其余 33 篇未逐段审校（仅结构/术语/链接/占位符机械检查）——已如实记 TRANSLATED。
- 406 处内链替换中，部分原文锚点因中文页结构不同被丢弃，需后续复核。
- 公式数值未与游戏源码交叉验证（仅与官方中文术语比对）。
