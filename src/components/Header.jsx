import { useEffect, useRef, useState } from 'react';

const navigation = [['inicio', 'navHome'], ['projetos', 'navProjects'], ['sobre', 'navAbout'], ['contato', 'navContact']];

export default function Header({ t, language, theme, onThemeChange, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const menuButton = useRef(null);
  const pt = language === 'pt';

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
      if (event.type === 'pointerdown' && !event.target.closest('.header')) setMenuOpen(false);
      if (event.type === 'focusin' && !event.target.closest('.header')) setMenuOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    document.addEventListener('focusin', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('focusin', close);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = matchMedia('(min-width: 1000px)');
    const close = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);

  const links = mobile => navigation.map(([id, label]) => <a key={id} href={`#${id}`}
    aria-current={activeSection === id ? 'location' : undefined}
    onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setMenuOpen(false);
      setActiveSection(id);
      if (mobile) { const section = document.getElementById(id); section.tabIndex = -1; section.focus({ preventScroll: true }); }
    }}>{t(label)}<span aria-hidden="true">↗</span></a>);

  return <header className="header">
    <div className="header-inner section-wrap">
      <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)} aria-label={`Arthur Costa, ${t('navHome')}`}><span className="brand-mark" aria-hidden="true">ac<span>.</span></span><span className="brand-name">Arthur Costa</span></a>
      <nav className="nav" aria-label={pt ? 'Navegação principal' : 'Main navigation'}>{links(false)}</nav>
      <div className="header-actions">
        <div className="theme-picker" role="group" aria-label={pt ? 'Tema visual' : 'Visual theme'}>
          <span className="theme-indicator" data-selected={theme} aria-hidden="true" />
          <button type="button" aria-pressed={theme === 'professional'} onClick={() => onThemeChange('professional')}>{pt ? 'Padrão' : 'Padrão'}</button>
          <button type="button" aria-pressed={theme === 'cruzeiro'} onClick={() => onThemeChange('cruzeiro')}>Cruzeiro<span className="theme-star" aria-hidden="true">✦</span></button>
        </div>
        <button id="language-toggle" className="language-toggle" onClick={onLanguageChange} aria-label={pt ? 'Switch to English' : 'Mudar para português'}>{pt ? 'PT' : 'EN'}<span aria-hidden="true">↗</span></button>
        <button ref={menuButton} className="menu-toggle" aria-label={t(menuOpen ? 'mobileClose' : 'mobileOpen')} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(open => !open)}><span /><span /></button>
      </div>
    </div>
    <nav id="mobile-nav" className="mobile-nav section-wrap" aria-label={pt ? 'Navegação móvel' : 'Mobile navigation'} hidden={!menuOpen}>{links(true)}</nav>
  </header>;
}
