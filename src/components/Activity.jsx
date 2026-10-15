import { useEffect, useState } from 'react';
import { config } from '../config.js';
import { ExternalLink, Reveal, SectionHeading, TextLink, profileLinks } from './Shared.jsx';

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]) });
  if (!response.ok) throw new Error('Service unavailable');
  return response.json();
}

export default function Activity({ t }) {
  const [github, setGithub] = useState({ status: 'loading' });
  const [waka, setWaka] = useState({ status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    Promise.all([
      fetchJson(`https://api.github.com/users/${encodeURIComponent(config.github)}`, signal),
      fetchJson(`https://api.github.com/users/${encodeURIComponent(config.github)}/repos?sort=updated&per_page=100`, signal),
    ]).then(([profile, repos]) => {
      if (!Array.isArray(repos)) throw new Error('Invalid repositories');
      if (!signal.aborted) setGithub({ status: 'ready', profile, repos });
    }).catch(() => { if (!signal.aborted) setGithub({ status: 'error' }); });
    if (config.wakatime) {
      fetchJson(`https://wakatime.com/api/v1/users/${encodeURIComponent(config.wakatime)}/stats/last_7_days`, signal).then(json => {
        if (!json.data || typeof json.data !== 'object') throw new Error('Invalid statistics');
        if (!signal.aborted) setWaka({ status: 'ready', data: json.data });
      }).catch(() => { if (!signal.aborted) setWaka({ status: 'error' }); });
    }
    return () => controller.abort();
  }, []);
  const languages = github.status === 'ready' ? [...new Set(github.repos.map(repo => repo.language).filter(Boolean))].slice(0,4) : [];
  return <section id="atividade" className="activity section-wrap section-space"><SectionHeading title={t('activityTitle')} description={t('activityIntro')} /><Reveal className="activity-grid">
    <article className="github-activity"><div className="activity-card-header"><h3>GitHub</h3><ExternalLink href={profileLinks.github} aria-label="GitHub de Arthur Costa">↗</ExternalLink></div>
      <div id="github-stats" aria-live="polite">{github.status === 'ready' ? <><div className="github-stat-numbers"><div><strong>{Number(github.profile.public_repos)}</strong><span>{t('repoLabel')}</span></div><div><strong>{Number(github.profile.followers)}</strong><span>{t('followersLabel')}</span></div></div><div className="github-languages">{languages.map(item => <span key={item}>{item}</span>)}</div></> : <p className="muted">{t(github.status === 'error' ? 'githubError' : 'loadingGithub')}</p>}</div>
      <ExternalLink className="activity-profile" href={profileLinks.github}><span>@{config.github}</span><span aria-hidden="true">↗</span></ExternalLink>
    </article>
    <article className="wakatime-activity"><div className="activity-card-header"><h3>WakaTime</h3><span className="small-label">{t('codingTime')}</span></div><div id="wakatime-stats" aria-live="polite">
      {!config.wakatime ? <div className="waka-empty"><strong>{t('wakaPending')}</strong><p>{t('wakaPendingDescription')}</p></div> : waka.status === 'ready' ? <><div className="waka-total">{waka.data.human_readable_total || '0 hrs'}</div><p className="small-label">{t('last7')}</p>{(waka.data.languages || []).slice(0,4).map(item => <div className="waka-language" key={item.name}><span>{item.name}</span><div className="waka-bar"><span style={{ width: `${Math.min(100,Math.max(0,Number(item.percent)||0))}%` }} /></div><span>{Number(item.percent).toFixed(0)}%</span></div>)}<TextLink href={`https://wakatime.com/@${encodeURIComponent(config.wakatime)}`} external>WakaTime</TextLink></> : <div className="waka-empty"><p>{t(waka.status === 'error' ? 'wakaUnavailable' : 'loadingWaka')}</p><TextLink href={`https://wakatime.com/@${encodeURIComponent(config.wakatime)}`} external>WakaTime</TextLink></div>}
    </div><span className="waka-footnote">{t('wakaFootnote')}</span></article>
  </Reveal></section>;
}
