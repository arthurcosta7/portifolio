import { useEffect, useState } from 'react';
import { strings } from './data.js';
import Sidebar from './components/Sidebar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import { About, Trajectory } from './components/About.jsx';
import Activity from './components/Activity.jsx';
import Contact from './components/Contact.jsx';
import ParticleBackground from './components/ParticleBackground.jsx';

export default function App() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; }
    catch { return 'pt'; }
  });
  const t = key => strings[language][key] || key;
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = language === 'pt' ? 'Arthur Costa — Desenvolvedor de software' : 'Arthur Costa — Software developer';
    try { localStorage.setItem('portfolio-language',language); } catch { /* Storage may be unavailable in private contexts. */ }
  }, [language]);
  return <>
    <ParticleBackground />
    <a className="skip-link" href="#main">{language === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}</a>
    <Sidebar t={t} language={language} onLanguageChange={() => setLanguage(current => current === 'pt' ? 'en' : 'pt')} />
    <div className="page-content"><main id="main"><Hero t={t} language={language} /><Projects t={t} language={language} /><About t={t} language={language} /><Trajectory t={t} /><Activity t={t} /><Contact t={t} /></main>
      <footer className="footer section-wrap"><p>© <span id="year">{new Date().getFullYear()}</span> Arthur de Carvalho Costa</p><a href="#inicio"><span>{t('backTop')}</span><span aria-hidden="true"> ↑</span></a></footer>
    </div>
  </>;
}
