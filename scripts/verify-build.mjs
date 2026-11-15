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

const home = fs.readFileSync(path.join(PUB, "index.html"), "utf8");
for (const term of ["AD-Oreki Knowledge Base", "反物质维度"]) {
  if (!home.includes(term)) fail("首页缺少文案: " + term);
}
if (failed > 0) { console.error("构建产物检查未通过: " + failed); process.exit(1); }
console.log("OK 构建产物检查通过: " + contentIndex.length + " 个 HTML 页面");
