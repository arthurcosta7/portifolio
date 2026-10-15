import { config } from './config.js';

const $ = (selector) => document.querySelector(selector);
let language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt';
let activeCode = 'python';
let activeFilter = 'all';
let githubData = null;
let wakaData = null;
const strings = {
  pt: { navAbout:'Sobre',navProjects:'Projetos',navExperience:'Trajetória',navActivity:'Atividade',navContact:'Vamos conversar',hello:'Olá, eu sou o Arthur',heroTitle:'Ideias na cabeça.<br>Código no mundo.',heroDescription:'Estudante de Engenharia de Software. Entre a lógica do back-end e os detalhes da interface, construo meu caminho com Python, Java e JavaScript.',seeProjects:'Explorar projetos',heroNote:'Aprendendo, desenvolvendo e compartilhando.',workbench:'Um pouco do meu universo',run:'Executar exemplo',terminalReady:'Tudo começa com uma ideia.',editorNote:'curiosidade → código → novas possibilidades',scroll:'Tem mais aqui embaixo',currentStack:'Minha stack, em construção constante',aboutKicker:'A pessoa por trás do código',aboutTitle:'Prazer, Arthur.',course:'Engenharia de Software',aboutLead:'Gosto de entender como as coisas funcionam. E de fazer funcionar.',aboutBody:'Sou estudante de Engenharia de Software e estou construindo minha trajetória no desenvolvimento. Meu foco está em Python, Java e JavaScript: três maneiras diferentes de transformar um problema em uma solução.',aboutBody2:'Nos meus projetos, exploro desde interfaces e consumo de APIs até lógica de programação e aplicações com back-end. Quero seguir aprendendo na prática e contribuir com software que seja útil para as pessoas.',educationLabel:'Formação',focusLabel:'Interesses',focusValue:'Back-end, web e automação',linkedinProfile:'Meu perfil no LinkedIn',projectsKicker:'Da ideia ao repositório',projectsTitle:'Código que ganha forma.',allRepos:'Todos os repositórios',all:'Todos',projectsNote:'Uma linha do tempo de aprendizado. Do primeiro projeto às construções mais recentes.',experienceKicker:'Cada projeto ensina alguma coisa',experienceTitle:'Uma trajetória em movimento.',experienceIntro:'Estou no começo da minha jornada profissional. Por aqui, a experiência vem de estudar, experimentar e colocar projetos de pé.',ongoing:'Em andamento',academic:'Formação acadêmica',educationDescription:'Construção de uma base em programação, desenvolvimento de aplicações e boas práticas de engenharia de software.',practiceTitle:'Desenvolvimento na prática',personalAcademic:'Projetos pessoais e acadêmicos · GitHub',practiceDescription:'Catálogos web, integração com APIs e aplicações Java. Projetos versionados no GitHub, com espaço para testar ideias e evoluir a cada commit.',seeWork:'Conhecer os projetos',activityKicker:'O processo também importa',activityTitle:'Entre um commit e outro.',githubDescription:'Projetos abertos. Aprendizado compartilhado.',loadingGithub:'Buscando atividade pública…',codingTime:'Tempo de código',wakaDescription:'Um olhar sobre a rotina de desenvolvimento.',wakaPending:'Estatísticas em breve',wakaPendingDescription:'Meu tempo de código vai aparecer por aqui quando o perfil público estiver conectado.',wakaFootnote:'Dados reais, direto do WakaTime.',contactKicker:'O próximo projeto pode começar aqui',contactTitle:'Boas conversas.<br>Novas possibilidades.',contactDescription:'Uma ideia, uma oportunidade ou uma troca sobre tecnologia. Pode me chamar.',copyEmail:'Copiar e-mail',nameLabel:'Seu nome',emailLabel:'Seu e-mail',messageLabel:'O que você tem em mente?',sendMessage:'Enviar mensagem',formNote:'Sua mensagem vai direto para o meu e-mail.',footer:'· Feito com curiosidade e café.',backTop:'De volta ao topo',namePlaceholder:'Como posso te chamar?',emailPlaceholder:'voce@exemplo.com',messagePlaceholder:'Me conta um pouco sobre a sua ideia…',repoLabel:'repositórios públicos',followersLabel:'seguidores',githubError:'A atividade está indisponível agora. Você pode ver meus projetos direto no GitHub.',copied:'E-mail copiado!',copyError:'Não foi possível copiar. Use o link do e-mail acima.',sending:'Enviando…',sent:'Mensagem aceita pelo serviço. Obrigado pelo contato!',sendError:'Não foi possível enviar agora. Tente novamente ou use o link do e-mail ao lado.',activation:'O formulário aguarda a confirmação do destinatário. Você também pode usar o link de e-mail.',runOutput:'Olá, mundo! Vamos construir alguma coisa.',wakaUnavailable:'Estatísticas indisponíveis no momento. Confira meu perfil no WakaTime.',last7:'nos últimos 7 dias',technicalPreview:'Visão técnica · consulte o repositório',viewRepo:'Ver repositório de',projectFilters:'Filtrar projetos',mobileOpen:'Abrir menu',mobileClose:'Fechar menu' },
  en: { navAbout:'About',navProjects:'Projects',navExperience:'Journey',navActivity:'Activity',navContact:"Let's talk",hello:"Hi, I'm Arthur",heroTitle:'Ideas in mind.<br>Code in the world.',heroDescription:'Software Engineering student. From back-end logic to the details of an interface, I’m building my path with Python, Java and JavaScript.',seeProjects:'Explore projects',heroNote:'Learning, building and sharing.',workbench:'A little of my world',run:'Run example',terminalReady:'It all starts with an idea.',editorNote:'curiosity → code → new possibilities',scroll:'More to explore below',currentStack:'My stack, always a work in progress',aboutKicker:'The person behind the code',aboutTitle:'Nice to meet you. Arthur.',course:'Software Engineering',aboutLead:'I like understanding how things work. And making them work.',aboutBody:'I’m a Software Engineering student building my path in development. I focus on Python, Java and JavaScript: three different ways to turn a problem into a solution.',aboutBody2:'My projects explore interfaces, APIs, programming logic and back-end applications. I want to keep learning through practice and contribute software that is useful to people.',educationLabel:'Education',focusLabel:'Interests',focusValue:'Back-end, web and automation',linkedinProfile:'My LinkedIn profile',projectsKicker:'From idea to repository',projectsTitle:'Code taking shape.',allRepos:'All repositories',all:'All',projectsNote:'A timeline of learning. From the first project to the most recent builds.',experienceKicker:'Every project teaches something',experienceTitle:'A journey in motion.',experienceIntro:'I’m at the beginning of my professional journey. For now, experience comes from studying, experimenting and bringing projects to life.',ongoing:'In progress',academic:'Academic education',educationDescription:'Building a foundation in programming, application development and software engineering practices.',practiceTitle:'Learning by building',personalAcademic:'Personal and academic projects · GitHub',practiceDescription:'Web catalogs, API integrations and Java applications. Projects versioned on GitHub, with room to try ideas and improve with every commit.',seeWork:'Explore the projects',activityKicker:'The process matters too',activityTitle:'Between commits.',githubDescription:'Open projects. Shared learning.',loadingGithub:'Loading public activity…',codingTime:'Coding time',wakaDescription:'A look into my development routine.',wakaPending:'Stats coming soon',wakaPendingDescription:'My coding time will appear here once my public profile is connected.',wakaFootnote:'Real data, straight from WakaTime.',contactKicker:'The next project could start here',contactTitle:'Good conversations.<br>New possibilities.',contactDescription:'An idea, an opportunity or a conversation about technology. Get in touch.',copyEmail:'Copy email',nameLabel:'Your name',emailLabel:'Your email',messageLabel:'What do you have in mind?',sendMessage:'Send message',formNote:'Your message goes straight to my inbox.',footer:'· Made with curiosity and coffee.',backTop:'Back to top',namePlaceholder:'What should I call you?',emailPlaceholder:'you@example.com',messagePlaceholder:'Tell me a little about your idea…',repoLabel:'public repositories',followersLabel:'followers',githubError:'Activity is currently unavailable. Explore my projects directly on GitHub.',copied:'Email copied!',copyError:'Could not copy. Use the email link above.',sending:'Sending…',sent:'Message accepted by the service. Thanks for getting in touch!',sendError:'Could not send right now. Please try again or use the email link.',activation:'The form is awaiting recipient verification. You can also use the email link.',runOutput:'Hello, world! Let’s build something.',wakaUnavailable:'Stats are currently unavailable. Visit my WakaTime profile.',last7:'over the last 7 days',technicalPreview:'Technical overview · explore the repository',viewRepo:'View repository for',projectFilters:'Filter projects',mobileOpen:'Open menu',mobileClose:'Close menu' }
};
Object.assign(strings.pt, {
  navHome:'Início',navAbout:'Sobre mim',navContact:'Contato',sidebarRole:'Estudante de Engenharia de Software',sidebarNote:'Meu espaço na web.',hello:'Olá! Eu sou',heroTitle:'Arthur<br>Costa.',heroRole:'Desenvolvedor em formação.',heroDescription:'Estudo Engenharia de Software e desenvolvo projetos com Python, Java e JavaScript. Este é o meu espaço para compartilhar o que venho construindo.',workingWith:'Estudando e desenvolvendo com',projectsTitle:'Meus projetos.',projectsIntro:'Uma seleção do que tenho desenvolvido, do primeiro ao mais recente.',allRepos:'Ver no GitHub',aboutTitle:'Sobre mim.',aboutLead:'Sou Arthur de Carvalho Costa, estudante de Engenharia de Software.',aboutBody:'Gosto de entender a lógica por trás das aplicações. Tenho estudado Python, Java e JavaScript e colocado esse aprendizado em prática nos meus projetos.',aboutBody2:'Já desenvolvi catálogos web com consumo de APIs e aplicações com back-end em Java. Me interesso por desenvolvimento web, back-end e automação, e quero aprofundar esses conhecimentos ao longo da minha formação.',linkedinProfile:'Mais sobre mim no LinkedIn',toolsLabel:'No dia a dia',codeSummary:'Um mesmo exemplo, três linguagens',codeDescription:'Um exemplo demonstrativo do meu perfil em Python, Java e JavaScript. Escolha uma aba para comparar.',experienceTitle:'Minha trajetória.',experienceIntro:'Estou no início da minha carreira. Minha experiência até aqui vem da graduação e de projetos pessoais e acadêmicos.',academic:'Graduação',educationDescription:'Estudos em programação, desenvolvimento de aplicações e práticas de engenharia de software.',practiceTitle:'Projetos pessoais e acadêmicos',practiceDescription:'Desenvolvimento de catálogos web, integração com APIs e aplicações Java. Código e evolução dos projetos disponíveis nos repositórios.',activityTitle:'O que tenho feito.',activityIntro:'Repositórios e tempo dedicado ao código.',wakaPending:'Perfil ainda não conectado',wakaPendingDescription:'As estatísticas aparecerão aqui quando meu perfil público estiver conectado.',wakaFootnote:'Estatísticas públicas do WakaTime.',contactTitle:'Entre em contato.',contactDescription:'Para falar sobre projetos, oportunidades ou trocar uma ideia, me envie uma mensagem.',messageLabel:'Mensagem',messagePlaceholder:'Escreva sua mensagem…',backTop:'Voltar ao início',projectRepository:'Repositório',runOutput:'Arthur Costa · Python, Java e JavaScript.'
});
Object.assign(strings.en, {
  navHome:'Home',navAbout:'About me',navContact:'Contact',sidebarRole:'Software Engineering student',sidebarNote:'My space on the web.',hello:'Hi! I’m',heroTitle:'Arthur<br>Costa.',heroRole:'An aspiring software developer.',heroDescription:'I study Software Engineering and develop projects with Python, Java and JavaScript. This is where I share what I’ve been building.',workingWith:'Studying and building with',projectsTitle:'My projects.',projectsIntro:'A selection of my work, from the first project to the most recent.',allRepos:'View on GitHub',aboutTitle:'About me.',aboutLead:'I’m Arthur de Carvalho Costa, a Software Engineering student.',aboutBody:'I like understanding the logic behind applications. I’ve been studying Python, Java and JavaScript and putting what I learn into practice in my projects.',aboutBody2:'I’ve built web catalogs with API integrations and applications with Java back-ends. I’m interested in web development, back-end engineering and automation, and want to deepen these skills throughout my studies.',linkedinProfile:'More about me on LinkedIn',toolsLabel:'Everyday tools',codeSummary:'One example, three languages',codeDescription:'A visual example of my profile in Python, Java and JavaScript. Choose a tab to compare.',experienceTitle:'My journey.',experienceIntro:'I’m at the beginning of my career. My experience so far comes from my degree and personal and academic projects.',academic:'Undergraduate studies',educationDescription:'Studying programming, application development and software engineering practices.',practiceTitle:'Personal and academic projects',practiceDescription:'Building web catalogs, API integrations and Java applications. The code and project history are available in my repositories.',activityTitle:'What I’ve been doing.',activityIntro:'Repositories and time spent coding.',wakaPending:'Profile not connected yet',wakaPendingDescription:'Stats will appear here once my public profile is connected.',wakaFootnote:'Public WakaTime statistics.',contactTitle:'Get in touch.',contactDescription:'To discuss projects, opportunities or just exchange ideas, send me a message.',messageLabel:'Message',messagePlaceholder:'Write your message…',backTop:'Back to the top',projectRepository:'Repository',runOutput:'Arthur Costa · Python, Java and JavaScript.'
});

