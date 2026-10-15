# Direção visual — portfólio pessoal

Referências abertas visualmente: [Gabriel Victor](https://gabrielvictor.web.app/), [Luca Azalim](https://azal.im/), [Pedro Braga](https://www.pedrobragadev.com/) e [Flávio Júnior](https://flaviojunior-portfolio.vercel.app/).

Gabriel orienta o foco em nome, foto e área de atuação. Luca orienta navegação lateral, texto pessoal e conteúdo de currículo. Pedro reforça tipografia com voz própria. A metáfora de desktop de Flávio foi observada e não adotada. Nenhum texto, experiência ou identidade desses autores foi copiado.

## Plano visual

Paleta: grafite #0c1014; texto #e5edf3; secundário #a2b1bc; azul acinzentado #9fc6d8; superfícies #141d25; linhas #293640.

Instrument Sans para nome, identificação e leitura; IBM Plex Mono exclusivamente no exemplo de código. Não há fonte cursiva. Conteúdo alinhado à esquerda.

Composição: coluna lateral fixa de identificação e navegação; abertura com nome grande e fotografia; projetos como trabalhos individuais em sequência cronológica; apresentação pessoal e trajetória; atividade integrada e contato.

```text
Identificação | Arthur Costa          foto
Navegação     | apresentação e redes
Redes         | Python, Java, JavaScript
PT / EN       | Meus projetos
              | descrição            screenshot
              | descrição            screenshot
              | descrição            visão técnica
              | Sobre mim
              | [exemplo de código expansível]
              | Minha trajetória
              | GitHub / WakaTime
              | Contato / formulário
```

## Revisão do plano

A composição anterior repetia uma landing page de produto: slogan, editor ilustrativo, faixa de tecnologias e cartões. A revisão apresenta a pessoa e seu trabalho. Foram retiradas as frases de campanha e o editor foi movido para um caderno expansível. As funcionalidades continuam presentes com menos peso visual. O nome e a foto concentram a identidade; o restante serve à leitura dos projetos.

## Conteúdo

Projetos e datas conferidos na API pública do GitHub em 14/10/2026. Empresas, cargos, datas de curso e números de produtividade não fornecidos não foram inventados. A captura de Catálogo de Filmes usa interface real com dados demonstrativos identificados. FinanceTarget segue identificado como visão técnica até receber uma captura real da aplicação.


## Movimento solicitado

O visitante pediu explicitamente tema escuro, remoção da cursiva, partículas reativas ao cursor e animações ao descer a página. A estrutura de portfólio permanece centrada na pessoa e nos projetos.

Canvas fixo com partículas azuis discretas, conexões por proximidade, repulsão do cursor e retorno elástico. Densidade limitada pela tela, resolução limitada a 1,5x, 30 quadros por segundo e pausa quando a aba está oculta. Celular usa menos partículas. A camada decorativa não intercepta cliques.

Na rolagem, projetos revelam descrição e imagem em sequência; títulos entram com deslocamento curto, grupos de conteúdo ganham opacidade progressiva. A foto recebe paralaxe suave só no desktop. Barra superior indica progresso. Rolagem nativa preservada. Preferência de movimento reduzido desliga partículas animadas, paralaxe e transições de entrada; o conteúdo permanece visível. Teclado revela imediatamente o bloco que recebe foco.
