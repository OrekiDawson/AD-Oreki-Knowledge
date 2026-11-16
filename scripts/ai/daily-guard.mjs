#!/usr/bin/env node
// Daily-only: hard stop outside allowed UTC+8 hours or when CNY balance cannot be verified.
import fs from "node:fs";
import { assertDeepseekBalance } from "./lib.mjs";

const out = process.env.GITHUB_OUTPUT || "";
const summary = process.env.GITHUB_STEP_SUMMARY || "";
function emit(key, value) { if (out) fs.appendFileSync(out, key + "=" + value + "\n"); }
function status(message) {
  console.log(message);
  if (summary) fs.appendFileSync(summary, "### 每日知识整理\n\n" + message + "\n");
}
function allowedUtc8(now = new Date()) {
  const local = new Date(now.getTime() + 8 * 60 * 60000);
  const weekday = local.getUTCDay(); // 0=Sun, 6=Sat
  const minute = local.getUTCHours() * 60 + local.getUTCMinutes();
  if (weekday >= 1 && weekday <= 5) {
    if (minute >= 8 * 60 + 50 && minute < 12 * 60) return false;
    if (minute >= 13 * 60 + 50 && minute < 18 * 60) return false;
  }
  return true;
}
async function main() {
  emit("run_ai", "false");
  if (process.env.GITHUB_EVENT_NAME !== "schedule") {
    status("SKIPPED：只允许每日 schedule，不接受 PR 或手动触发。");
    return;
  }
  if (!allowedUtc8()) {
    status("SKIPPED：当前处于 DeepSeek 高峰或安全收尾时段。");
    return;
  }
  try {
    await assertDeepseekBalance();
  } catch (error) {
    status("SKIPPED：余额不足 ¥10 或无法可靠核实余额，停止所有模型调用。原因：" + String(error.message).slice(0, 160));
    return;
  }
  emit("run_ai", "true");
  status("READY：非高峰，余额检查满足 ¥10 下限。仅执行一次知识同步批次；内容需人工审核。");
}
main().catch(error => { console.error(String(error)); process.exit(1); });
