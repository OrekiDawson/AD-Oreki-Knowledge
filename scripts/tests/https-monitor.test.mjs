import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate, HTTPS_SMOKE_PATHS } from "../https-monitor.mjs";

const base = () => ({
  pages: { ok: true, cname: "wiki.oreki.net", https_enforced: true, cert_state: "approved", cert_expires: "2027-01-01T00:00:00Z" },
  tls: { ok: true, authorized: true, subjectaltname: "DNS:wiki.oreki.net", days: 45 },
  https: [ { path: "/", ok: true, status: 200, hasTitle: true }, { path: "/index.html", ok: true, status: 200, hasTitle: true } ],
  redirect: { ok: true, status: 301, location: "https://wiki.oreki.net/" },
  dns: { cname: ["orekidawson.github.io."], a: [], aaaa: [], caa: [], resolvers: { "1.1.1.1": ["orekidawson.github.io."], "8.8.8.8": ["orekidawson.github.io."] } },
});

test("正常证书 PASS", () => {
  assert.equal(evaluate(base()).overall, "PASS");
});

test("15-30 天 WARNING", () => {
  const input = base(); input.tls.days = 20;
  const r = evaluate(input);
  assert.equal(r.overall, "WARNING");
  assert.equal(r.checks.find((c) => c.id === "tls-expiry").state, "WARNING");
});

test("0-14 天 FAIL", () => {
  const input = base(); input.tls.days = 10;
  assert.equal(evaluate(input).overall, "FAIL");
});

test("已过期 FAIL", () => {
  const input = base(); input.tls.days = -3;
  const r = evaluate(input);
  assert.equal(r.overall, "FAIL");
  assert.match(r.checks.find((c) => c.id === "tls-expiry").detail, /已过期/);
});

test("HTTPS 未强制 FAIL", () => {
  const input = base(); input.pages.https_enforced = false;
  const r = evaluate(input);
  assert.equal(r.overall, "FAIL");
  assert.equal(r.checks.find((c) => c.id === "https-enforced").state, "FAIL");
});

test("域名不匹配 FAIL", () => {
  const input = base(); input.tls.subjectaltname = "DNS:example.com";
  const r = evaluate(input);
  assert.equal(r.overall, "FAIL");
  assert.equal(r.checks.find((c) => c.id === "tls-hostname").state, "FAIL");
});

test("DNS 错误 FAIL", () => {
  const input = base(); input.dns.cname = ["somewhere-else.example."];
  const r = evaluate(input);
  assert.equal(r.overall, "FAIL");
  assert.equal(r.checks.find((c) => c.id === "dns-cname").state, "FAIL");
});

test("HTTP 未跳转 FAIL", () => {
  const input = base(); input.redirect = { ok: true, status: 200, location: "" };
  const r = evaluate(input);
  assert.equal(r.overall, "FAIL");
  assert.equal(r.checks.find((c) => c.id === "http-redirect").state, "FAIL");
});

test("TLS 错误不得降级 HTTP：HTTPS 页面仍 FAIL", () => {
  const input = base(); input.tls = { ok: false, error: "certificate has expired" };
  input.https = [{ path: "/", ok: false, error: "certificate has expired", status: null, hasTitle: false }];
  const r = evaluate(input);
  assert.equal(r.overall, "FAIL");
  assert.equal(r.checks.find((c) => c.id === "https/").state, "FAIL");
});

test("Pages API 不可读时 UNKNOWN（不假报 PASS）", () => {
  const input = base(); input.pages = { ok: false, error: "404" };
  const r = evaluate(input);
  assert.equal(r.overall, "UNKNOWN");
});

test("跳转到非预期域名 FAIL", () => {
  const input = base(); input.redirect = { ok: true, status: 302, location: "https://example.com/" };
  assert.equal(evaluate(input).overall, "FAIL");
});

test("HTTPS 监控使用 Quartz 正式构建提供的页面与索引", () => {
  assert.deepEqual(HTTPS_SMOKE_PATHS, [
    "/", "/index.html", "/static/contentIndex.json", "/architecture/kotlin-runtime",
  ]);
  assert.equal(HTTPS_SMOKE_PATHS.includes("/static/knowledge-index.json"), false);
});
