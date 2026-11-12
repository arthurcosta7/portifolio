import { useState } from 'react';
import { projects } from '../data.js';
import { ExternalLink, Reveal, SectionHeading, TextLink, profileLinks } from './Shared.jsx';

const orderedProjects = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));

function ArchitecturePreview({ project, t }) {
  return <>
    <div className="preview-window-top"><span><i /><i /><i /></span><span>{project.repo} / architecture</span></div>
    <div className="architecture-diagram">
      {project.architecture.map(([title, detail], index) => <div key={title}>
        {index > 0 ? <span className="architecture-connector" aria-hidden="true">↓</span> : null}
        <div className="architecture-node"><span>0{index + 1}</span><strong>{title}</strong><small>{detail}</small></div>
      </div>)}
    </div>
    <span className="project-preview-note">{t('technicalPreview')}</span>
  </>;
}

function Project({ project, t, language, featured }) {
  const name = language === 'en' && project.nameEn ? project.nameEn : project.name;
  const repo = `${profileLinks.github}/${project.repo}`;
  const date = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo',
  }).format(new Date(project.date));

  return <Reveal as="article" className={`project-card${featured ? ' project-featured' : ''}`}>
    <div className="project-information">
      <div className="project-meta">
        {featured ? <span className="featured-label">{t('featuredProject')}</span> : null}
        <time className="project-date" dateTime={project.date.slice(0,10)}>{date}</time>
      </div>
      <div className="project-title-row"><h3><ExternalLink href={repo}>{name}</ExternalLink></h3></div>
      <p>{project[language]}</p>
      <div className="project-tech">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <ExternalLink className="project-repo text-link" href={repo} aria-label={`${t('viewRepo')} ${name}`}>
        <span>{t('projectRepository')}</span><span aria-hidden="true">↗</span>
      </ExternalLink>
    </div>
    <ExternalLink className={`project-preview${project.image ? '' : ' code-preview'}`} href={repo} aria-label={`${t('viewRepo')} ${name}`}>
      {project.image ? <>
        <img src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//,'')}`} alt={`${language === 'pt' ? 'Captura de tela do projeto' : 'Project screenshot'} ${name}`} width="900" height="530" loading="lazy" />
        {project.demo ? <span className="demo-caption">{language === 'pt' ? 'Interface real · dados demonstrativos' : 'Real interface · sample data'}</span> : null}
      </> : <ArchitecturePreview project={project} t={t} />}
    </ExternalLink>
  </Reveal>;
}

export default function Projects({ t, language }) {
  const [filter, setFilter] = useState('all');
  const filtered = orderedProjects.filter(project => filter === 'all' || project.filters.includes(filter));

  return <section id="projetos" className="projects section-wrap section-space">
    <p className="eyebrow section-eyebrow">01 / {t('selectedWork')}</p>
    <SectionHeading title={t('projectsTitle')} description={t('projectsIntro')} className="projects-heading">
      <TextLink href={`${profileLinks.github}?tab=repositories`} external>{t('allRepos')}</TextLink>
    </SectionHeading>
    <div className="project-filters" role="group" aria-label={t('projectFilters')}>
      {[['all',t('all')],['javascript','JavaScript'],['java','Java'],['python','Python']].map(([value,label]) => <button
        key={value}
        className={filter === value ? 'selected' : undefined}
        data-filter={value}
        aria-pressed={filter === value}
        onClick={() => setFilter(value)}
      >{label}</button>)}
    </div>
    <p className="filter-result" role="status">{filtered.length} {t(filtered.length === 1 ? 'projectCountSingle' : 'projectCount')}</p>
    <div id="project-list" className="project-list">
      {filtered.map(project => <Project key={project.repo} project={project} t={t} language={language} featured={project.repo === orderedProjects[0].repo} />)}
    </div>
  </section>;
}
