GATE: OPEN 40 (rounds used up)

Scroll reativo — 12/11/2026

Implementação: entradas de painéis ao chegar à tela, deslocamento discreto das imagens no desktop, progresso de leitura no cabeçalho e linha da trajetória acompanhando a rolagem. Rolagem nativa, sem novas dependências. A preferência por movimento reduzido desativa movimentos espaciais e mantém o conteúdo visível. O foco de teclado revela o painel imediatamente.

Validação: npm run check passou. Capturas inspecionadas em 1440×900 com movimento e 390×844 com movimento reduzido. O verificador confirmou 10 entradas por IntersectionObserver. Os dois apontamentos de foco da rodada anterior desapareceram após a correção. A auditoria ampla usa modo rápido: não verifica integralmente todas as interações nem a preferência de movimento reduzido; a conferência desta preferência foi visual, na captura mobile.

Escopo visual preservado: portfólio pessoal com os temas Padrão e Cruzeiro; tipografia Manrope/Barlow Condensed, azul e fundo claro. Não houve novo sorteio de layout, troca de fotografias ou mudança de textos e contatos.

A auditoria permanece aberta: 10 apontamentos scroll-reveal correspondem às animações explicitamente solicitadas pelo usuário, contrariando a regra padrão da skill design-taste-frontend. Os demais apontamentos tratam de estrutura, imagens, tipografia e textos. Nenhuma dispensa foi cadastrada. Lista completa abaixo; os dados originais estão em .taste-skill/gate.json.

1. nav — div#root > header.header > div.header-inner.section-wrap > a.brand "ac. Arthur Costa"

   nav link wraps to a second line

2. scroll-reveal — section#projetos > div.section-heading.projects-heading "Meus projetos. Ideias colocadas em práti"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

3. scroll-reveal — div#project-list > article.project-card.project-featured "PROJETO MAIS RECENTE AGOSTO DE 2026 Fina"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

4. scroll-reveal — div#project-list > article.project-card:nth-of-type(2) "JULHO DE 2026 Catálogo de Filmes Filmes,"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

5. scroll-reveal — div#project-list > article.project-card:nth-of-type(3) "ABRIL DE 2026 BH Eats Um catálogo para e"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

6. scroll-reveal — section#sobre > div.section-heading "Sobre mim."

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

7. scroll-reveal — section#sobre > div.about-layout "Sou Arthur de Carvalho Costa, estudante "

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

8. scroll-reveal — section#sobre > div.about-journey > div.journey-item:nth-of-type(1) "Em andamento Engenharia de Software Estu"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

9. scroll-reveal — section#sobre > div.about-journey > div.journey-item:nth-of-type(2) "2026 Projetos pessoais e acadêmicos Dese"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

10. scroll-reveal — section#contato > div.contact-copy "Entre em contato. Para falar sobre proje"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

11. scroll-reveal — form#contact-form "Website Seu nome Seu e-mail Mensagem Env"

   starts an animation (0.6 s) the moment it is scrolled into view (an IntersectionObserver)

12. no-visual — section#sobre "Sobre mim."

   no picture, effect or mock in this section; a feature section needs a visual

13. text-only — section#contato "Entre em contato."

   the closing section is only text: no picture, icon, mock or effect in it

14. copy-headline — section#inicio > div.hero-inner.section-wrap > div.hero-copy > h1 "ARTHUR COSTA."

   "ARTHUR COSTA." does not name what is sold (portfolio de desenvolvimento de software, portfolio, desenvolvimento, software, from flags); only the line under it does

15. copy-headings — section#projetos > div.section-heading.projects-heading > div > h2 "Meus projetos."

   "Meus projetos." names no product, part, place or section (7 headings like it; at most one brand line per page) (and 6 more like it: "FinanceTarget", "Catálogo de Filmes", "BH Eats", "Sobre mim.", ...)

16. heading-scale — article.project-card.project-featured > div.project-information > div.project-title-row > h3 "FinanceTarget"

   h3 headings in 3 sizes, 32px ("Minha trajetória.") to 52px (x1.63)

17. off-grid — div.hero-copy > div.hero-socials > a:nth-of-type(1) > span "GitHub"

   left edge at 119px, 23px off the page margin at 96px (33 elements, like a.button)

18. photo-upscale — div.hero-inner.section-wrap > div.hero-visual > figure.hero-portrait.photo-mount > img "img: Arthur de Carvalho Costa"

   arthur-costa.png: 150x150 shown at 358x358, blown up 2.39x

