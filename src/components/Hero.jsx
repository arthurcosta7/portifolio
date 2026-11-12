import { SocialLinks } from './Shared.jsx';

export default function Hero({ t, language, theme }) {
  return <section id="inicio" className="hero" data-enter>
    {theme === 'cruzeiro' ? <div className="club-background" key="cruzeiro" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}assets/cruzeiro-torcida.webp`} alt="" width="1600" height="1200" /></div> : null}
    <div className="hero-inner section-wrap">
    <div className="hero-copy">
      <p className="eyebrow intro"><span className="status-dot" aria-hidden="true" />{t('heroEyebrow')}</p>
      <h1 data-enter-whole>Arthur<br /><span className="surname">Costa<span className="name-period">.</span></span></h1>
      <p className="hero-role">{t('heroRole')}</p>
      <p className="hero-description">{t('heroDescription')}</p>
      <div className="hero-actions">
        <a href="#projetos" className="button">{t('viewProjects')}<span aria-hidden="true">↘</span></a>
        <a href="#contato" className="hero-contact">{t('letsTalk')}<span aria-hidden="true">↗</span></a>
      </div>
      <div className="hero-socials"><SocialLinks labels /></div>
    </div>
    <div className="hero-visual" data-enter-media>
      <div className="portrait-heading"><span>{t('course')}</span><span aria-hidden="true">↙</span></div>
      <figure className="hero-portrait photo-mount" data-moment="picture-develops" data-moment-opts='{"look":"film","duration":1200}'>
        <img src={`${import.meta.env.BASE_URL}assets/arthur-costa.png`} alt="Arthur de Carvalho Costa" width="150" height="150" fetchPriority="high" data-source="client" data-subject="Arthur Costa" />
      </figure>
      <div className="portrait-signature" aria-hidden="true"><span>Arthur Costa</span><span>AC.</span></div>
      {theme === 'cruzeiro' ? <svg className="club-stars" viewBox="0 0 130 160" aria-hidden="true"><defs><path id="club-star" d="m0-10 2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L0 4.4-5.9 8.1l1.7-6.7-5.3-4.5 6.9-.5Z" /></defs><use href="#club-star" x="63" y="20" /><use href="#club-star" x="20" y="69" /><use href="#club-star" x="107" y="58" /><use href="#club-star" x="80" y="94" transform="translate(16 19) scale(.8)" /><use href="#club-star" x="61" y="140" /></svg> : null}
    </div>
    <div className="hero-bottom">
      <span>{t('workingWith')}</span>
      <ul className="hero-stack">
        <li>Python</li><li>Java</li><li>JavaScript</li>
      </ul>
      <a href="#projetos" className="scroll-projects" aria-label={language === 'pt' ? 'Ver projetos' : 'View projects'}>↓</a>
    </div>
    </div>
  </section>;
}