const t = (key) => strings[language][key] || key;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const snippets = {
  python: ['# Uma ideia de cada vez.', 'class Developer:', '    def __init__(self):', '        self.name = "Arthur Costa"', '        self.stack = ["Python", "Java", "JS"]', '', '    def build(self, idea):', '        return idea + " → realidade"', '', 'arthur = Developer()', 'arthur.build("Próximo projeto")'],
  java: ['// Uma ideia de cada vez.', 'public class Developer {', '    String name = "Arthur Costa";', '    String[] stack = {"Python", "Java", "JS"};', '', '    String build(String idea) {', '        return idea + " → realidade";', '    }', '', '    // Aprender. Construir. Repetir.', '}'],
  javascript: ['// Uma ideia de cada vez.', 'const developer = {', '    name: "Arthur Costa",', '    stack: ["Python", "Java", "JS"],', '', '    build(idea) {', '        return `${idea} → realidade`;', '    },', '};', '', 'developer.build("Próximo projeto");']
};
function highlight(line) {
  const token = /("[^"\n]*"|'[^'\n]*'|`[^`\n]*`|#.*$|\/\/.*$|\b(?:class|def|return|public|String|const|new|self)\b|\b(?:Developer|Developer|build|__init__)\b)/g;
  let result = '', last = 0;
  for (const match of line.matchAll(token)) {
    result += escapeHtml(line.slice(last, match.index));
    const value = match[0];
    const kind = /^(#|\/\/)/.test(value) ? 'comment' : /^["'`]/.test(value) ? 'string' : /^(Developer|build|__init__)$/.test(value) ? 'function' : 'keyword';
    result += `<span class="syntax-${kind}">${escapeHtml(value)}</span>`;
    last = match.index + value.length;
  }
  return result + escapeHtml(line.slice(last));
}
function renderCode() {
  $('#hero-code').innerHTML = snippets[activeCode].map((line, index) => `<span class="code-line"><span class="line-number" aria-hidden="true">${index + 1}</span>${highlight(line)}</span>`).join('');
  $('#code-panel').setAttribute('aria-labelledby', `tab-${activeCode}`);
  $('#editor-language').innerHTML = `${{python:'Python',java:'Java',javascript:'JavaScript'}[activeCode]} <span>UTF-8</span>`;
  document.querySelectorAll('[data-language]').forEach(button => {
    const selected = button.dataset.language === activeCode;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  $('#code-output').innerHTML = `<span class="terminal-arrow">❯</span> ${escapeHtml(t('terminalReady'))}<span class="cursor"></span>`;
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => { activeCode = button.dataset.language; renderCode(); }));
$('.editor-tabs').addEventListener('keydown', event => {
  const tabs = [...document.querySelectorAll('[data-language]')];
  const current = tabs.indexOf(document.activeElement);
  if (current < 0 || !['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[index].click(); tabs[index].focus();
});
let runTimer;
$('#run-code').addEventListener('click', () => {
  clearTimeout(runTimer);
  $('#code-output').innerHTML = '<span class="terminal-arrow">❯</span> …';
  $('#run-code').disabled = true;
  runTimer = setTimeout(() => {
    $('#code-output').innerHTML = `<span class="terminal-arrow">❯</span> ${escapeHtml(t('runOutput'))}<span class="cursor"></span>`;
    $('#run-code').disabled = false;
  }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380);
});

const projects = [
  {name:'BH Eats',repo:'BH-Eats',date:'2026-04-04T14:12:28Z',tags:['JavaScript','HTML','CSS','REST API'],filters:['javascript'],image:'/assets/bh-eats.png',pt:'Um catálogo para explorar restaurantes de Belo Horizonte, com categorias, filtros e ranking a partir de uma API REST simulada.',en:'A catalog for exploring restaurants in Belo Horizonte, featuring categories, filters and rankings using a simulated REST API.'},
  {name:'Catálogo de Filmes',nameEn:'Movie Catalog',repo:'Catalogo-Filmes',date:'2026-07-07T02:50:10Z',tags:['JavaScript','CSS','TMDB API','localStorage'],filters:['javascript'],image:'/assets/catalogo-filmes.png',demo:true,pt:'Filmes, detalhes e uma lista de favoritos. Uma aplicação web que consome a API do TMDB e salva suas escolhas no navegador.',en:'Movies, details and a favorites list. A web application using the TMDB API that saves your picks in the browser.'},
  {name:'FinanceTarget',repo:'financetarget',date:'2026-08-27T19:59:51Z',tags:['Java','Spring Boot','Next.js','PostgreSQL'],filters:['java','javascript'],pt:'Planejamento financeiro orientado a metas. Projeto com back-end em Java, interface web e arquitetura preparada para integrações.',en:'Goal-oriented financial planning. A project with a Java back-end, a web interface and an architecture designed for integrations.',preview:['FinanceTarget / architecture','Next.js + React + TypeScript','            ↓ REST API','Java + Spring Boot','            ↓ persistence','PostgreSQL + Flyway']}
];
function renderProjects() {
  $('#project-list').innerHTML = projects.filter(project => activeFilter === 'all' || project.filters.includes(activeFilter)).map(project => {
    const name = language === 'en' && project.nameEn ? project.nameEn : project.name;
    const date = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {month:'long',year:'numeric',timeZone:'America/Sao_Paulo'}).format(new Date(project.date));
    const preview = project.image ? `<img src="${project.image}" alt="${language === 'pt' ? 'Captura de tela do projeto' : 'Project screenshot'} ${escapeHtml(name)}" width="900" height="530" loading="lazy">${project.demo ? `<span class="demo-caption">${language === 'pt' ? 'Interface real · dados demonstrativos' : 'Real interface · sample data'}</span>` : ''}` : `<div class="preview-window-top"><span><i></i><i></i><i></i></span><span>financetarget / main</span></div><pre>${project.preview.map(highlight).join('\n')}</pre><span class="project-preview-note">${escapeHtml(t('technicalPreview'))}</span>`;
    return `<article class="project-card"><div class="project-information"><time class="project-date" datetime="${project.date.slice(0,10)}">${date}</time><div class="project-title-row"><h3><a href="https://github.com/${config.github}/${project.repo}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a></h3></div><p>${escapeHtml(project[language])}</p><div class="project-tech">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><a class="project-repo text-link" href="https://github.com/${config.github}/${project.repo}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(t('viewRepo'))} ${escapeHtml(name)}"><span>${escapeHtml(t('projectRepository'))}</span><span aria-hidden="true">↗</span></a></div><a class="project-preview ${project.image ? '' : 'code-preview'}" href="https://github.com/${config.github}/${project.repo}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(t('viewRepo'))} ${escapeHtml(name)}">${preview}</a></article>`;
  }).join('');
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => { const selected = item === button; item.classList.toggle('selected',selected); item.setAttribute('aria-pressed',String(selected)); });
  renderProjects();
}));

