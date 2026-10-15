import { useEffect, useRef, useState } from 'react';
import { snippets } from '../data.js';
import { Reveal } from './Shared.jsx';

const languages = [['python','Py','hello.py','Python'],['java','J','Hello.java','Java'],['javascript','JS','hello.js','JavaScript']];
const tokenPattern = /("[^"\n]*"|'[^'\n]*'|`[^`\n]*`|#.*$|\/\/.*$|\b(?:class|def|return|public|String|const|new|self)\b|\b(?:Developer|build|__init__)\b)/g;

function Highlight({ line }) {
  const nodes = [];
  let last = 0;
  for (const match of line.matchAll(tokenPattern)) {
    nodes.push(line.slice(last, match.index));
    const value = match[0];
    const kind = /^(#|\/\/)/.test(value) ? 'comment' : /^["'`]/.test(value) ? 'string' : /^(Developer|build|__init__)$/.test(value) ? 'function' : 'keyword';
    nodes.push(<span key={match.index} className={`syntax-${kind}`}>{value}</span>);
    last = match.index + value.length;
  }
  nodes.push(line.slice(last));
  return nodes;
}

export default function CodeNotebook({ t, language }) {
  const [active, setActive] = useState('python');
  const [output, setOutput] = useState('ready');
  const timer = useRef(null);
  const tabs = useRef([]);
  useEffect(() => () => clearTimeout(timer.current), []);
  function select(value) { clearTimeout(timer.current); setActive(value); setOutput('ready'); }
  function navigate(event, index) {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
    select(languages[next][0]); tabs.current[next].focus();
  }
  function run() {
    clearTimeout(timer.current); setOutput('running');
    timer.current = setTimeout(() => setOutput('done'), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380);
  }
  return <Reveal as="details" className="code-notebook">
    <summary><span className="summary-icon" aria-hidden="true">{'</>'}</span><span>{t('codeSummary')}</span><span className="details-plus" aria-hidden="true">+</span></summary><p className="notebook-description">{t('codeDescription')}</p>
    <div className="editor"><div className="editor-top"><span className="window-dots"><i /><i /><i /></span><span>workspace / arthur</span><span className="editor-branch">⑂ main</span></div>
      <div className="editor-tabs" role="tablist" aria-label={language === 'pt' ? 'Linguagem do exemplo' : 'Example language'}>{languages.map(([value,icon,file],index) => <button key={value} ref={el => { tabs.current[index] = el; }} role="tab" id={`tab-${value}`} aria-controls="code-panel" aria-selected={active === value} tabIndex={active === value ? 0 : -1} data-language={value} onClick={() => select(value)} onKeyDown={event => navigate(event,index)}><span className={`file-icon ${value}`}>{icon}</span>{file}</button>)}</div>
      <div className="code-panel" id="code-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex="0"><pre><code id="hero-code">{snippets[active].map((line,index) => <span className="code-line" key={index}><span className="line-number" aria-hidden="true">{index+1}</span><Highlight line={line} /></span>)}</code></pre></div>
      <div className="editor-output"><div className="output-header"><span>terminal</span><button id="run-code" disabled={output === 'running'} onClick={run}><span aria-hidden="true">▷</span><span>{t('run')}</span></button></div><p id="code-output" aria-live="polite"><span className="terminal-arrow">❯</span>{' '}{output === 'running' ? '…' : t(output === 'done' ? 'runOutput' : 'terminalReady')}<span className="cursor" /></p></div>
      <div className="editor-status"><span>⑂ main <span className="status-check">✓</span></span><span id="editor-language">{languages.find(item => item[0] === active)[3]} <span>UTF-8</span></span></div>
    </div>
  </Reveal>;
}
