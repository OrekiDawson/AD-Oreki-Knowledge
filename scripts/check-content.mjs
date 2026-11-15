#!/usr/bin/env node
// 知识库内容检查：页面数量 / frontmatter / 内部链接 / 敏感信息 / 关键术语
import fs from "node:fs";
import path from "node:path";

const ROOT = "content";
const REQUIRED_TERMS = ["永恒挑战", "自动购买器", "AGP", "Kotlin", "Lai Tela", "build_mod.py"];
const MIN_PAGES = 15;
const SECRET_PATTERNS = [
  /cfat_[A-Za-z0-9]{20,}/g,
  /ghp_[A-Za-z0-9]{20,}/g,
  /github_pat_[A-Za-z0-9_]{20,}/g,
  /sk-[A-Za-z0-9]{20,}/g,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/g,
];
const PRIVATE_PATHS = [/\/home\/oreki\//g, /\/opt\/node-v/g];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const files = walk(ROOT).filter((f) => f.endsWith(".md"));
let failed = 0;
const fail = (msg) => { failed += 1; console.error("FAIL " + msg); };

if (files.length < MIN_PAGES) fail("页面数不足: " + files.length + " < " + MIN_PAGES);

const slugs = new Set(files.map((f) => path.basename(f, ".md")));
const allText = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");

for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  if (!/^---\n/.test(text)) fail("缺少 frontmatter: " + f);
  if (!/^title:/m.test(text)) fail("缺少 title: " + f);
  for (const m of text.matchAll(/\[\[([^\]|#]+)/g)) {
    const target = m[1].trim();
    if (!slugs.has(target) && !target.startsWith("http")) fail("内部链接失效: " + f + " -> " + target);
  }
  for (const re of SECRET_PATTERNS) if (re.test(text)) fail("疑似敏感信息: " + f + " / " + re.source);
  for (const re of PRIVATE_PATHS) if (re.test(text)) fail("内部路径泄露: " + f + " / " + re.source);
}

for (const term of REQUIRED_TERMS) if (!allText.includes(term)) fail("缺少检索术语: " + term);

if (failed > 0) { console.error("内容检查未通过: " + failed + " 项"); process.exit(1); }
console.log("OK 内容检查通过: " + files.length + " 页，术语/链接/敏感信息均通过");
