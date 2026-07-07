import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'load' });
await page.waitForTimeout(500);
await page.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8b-home.png', fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 600 } });
// Just the trust indicators region
const trust = await page.$('div.mt-7.grid');
if (trust) {
  await trust.screenshot({ path: '/home/ubuntu/happyranks-site/screenshots/v8b-trust.png' });
}
await ctx.close();
await browser.close();
console.log('Done');
