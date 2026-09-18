# Requirements — Tux TV

## 1. Visão do Produto

### Nome
Tux TV

### Problema
Quando alguém já sabe o nome de um filme e quer saber rapidamente informações básicas sobre ele — nota, sinopse e, principalmente, em quais serviços de streaming está disponível — precisa navegar por catálogos completos de aplicativos de streaming ou sites cheios de informação irrelevante só para encontrar isso.

### Público
Pessoas que já sabem o nome do filme que procuram e querem uma resposta rápida e direta, sem precisar comparar opções ou navegar por listagens — usuários no Brasil, já que a disponibilidade de streaming é resolvida para a região BR.

### Proposta de solução
Uma aplicação simples de busca: o usuário digita o nome do filme, e a aplicação retorna um único card com pôster, nota, sinopse e os serviços de streaming onde o filme está disponível, usando dados da API do The Movie DB (TMDB).

## 2. Objetivo do MVP

Ao final do projeto, a aplicação deve permitir que o usuário:
- Busque um filme pelo nome a partir de uma barra de busca central.
- Seja levado a uma página de detalhes com as informações do primeiro resultado encontrado (pôster, nota, sinopse, streamings disponíveis).
- Seja redirecionado a uma página de "não encontrado" quando a busca não retornar nenhum resultado, podendo tentar uma nova busca a partir dela.
- Consiga fazer uma nova busca a partir de qualquer página da aplicação, sem precisar voltar manualmente à Home.

## 3. Funcionalidades

### F01 — Busca de filme

**Descrição:** Barra de busca onde o usuário digita o nome de um filme e a aplicação consulta a API da TMDB, utilizando sempre o primeiro resultado retornado.

**Critérios de aceitação:**
- [ ] A busca não diferencia maiúsculas de minúsculas.
- [ ] Ao encontrar um resultado, a aplicação navega para a página de detalhes daquele filme.
- [ ] Ao não encontrar nenhum resultado, a aplicação navega para a página de "não encontrado", levando o termo buscado.
- [ ] O botão de busca fica desabilitado e exibe um indicador de carregamento enquanto a requisição está em andamento.
- [ ] A barra de busca está disponível em todas as páginas da aplicação (tamanho grande na Home, compacta nas demais).

**Estados:**
- [x] Inicial — campo vazio, pronto para receber o termo de busca.
- [x] Carregando — botão desabilitado, ícone de loading.
- [x] Sucesso — redirecionamento para a página de detalhes.
- [x] Vazio — redirecionamento para a página de "não encontrado".
- [x] Erro — falha de rede ou de API ao realizar a busca.

### F02 — Exibição de detalhes do filme

**Descrição:** Página que exibe as informações do filme buscado: título, pôster, nota (em estrelas), sinopse e logos dos serviços de streaming onde está disponível (assinatura, região BR).

**Critérios de aceitação:**
- [ ] O título, pôster, nota e sinopse do filme são exibidos corretamente.
- [ ] A nota da API (0 a 10) é convertida e exibida em uma escala de 0 a 5 estrelas.
- [ ] Caso o filme não tenha pôster cadastrado, uma imagem placeholder é exibida no lugar.
- [ ] Caso o filme não esteja disponível em nenhum serviço de streaming na região BR, a seção de streamings não é exibida.
- [ ] Uma barra de busca compacta é exibida no topo da página, permitindo nova busca sem retornar à Home.

**Estados:**
- [x] Inicial — não aplicável (a página só é acessada após uma busca com resultado).
- [x] Carregando — mensagem de status enquanto os dados são buscados na API.
- [x] Sucesso — card do filme renderizado com todas as informações.
- [ ] Vazio — não aplicável (tratado pela F03).
- [x] Erro — mensagem de status informando falha ao carregar o filme.

### F03 — Página de filme não encontrado

**Descrição:** Página exibida quando a busca não retorna nenhum resultado, informando o usuário e permitindo uma nova tentativa.

**Critérios de aceitação:**
- [ ] A mensagem exibida inclui o termo que foi buscado.
- [ ] A barra de busca é exibida pré-preenchida com o termo buscado, permitindo edição.
- [ ] Uma nova busca a partir dessa página segue as mesmas regras da F01.

**Estados:**
- [x] Inicial — não aplicável (a página só é acessada como resultado de uma busca sem retorno).
- [ ] Carregando — não aplicável (a página em si não faz requisição ao ser carregada).
- [ ] Sucesso — não aplicável.
- [x] Vazio — estado padrão da página, mensagem de "nenhum filme encontrado".
- [ ] Erro — não aplicável.

## 4. Fora do Escopo

- Listagem de múltiplos resultados de busca (a aplicação sempre usa o primeiro resultado retornado pela API).
- Filtros de busca (gênero, ano, avaliação, etc.).
- Exibição de opções de aluguel e compra de streaming — apenas a categoria de assinatura (flatrate) é exibida.
- Catálogo de filmes populares/em cartaz na Home.
- Sistema de favoritos ou histórico de buscas.
- Páginas de elenco, diretor ou detalhes de outras pessoas envolvidas no filme.
- Suporte a múltiplas regiões de streaming além do Brasil (BR).
- Autenticação de usuário ou perfis.