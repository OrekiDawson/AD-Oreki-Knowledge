// 知识索引：Markdown 分块 + 中文二元/ASCII 关键词倒排 + 标签关联（供静态搜索与 Agent 检索）
import fs from "node:fs";

const CONTENT = "content";
const OUT = "quartz/static/knowledge-index.json";
const CHUNK = 800;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = dir + "/" + e.name;
    return e.isDirectory() ? walk(p) : [p];
  });
}

function tokens(text) {
  const lower = text.toLowerCase();
  const ascii = lower.match(/[a-z0-9][a-z0-9_.-]{1,}/g) || [];
  const cjk = lower.match(/[\u4e00-\u9fff]+/g) || [];
  const grams = [];
  for (const run of cjk) {
    for (let i = 0; i < run.length - 1; i += 1) grams.push(run.slice(i, i + 2));
    if (run.length >= 2) grams.push(run);
  }
  return Array.from(new Set([...ascii, ...grams]));
}

function parseFront(text) {
  const out = { title: "", tags: [] };
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return out;
  const body = m[1];
  const title = body.match(/^title:\s*"?(.*?)"?$/m);
  if (title) out.title = title[1];
  const tagBlock = body.match(/^tags:\n((?:\s+-\s+.*\n?)*)/m);
  if (tagBlock) out.tags = (tagBlock[1].match(/^\s+-\s+(.*)$/gm) || []).map((l) => l.replace(/^\s+-\s+/, "").trim());
  return out;
}

function main() {
  const files = walk(CONTENT).filter((f) => f.endsWith(".md") && !f.startsWith("content/ai-drafts/"));
  const pages = [];
  const chunks = [];
  const inverted = new Map();
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const rel = file.slice(CONTENT.length + 1).replace(/\.md$/, "");
    const meta = parseFront(text);
    const pageId = rel.replace(/\//g, "-");
    pages.push({ id: pageId, path: rel, title: meta.title, tags: meta.tags });
    const body = text.replace(/^---\n[\s\S]*?\n---/, "");
    for (let i = 0; i < body.length; i += CHUNK) {
      const piece = body.slice(i, i + CHUNK);
      const chunkId = pageId + ":" + chunks.length;
      chunks.push({ id: chunkId, page: pageId, text: piece.slice(0, 400) });
      const seen = new Set();
      for (const token of tokens(piece)) {
        if (seen.has(token)) continue;
        seen.add(token);
        if (!inverted.has(token)) inverted.set(token, []);
        const arr = inverted.get(token);
        if (arr.length < 40 && arr[arr.length - 1] !== chunkId) arr.push(chunkId);
      }
    }
  }
  const index = {
    schema: 1,
    generated_at: new Date().toISOString(),
    pages,
    chunks,
    terms: Object.fromEntries(Array.from(inverted.entries()).sort((a, b) => b[1].length - a[1].length).slice(0, 4000)),
  };
  fs.mkdirSync("quartz/static", { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(index));
  console.log("index: pages=" + pages.length + " chunks=" + chunks.length + " terms=" + Object.keys(index.terms).length + " bytes=" + fs.statSync(OUT).size);
  if (pages.length < 15) { console.error("页面数不足"); process.exit(1); }
}

main();