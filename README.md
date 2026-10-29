# Portfólio do Rogério Santana

Site pessoal feito em Angular 21, gerado como HTML estático (prerender).

## Rodando localmente

```bash
npm install
npm start          # abre em http://localhost:4200
npm test           # roda os testes (Vitest)
npm run build      # gera o site em dist/portfolio-rogerio/browser
```

## Onde editar o conteúdo

Todo o texto do site está em `src/app/portfolio.data.ts`: perfil, experiência,
projetos, tecnologias, formação e cursos. Os componentes só leem esses dados,
então para adicionar um projeto basta incluir um objeto na lista certa.

| Arquivo | O que tem |
|---|---|
| `src/app/portfolio.data.ts` | Conteúdo |
| `src/app/app.html` | Estrutura da página |
| `src/app/app.scss` | Layout das seções |
| `src/styles.scss` | Cores, fontes e animação de surgir |
| `src/app/matrix-rain.ts` | Canvas da chuva do fundo |
| `src/app/decrypt.directive.ts` | Efeito de texto "decifrando" |
| `src/app/reveal.directive.ts` | Fade das seções ao rolar |

## A chuva em WebAssembly

O estado de cada coluna da chuva (posição, velocidade e caractere sorteado) é
calculado em `wasm/rain.ts`, escrito em AssemblyScript (TypeScript que compila
para WebAssembly). O JavaScript só lê a memória do módulo e desenha no canvas.
Se o navegador bloquear WebAssembly, o componente usa o mesmo algoritmo em JS.
Quem tem "reduzir movimento" ligado no sistema não vê a chuva nem as animações.

```bash
npm run build:wasm   # recompila public/rain.wasm depois de mexer em wasm/rain.ts
```

## Publicação

O workflow `.github/workflows/deploy.yml` publica no GitHub Pages a cada push
na `main`. Se o repositório se chamar `rgrsant.github.io`, o site fica em
https://rgrsant.github.io. Em **Settings > Pages**, selecione
**Source: GitHub Actions**.
