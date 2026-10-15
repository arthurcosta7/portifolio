const assert = require('node:assert/strict');
const { chromium } = process.env.PLAYWRIGHT_MODULE ? require(process.env.PLAYWRIGHT_MODULE) : require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  async function changeMotionPreference(value) {
    await page.emulateMedia({ reducedMotion: value });
    // This Chromium runtime delivers emulated media change events after a viewport invalidation.
    const viewport = page.viewportSize();
    await page.setViewportSize({ ...viewport, width: viewport.width + 1 });
    await page.setViewportSize(viewport);
    await page.waitForTimeout(180); // Let the debounced canvas resize finish before sampling pixels.
  }
  await page.goto('http://localhost:4173');
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'on');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.hero-socials')).opacity) > .99);
  const styles = await page.evaluate(() => ({
    scheme: getComputedStyle(document.documentElement).colorScheme,
    font: getComputedStyle(document.querySelector('.brand')).fontFamily,
    caption: getComputedStyle(document.querySelector('.hero-portrait figcaption')).fontFamily,
    backdrop: getComputedStyle(document.querySelector('#particle-field')).pointerEvents,
  }));
  assert.equal(styles.scheme, 'dark');
  assert(!/cursive|Caveat/i.test(styles.font + styles.caption));
  assert.equal(styles.backdrop, 'none');

  const field = () => page.evaluate(() => {
    const canvas = document.querySelector('#particle-field');
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let energy = 0, hash = 0, target = null;
    const ratio = canvas.width / innerWidth;
    for (let i = 3; i < pixels.length; i += 4) {
      const alpha = pixels[i];
      energy += alpha;
      if (!alpha) continue;
      hash = (hash + alpha * (i % 100003)) % 2147483647;
      const pixel = (i - 3) / 4;
      const x = pixel % canvas.width / ratio;
      const y = Math.floor(pixel / canvas.width) / ratio;
      if (!target && alpha > 70 && x > 450 && x < innerWidth - 120 && y > 160 && y < innerHeight - 140) target = { x, y };
    }
    return { energy, hash, target };
  });
  const before = await field();
  assert(before.energy > 10000, 'Canvas must render visible particles');
  assert(before.target, 'Find a rendered particle in the main content');
  await page.mouse.move(before.target.x + 35, before.target.y + 15);
  await page.waitForTimeout(500);
  const reactive = await field();
  assert(reactive.energy > before.energy * 1.015, `Cursor should illuminate the field (${before.energy} to ${reactive.energy})`);
  assert.notEqual(reactive.hash, before.hash, 'Cursor interaction changes the rendered field');

  assert.equal(await page.locator('.contact-form').evaluate(el => el.classList.contains('is-revealed')), false);
  await page.locator('.project-card').first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.project-card').classList.contains('is-revealed'));
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.project-card .project-preview')).opacity) > .99);
  await page.waitForFunction(() => scrollY > 0 && getComputedStyle(document.querySelector('#reading-progress-fill')).transform !== 'matrix(0, 0, 0, 1, 0, 0)');
  const progress = await page.locator('#reading-progress-fill').evaluate(el => getComputedStyle(el).transform);
  assert.notEqual(progress, 'matrix(0, 0, 0, 1, 0, 0)');

  await changeMotionPreference('reduce');
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'off');
  const still = await field();
  await page.waitForTimeout(220);
  assert.equal((await field()).hash, still.hash, 'Particles must stop with reduced motion');
  const hidden = await page.locator('[data-reveal]').evaluateAll(elements => elements.filter(el => getComputedStyle(el).opacity !== '1').length);
  assert.equal(hidden, 0, 'All content must be visible with reduced motion');
  await changeMotionPreference('no-preference');
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'on');
  await page.waitForTimeout(220);
  assert.notEqual((await field()).hash, still.hash, 'Animation resumes when preference changes');
  await page.mouse.move(1439, 999);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.hero-socials')).opacity) > .99 && Number(getComputedStyle(document.querySelector('.hero-portrait')).opacity) > .99);
  await page.screenshot({ path: 'tmp/dark-animated-desktop.png' });
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: dark palette, no cursive, rendered particles, cursor illumination, scroll reveal, reading progress, reduced-motion pause and resume.');
})().catch(error => { console.error(error); process.exit(1); });
