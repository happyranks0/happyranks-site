import { chromium } from 'playwright';

const browser = await chromium.launch();

// Smaller capabilities page, scrolled to specific sections
const caps = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await caps.newPage();
await p.goto('http://localhost:4321/capabilities', { waitUntil: 'load' });
await p.waitForTimeout(500);
await p.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8-caps-hero.png', fullPage: false });
await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(300);
await p.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8-caps-dimensions.png', fullPage: false });
await p.evaluate(() => window.scrollTo(0, 1500));
await p.waitForTimeout(300);
await p.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8-caps-process.png', fullPage: false });
await caps.close();

// Pricing
const pri = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const pp = await pri.newPage();
await pp.goto('http://localhost:4321/pricing', { waitUntil: 'load' });
await pp.waitForTimeout(500);
await pp.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8-pricing-hero.png', fullPage: false });
await pri.close();

// Mobile
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const mp = await mob.newPage();
await mp.goto('http://localhost:4321/', { waitUntil: 'load' });
await mp.waitForTimeout(500);
await mp.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8-home-mob-closed.png', fullPage: false });
await mp.click('.mobile-trigger');
await mp.waitForTimeout(400);
await mp.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8-home-mob-open.png', fullPage: false });
await mob.close();

await browser.close();
console.log('Done');
