import { useEffect, useState } from 'react';
import { strings } from './data.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import { About } from './components/About.jsx';
import Contact from './components/Contact.jsx';
import { startScrollMotion } from './scroll-motion.js';
import { startCursorMotion } from './cursor-motion.js';

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'cruzeiro' ? 'cruzeiro' : 'professional');
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; }
    catch { return 'pt'; }
  });
  const t = key => strings[language][key] || key;
  useEffect(() => startScrollMotion(document.querySelector('main'), document.querySelector('.header')), []);
  useEffect(() => startCursorMotion(), []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'cruzeiro' ? '#052c80' : '#f6f7fb';
    try { localStorage.setItem('portfolio-theme-v1', theme); } catch { /* The theme also works without storage. */ }
  }, [theme]);
  useEffect(() => {
    let disposed = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const finishMotion = () => {
      if (!reduced.matches) return;
      document.querySelector('.hero')?.getAnimations({ subtree: true }).forEach(animation => {
        try { animation.finish(); } catch { animation.cancel(); }
      });
    };
    reduced.addEventListener('change', finishMotion);
    const motionUrl = new URL(`${import.meta.env.BASE_URL}assets/taste/motion/motion.js`, document.baseURI).href;
    const momentsUrl = new URL(`${import.meta.env.BASE_URL}assets/taste/moments/moments.js`, document.baseURI).href;
    import(/* @vite-ignore */ motionUrl).then(module => { if (!disposed) module.init(); }).catch(() => { document.documentElement.classList.add('m-enter-done'); });
    import(/* @vite-ignore */ momentsUrl).then(module => { if (!disposed) module.mountAll?.(document); }).catch(() => { document.documentElement.classList.add('mo-safe'); });
    return () => { disposed = true; reduced.removeEventListener('change', finishMotion); };
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = language === 'pt' ? 'Arthur Costa — Desenvolvedor de software' : 'Arthur Costa — Software developer';
    try { localStorage.setItem('portfolio-language',language); } catch { /* Storage may be unavailable in private contexts. */ }
  }, [language]);
  return <>
    <a className="skip-link" href="#main">{language === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}</a>
    <Header t={t} language={language} theme={theme} onThemeChange={setTheme} onLanguageChange={() => setLanguage(current => current === 'pt' ? 'en' : 'pt')} />
    <div className="page-content"><main id="main" tabIndex={-1}><Hero t={t} language={language} theme={theme} /><Projects t={t} language={language} /><About t={t} language={language} /><Contact t={t} /></main>
      <footer className="footer section-wrap"><p>© <span id="year">{new Date().getFullYear()}</span> Arthur de Carvalho Costa</p><a href="#inicio"><span>{t('backTop')}</span><span aria-hidden="true"> ↑</span></a>
        {theme === 'cruzeiro' ? <a className="photo-credit" href="https://commons.wikimedia.org/wiki/File:Torcida_do_cruzeiro_no_mineir%C3%A3o.JPG" target="_blank" rel="noopener noreferrer">{language === 'pt' ? 'Foto da torcida: Raphaelrsc · domínio público' : 'Supporters photo: Raphaelrsc · public domain'}</a> : null}
      </footer>
    </div>
  </>;
}
