// Native scroll drives visual feedback; React never renders on scroll.
export function startScrollMotion(root, header) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 951px) and (pointer: fine)');
  const lifecycle = new AbortController();
  const reveals = new Map();
  const animations = new Map();
  let frame = 0;
  let images = [];
  let journey = null;
  let portrait = null;
  const clamp = value => Math.max(0, Math.min(1, value));

  function show(element, animate = false) {
    if (reveals.get(element)) return;
    reveals.set(element, true);
    observer.unobserve(element);
    element.dataset.scrollState = 'visible';
    if (!animate || reduced.matches) return;
    const animation = element.animate([
      { opacity: 0, transform: `translateY(${innerWidth < 640 ? 16 : 28}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ], {
      duration: innerWidth < 640 ? 420 : 600,
      delay: Math.min(200, Math.max(0, Number(element.dataset.scrollDelay) || 0)),
      easing: 'cubic-bezier(.16,1,.3,1)',
      fill: 'backwards',
    });
    animations.set(element, animation);
    animation.finished.then(() => animations.delete(element), () => animations.delete(element));
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) show(entry.target, true);
    });
  }, { rootMargin: '0px 0px -24px 0px', threshold: 0 });

  function scan() {
    // Filtering projects adds/removes cards without remounting the page controller.
    for (const element of reveals.keys()) {
      if (root.contains(element)) continue;
      observer.unobserve(element);
      animations.get(element)?.cancel();
      animations.delete(element);
      reveals.delete(element);
    }
    root.querySelectorAll('[data-scroll-reveal], .journey-item').forEach(element => {
      if (reveals.has(element)) return;
      reveals.set(element, false);
      // Reloads at a saved scroll position keep all earlier content visible.
      if (reduced.matches || element.getBoundingClientRect().top < innerHeight - 24) show(element);
      else {
        element.dataset.scrollState = 'pending';
        observer.observe(element);
      }
    });
    images = [...root.querySelectorAll('.project-preview img')];
    portrait = root.querySelector('.photo-mount');
    journey = root.querySelector('.about-journey');
    schedule();
  }

  function update() {
    frame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? clamp(scrollY / max) : 0;
    const spatial = !reduced.matches && desktop.matches;
    // All geometry reads precede style writes to avoid repeated layout work.
    const imagePositions = spatial ? images.map(image => image.parentElement.getBoundingClientRect()) : [];
    const journeyRect = journey?.getBoundingClientRect();
    header.style.setProperty('--reading-progress', progress.toFixed(4));
    header.classList.toggle('is-scrolled', scrollY > 16);
    portrait?.style.setProperty('--scroll-drift', spatial ? `${(clamp(scrollY / innerHeight) * 18).toFixed(2)}px` : '0px');
    images.forEach((image, index) => {
      const rect = imagePositions[index];
      const position = rect ? clamp((innerHeight - rect.top) / (innerHeight + rect.height)) : .5;
      image.style.setProperty('--scroll-drift', `${(spatial ? (position - .5) * -24 : 0).toFixed(2)}px`);
    });
    if (journeyRect) {
      const amount = reduced.matches ? 1 : clamp((innerHeight * .85 - journeyRect.top) / Math.max(1, journeyRect.height));
      journey.style.setProperty('--journey-progress', amount.toFixed(4));
    }
  }

  function schedule() {
    if (!frame && !lifecycle.signal.aborted) frame = requestAnimationFrame(update);
  }

  function preferenceChanged() {
    if (reduced.matches) {
      reveals.forEach((_, element) => show(element));
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
    schedule();
  }

  // Tabbing into a pending panel must reveal the focused control immediately.
  root.addEventListener('focusin', event => {
    const element = event.target.closest('[data-scroll-state]');
    if (!element) return;
    show(element);
    animations.get(element)?.cancel();
    const rect = event.target.getBoundingClientRect();
    if (rect.top < header.getBoundingClientRect().bottom || rect.bottom > innerHeight) {
      event.target.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, { signal: lifecycle.signal });
  window.addEventListener('scroll', schedule, { passive: true, signal: lifecycle.signal });
  window.addEventListener('resize', schedule, { passive: true, signal: lifecycle.signal });
  window.addEventListener('pageshow', scan, { signal: lifecycle.signal });
  window.addEventListener('beforeprint', () => reveals.forEach((_, element) => show(element)), { signal: lifecycle.signal });
  reduced.addEventListener('change', preferenceChanged);
  desktop.addEventListener('change', schedule);
  const resize = new ResizeObserver(schedule);
  resize.observe(root);
  const mutations = new MutationObserver(scan);
  mutations.observe(root, { childList: true, subtree: true });
  scan();

  return () => {
    lifecycle.abort();
    observer.disconnect();
    resize.disconnect();
    mutations.disconnect();
    reduced.removeEventListener('change', preferenceChanged);
    desktop.removeEventListener('change', schedule);
    cancelAnimationFrame(frame);
    animations.forEach(animation => animation.cancel());
    reveals.forEach((_, element) => delete element.dataset.scrollState);
    images.forEach(image => image.style.removeProperty('--scroll-drift'));
    portrait?.style.removeProperty('--scroll-drift');
    journey?.style.removeProperty('--journey-progress');
    header.style.removeProperty('--reading-progress');
    header.classList.remove('is-scrolled');
  };
}
