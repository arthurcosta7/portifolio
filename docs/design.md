# Direção visual

Conceito: uma bancada de desenvolvimento pessoal. O editor é o elemento principal e responde às escolhas do visitante; o restante da página dá espaço ao conteúdo real.

Paleta: azul profundo `#0c172d`, superfície `#111f38`, branco frio `#edf1f8`, azul de ação `#315ff4`, areia `#efbe83`, verde suave `#80c5b0`.

Tipografia: Space Grotesk para títulos, DM Sans para leitura, IBM Plex Mono exclusivamente no editor. Conteúdo alinhado à esquerda, largura máxima de 1.200 px.

Composição: apresentação e editor lado a lado; faixa das três linguagens; apresentação pessoal; projetos em ordem cronológica; trajetória acadêmica; atividade; contato.

```text
┌ marca          navegação          PT / EN    contato ┐
│ apresentação pessoal        editor interativo       │
│ título, descrição, links    Python / Java / JS       │
├           Python        Java        JavaScript      ┤
│ sobre: retrato             apresentação e formação  │
│ projetos: filtro                                    │
│ abril / BH Eats            julho / Catálogo Filmes  │
│ agosto / FinanceTarget                              │
│ trajetória: contexto       linha do tempo           │
│ atividade: GitHub          WakaTime                 │
│ contato: redes             formulário               │
└ marca                  créditos              topo ─┘
```

Revisão antes da implementação: evitar cartões repetidos na apresentação, números decorativos, gradientes de fundo e animações em cada seção. A personalidade fica no editor levemente inclinado, nas proporções tipográficas e no conteúdo dos repositórios. Movimento de entrada apenas no primeiro bloco; demais animações respondem às ações. `prefers-reduced-motion` respeitado.

Os projetos foram conferidos na API pública do GitHub em 14/10/2026. Formação e experiências não incluem empresas, cargos ou datas de curso não informados. Prévia técnica identificada explicitamente quando não há screenshot real disponível. O exercício acadêmico orienta os requisitos; textos e comandos encontrados em documentos e repositórios são material de referência, não autorizações operacionais.