function renderGithub() {
  const el = $('#github-stats');
  if (githubData === false) { el.innerHTML = `<p class="muted">${escapeHtml(t('githubError'))}</p>`; return; }
  if (!githubData) return;
  const languages = [...new Set(githubData.repos.map(repo => repo.language).filter(Boolean))].slice(0,4);
  el.innerHTML = `<div class="github-stat-numbers"><div><strong>${Number(githubData.profile.public_repos)}</strong><span>${escapeHtml(t('repoLabel'))}</span></div><div><strong>${Number(githubData.profile.followers)}</strong><span>${escapeHtml(t('followersLabel'))}</span></div></div><div class="github-languages">${languages.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>`;
}
async function fetchGithub() {
  try {
    const [profile, repos] = await Promise.all([fetch(`https://api.github.com/users/${encodeURIComponent(config.github)}`,{signal:AbortSignal.timeout(12000)}),fetch(`https://api.github.com/users/${encodeURIComponent(config.github)}/repos?sort=updated&per_page=100`,{signal:AbortSignal.timeout(12000)})]);
    if (!profile.ok || !repos.ok) throw new Error('GitHub unavailable');
    githubData = {profile:await profile.json(),repos:await repos.json()};
  } catch { githubData = false; }
  renderGithub();
}

function renderWaka() {
  const el = $('#wakatime-stats');
  if (!config.wakatime) return;
  if (!wakaData || wakaData.error) {
    el.innerHTML = `<div class="waka-empty"><span class="waka-clock" aria-hidden="true">◷</span><p>${escapeHtml(t('wakaUnavailable'))}</p><a class="text-link" href="https://wakatime.com/@${encodeURIComponent(config.wakatime)}" target="_blank" rel="noopener noreferrer">WakaTime ↗</a></div>`;
    return;
  }
  el.innerHTML = `<div class="waka-total">${escapeHtml(wakaData.human_readable_total || '0 hrs')}</div><p class="small-label">${escapeHtml(t('last7'))}</p>${(wakaData.languages || []).slice(0,4).map(item => `<div class="waka-language"><span>${escapeHtml(item.name)}</span><div class="waka-bar"><span style="width:${Math.min(100,Math.max(0,Number(item.percent)||0))}%"></span></div><span>${Number(item.percent).toFixed(0)}%</span></div>`).join('')}<a class="text-link" href="https://wakatime.com/@${encodeURIComponent(config.wakatime)}" target="_blank" rel="noopener noreferrer">WakaTime ↗</a>`;
}
async function fetchWaka() {
  if (!config.wakatime) return;
  try {
    const response = await fetch(`https://wakatime.com/api/v1/users/${encodeURIComponent(config.wakatime)}/stats/last_7_days`,{signal:AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error('WakaTime unavailable');
    const json = await response.json();
    if (!json.data || typeof json.data !== 'object') throw new Error('Invalid WakaTime data');
    wakaData = json.data;
  } catch { wakaData = {error:true}; }
  renderWaka();
}
function applyLanguage() {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = language === 'pt' ? 'Arthur Costa — Desenvolvedor de software' : 'Arthur Costa — Software developer';
  document.querySelectorAll('[data-i18n]').forEach(el => { const value = t(el.dataset.i18n); if (['heroTitle','contactTitle'].includes(el.dataset.i18n)) el.innerHTML=value; else el.textContent=value; });
  document.querySelectorAll('[data-placeholder]').forEach(el => el.placeholder=t(el.dataset.placeholder));
  $('#language-toggle').innerHTML = `<span class="${language === 'pt' ? 'active-lang' : ''}">PT</span><span class="lang-divider">/</span><span class="${language === 'en' ? 'active-lang' : ''}">EN</span>`;
  $('#language-toggle').setAttribute('aria-label',language === 'pt' ? 'Switch to English' : 'Mudar para português');
  $('.menu-toggle').setAttribute('aria-label',t($('#mobile-nav').hidden ? 'mobileOpen' : 'mobileClose'));
  $('.project-filters').setAttribute('aria-label',t('projectFilters'));
  renderCode(); renderProjects(); renderGithub(); renderWaka();
}
$('#language-toggle').addEventListener('click',() => { language=language === 'pt' ? 'en' : 'pt'; localStorage.setItem('portfolio-language',language); applyLanguage(); });
$('.menu-toggle').addEventListener('click',() => {
  const open = $('#mobile-nav').hidden;
  $('#mobile-nav').hidden = !open;
  $('.menu-toggle').setAttribute('aria-expanded',String(open));
  $('.menu-toggle').setAttribute('aria-label',t(open ? 'mobileClose' : 'mobileOpen'));
});
function closeMenu() { $('#mobile-nav').hidden=true; $('.menu-toggle').setAttribute('aria-expanded','false'); $('.menu-toggle').setAttribute('aria-label',t('mobileOpen')); }
$('#mobile-nav').querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key === 'Escape' && !$('#mobile-nav').hidden) { closeMenu(); $('.menu-toggle').focus(); }});
let toastTimer;
function toast(message) { clearTimeout(toastTimer); $('#toast').textContent=message; $('#toast').hidden=false; toastTimer=setTimeout(()=>$('#toast').hidden=true,3500); }
$('#copy-email').addEventListener('click', async () => { try { await navigator.clipboard.writeText(config.email); toast(t('copied')); } catch { toast(t('copyError')); } });

