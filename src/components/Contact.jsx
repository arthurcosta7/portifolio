import { useEffect, useRef, useState } from 'react';
import { config } from '../config.js';
import { Reveal, ExternalLink, profileLinks } from './Shared.jsx';

function ContactForm({ t }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || sending || form.elements._honey.value) return;
    const controller = new AbortController();
    request.current = controller;
    setSending(true); setStatus('');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(config.email)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]),
      });
      const result = await response.json();
      if (/activat|confirm|verif/i.test(result.message || '')) { setStatus('activation'); return; }
      if (!response.ok || ![true,'true'].includes(result.success)) throw new Error('Submission rejected');
      setStatus('sent'); form.reset();
    } catch { if (!controller.signal.aborted) setStatus('sendError'); }
    finally { if (!controller.signal.aborted) setSending(false); }
  }
  return <Reveal as="form" delay={120} id="contact-form" className="contact-form" action={`https://formsubmit.co/${config.email}`} method="POST" onSubmit={submit} aria-busy={sending}>
    <input type="hidden" name="_subject" value="Contato pelo portfólio de Arthur Costa" /><input type="hidden" name="_template" value="table" />
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="_honey" tabIndex="-1" autoComplete="off" /></div>
    <label htmlFor="name">{t('nameLabel')}</label><input id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={t('namePlaceholder')} />
    <label htmlFor="email">{t('emailLabel')}</label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder={t('emailPlaceholder')} />
    <label htmlFor="message">{t('messageLabel')}</label><textarea id="message" name="message" required minLength={10} maxLength={5000} rows={4} placeholder={t('messagePlaceholder')} />
    <button className="button button-primary submit-button" type="submit" disabled={sending}><span>{t(sending ? 'sending' : 'sendMessage')}</span><span aria-hidden="true">↗</span></button>
    <p className="form-note">{t('formNote')}</p><p id="form-status" role="status" aria-live="polite">{status ? t(status) : ''}</p>
  </Reveal>;
}

export default function Contact({ t }) {
  const [notice, setNotice] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(config.email); setNotice('copied'); }
    catch { setNotice('copyError'); }
    clearTimeout(timer.current); timer.current = setTimeout(() => setNotice(''),3500);
  }
  return <>
    <section id="contato" className="contact section-wrap section-space"><Reveal className="contact-copy"><h2>{t('contactTitle')}</h2><p>{t('contactDescription')}</p><a className="email-link" href={profileLinks.email}>{config.email}</a><div className="contact-socials"><ExternalLink href={profileLinks.github}>GitHub</ExternalLink><ExternalLink href={profileLinks.linkedin}>LinkedIn</ExternalLink><button id="copy-email" onClick={copyEmail}>{t('copyEmail')}</button></div></Reveal><ContactForm t={t} /></section>
    <div className="toast" id="toast" role="status" hidden={!notice}>{notice ? t(notice) : ''}</div>
  </>;
}
