# Tux TV

Aplicação de busca de filmes construída com React e a API do The Movie DB (TMDB). Digite o nome de um filme e veja pôster, nota, sinopse e em quais streamings ele está disponível no Brasil.

## Integrantes do Grupo

- Felipe Roberto Cassiano - 569238

## Funcionalidades

- Busca de filmes por nome (não diferencia maiúsculas/minúsculas)
- Exibição de pôster, título, nota em estrelas e sinopse
- Serviços de streaming disponíveis (assinatura, região BR)
- Página de "não encontrado" quando a busca não retorna resultados

## Tecnologias

- React + Vite
- React Router
- React Icons
- TMDB API

## Como rodar o projeto

1. Clone o repositório e entre na pasta do projeto:
   ```bash
   git clone <url-do-repositorio>
   cd tux-tv
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com seu Read Access Token da TMDB:
   ```
   VITE_TMDB_API_KEY=seu_token_aqui
   ```
   O token pode ser gerado em [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse `http://localhost:5173`.

## Estrutura do projeto

```text
src/
├── api/          # chamadas à API da TMDB
├── hooks/        # lógica de busca e navegação
├── components/   # SearchBar, MovieCard
├── pages/        # Home, MovieDetails, NotFound
├── App.jsx
├── main.jsx
└── index.css
```

## Documentação

- [`requirements.md`](./requirements.md) — objetivo, funcionalidades e critérios de aceitação
- [`architecture.md`](./architecture.md) — estrutura técnica do projeto
- [`references.md`](./references.md) — referências visuais utilizadas
