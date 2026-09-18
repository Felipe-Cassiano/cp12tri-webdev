# Architecture — Tux TV

## 1. Visão Geral

Aplicação React (Vite) client-side, com roteamento via React Router. A lógica é dividida em três camadas: uma camada de API isolada (funções puras que conversam com a TMDB), hooks customizados que ligam essa camada ao estado do React e à navegação, e componentes/páginas responsáveis apenas por renderizar o que os hooks retornam. Não há backend próprio — toda a informação vem diretamente da API pública da TMDB, consumida no navegador.

## 2. Estrutura de Pastas

```text
src/
├── api/
│   └── tmdb.js
├── hooks/
│   ├── useMovieSearch.js
│   └── useMovieDetails.js
├── components/
│   ├── SearchBar.jsx
│   ├── SearchBar.css
│   ├── MovieCard.jsx
│   └── MovieCard.css
├── pages/
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── MovieDetails.css
│   ├── NotFound.jsx
│   └── NotFound.css
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

- `api/` — chamadas HTTP à TMDB, sem nenhuma dependência de React.
- `hooks/` — lógica reativa (estado, efeitos, navegação) que consome a camada de API.
- `components/` — peças reutilizáveis entre páginas (`SearchBar`, `MovieCard`).
- `pages/` — uma pasta por rota, cada uma compondo componentes + hooks.

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Home | `/` | Ponto de entrada; exibe título de convite e barra de busca grande. |
| MovieDetails | `/movie/:id` | Exibe as informações do filme buscado (pôster, nota, sinopse, streamings). |
| NotFound | `/not-found` | Exibida quando a busca não retorna resultados; mostra o termo buscado e permite nova tentativa. |

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| SearchBar | Campo de busca + botão de envio; dispara a busca e a navegação através do hook `useMovieSearch`. | `size` (`"large"` \| `"compact"`), `initialValue`, `ButtonIcon`, `LoadingIcon` |
| MovieCard | Renderiza as informações de um filme já carregado: pôster, título, nota em estrelas, sinopse e logos dos streamings. | `movie` (objeto com `title`, `posterUrl`, `voteAverage`, `overview`, `providers`) |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| Valor digitado na busca | `SearchBar` (estado local, `useState`) | É um dado de input isolado, usado apenas para controlar o `<input>` até o envio do formulário. |
| Carregamento da busca (`loading`) | `useMovieSearch` | Precisa ser compartilhado entre a lógica de busca e a UI da `SearchBar` (desabilitar botão, trocar ícone). |
| Dados do filme (`movie`, `loading`, `error`) | `useMovieDetails` | Depende do parâmetro `:id` da URL e precisa refletir o ciclo de vida de uma requisição assíncrona específico da página de detalhes. |
| Termo buscado sem resultado (`q`) | URL (query string), lido via `useSearchParams` na `NotFound` | Não é estado local de componente — precisa sobreviver a um redirecionamento e ser compartilhável/recarregável via link. |

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Buscar detalhes do filme | Dentro de `useMovieDetails`, ao montar a página de detalhes ou quando o `:id` da URL muda | Chama `getMovieDetails(id)`, atualiza `movie`/`loading`/`error`, e cancela a atualização de estado se o componente for desmontado antes da resposta chegar. |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| react-router | Roteamento client-side (`Routes`, `Route`, `useNavigate`, `useParams`, `useSearchParams`) | Permite navegação entre Home, Detalhes e NotFound sem recarregar a página, e leitura de parâmetros/query string da URL. |
| react-icons | Ícones do botão de busca (padrão e estado de carregamento) | Evita depender de arquivos de imagem estáticos para ícones simples; componentes SVG prontos e customizáveis via props/CSS. |