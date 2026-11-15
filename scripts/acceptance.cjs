#!/usr/bin/env node
// 知识库本地/线上验收：Chromium 手机视口 + 桌面
// 覆盖：首页→专题、搜索、旧 URL、类目中文名、历史归档、新条目、反向链接、图谱、暗色、溢出、AI 草稿未公开
const path = require('node:path');
const fs = require('node:fs');

const PLAYWRIGHT = process.env.KB_PLAYWRIGHT || '/home/oreki/AD-Oreki-Unified/worktrees/web/r113-web-p1/node_modules/playwright';
const { chromium } = require(PLAYWRIGHT);

const BASE = process.env.KB_URL || 'http://localhost:8081';
const OUT = process.env.KB_OUT || 'evidence/playwright-mobile.json';

const SEARCH_TERMS = [
  ['永恒挑战', 'challenges'],
  ['自动购买器', 'automation'],
  ['Kotlin', 'kotlin-runtime'],
  ['AGP', 'agp'],
  ['Lai', 'saves'],
  ['build_mod.py', 'build-mod-retirement'],
];

const OLD_URLS = ['/architecture/kotlin-runtime', '/architecture/android', '/gameplay/challenges', '/build/agp', '/current/project-status'];
const NEW_PAGES = ['/gameplay/celestials', '/gameplay/progression-infinity-eternity', '/gameplay/reality-time-studies', '/gameplay/original-vs-mod', '/architecture/parity', '/build/apk-signing'];
const CATEGORY_LABELS = ['玩法机制', '架构与运行时', '构建与交付', '历史归档'];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = { base: BASE, mobile: {}, desktop: {}, errors: [], searches: [], urls: [], categories: [] };
  const mobile = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36',
  });
  const page = await mobile.newPage();
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
  });

  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  results.mobile.title = await page.title();
  results.mobile.explorerLinks = await page.locator('a[href*="architecture/android"], a[href*="./architecture"]').count();
  results.mobile.overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

  // 左侧目录的类目显示名应为中文
  const homeHtml = await page.content();
  for (const label of CATEGORY_LABELS) {
    const hit = homeHtml.includes(label);
    results.categories.push({ label, hit });
    if (!hit) results.errors.push('missing-category-label:' + label);
  }

  // 搜索
  const searchInput = page.locator('input.search-bar, input[name="search"], input[type="search"], input[placeholder]').first();
  if (await searchInput.count()) {
    await searchInput.click({ force: true }).catch(() => {});
    await page.waitForTimeout(500);
    for (const [term, expectSlug] of SEARCH_TERMS) {
      await searchInput.fill('', { force: true }).catch(() => {});
      await searchInput.fill(term, { force: true }).catch(async () => {
        await searchInput.evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }, term);
      });
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(1200);
      const html = await page.content();
      results.searches.push({ term, expectSlug, hit: html.includes(expectSlug) });
    }
  } else {
    results.searches.push({ error: 'no search input' });
  }

  // 旧 URL 与新增页面可达
  for (const url of [...OLD_URLS, ...NEW_PAGES, '/history/', '/history/2026-11-15-r113-180min-fail']) {
    const resp = await page.goto(BASE + url, { waitUntil: 'load' }).catch(() => null);
    results.urls.push({ url, ok: !!resp && resp.status() === 200 });
  }

  // 未审核 AI 草稿不得公开
  const draftResp = await page.goto(BASE + '/ai-drafts/2026-11-15-agents-md-59f1fc50', { waitUntil: 'load' }).catch(() => null);
  results.mobile.aiDraftStatus = draftResp ? draftResp.status() : 'ERR';

  // 专题页：代码块、表格、反向链接、图谱
  await page.goto(BASE + '/architecture/kotlin-runtime', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  results.mobile.kotlinPage = (await page.title()).includes('Kotlin');
  results.mobile.codeBlocks = await page.locator('pre code').count();
  results.mobile.backlinksHeading = /Backlinks|反向链接/.test(await page.content());
  results.mobile.graphWidget = (await page.content()).includes('Global Graph');
  results.mobile.overflowKotlin = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

  await page.goto(BASE + '/gameplay/challenges', { waitUntil: 'load' });
  results.mobile.challengePageHasZenith = (await page.content()).includes('永恒挑战');
  await page.goto(BASE + '/build/agp', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  results.mobile.codePre = await page.locator('pre').count();
  results.mobile.codeSpans = await page.locator('pre code span').count();
  results.mobile.tables = await page.locator('table').count();

  // 暗色模式
  await page.goto(BASE + '/architecture/kotlin-runtime', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const beforeBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const darkBtn = page.locator('button[aria-label*="暗色"], button[aria-label*="dark" i]').first();
  if (await darkBtn.count()) {
    await darkBtn.click({ force: true }).catch(() => {});
    await page.waitForTimeout(800);
  }
  const afterBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  results.mobile.darkmodeToggled = beforeBg !== afterBg;
  results.mobile.bgBefore = beforeBg;
  results.mobile.bgAfter = afterBg;

  // 桌面可读性
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dpage = await desktop.newPage();
  await dpage.goto(BASE + '/', { waitUntil: 'load' });
  results.desktop.title = await dpage.title();
  results.desktop.overflow = await dpage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  results.desktop.hasSearch = (await dpage.locator('input[type="search"], input[placeholder]').count()) > 0;
  results.errors = consoleErrors;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(results, null, 1));

  const bad = [];
  if (!results.mobile.title.includes('反物质维度')) bad.push('title');
  if (results.mobile.overflow > 2) bad.push('mobile-overflow:' + results.mobile.overflow);
  if (!results.searches.length || results.searches.some((s) => s.hit === false)) bad.push('search');
  if (results.categories.some((c) => !c.hit)) bad.push('category-labels');
  if (results.urls.some((u) => !u.ok)) bad.push('urls:' + results.urls.filter((u) => !u.ok).map((u) => u.url).join(','));
  if (results.mobile.aiDraftStatus !== 404) bad.push('ai-draft-public:' + results.mobile.aiDraftStatus);
  if (!results.mobile.kotlinPage) bad.push('kotlin-nav');
  if (!results.mobile.darkmodeToggled) bad.push('darkmode');
  if (results.errors.length > 3) bad.push('console-errors');
  console.log(JSON.stringify({ bad, results }, null, 1).slice(0, 6000));
  await browser.close();
  process.exit(bad.length ? 1 : 0);
}
run().catch((e) => {
  console.error('E2E FAIL', String(e).slice(0, 500));
  process.exit(2);
});
