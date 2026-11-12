const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = process.env.PLAYWRIGHT_MODULE ? require(process.env.PLAYWRIGHT_MODULE) : require('playwright');

const baseURL = process.env.PORTFOLIO_URL || 'http://localhost:4173';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let contactMode = 'success';
  let contactRequests = 0;
  await page.route('https://formsubmit.co/ajax/**', async route => {
    contactRequests++;
    const payload = route.request().postDataJSON();
    assert.equal(payload.name, 'Portfolio Test');
    assert.equal(payload.email, 'test@example.invalid');
    const reply = contactMode === 'success' ? { success: 'true', message: 'Form submitted successfully.' } : contactMode === 'activation' ? { success: 'false', message: 'Please activate your email.' } : { success: 'false', message: 'Service unavailable.' };
    await route.fulfill({ status: contactMode === 'error' ? 503 : 200, contentType: 'application/json', body: JSON.stringify(reply) });
  });
  await page.goto(baseURL);
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('.project-card').count(), 3);
  assert.match(await page.locator('.project-card').first().innerText(), /FinanceTarget/);
  assert.match(await page.locator('.filter-result').innerText(), /3 projetos/);
  assert.equal(await page.locator('.hero-actions a[href="#projetos"]').count(), 1);
  assert.equal(await page.locator('.wakatime-activity').count(), 0);
  assert.equal(await page.locator('main > section').count(), 4);
  assert.equal(await page.locator('.code-notebook, #atividade, #trajetoria').count(), 0);
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'professional');
  assert.equal(await page.locator('.club-background').count(), 0);
  const theme = label => page.getByRole('button', { name: label, exact: true });
  await theme('Cruzeiro').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'cruzeiro');
  assert.equal(await theme('Cruzeiro').getAttribute('aria-pressed'), 'true');
  await page.locator('.club-background img').evaluate(img => img.decode());
  fs.mkdirSync('docs/screenshots', { recursive: true });
  fs.mkdirSync('tmp', { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.screenshot({ path: 'docs/screenshots/cruzeiro-desktop.png', fullPage: true });
  await page.screenshot({ path: 'tmp/hero-cruzeiro.png' });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'cruzeiro');
  await theme('Profissional').click();
  assert.equal(await page.locator('.club-background').count(), 0);
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'professional');
  await page.locator('[data-filter="java"]').click();
  assert.equal(await page.locator('.project-card').count(), 1);
  assert.match(await page.locator('.project-title-row').innerText(), /FinanceTarget/);
  assert.match(await page.locator('.filter-result').innerText(), /1 projeto nesta/);
  await page.locator('#language-toggle').click();
  assert.equal(await page.locator('.project-card').count(), 1);
  assert.equal(await page.locator('[data-filter="java"]').getAttribute('aria-pressed'), 'true');
  await page.locator('#language-toggle').click();
  await page.locator('[data-filter="javascript"]').click();
  assert.equal(await page.locator('.project-card').count(), 3);
  await page.locator('[data-filter="all"]').click();
  await page.locator('#language-toggle').click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.match(await page.locator('.hero-role').innerText(), /aspiring software developer/);
  assert.match(await page.locator('#name').getAttribute('placeholder'), /call you/);
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.locator('#language-toggle').click();
  assert.equal(await page.locator('#contact-form').evaluate(form => form.checkValidity()), false);
  const fill = async () => {
    await page.locator('#name').fill('Portfolio Test');
    await page.locator('#email').fill('test@example.invalid');
    await page.locator('#message').fill('Mensagem de teste interceptada localmente.');
  };
  await fill();
  await page.locator('#language-toggle').click();
  assert.equal(await page.locator('#name').inputValue(), 'Portfolio Test');
  assert.equal(await page.locator('#message').inputValue(), 'Mensagem de teste interceptada localmente.');
  await page.locator('#language-toggle').click();
  await page.locator('.submit-button').click();
  await page.waitForFunction(() => document.querySelector('#form-status').textContent.includes('aceita'));
  assert.equal(await page.locator('#name').inputValue(), '');
  contactMode = 'error';
  await fill();
  await page.locator('.submit-button').click();
  await page.waitForFunction(() => document.querySelector('#form-status').textContent.includes('Não foi possível'));
  assert.equal(await page.locator('#name').inputValue(), 'Portfolio Test');
  contactMode = 'activation';
  await page.locator('.submit-button').click();
  await page.waitForFunction(() => document.querySelector('#form-status').textContent.includes('confirmação'));
  assert.equal(contactRequests, 3);
  await page.locator('#contact-form').evaluate(form => form.reset());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].filter(i => i.src.includes('/assets/')).every(i => i.complete && i.naturalWidth > 0));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { document.activeElement.blur(); scrollTo({ top: 0, behavior: 'instant' }); });
  await page.waitForFunction(() => document.querySelector('.nav a[href="#inicio"]').getAttribute('aria-current') === 'location');
  fs.mkdirSync('docs/screenshots', { recursive: true });
  fs.mkdirSync('tmp', { recursive: true });
  await page.screenshot({ path: 'docs/screenshots/desktop.png', fullPage: true });
  await page.screenshot({ path: 'tmp/hero-desktop.png' });
  for (const width of [320, 375, 390, 768, 950, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const size = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: innerWidth }));
    assert(size.scroll <= size.inner, `Horizontal overflow at ${width}: ${JSON.stringify(size)}`);
    for (const label of ['Cruzeiro', 'Profissional']) {
      await theme(label).click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Theme overflow at ${width}, ${label}`);
      const header = await page.locator('.header').boundingBox();
      assert(header.width === width, `Header width at ${width}`);
      if (width === 390) {
        await page.locator('#inicio').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `docs/screenshots/${label === 'Cruzeiro' ? 'cruzeiro' : 'professional'}-mobile.png`, fullPage: true });
      }
    }

  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
  await page.locator('#mobile-nav a[href="#projetos"]').click();
  assert.equal(await page.locator('#mobile-nav').isVisible(), false);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'projetos');
  assert.equal(new URL(page.url()).hash, '#projetos');
  await page.locator('.menu-toggle').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  await page.locator('.menu-toggle').click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForFunction(() => document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false');
  await page.setViewportSize({ width: 844, height: 390 });
  await page.locator('.menu-toggle').click();
  await page.locator('#mobile-nav a[href="#contato"]').click();
  assert.equal(await page.locator('#mobile-nav').isVisible(), false);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'contato');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { document.activeElement.blur(); scrollTo({ top: 0, behavior: 'instant' }); });
  await page.screenshot({ path: 'docs/screenshots/mobile.png', fullPage: true });
  await page.screenshot({ path: 'tmp/hero-mobile.png' });
  // New visitors keep the professional theme, even after another visitor chose Cruzeiro.
  const fresh = await browser.newContext();
  const freshPage = await fresh.newPage();
  await freshPage.goto(baseURL);
  await freshPage.locator('h1').waitFor();
  assert.equal(await freshPage.locator('html').getAttribute('data-theme'), 'professional');
  await fresh.close();
  // Denied local storage must not prevent either theme from working.
  await context.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', { value() { throw new Error('Storage unavailable'); } });
    Object.defineProperty(Storage.prototype, 'setItem', { value() { throw new Error('Storage unavailable'); } });
  });
  await page.reload();
  await theme('Cruzeiro').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'cruzeiro');
  await theme('Profissional').click();
  // Reduced-motion also works when the preference changes in an open page.
  assert.equal(await page.locator('h1').evaluate(el => getComputedStyle(el).animationName), 'none');
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: both themes, saved and fresh preferences, unavailable storage, projects, translations, contact success/error/activation, images, 7 viewport widths, mobile navigation, keyboard and reduced motion. Contact requests intercepted; no email sent.');
})().catch(error => { console.error(error); process.exit(1); });