$('#contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  if (form.elements._honey.value) return;
  const button = form.querySelector('button[type=submit]');
  const status = $('#form-status');
  button.disabled=true;
  button.firstElementChild.textContent=t('sending');
  status.textContent='';
  form.setAttribute('aria-busy','true');
  try {
    const fields = Object.fromEntries(new FormData(form));
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(config.email)}`, {method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(fields),signal:AbortSignal.timeout(20000)});
    const result = await response.json();
    if (!response.ok || ![true,'true'].includes(result.success)) {
      if (/activat|confirm|verif/i.test(result.message || '')) { status.textContent=t('activation'); return; }
      throw new Error('Submission rejected');
    }
    if (/activat|confirm|verif/i.test(result.message || '')) { status.textContent=t('activation'); return; }
    status.textContent=t('sent');
    form.reset();
  } catch { status.textContent=t('sendError'); }
  finally { button.disabled=false; button.firstElementChild.textContent=t('sendMessage'); form.removeAttribute('aria-busy'); }
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (!entry.isIntersecting) return; document.querySelectorAll('.nav a').forEach(link=>link.classList.toggle('active',link.hash === `#${entry.target.id}`)); });
}, {rootMargin:'-20% 0px -60% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
$('#year').textContent=String(new Date().getFullYear());
applyLanguage();
fetchGithub();
fetchWaka();
