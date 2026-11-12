export function startCursorMotion() {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const lifecycle = new AbortController();
  const ring = document.createElement('div');
  ring.className = 'cursor-follower';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring);
  let frame = 0;
  let visible = false;
  let targetX = 0, targetY = 0, x = 0, y = 0;
  let previousTime = 0;
  let preview = null;

  const enabled = () => fine.matches && !reduced.matches;
  function clearPreview() {
    if (!preview) return;
    preview.classList.remove('has-cursor');
    preview.style.removeProperty('--cursor-x');
    preview.style.removeProperty('--cursor-y');
    preview = null;
  }
  function hide() {
    visible = false;
    ring.classList.remove('is-visible', 'is-link', 'is-pressed', 'is-on-dark');
    clearPreview();
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
  }
  function tick(time) {
    frame = 0;
    if (!visible) return;
    const elapsed = previousTime ? Math.min(64, time - previousTime) : 16;
    previousTime = time;
    const ease = 1 - Math.exp(-elapsed / 45);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    ring.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1) frame = requestAnimationFrame(tick);
    else previousTime = 0;
  }
  function decorate(target) {
    const editable = target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])');
    if (editable) { hide(); return; }
    ring.classList.toggle('is-link', Boolean(target.closest('a[href], button:not(:disabled), [role="button"]')));
    ring.classList.toggle('is-on-dark', Boolean(target.closest('.project-preview, .hero-visual, .button, :root[data-theme="cruzeiro"] .hero')));
    const next = target.closest('.project-preview');
    if (next !== preview) { clearPreview(); preview = next; }
    if (preview) {
      const rect = preview.getBoundingClientRect();
      preview.style.setProperty('--cursor-x', `${(targetX - rect.left).toFixed(1)}px`);
      preview.style.setProperty('--cursor-y', `${(targetY - rect.top).toFixed(1)}px`);
      preview.classList.add('has-cursor');
    }
  }
  function move(event) {
    if (event.pointerType !== 'mouse' || !enabled()) { hide(); return; }
    targetX = event.clientX;
    targetY = event.clientY;
    decorate(event.target);
    if (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
    if (!visible) {
      x = targetX; y = targetY;
      ring.style.transform = `translate3d(${x}px,${y}px,0)`;
      visible = true;
      ring.classList.add('is-visible');
    }
    if (!frame) frame = requestAnimationFrame(tick);
  }
  const on = (target, type, listener, options = {}) => target.addEventListener(type, listener, { ...options, signal: lifecycle.signal });
  on(window, 'pointermove', move, { passive: true });
  on(window, 'pointerdown', event => {
    if (event.pointerType !== 'mouse') hide();
    else if (visible) ring.classList.add('is-pressed');
  }, { passive: true });
  on(window, 'pointerup', () => ring.classList.remove('is-pressed'), { passive: true });
  on(window, 'pointercancel', hide);
  on(document.documentElement, 'pointerleave', hide);
  on(window, 'blur', hide);
  on(window, 'pagehide', hide);
  on(window, 'keydown', hide);
  on(window, 'resize', hide, { passive: true });
  // Recalculate hover when the page moves underneath a stationary pointer.
  on(window, 'scroll', () => {
    if (!visible) return;
    const target = document.elementFromPoint(targetX, targetY);
    if (target) decorate(target); else hide();
  }, { passive: true });
  on(document, 'visibilitychange', () => { if (document.hidden) hide(); });
  fine.addEventListener('change', hide);
  reduced.addEventListener('change', hide);
  return () => {
    hide();
    lifecycle.abort();
    fine.removeEventListener('change', hide);
    reduced.removeEventListener('change', hide);
    ring.remove();
  };
}