19. hero-enter — section#inicio

   the hero does not enter on load: no head line setting html.m-enter (motion.md, The hero's entrance)

20. hero-screen — section#inicio "Portfólio pessoal · SoftwareArthurCosta."

   the hero ends at 920px on a 900px screen, 20px below the fold: it ends at the fold, 1px either way (SR-1)

21. section-height — div#root > div.page-content > footer.footer.section-wrap "© 2026 Arthur de Carvalho CostaVoltar ao"

   the section is 101px tall (0.1 screens), 799px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)

22. section-height — section#contato "Entre em contato.Para falar sobre projet"

   the section is 737px tall (0.8 screens), 163px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)

23. section-height — section#sobre "Sobre mim.Sou Arthur de Carvalho Costa, "

   the section is 829px tall (0.9 screens), 71px short of one screen (900px): every section after the hero is one screen or two, 2px either way (and 1 more like it: "01 / Trabalhos seleciona") (SR-2)

24. section-height — section#inicio "Portfólio pessoal · SoftwareArthurCosta."

   the section starts at 89px, 89px below the screen grid (0 x 900px): sections start on whole screens (and 2 more like it: "Sobre mim.Sou Arthur de ", "01 / Trabalhos seleciona") (SR-2)

25. section-air — section#projetos > div.project-filters "TodosJavaScriptJava"

   a bottom border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)

26. section-air — div#project-list > article.project-card.project-featured "Projeto mais recenteagosto de 2026Financ"

   a bottom border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)

27. section-air — section#sobre > div.about-journey "Minha trajetória.Em andamentoEngenharia "

   a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)

28. one-section — section#contato "Entre em contato.Para falar sobre projet"

   the screen at scroll 2700px (stride 3) shows 118px of section 4 beside section 3: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

29. one-section — div#root > div.page-content > footer.footer.section-wrap "© 2026 Arthur de Carvalho CostaVoltar ao"

   the screen at scroll 3420px (the top of section 4) shows 101px of section 5 and the content of 2 sections, over 24px each beside section 4: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

30. one-heading — section#projetos > div.section-heading.projects-heading > div > h2 "Meus projetos."

   headings of two sections show whole on one screen at 7 of 69 scroll positions (10.1%; at scroll 250, 300, 350, 400px), here with "AC.": at most 3% on a desktop (SR-5)

31. container-edges — div#root "Pular para o conteúdoac.Arthur CostaIníc"

   a <div> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)

32. container-edges — section#inicio "Portfólio pessoal · SoftwareArthurCosta."

   the section needs exactly one in-flow child .wrap (it has 1 in-flow child, 0 .wrap) (SR-6)

33. container-edges — section#projetos "01 / Trabalhos selecionadosMeus projetos"

   the section needs exactly one in-flow child .wrap (it has 5 in-flow children, 0 .wrap) (and 3 more like it: "Sobre mim.Sou Arthur de ", "Entre em contato.Para fa", "© 2026 Arthur de Carvalh") (SR-6)

34. container-edges — form#contact-form > p.form-note "Sua mensagem vai direto para o meu e-mai"

   1 text block starts on a left line at x 772, 676px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (SR-6)

35. container-edges — article.project-card.project-featured > div.project-information > div.project-tech > span:nth-of-type(1) "Java"

   2 text blocks start on a left line at x 105, 9px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (also "JavaScript") (SR-6)

36. split-pair — section#sobre > div.about-layout "Sou Arthur de Carvalho Costa, estudante "

   the split's columns are off the page's one pair of lines: its right column starts at x 941, on none of the split lines 626 (k=5), 732 (k=6), 838 (k=7) (SR-8)

37. no-visual — section#projetos "Meus projetos."

   pictures, effects and mocks cover 14% of this section; a feature section needs a visual (about 25% or more)

38. heading-scale — section#contato > div.contact-copy > h2 "Entre em contato."

   h2 headings in 2 sizes, 48px ("Meus projetos.") to 64px (x1.33)

39. menu-toggle — button#language-toggle "Switch to English"

   the menu button ("Switch to English") has no aria-expanded: a screen reader cannot tell the menu is open or shut

40. container — page

   no .wrap

Avisos não bloqueantes: 20. Os detalhes constam no relatório JSON.

Capturas locais: /tmp/portfolio-browser/scroll-desktop.png e /tmp/portfolio-browser/scroll-mobile-reduced.png.
