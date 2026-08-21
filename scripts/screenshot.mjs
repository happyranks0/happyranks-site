import { chromium } from 'playwright';

const pages = [
  { name: 'home-desktop', url: 'http://localhost:4321/', width: 1440, height: 900, fullPage: false },
  { name: 'home-full', url: 'http://localhost:4321/', width: 1440, height: 900, fullPage: true },
  { name: 'capabilities', url: 'http://localhost:4321/capabilities', width: 1440, height: 900, fullPage: true },
  { name: 'pricing', url: 'http://localhost:4321/pricing', width: 1440, height: 900, fullPage: true },
  { name: 'work', url: 'http://localhost:4321/work', width: 1440, height: 900, fullPage: true },
  { name: 'pulse-audit', url: 'http://localhost:4321/pulse-audit', width: 1440, height: 900, fullPage: true },
  { name: 'about', url: 'http://localhost:4321/about', width: 1440, height: 900, fullPage: true },
  { name: 'contact', url: 'http://localhost:4321/contact', width: 1440, height: 900, fullPage: true },
  { name: 'case-tutti', url: 'http://localhost:4321/work/tutti-rouge', width: 1440, height: 900, fullPage: true },
  // Mobile views
  { name: 'home-mobile-closed', url: 'http://localhost:4321/', width: 390, height: 844, fullPage: false, isMobile: true },
  { name: 'home-mobile-menu', url: 'http://localhost:4321/', width: 390, height: 844, fullPage: false, isMobile: true, openMenu: true },
  { name: 'capabilities-mobile', url: 'http://localhost:4321/capabilities', width: 390, height: 844, fullPage: true, isMobile: true },
];

const browser = await chromium.launch();
for (const p of pages) {
  const context = await browser.newContext({
    viewport: { width: p.width, height: p.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  try {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log('nav slow, retrying', p.name);
    await page.goto(p.url, { waitUntil: 'load', timeout: 30000 });
  }
  await page.waitForTimeout(500);

  if (p.openMenu) {
    await page.click('.mobile-trigger');
    await page.waitForTimeout(400);
  }

  const path = `/home/ubuntu/happyranks-site/screenshots/v8-${p.name}.png`;
  await page.screenshot({ path, fullPage: p.fullPage });
  console.log(`✓ ${p.name}: ${path}`);
  await context.close();
}
await browser.close();
console.log('All screenshots done');
