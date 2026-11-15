import test from "node:test";
import assert from "node:assert/strict";
import { dateUtc8, firstPrOfDay, shortText } from "../first-pr-utils.mjs";

test("UTC+8 day boundary (16:00 UTC)", () => {
  assert.equal(dateUtc8("2026-11-14T15:59:59Z"), "2026-11-14");
  assert.equal(dateUtc8("2026-11-14T16:00:00Z"), "2026-11-15");
  assert.equal(dateUtc8("2026-11-15T15:59:59Z"), "2026-11-15");
  assert.equal(dateUtc8("2026-11-15T16:00:00Z"), "2026-11-16");
});

test("first created PR of the day includes closed and bot PRs", () => {
  const prs = [
    { number: 9, created_at: "2026-11-15T05:30:00Z", state: "open" },
    { number: 2, created_at: "2026-11-14T16:01:00Z", state: "closed", user: { login: "dependabot[bot]" } },
    { number: 1, created_at: "2026-11-14T15:59:59Z", state: "closed" },
    { number: 3, created_at: "2026-11-14T16:01:00Z", state: "open" }
  ];
  assert.equal(firstPrOfDay(prs, "2026-11-15")?.number, 2);
  assert.equal(firstPrOfDay(prs, "2026-11-14")?.number, 1);
  assert.equal(firstPrOfDay(prs, "2026-11-16"), null);
});

test("shortText bounds untrusted text and eliminates line injection", () => {
  assert.equal(shortText("a\nb\rc", 5), "a b c");
  assert.equal(shortText("abcdef", 3), "abc");
});

test("invalid date fails closed", () => {
  assert.throws(() => dateUtc8("not a timestamp"));
});
