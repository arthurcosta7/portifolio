import { Reveal, SectionHeading, TextLink, profileLinks } from './Shared.jsx';

export function About({ t, language }) {
  return <section id="sobre" className="about section-wrap section-space"><SectionHeading title={t('aboutTitle')} />
    <Reveal className="about-layout"><div className="about-content"><p className="about-lead">{t('aboutLead')}</p><p>{t('aboutBody')}</p><p>{t('aboutBody2')}</p><TextLink href={profileLinks.linkedin} external>{t('linkedinProfile')}</TextLink></div><aside className="about-facts"><div><span>{t('educationLabel')}</span><strong>{t('course')}</strong></div><div><span>{t('focusLabel')}</span><strong>{t('focusValue')}</strong></div><div><span>{t('toolsLabel')}</span><strong>Git, GitHub &amp; APIs</strong></div></aside></Reveal>
    <div className="about-journey"><h3>{t('experienceTitle')}</h3><div className="journey-item"><span>{t('ongoing')}</span><div><h4>{t('course')}</h4><p>{t('educationDescription')}</p></div></div><div className="journey-item"><span>2026</span><div><h4>{t('practiceTitle')}</h4><p>{t('practiceDescription')}</p></div></div></div>
  </section>;
}

export function Trajectory({ t }) {
  return <section id="trajetoria" className="experience section-wrap section-space"><SectionHeading title={t('experienceTitle')} /><div className="experience-layout"><Reveal as="p" className="experience-intro">{t('experienceIntro')}</Reveal><div className="experience-list"><Reveal as="article" delay={100}><span className="experience-period">{t('ongoing')}</span><h3>{t('course')}</h3><span className="experience-type">{t('academic')}</span><p>{t('educationDescription')}</p></Reveal><Reveal as="article" delay={100}><span className="experience-period">2026</span><h3>{t('practiceTitle')}</h3><span className="experience-type">GitHub / @arthurcosta7</span><p>{t('practiceDescription')}</p></Reveal></div></div></section>;
}
