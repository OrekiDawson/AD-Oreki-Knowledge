// DeepSeek API 封装 + 来源白名单 + 预算控制（仅 AI 工作流使用）
import fs from "node:fs";

export const WHITELIST = {
  android: "OrekiDawson/AD-Oreki-Edition-Android",
  web: "OrekiDawson/AD-Oreki-Edition-Web",
  unified: "OrekiDawson/AD-Oreki-Unified",
};

export const SOURCES = [
  { repo: WHITELIST.android, path: "AGENTS.md", kind: "rules" },
  { repo: WHITELIST.android, path: "docs/FACTS.md", kind: "facts", tailLines: 400 },
  { repo: WHITELIST.android, path: "reports/R113-01/P0-CLOSURE.md", kind: "report" },
  { repo: WHITELIST.android, path: "docs/DELIVERY_RULES.md", kind: "rules" },
  { repo: WHITELIST.web, path: "AGENTS.md", kind: "rules" },
];

export function env(name, fallback = "") {
  return process.env[name] || fallback;
}

export function log(msg) {
  console.log("[" + new Date().toISOString() + "] " + msg);
}

export async function ghApi(method, path, body) {
  const token = env("GITHUB_TOKEN");
  const res = await fetch("https://api.github.com" + path, {
    method,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "kb-ai",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error("GH " + method + " " + path + " -> " + res.status + " " + (await res.text()).slice(0, 300));
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

export function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

let totalTokens = { prompt: 0, completion: 0, calls: 0 };

export async function deepseek(messages, { maxTokens = 1200, json = false, retries = 2, temperature = 0.1 } = {}) {
  const key = env("DEEPSEEK_API_KEY");
  if (!key) throw new Error("DEEPSEEK_API_KEY 未设置");
  const payload = {
    model: env("DEEPSEEK_MODEL", "deepseek-chat"),
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: false,
  };
  if (json) payload.response_format = { type: "json_object" };
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(env("DEEPSEEK_API_URL", "https://api.deepseek.com/chat/completions"), {
        method: "POST",
        headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(120000),
      });
      if (!res.ok) throw new Error("DeepSeek HTTP " + res.status + " " + (await res.text()).slice(0, 300));
      const data = await res.json();
      const usage = data.usage || {};
      totalTokens.prompt += usage.prompt_tokens || 0;
      totalTokens.completion += usage.completion_tokens || 0;
      totalTokens.calls += 1;
      return { content: data.choices?.[0]?.message?.content || "", usage };
    } catch (err) {
      lastErr = err;
      log("deepseek 调用失败（第 " + (attempt + 1) + " 次）: " + String(err).slice(0, 200));
      await sleep(2000 * (attempt + 1));
    }
  }
  throw lastErr;
}

export function tokenUsage() { return { ...totalTokens }; }

export function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("模型输出中没有 JSON");
  return JSON.parse(text.slice(start, end + 1));
}

export function writeJson(path, value) {
  fs.mkdirSync(requirePathDir(path), { recursive: true });
  fs.writeFileSync(path, JSON.stringify(value, null, 1));
}

function requirePathDir(p) {
  return p.split("/").slice(0, -1).join("/") || ".";
}

export function readJson(path, fallback) {
  try { return JSON.parse(fs.readFileSync(path, "utf8")); } catch { return fallback; }
}