import { chromium } from 'playwright';

const browser = await chromium.launch();

const targets = [
  { name: 'case-tutti-top', url: 'http://localhost:4321/work/tutti-rouge', y: 0 },
  { name: 'case-tutti-mid', url: 'http://localhost:4321/work/tutti-rouge', y: 800 },
  { name: 'work-top', url: 'http://localhost:4321/work', y: 0 },
  { name: 'work-grid', url: 'http://localhost:4321/work', y: 600 },
  { name: 'about-top', url: 'http://localhost:4321/about', y: 0 },
  { name: 'about-mid', url: 'http://localhost:4321/about', y: 700 },
  { name: 'vital-top', url: 'http://localhost:4321/vital-audit', y: 0 },
  { name: 'vital-mid', url: 'http://localhost:4321/vital-audit', y: 800 },
  { name: 'pricing-tiers', url: 'http://localhost:4321/pricing', y: 600 },
  { name: 'pricing-table', url: 'http://localhost:4321/pricing', y: 1400 },
];

for (const t of targets) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(t.url, { waitUntil: 'load' });
  await p.waitForTimeout(400);
  await p.evaluate((y) => window.scrollTo(0, y), t.y);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `/home/ubuntu/happyranks-site/screenshots/v8b-${t.name}.png`, fullPage: false });
  await ctx.close();
  console.log(`✓ ${t.name}`);
}
await browser.close();
