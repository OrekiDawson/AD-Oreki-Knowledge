// AI 知识同步：读取白名单来源 → 对比 Commit → DeepSeek 提取事实 → 生成草稿 → 分支/PR
import { execSync } from "node:child_process";
import fs from "node:fs";
import crypto from "node:crypto";
import { SOURCES, deepseek, env, extractJson, ghApi, log, readJson, sleep, tokenUsage, writeJson } from "./lib.mjs";

const STATE_PATH = ".ai/state.json";
const RUN = env("GITHUB_RUN_ID", String(Date.now()));
const BRANCH = "ai/knowledge-sync-" + RUN;
const MAX_SOURCES = Number(env("KB_MAX_SOURCES", "4"));
const MAX_CHUNK = 5000;

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

async function rawFile(repo, path, sha) {
  const res = await fetch("https://api.github.com/repos/" + repo + "/contents/" + path + "?ref=" + sha, {
    headers: { Authorization: "Bearer " + env("GITHUB_TOKEN"), Accept: "application/vnd.github.raw", "User-Agent": "kb-ai" },
  });
  if (!res.ok) throw new Error("fetch " + repo + "/" + path + " -> " + res.status);
  return res.text();
}

async function headSha(repo, path) {
  const rows = await ghApi("GET", "/repos/" + repo + "/commits?path=" + encodeURIComponent(path) + "&per_page=1");
  return rows && rows[0] ? rows[0].sha : "";
}

function chunks(text) {
  const lines = text.split("\n");
  const out = [];
  let buf = [];
  let size = 0;
  for (const line of lines) {
    if (size + line.length > MAX_CHUNK && buf.length > 0) { out.push(buf.join("\n")); buf = []; size = 0; }
    buf.push(line); size += line.length + 1;
  }
  if (buf.length) out.push(buf.join("\n"));
  return out.filter((c) => c.trim().length > 200).slice(0, 10);
}

const SYSTEM = "你是反物质维度 MOD 项目的事实抽取器。只允许复述来源文本中明确写出的技术事实。"
  + "禁止推测、补全、润色或引入外部知识。若一段文字只是计划或历史，也要如实标注。"
  + "输出严格 JSON：{\"facts\":[{\"title\":\"...\",\"claim\":\"...\",\"status\":\"已验证|进行中|已推翻|待确认\","
  + "\"evidence_level\":\"实测|读码|推断|未知\",\"evidence_path\":\"...\",\"quote\":\"原文摘录\"}]}。"
  + "quote 必须是来源中的原文片段（不超过 120 字），claim 必须是可核实的陈述。最多 6 条，宁少勿多。";

function validate(fact, text) {
  if (!fact || !fact.title || !fact.claim) return false;
  if (!["已验证", "进行中", "已推翻", "待确认"].includes(fact.status)) return false;
  if (!["实测", "读码", "推断", "未知"].includes(fact.evidence_level)) return false;
  const quote = String(fact.quote || "").replace(/\s+/g, "");
  if (quote.length < 8) return false;
  const hay = text.replace(/\s+/g, "");
  if (!hay.includes(quote.slice(0, 40))) return false;
  return true;
}

function draftPath(path, date) {
  const slug = path.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 40);
  return "content/ai-drafts/" + date + "-" + slug + ".md";
}

function renderDraft(facts, source, sha, date) {
  const rows = facts.map((f) => "| " + f.title + " | " + f.claim + " | " + f.status + " | " + f.evidence_level + " | " + String(f.quote).replace(/\|/g, "/") + " |");
  return [
    "---",
    "title: \"AI 草稿：" + source.path.split("/").pop() + " (" + date + ")\"",
    "description: \"由 GitHub Actions + DeepSeek 依据指定 Commit 抽取，待人工审核\"",
    "tags:",
    "  - ai-draft",
    "  - " + source.kind,
    "---",
    "",
    "> **AI 生成草稿，待人工审核。** 本页不是权威事实源；引用前必须回到原始 Commit 核对。",
    "> 生成工作流：ai-knowledge-sync.yml；来源 " + source.repo + "@" + sha.slice(0, 12) + " 文件 " + source.path + "。",
    "",
    "| 主题 | 陈述 | 状态 | 证据等级 | 原文摘录 |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## 证据",
    "",
    "状态：待确认（AI 提取，人工审核后改为已验证）",
    "证据等级：读码（来源文本）",
    "适用版本：Android 3.21.0 / Web 冻结上游（以来源为准）",
    "来源仓库：" + source.repo,
    "来源 Commit：" + sha,
    "来源文件：" + source.path,
    "",
    "## 相关",
    "",
    "[[index]] · [[source-index]]",
    "",
  ].join("\n");
}

