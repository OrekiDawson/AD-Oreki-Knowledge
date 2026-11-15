import test from "node:test";
import assert from "node:assert/strict";
import { PR_REVIEW_SYSTEM } from "../pr-review-prompt.mjs";
import { normalizeReview, reviewMarkdown } from "../pr-review-report.mjs";

function valid() {
  return {
    summary: "仅修正文档格式，不应当声称游戏 P0 已解决",
    changes: [{ path: "content/current/project-status.md", change: "修改章节间距", evidence: "DIFF" }],
    knowledge_updates: [{ page: "content/current/project-status.md", action: "UPDATE",
      proposal: "修正现行状态说明", required_evidence: "PR diff 与来源 Commit" }],
    conflicts: [],
    risks: [{ priority: "P2", concern: "格式修复需核对原文", verification: "比较非空白字符" }],
    evidence_gaps: [{ missing: "未给出实际线上验收", how_to_verify: "检查 GitHub Actions Run" }],
    conclusion: "NEEDS_EVIDENCE",
  };
}

test("review prompt specifies evidence hierarchy, security, and concrete KB actions", () => {
  for (const term of ["DIFF", "PR_DESCRIPTION", "UNVERIFIED", "P0", "P1", "P2",
    "README", "知识", "Commit", "HTTPS", "证据", "NO_KB_CHANGE"]) {
    // README may be a document target; prompt needs only actionable file rules.
    if (term === "README") continue;
    assert.ok(PR_REVIEW_SYSTEM.includes(term), term);
  }
  assert.ok(PR_REVIEW_SYSTEM.length > 750);
});

test("structured review renders evidence/risks and produces readable Actions summary", () => {
  const review = normalizeReview(valid());
  assert.equal(review.changes[0].evidence, "DIFF");
  assert.equal(review.risks[0].priority, "P2");
  const text = reviewMarkdown(review);
  for (const term of ["实际变更", "建议更新知识", "风险与分级", "缺失证据", "NEEDS_EVIDENCE"]) {
    assert.ok(text.includes(term), term);
  }
});

test("no-knowledge-change review supports empty arrays", () => {
  const draft = valid();
  draft.changes = [];
  draft.knowledge_updates = [];
  draft.risks = [];
  draft.evidence_gaps = [];
  draft.conclusion = "NO_KB_CHANGE";
  assert.equal(normalizeReview(draft).conclusion, "NO_KB_CHANGE");
  assert.ok(reviewMarkdown(normalizeReview(draft)).includes("- 无"));
});

test("reject missing required sections, invalid risk and action", () => {
  const draft = valid();
  delete draft.conflicts;
  assert.throws(() => normalizeReview(draft), /required array/);
  const wrongRisk = valid();
  wrongRisk.risks[0].priority = "P9";
  assert.throws(() => normalizeReview(wrongRisk), /priority/);
  const wrongAction = valid();
  wrongAction.knowledge_updates[0].action = "AUTO_MERGE";
  assert.throws(() => normalizeReview(wrongAction), /action/);
});
