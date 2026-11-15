#!/usr/bin/env node
// 构建产物检查：首页 / 搜索索引 / 页面数量 / 中文类目 / 历史归档 / 旧 URL 兼容 / AI 草稿隔离
import fs from "node:fs";
import path from "node:path";

const PUB = "public";
let failed = 0;
const fail = (m) => {
  failed += 1;
  console.error("FAIL " + m);
};
const exists = (p) => fs.existsSync(path.join(PUB, p));
const pageExists = (slug) =>
  exists(slug + ".html") || exists(path.join(slug, "index.html"));

if (!exists("index.html")) fail("缺少 public/index.html");
if (!fs.existsSync(path.join(PUB, "static"))) fail("缺少 public/static");
if (!fs.existsSync(path.join(PUB, "static", "contentIndex.json"))) fail("缺少搜索索引 static/contentIndex.json");
if (!fs.existsSync(path.join(PUB, "static", "knowledge-index.json"))) fail("缺少 AI 关键词索引 static/knowledge-index.json");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const htmlFiles = fs.existsSync(PUB) ? walk(PUB).filter((f) => f.endsWith(".html")) : [];
if (htmlFiles.length < 15) fail("HTML 页面数不足: " + htmlFiles.length);

// 未审核 AI 草稿不得进入公开 HTML / 搜索 / 关键词索引。
if (htmlFiles.some((file) => file.includes(path.sep + "ai-drafts" + path.sep))) {
  fail("未审核 AI 草稿被输出成公开 HTML 页面");
}
for (const file of ["static/contentIndex.json", "static/knowledge-index.json"]) {
  const full = path.join(PUB, file);
  if (!fs.existsSync(full)) continue;
  try {
    const index = JSON.parse(fs.readFileSync(full, "utf8"));
    if (file.endsWith("contentIndex.json")) {
      if (!index || typeof index !== "object" || Array.isArray(index)) throw new Error("索引结构无效");
      for (const [slug, entry] of Object.entries(index)) {
        if (slug.includes("ai-drafts") || String(entry?.title ?? "").startsWith("AI 草稿：")) {
          fail("未审草稿出现在 Quartz 搜索索引中: " + slug);
        }
      }
    } else {
      if (!Array.isArray(index.pages) || !Array.isArray(index.chunks)) throw new Error("关键词索引结构无效");
      for (const page of index.pages) {
        if (String(page?.path ?? "").startsWith("ai-drafts/") || String(page?.title ?? "").startsWith("AI 草稿：")) {
          fail("未审草稿出现在关键词页面索引中: " + String(page?.path));
        }
      }
      for (const chunk of index.chunks) {
        if (String(chunk?.page ?? "").startsWith("ai-drafts")) fail("未审草稿出现在关键词分块索引中");
      }
    }
  } catch (error) {
    fail("无法可靠校验搜索索引 " + file + "：" + error.message);
  }
}

const home = fs.readFileSync(path.join(PUB, "index.html"), "utf8");
for (const term of ["反物质维度MOD 知识库", "知识库规则", "玩法机制"]) {
  if (!home.includes(term)) fail("首页缺少文案: " + term);
}

// 规则页、版权页、游戏总览、类目页
for (const slug of ["wiki-rules", "copyright", "antimatter-dimensions"]) {
  if (!pageExists(slug)) fail("缺少页面 /" + slug);
}
// 类目显示名必须是中文（由各目录 index.md 的 title 提供）
const CATEGORY_TITLES = {
  "getting-started": "入门指南",
  current: "当前状态",
  architecture: "架构与运行时",
  "reverse-engineering": "逆向与语义映射",
  build: "构建与交付",
  gameplay: "玩法机制",
  troubleshooting: "故障排查",
  references: "参考资料",
  history: "历史归档",
  original: "原版 Wiki 中文翻译",
};
for (const [dir, title] of Object.entries(CATEGORY_TITLES)) {
  const file = path.join(PUB, dir, "index.html");
  if (!fs.existsSync(file)) {
    fail("缺少类目页 /" + dir + "/");
    continue;
  }
  if (!fs.readFileSync(file, "utf8").includes(title)) fail("类目页 /" + dir + "/ 未显示中文类目名: " + title);
}

// 历史归档必须独立存在，且至少有一条历史条目
if (!exists(path.join("history", "index.html"))) fail("缺少历史归档索引 /history/");
const historyEntries = htmlFiles.filter(
  (f) => f.includes(path.sep + "history" + path.sep) && path.basename(f) !== "index.html",
);
if (historyEntries.length < 3) fail("历史归档条目不足（应把时间性材料移入 content/history/）: " + historyEntries.length);

// 旧 URL 兼容：既有页面路径不得因专题化改造而消失
const LEGACY_URLS = [
  "architecture/android",
  "architecture/kotlin-runtime",
  "architecture/web",
  "architecture/directory-migration",
  "reverse-engineering/dex-abi",
  "build/agp",
  "build/ci-cd",
  "build/r8",
  "build/signature-backfill",
  "build/build-mod-retirement",
  "gameplay/automation",
  "gameplay/challenges",
  "gameplay/saves",
  "gameplay/stage-gates",
  "current/project-status",
  "current/release-status",
  "current/known-issues",
  "getting-started/editorial-guidelines",
  "getting-started/how-to-use",
  "getting-started/project-overview",
  "references/source-index",
  "references/terminology",
  "troubleshooting/coroutine-abi",
  "troubleshooting/save-compatibility",
];
for (const slug of LEGACY_URLS) if (!pageExists(slug)) fail("旧页面 URL 丢失: /" + slug);

// 新增主题条目
for (const slug of [
  "architecture/parity",
  "build/apk-signing",
  "gameplay/progression-infinity-eternity",
  "gameplay/reality-time-studies",
  "gameplay/celestials",
  "gameplay/original-vs-mod",
  "original/index",
  "original/ow-infinity",
  "original/ow-dimensions",
  "original/ow-replicanti",
  "original/ow-eternity",
  "original/ow-break-infinity",
]) {
  if (!pageExists(slug)) fail("缺少新增主题条目: /" + slug);
}

// 原版翻译专区：类目页与译文必须显示 CC BY-SA 4.0 与来源说明
if (fs.existsSync(path.join(PUB, "original", "index.html"))) {
  const originalIndex = fs.readFileSync(path.join(PUB, "original", "index.html"), "utf8");
  if (!originalIndex.includes("CC BY-SA 4.0")) fail("原版翻译专区首页缺少 CC BY-SA 4.0 说明");
  if (!originalIndex.includes("来源")) fail("原版翻译专区首页缺少来源说明");
}
for (const rel of ["original/ow-infinity.html", "original/ow-dimensions.html"]) {
  const full = path.join(PUB, rel);
  if (!fs.existsSync(full)) { fail("缺少翻译页: " + rel); continue; }
  const html = fs.readFileSync(full, "utf8");
  if (!html.includes("来源与许可")) fail("翻译页缺少来源与许可块: " + rel);
  if (!html.includes("antimatterdimensions.wiki.gg")) fail("翻译页缺少原文链接: " + rel);
}

if (failed > 0) {
  console.error("构建产物检查未通过: " + failed);
  process.exit(1);
}
console.log("OK 构建产物检查通过: " + htmlFiles.length + " 个 HTML 页面；类目中文名、历史归档、旧 URL 与新条目均通过");