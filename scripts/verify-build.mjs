#!/usr/bin/env node
// 构建产物检查：首页 / 搜索索引 / 页面数量 / 中文文案
import fs from "node:fs";
import path from "node:path";

const PUB = "public";
let failed = 0;
const fail = (m) => { failed += 1; console.error("FAIL " + m); };
const exists = (p) => fs.existsSync(path.join(PUB, p));

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
const contentIndex = fs.existsSync(PUB) ? walk(PUB).filter((f) => f.endsWith(".html")) : [];
if (contentIndex.length < 15) fail("HTML 页面数不足: " + contentIndex.length);

// 禁止未审核 AI 草稿进入公开 HTML、Quartz 搜索或关键词索引。
if (contentIndex.some((file) => file.includes(path.sep + "ai-drafts" + path.sep))) {
  fail("未审核 AI 草稿被输出成公开 HTML 页面");
}
// 只检查索引中实际发布的页面路径/标题，不能因为规则正文提到
// "content/ai-drafts/" 就误判为把未审草稿公开。
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
for (const term of ["反物质维度MOD 知识库", "知识库规则"]) {
  if (!home.includes(term)) fail("首页缺少文案: " + term);
}
if (!exists("wiki-rules.html") && !exists("wiki-rules/index.html")) fail("公开规则页 /wiki-rules 未生成");
if (!exists("copyright.html") && !exists("copyright/index.html")) fail("公开版权与许可页面 /copyright 未生成");
if (!home.includes("CC BY-SA 4.0") || !home.includes("creativecommons.org/licenses/by-sa/4.0")) {
  fail("首页未展示 CC BY-SA 4.0 与官方许可链接");
}
if (failed > 0) { console.error("构建产物检查未通过: " + failed); process.exit(1); }
console.log("OK 构建产物检查通过: " + contentIndex.length + " 个 HTML 页面");
