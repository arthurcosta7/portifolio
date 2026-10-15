import { SocialLinks } from './Shared.jsx';

export default function Hero({ t, language }) {
  return <section id="inicio" className="hero section-wrap">
    <div className="hero-copy"><p className="intro">{t('hello')}</p><h1>Arthur<br />Costa.</h1><p className="hero-role">{t('heroRole')}</p><p className="hero-description">{t('heroDescription')}</p><div className="hero-socials"><SocialLinks labels /></div></div>
    <figure className="hero-portrait"><div className="photo-mount"><img src={`${import.meta.env.BASE_URL}assets/arthur-costa.png`} alt="Arthur de Carvalho Costa" width="150" height="150" fetchPriority="high" /></div><figcaption>Arthur de Carvalho Costa<span>{t('course')}</span></figcaption></figure>
    <div className="hero-bottom"><span>{t('workingWith')}</span><ul className="hero-stack"><li><span className="stack-python" aria-hidden="true">Py</span>Python</li><li><span className="stack-java" aria-hidden="true">J</span>Java</li><li><span className="stack-js" aria-hidden="true">JS</span>JavaScript</li></ul><a href="#projetos" className="scroll-projects" aria-label={language === 'pt' ? 'Ver projetos' : 'View projects'}>↓</a></div>
  </section>;
}
