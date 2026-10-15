const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const canvas = document.querySelector('#particle-field');
const context = canvas.getContext('2d', { alpha: true });
const progress = document.querySelector('#reading-progress-fill');
const portrait = document.querySelector('.photo-mount');
const pointer = { x: -1000, y: -1000, active: false };
let width = 0;
let height = 0;
let particles = [];
let particleFrame = 0;
let scrollFrame = 0;
let previousFrame = 0;
let resizeTimer;

// Scroll stays native. Only the progress indicator and photo use scroll values.
function updateScroll() {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  const shift = !reducedMotion.matches && finePointer.matches && innerWidth > 950 ? Math.min(9, scrollY * .025) : 0;
  portrait.style.setProperty('--portrait-shift', `${shift.toFixed(2)}px`);
}
function scheduleScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', scheduleScroll, { passive: true });
new ResizeObserver(scheduleScroll).observe(document.querySelector('main'));

const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-revealed');
    revealObserver.unobserve(entry.target);
  }
}, { threshold: .08, rootMargin: '0px 0px -35px 0px' });

function prepareReveals() {
  const selectors = '.section-heading, .project-card, .about-layout, .code-notebook, .experience-intro, .experience-list article, .activity-grid, .contact-copy, .contact-form';
  document.querySelectorAll(selectors).forEach(element => {
    if (element.hasAttribute('data-reveal')) return;
    element.setAttribute('data-reveal', '');
    if (element.matches('.experience-list article')) element.style.setProperty('--reveal-delay', '100ms');
    if (element.matches('.contact-form')) element.style.setProperty('--reveal-delay', '120ms');
    if (reducedMotion.matches || element.getBoundingClientRect().bottom < 0) element.classList.add('is-revealed');
    else revealObserver.observe(element);
  });
  scheduleScroll();
}
document.addEventListener('portfolio:projects-rendered', prepareReveals);
document.addEventListener('focusin', event => {
  // Keyboard navigation must never land on visually hidden content.
  const element = event.target.closest('[data-reveal]');
  if (element) { element.classList.add('is-revealed'); revealObserver.unobserve(element); }
});

function createField() {
  width = innerWidth;
  height = innerHeight;
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(90, Math.max(18, Math.round(width * height / (finePointer.matches ? 15500 : 24000))));
  // A lightly staggered field gives consistent coverage without dense clusters.
  const columns = Math.ceil(Math.sqrt(count * width / height));
  const rows = Math.ceil(count / columns);
  particles = Array.from({ length: count }, (_, index) => ({
    x: ((index % columns) + .15 + Math.random() * .7) * width / columns,
    y: (Math.floor(index / columns) + .15 + Math.random() * .7) * height / rows,
    dx: 0, dy: 0,
    vx: (Math.random() - .5) * .22,
    vy: (Math.random() - .5) * .22,
    radius: .7 + Math.random() * 1.2,
    brightness: .2 + Math.random() * .35,
  }));
  drawField(0);
  scheduleScroll();
}

function drawField(step) {
  context.clearRect(0, 0, width, height);
  const range = Math.min(165, width * .28);
  const mouseRadius = 170;
  const activePointer = pointer.active && finePointer.matches && !reducedMotion.matches;
  for (const particle of particles) {
    particle.x += particle.vx * step;
    particle.y += particle.vy * step;
    if (particle.x < -10) particle.x = width + 10;
    if (particle.x > width + 10) particle.x = -10;
    if (particle.y < -10) particle.y = height + 10;
    if (particle.y > height + 10) particle.y = -10;
    let targetX = 0;
    let targetY = 0;
    if (activePointer) {
      const deltaX = particle.x - pointer.x;
      const deltaY = particle.y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance < mouseRadius && distance > .1) {
        const force = (1 - distance / mouseRadius) ** 2 * 65;
        targetX = deltaX / distance * force;
        targetY = deltaY / distance * force;
      }
    }
    const ease = step ? 1 - Math.pow(.88, step) : 1;
    particle.dx += (targetX - particle.dx) * ease;
    particle.dy += (targetY - particle.dy) * ease;
  }
  for (let i = 0; i < particles.length; i++) {
    const first = particles[i];
    const x = first.x + first.dx;
    const y = first.y + first.dy;
    const distanceToPointer = activePointer ? Math.hypot(x - pointer.x, y - pointer.y) : Infinity;
    const illumination = Math.max(0, 1 - distanceToPointer / 240);
    for (let j = i + 1; j < particles.length; j++) {
      const second = particles[j];
      const secondX = second.x + second.dx;
      const secondY = second.y + second.dy;
      const distance = Math.hypot(x - secondX, y - secondY);
      if (distance > range) continue;
      const opacity = (1 - distance / range) * (.12 + illumination * .25);
      context.strokeStyle = `rgba(137,177,201,${opacity.toFixed(3)})`;
      context.lineWidth = .65;
      context.beginPath(); context.moveTo(x, y); context.lineTo(secondX, secondY); context.stroke();
    }
    if (illumination > .1) {
      context.fillStyle = `rgba(149,202,231,${(illumination * .08).toFixed(3)})`;
      context.beginPath(); context.arc(x, y, first.radius * 4, 0, Math.PI * 2); context.fill();
    }
    context.fillStyle = `rgba(164,203,226,${Math.min(.9, first.brightness + illumination * .4).toFixed(3)})`;
    context.beginPath(); context.arc(x, y, first.radius + illumination * .5, 0, Math.PI * 2); context.fill();
  }
}
function tick(timestamp) {
  particleFrame = requestAnimationFrame(tick);
  const delta = timestamp - previousFrame;
  if (delta < 1000 / 30) return;
  const step = previousFrame ? Math.min(delta / (1000 / 60), 3) : 1;
  previousFrame = timestamp;
  drawField(step);
}
function stopField() {
  cancelAnimationFrame(particleFrame);
  particleFrame = 0;
  previousFrame = 0;
}
function resumeField() {
  if (!context || reducedMotion.matches || document.hidden || particleFrame) return;
  particleFrame = requestAnimationFrame(tick);
}
function applyMotionPreference() {
  document.documentElement.dataset.motion = reducedMotion.matches ? 'off' : 'on';
  stopField();
  if (reducedMotion.matches) {
    document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-revealed'));
    pointer.active = false;
    if (context) drawField(0);
  } else resumeField();
  scheduleScroll();
}
addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches) return;
  pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true;
}, { passive: true });
document.documentElement.addEventListener('pointerleave', () => pointer.active = false);
addEventListener('blur', () => pointer.active = false);
document.addEventListener('visibilitychange', () => { if (document.hidden) stopField(); else resumeField(); });
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  scheduleScroll();
  resizeTimer = setTimeout(() => { if (context) createField(); }, 120);
}, { passive: true });
reducedMotion.addEventListener('change', applyMotionPreference);
finePointer.addEventListener('change', () => { pointer.active = false; if (context) createField(); });
addEventListener('pagehide', stopField);
addEventListener('pageshow', resumeField);
prepareReveals();
if (context) createField();
applyMotionPreference();
