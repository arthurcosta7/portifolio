# Desenvolvimento com React

O portfólio utiliza React 19, React DOM e Vite 8. Componentes, estado e eventos da interface são gerenciados pelo React. O cabeçalho oferece seleção de tema profissional/Cruzeiro e português/inglês, com preferências no navegador. A versão atual não monta o Canvas de partículas.

Pré-requisito: Node.js 22.12+ ou 24+. Use o lockfile para reproduzir a instalação:

```bash
npm ci
npm run dev
```

Abra http://localhost:4173. O Vite atualiza os componentes durante o desenvolvimento.

## Build e produção

```bash
npm run build
npm start
```

O build gera `dist/`. `npm start` serve essa pasta usando Node.js, na porta `PORT` do ambiente ou 4173 por padrão. O servidor escuta em `0.0.0.0`; use `HOST` para alterar a interface de rede. Também há `npm run preview` para conferir o build pelo Vite.

Em hospedagens estáticas: comando de instalação `npm ci`, build `npm run build`, diretório de publicação `dist`. O build usa caminhos relativos para permitir hospedagem em subdiretórios, como GitHub Pages. A publicação na hospedagem Sites permanece privada para o proprietário.

## Estrutura

```text
index.html                  Ponto de entrada do Vite
src/
  main.jsx                  Inicialização do React em StrictMode
  App.jsx                   Composição e preferências de tema/idioma
  components/               Cabeçalho, apresentação, projetos, sobre e contato
  config.js                 Configurações públicas
  data.js                   Traduções, projetos e exemplos
  motion.js                 Controlador de Canvas com limpeza no unmount
  style.css                 Visual responsivo
  motion.css                Animações e movimento reduzido
public/
  assets/                   Retrato, projetos, torcida e módulos de movimento
  favicon.svg
scripts/
  serve.mjs                 Servidor dos arquivos gerados pelo build
  verify.cjs                Testes dos fluxos da interface
  verify-motion.cjs         Testes legados de partículas (fora da página atual)
dist/                       Build gerado, ignorado pelo Git
```

## Configuração

Edite `src/config.js` para ajustar os links públicos, o destinatário do formulário e o usuário público do WakaTime. Não coloque chaves privadas nesse arquivo. Alterações de configuração entram em produção após novo build.

A página atual não monta a seção de atividade; a configuração legada de WakaTime permanece disponível no código anterior. O contato usa FormSubmit e depende da ativação do destinatário por e-mail; aceitação pelo serviço não é confirmação de entrega na caixa de entrada. Não houve envio de mensagens reais durante os testes.

## Validação

`npm run check` verifica o servidor e compila o React para produção. Os testes de interface utilizam Playwright e Chromium disponíveis no ambiente de desenvolvimento; execute os scripts com o servidor ativo na porta 4173. Eles não são dependências de produção.

A validação atual cobre os dois temas, persistência e armazenamento indisponível, português/inglês, filtros, menu móvel, teclado, movimento reduzido e formulário. Os testes antigos de partículas não se aplicam à nova composição. Os testes interceptam o serviço de contato para cobrir sucesso, falha e ativação sem enviar e-mails.

Documentação: [React](https://react.dev/), [Vite](https://vite.dev/guide/).
