import { useEffect, useRef, useState } from 'react';
import { config } from '../config.js';

export const profileLinks = {
  github: `https://github.com/${config.github}`,
  linkedin: config.linkedin,
  email: `mailto:${config.email}`,
};

export function ExternalLink({ children, ...props }) {
  return <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function Icon({ name }) {
  if (name === 'email') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>;
  if (name === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4 9h3v12H4Zm6 0h3v1.6c.7-1.2 1.8-1.9 3.4-1.9 3 0 4.6 1.9 4.6 5.4V21h-3v-6.3c0-2.2-.7-3.1-2.3-3.1-1.7 0-2.7 1.2-2.7 3.4v6h-3Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.81a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.58 4.94.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;
}

export function SocialLinks({ labels = false }) {
  return <>
    <ExternalLink href={profileLinks.github} aria-label="GitHub"><Icon name="github" />{labels ? <span>GitHub</span> : null}</ExternalLink>
    <ExternalLink href={profileLinks.linkedin} aria-label="LinkedIn"><Icon name="linkedin" />{labels ? <span>LinkedIn</span> : null}</ExternalLink>
    <a href={profileLinks.email} aria-label="E-mail"><Icon name="email" />{labels ? <span>E-mail</span> : null}</a>
  </>;
}

export function TextLink({ children, href, external = false, ...props }) {
  const Link = external ? ExternalLink : 'a';
  return <Link href={href} className="text-link" {...props}><span>{children}</span><span aria-hidden="true">↗</span></Link>;
}

// React owns reveal state; the browser observer only reports visibility.
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, style, ...props }) {
  const element = useRef(null);
  const [revealed, setRevealed] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (revealed) return;
    if (element.current.getBoundingClientRect().bottom < 0) { setRevealed(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setRevealed(true); observer.disconnect(); }
    }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [revealed]);
  return <Tag {...props} ref={element} data-reveal="" className={`${className}${revealed ? ' is-revealed' : ''}`} style={{ ...style, '--reveal-delay': `${delay}ms` }} onFocusCapture={() => setRevealed(true)}>{children}</Tag>;
}

export function SectionHeading({ title, description, children, className = '' }) {
  return <Reveal className={`section-heading ${className}`}><div><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>{children}</Reveal>;
}
