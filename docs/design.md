# Direção visual — Arthur Costa

Portfólio pessoal e acadêmico de um estudante de Engenharia de Software. A apresentação visual é a prioridade inicial; os projetos e o contato também preparam o site para futuras candidaturas. A ação principal é explorar os projetos.

## Direção aprovada

Tema profissional como padrão, azul royal e branco, navegação superior e troca completa da tipografia anterior. O tema Cruzeiro é opcional: troca a paleta, acrescenta fotografia da torcida no fundo da abertura e cinco estrelas decorativas. Ambos mantêm o conteúdo e a organização. Novas visitas começam no profissional; a escolha persiste em `portfolio-theme-v1`, sem bloquear o site quando o armazenamento está indisponível. O atributo do tema é aplicado antes da renderização para evitar um flash da aparência errada.

Estrutura: Início → Projetos → Sobre → Contato. A trajetória está dentro do Sobre. Atividade, partículas e demonstração de código não são montadas na página. Os arquivos anteriores permanecem no repositório.

## Sistema visual

- Manrope para leitura e controles; Barlow Condensed para nome e títulos.
- Fundo profissional `#f6f7fb`, superfícies `#fff`, texto `#172239`, texto secundário `#46546b`, destaque `#1649dc`.
- Fundo da abertura Cruzeiro `#052c80`, destaque `#0646b9`, texto branco. Sobreposição azul protege a leitura sobre a fotografia.
- Tokens semânticos compartilhados; margens simétricas, largura máxima de 1248px, escala de espaçamento de 4/8px.
- Menu móvel com estado expandido, Escape e transferência de foco para a seção escolhida. Tema e idioma permanecem acessíveis no cabeçalho.
- Capturas reais de projetos em WebP. FinanceTarget usa uma visão de arquitetura identificada como técnica, sem fingir uma captura da aplicação.

## Movimento

Personalidade Premium: entradas controladas, sem rebote e sem bloquear a interação. O nome inicia a sequência, seguido por apresentação e ações, com atrasos até 240ms. A fotografia se revela uma vez; a imagem do estádio entra ao selecionar Cruzeiro. O seletor indica a mudança por deslocamento da seleção, estado pressionado e cor. Fotos dos projetos ampliam sutilmente dentro de seu enquadramento e links respondem ao ponteiro. Não há movimento ambiente infinito nem captura da rolagem.

`prefers-reduced-motion` remove animações, deslocamentos e rolagem suave. O conteúdo segue visível. O projeto reutiliza a camada de microinterações e o efeito `picture-develops` da skill design-taste-frontend, sem modificar os arquivos da skill.

As skills ui-ux-pro-max e motion-design orientaram hierarquia, contraste, controle de tema, composição e tempos de movimento. A paleta automática preta da busca inicial foi descartada por contrariar a direção azul e branca aprovada pelo usuário.

## Imagens e créditos

- Retrato de Arthur: imagem existente do projeto, 150 × 150 pixels. A resolução limita sua nitidez em tamanhos maiores.
- Projetos: capturas e conversões WebP existentes, preservadas.
- Torcida no antigo Mineirão: Raphaelrsc, 3 de maio de 2009, domínio público. Fonte: https://commons.wikimedia.org/wiki/File:Torcida_do_cruzeiro_no_mineir%C3%A3o.JPG. Conversão para WebP em 1600 × 1200, carregada apenas quando o modo Cruzeiro é selecionado. Crédito no rodapé desse modo. A foto é histórica, não representa o estádio atual.

## Conteúdo e serviços

Informações pessoais, descrições e links existentes foram preservados. O site não inventa experiência, instituições ou métricas. Idioma PT/EN e filtros de projeto continuam disponíveis. FormSubmit mantém a entrega do contato e depende da ativação pelo destinatário; a aceitação pelo serviço não garante chegada à caixa de entrada. Testes de envio devem interceptar o serviço e não enviar mensagens reais.

## Validação desta revisão

`npm run check` e `git diff --check` passaram. `scripts/verify.cjs` foi atualizado para a composição aprovada e passou no servidor de desenvolvimento e no build de produção local: temas, preferência salva, primeira visita, armazenamento bloqueado, filtros, PT/EN, formulário com sucesso/erro/ativação interceptados, menu móvel, Escape, foco e movimento reduzido. Verificados 320, 375, 390, 768, 950, 1024 e 1440px, além de navegação em paisagem. Nenhum e-mail real foi enviado. Capturas dos dois temas estão em `docs/screenshots/`.

A auditoria visual adicional da skill design-taste-frontend não está aprovada. Ela usa regras rígidas de página comercial (categoria comercial no h1, imagem em cada seção, `.wrap` como estrutura obrigatória e tamanhos idênticos por nível de título) que não correspondem integralmente à composição pessoal aprovada e à estrutura React existente. Foram corrigidos os pontos aplicáveis de contraste, foco de seção e posicionamento do honeypot. Permanecem ressalvas de composição do verificador e a baixa resolução do retrato original. Isso não equivale a uma certificação completa de acessibilidade.
