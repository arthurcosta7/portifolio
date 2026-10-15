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
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  const links = mobile => navigation.map(([id, label]) => <a key={id} href={`#${id}`} className={!mobile && activeSection === id ? 'active' : undefined} aria-current={!mobile && activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{t(label)}</a>);
  return <>
    <header className="header">
      <div className="sidebar-identity"><a className="brand" href="#inicio" aria-label="Arthur Costa, início">Arthur Costa<span aria-hidden="true">.</span></a><p>{t('sidebarRole')}</p></div>
      <nav className="nav" aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}>{links(false)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-socials"><SocialLinks /></div><div className="header-actions">
        <button id="language-toggle" className="language-toggle" onClick={onLanguageChange} aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para português'}><span className={language === 'pt' ? 'active-lang' : undefined}>PT</span><span className="lang-divider">/</span><span className={language === 'en' ? 'active-lang' : undefined}>EN</span></button>
        <button ref={menuButton} className="menu-toggle" aria-label={t(menuOpen ? 'mobileClose' : 'mobileOpen')} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(open => !open)}><span /><span /></button>
      </div><p className="sidebar-note">{t('sidebarNote')}</p></div>
    </header>
    <nav id="mobile-nav" className="mobile-nav" aria-label={language === 'pt' ? 'Navegação móvel' : 'Mobile navigation'} hidden={!menuOpen}>{links(true)}</nav>
  </>;
}