async function main() {
  fs.mkdirSync(".ai", { recursive: true });
  fs.mkdirSync("evidence/ai-sync", { recursive: true });
  const state = readJson(STATE_PATH, { sources: {} });
  const date = new Date().toISOString().slice(0, 10);
  const changed = [];
  for (const source of SOURCES) {
    const key = source.repo + "|" + source.path;
    try {
      const sha = await headSha(source.repo, source.path);
      if (!sha) { log("skip (no commits): " + key); continue; }
      const text = await rawFile(source.repo, source.path, sha);
      const hash = crypto.createHash("sha256").update(text).digest("hex");
      const prev = state.sources[key];
      if (prev && prev.hash === hash) { log("unchanged: " + key); continue; }
      const sliced = source.tailLines ? text.split("\n").slice(-source.tailLines).join("\n") : text;
      changed.push({ source, sha, text: sliced, hash });
    } catch (err) {
      log("source error " + key + ": " + String(err).slice(0, 200));
    }
  }
  const report = { run: RUN, date, changed: changed.map((c) => ({ repo: c.source.repo, path: c.source.path, sha: c.sha })), drafts: [], dropped: 0, usage: null };
  if (changed.length === 0) {
    log("没有来源变化，不创建 PR");
    writeJson("evidence/ai-sync/" + RUN + ".json", report);
    return;
  }
  const drafts = [];
  for (const item of changed.slice(0, MAX_SOURCES)) {
    const facts = [];
    for (const chunk of chunks(item.text)) {
      const { content } = await deepseek([
        { role: "system", content: SYSTEM },
        { role: "user", content: "来源仓库: " + item.source.repo + "\n来源文件: " + item.source.path + "\nCommit: " + item.sha + "\n\n原文片段:\n" + chunk },
      ], { maxTokens: 1200, json: true });
      let parsed;
      try { parsed = extractJson(content); } catch { log("JSON 解析失败，跳过一块"); continue; }
      for (const fact of parsed.facts || []) {
        if (validate(fact, chunk)) facts.push(fact); else report.dropped += 1;
      }
      await sleep(800);
    }
    if (facts.length === 0) continue;
    const path = draftPath(item.source.path + "-" + item.sha.slice(0, 8), date);
    fs.mkdirSync("content/ai-drafts", { recursive: true });
    fs.writeFileSync(path, renderDraft(facts, item.source, item.sha, date));
    drafts.push({ path, facts: facts.length });
    state.sources[item.source.repo + "|" + item.source.path] = { sha: item.sha, hash: item.hash, updated: new Date().toISOString() };
  }
  report.drafts = drafts;
  report.usage = tokenUsage();
  writeJson("evidence/ai-sync/" + RUN + ".json", report);
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 1));
  if (drafts.length === 0) { log("未生成草稿，不创建 PR"); return; }
  sh("git config user.name kb-ai");
  sh("git config user.email kb-ai@users.noreply.github.com");
  sh("git checkout -B " + BRANCH);
  sh("git add content/ai-drafts .ai evidence/ai-sync");
  sh("git commit -m \"AI 知识同步：生成 " + drafts.length + " 篇待审核草稿（run " + RUN + "）\"");
  sh("git push origin " + BRANCH);
  const body = [
    "## AI 知识同步草稿",
    "",
    "- Run: " + RUN,
    "- 来源变化：" + changed.map((c) => c.source.repo + " " + c.source.path + "@" + c.sha.slice(0, 10)).join("；"),
    "- 草稿：" + drafts.map((d) => d.path + "（" + d.facts + " 条）").join("；"),
    "- 丢弃（未通过原文核对）：" + report.dropped,
    "- Token 使用：" + JSON.stringify(report.usage),
    "",
    "> 自动生成草稿 PR，不会自动合并。请逐条核对原始 Commit 后再合并。",
  ].join("\n");
  const pr = await ghApi("POST", "/repos/" + env("GITHUB_REPOSITORY") + "/pulls", {
    title: "AI 知识同步草稿（run " + RUN + "）",
    head: BRANCH,
    base: "main",
    body,
  });
  log("PR: " + pr.html_url);
}

main().catch((err) => {
  console.error("AI SYNC FAIL: " + String(err).slice(0, 600));
  process.exit(1);
});