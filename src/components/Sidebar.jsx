import { useEffect, useRef, useState } from 'react';
import { SocialLinks } from './Shared.jsx';

const navigation = [['inicio','navHome'],['projetos','navProjects'],['sobre','navAbout'],['trajetoria','navExperience'],['atividade','navActivity'],['contato','navContact']];

export default function Sidebar({ t, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const menuButton = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const viewport = matchMedia('(min-width: 951px)');
    const closeOnDesktop = () => { if (viewport.matches) setMenuOpen(false); };
    viewport.addEventListener('change', closeOnDesktop);
    return () => viewport.removeEventListener('change', closeOnDesktop);
  }, []);

  function followLink(event, id, mobile) {
    setMenuOpen(false);
    // Move keyboard focus out of the menu before it is hidden. Keep native
    // anchor navigation, including browser history and reduced-motion scrolling.
    if (mobile && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      const section = document.getElementById(id);
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
    }
  }

  const links = mobile => navigation.map(([id, label], index) => <a
    key={id}
    href={`#${id}`}
    className={activeSection === id ? 'active' : undefined}
    aria-current={activeSection === id ? 'location' : undefined}
    onClick={event => followLink(event, id, mobile)}
  >
    <span className="nav-number" aria-hidden="true">{String(index).padStart(2, '0')}</span>
    {t(label)}<span className="nav-arrow" aria-hidden="true">↗</span>
  </a>);

  return <>
    <header className="header">
      <div className="sidebar-identity">
        <a className="brand" href="#inicio" aria-label={`Arthur Costa, ${t('navHome')}`}>Arthur Costa<span aria-hidden="true">.</span></a>
        <p>{t('sidebarRole')}</p>
      </div>
      <nav className="nav" aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}>{links(false)}</nav>
      <div className="sidebar-bottom">
        <div className="sidebar-socials"><SocialLinks /></div>
        <div className="header-actions">
          <button id="language-toggle" className="language-toggle" onClick={onLanguageChange} aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para português'}>
            <span className={language === 'pt' ? 'active-lang' : undefined}>PT</span><span className="lang-divider">/</span><span className={language === 'en' ? 'active-lang' : undefined}>EN</span>
          </button>
          <button ref={menuButton} className="menu-toggle" aria-label={t(menuOpen ? 'mobileClose' : 'mobileOpen')} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(open => !open)}><span /><span /></button>
        </div>
        <p className="sidebar-note">{t('sidebarNote')}</p>
      </div>
    </header>
    <nav id="mobile-nav" className="mobile-nav" aria-label={language === 'pt' ? 'Navegação móvel' : 'Mobile navigation'} hidden={!menuOpen}>{links(true)}</nav>
  </>;
}
