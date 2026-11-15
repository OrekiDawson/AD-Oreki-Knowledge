// 结构化 AI PR 知识审阅报告：模型输出仍需人工核实。
function asText(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

function records(value, keys) {
  if (!Array.isArray(value)) throw new Error("AI JSON missing required array");
  return value.slice(0, 5).map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error("Invalid AI JSON entry");
    }
    return Object.fromEntries(keys.map((key) => [key, asText(item[key], 450)]));
  }).filter((record) => Object.values(record).some(Boolean));
}

export function normalizeReview(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid AI review object");
  const summary = asText(raw.summary, 1500);
  if (!summary) throw new Error("AI response missing summary");
  const conclusion = asText(raw.conclusion, 40);
  if (!["NEEDS_EVIDENCE", "READY_TO_DOCUMENT", "NO_KB_CHANGE"].includes(conclusion)) {
    throw new Error("Invalid AI conclusion");
  }
  const review = {
    summary,
    changes: records(raw.changes, ["path", "change", "evidence"]),
    knowledge_updates: records(raw.knowledge_updates, ["page", "action", "proposal", "required_evidence"]),
    conflicts: records(raw.conflicts, ["topic", "discrepancy", "verification"]),
    risks: records(raw.risks, ["priority", "concern", "verification"]),
    evidence_gaps: records(raw.evidence_gaps, ["missing", "how_to_verify"]),
    conclusion,
  };
  for (const x of review.changes) {
    if (!["DIFF", "PR_DESCRIPTION", "UNVERIFIED"].includes(x.evidence)) throw new Error("Invalid evidence type");
  }
  for (const x of review.knowledge_updates) {
    if (!["UPDATE", "CREATE", "NONE"].includes(x.action)) throw new Error("Invalid knowledge action");
  }
  for (const x of review.risks) {
    if (!["P0", "P1", "P2"].includes(x.priority)) throw new Error("Invalid risk priority");
  }
  return review;
}

export function reviewMarkdown(review) {
  const show = (rows, format) => rows.length ? rows.map((row) => "- " + format(row)).join("\n") : "- 无";
  return [
    "**结论**", review.summary,
    "", "**实际变更（以 diff 为准）**", show(review.changes, (x) => x.path + "：" + x.change + "（" + x.evidence + "）"),
    "", "**建议更新知识条目**", show(review.knowledge_updates, (x) => x.action + " " + x.page + "：" + x.proposal + "；证据：" + x.required_evidence),
    "", "**历史事实冲突／矛盾**", show(review.conflicts, (x) => x.topic + "：" + x.discrepancy + "；核实：" + x.verification),
    "", "**风险与分级**", show(review.risks, (x) => x.priority + " " + x.concern + "；验证：" + x.verification),
    "", "**缺失证据及最小验证**", show(review.evidence_gaps, (x) => x.missing + "；验证：" + x.how_to_verify),
    "", "**知识整理判定**：" + review.conclusion,
  ].join("\n");
}
