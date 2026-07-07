import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await c.newPage();
await p.goto('http://localhost:4321/', { waitUntil: 'load' });
await p.waitForTimeout(500);
// Measure the trust indicator positions
const positions = await p.$$eval('.mt-7.flex > div', els =>
  els.map(el => {
    const r = el.getBoundingClientRect();
    return { text: el.innerText.trim(), left: r.left, right: r.right, width: r.width };
  })
);
console.log(JSON.stringify(positions, null, 2));
const containerRect = await p.$eval('.mt-7.flex', el => {
  const r = el.getBoundingClientRect();
  return { left: r.left, right: r.right, width: r.width };
});
console.log('Container:', JSON.stringify(containerRect, null, 2));
// Gaps
for (let i = 0; i < positions.length - 1; i++) {
  const gap = positions[i+1].left - positions[i].right;
  console.log(`Gap ${i+1}: ${gap.toFixed(1)}px`);
}
await c.close();
await b.close();
