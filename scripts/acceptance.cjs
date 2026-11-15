#!/usr/bin/env node
// 知识库本地/线上验收：Chromium 手机视口 + 桌面，搜索/导航/反向链接/图谱/溢出
const { chromium } = require('/home/oreki/AD-Oreki-Unified/worktrees/web/r113-web-p1/node_modules/playwright');
const fs = require('fs');

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

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = { base: BASE, mobile: {}, desktop: {}, errors: [], searches: [] };
  const mobile = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36' });
  const page = await mobile.newPage();
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  results.mobile.title = await page.title();
  results.mobile.explorerLinks = await page.locator('a[href*="architecture/android"], a[href*="./architecture"]').count();
  results.mobile.pageTitleContains = await page.locator('text=反物质维度MOD Wiki').count() > 0;
  results.mobile.overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  // 搜索
  const searchInput = page.locator('input.search-bar, input[name="search"], input[type="search"], input[placeholder]').first();
  if (await searchInput.count()) {
    await searchInput.click({ force: true }).catch(() => {});
    await page.waitForTimeout(500);
    for (const [term, expectSlug] of SEARCH_TERMS) {
      await searchInput.fill('', { force: true }).catch(() => {});
      await searchInput.fill(term, { force: true }).catch(async () => {
        await searchInput.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, term);
      });
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(1200);
      const html = await page.content();
      const hit = html.includes(expectSlug);
      results.searches.push({ term, expectSlug, hit });
    }
  } else results.searches.push({ error: 'no search input' });
  // 导航到 Kotlin 运行时页面
  await page.goto(BASE + '/architecture/kotlin-runtime', { waitUntil: 'load' });
  results.mobile.kotlinPage = (await page.title()).includes('Kotlin');
  results.mobile.codeBlocks = await page.locator('pre code').count();
  results.mobile.backlinks = await page.locator('text=Backlinks, text=反向链接, .backlinks').count();
  results.mobile.graph = await page.locator('.graph, canvas, svg').count();
  results.mobile.overflowKotlin = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  // 挑战页中文与表格
  await page.goto(BASE + '/gameplay/challenges', { waitUntil: 'load' });
  results.mobile.challengePageHasZenith = (await page.content()).includes('永恒挑战');
  // 代码块高亮页（build/agp）
  await page.goto(BASE + '/build/agp', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  results.mobile.codePre = await page.locator('pre').count();
  results.mobile.codeSpans = await page.locator('pre code span').count();
  results.mobile.tables = await page.locator('table').count();
  // 反向链接
  await page.goto(BASE + '/architecture/kotlin-runtime', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  results.mobile.backlinksHeading = /Backlinks|反向链接/.test(await page.content());
  results.mobile.graphWidget = (await page.content()).includes('Global Graph');
  // 暗色模式：按钮可访问名「暗色模式」
  const beforeBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const darkBtn = page.locator('button[aria-label*="暗色"], button[aria-label*="dark" i]').first();
  if (await darkBtn.count()) { await darkBtn.click({ force: true }).catch(() => {}); await page.waitForTimeout(800); }
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
  results.desktop.hasSearch = await dpage.locator('input[type="search"], input[placeholder]').count() > 0;
  results.errors = consoleErrors;
  fs.mkdirSync(require('node:path').dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(results, null, 1));
  const bad = [];
  if (!results.mobile.title.includes('AD-Oreki')) bad.push('title');
  if (results.mobile.overflow > 2) bad.push('mobile-overflow:' + results.mobile.overflow);
  if (!results.searches.length || results.searches.some((s) => s.hit === false)) bad.push('search');
  if (!results.mobile.kotlinPage) bad.push('kotlin-nav');
  if (results.errors.length > 3) bad.push('console-errors');
  console.log(JSON.stringify({ bad, results }, null, 1).slice(0, 3000));
  await browser.close();
  process.exit(bad.length ? 1 : 0);
}
run().catch((e) => { console.error('E2E FAIL', String(e).slice(0, 400)); process.exit(2); });