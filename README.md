# TADS Store - Oberdan

**Versão Atual:** 1.4.0

Projeto Integrador desenvolvido como parte do curso TADS, implementando uma loja virtual moderna com React e Vite.

**Histórico de versões:**
- v1.1.x — Etapa 1 (Componentização)
- v1.2.x — Etapa 2 (Integração com API)
- v1.3.x — Etapa 3 (SPA com React Router)
- v1.4.x — Etapa 4 (Autenticação e Controle de Acesso)

## 📋 Sobre o Projeto

TADS Store é uma aplicação de e-commerce desenvolvida em etapas semanais, focando em boas práticas de desenvolvimento React, componentização e arquitetura escalável.

📄 **Documentação de uso da TADS Store by Oberdan:**
 [`public/docs/DOCUMENTACAO.md`](./public/docs/DOCUMENTACAO.md)

## Tecnologias

* React 19.2.6
* React DOM 19.2.6
* React Router DOM 6.28.0
* Vite 8.0.12
* CSS3 (variáveis CSS customizadas)

### APIs Integradas

* **DummyJSON API** - Produtos, categorias, autenticação e dados de usuário
  * `GET /products` - Lista de produtos
  * `GET /products/categories` - Categorias
  * `POST /auth/login` - Autenticação real (BÔNUS)
  * `GET /users/{id}` - Dados completos do usuário
* **ViaCEP API** - Busca de endereço por CEP (EXTRA no checkout)

## 🌐 Etapa 1 - Componentização (Semana 12)

Nesta primeira etapa, foi construída a estrutura visual da loja utilizando:

* ✅ Componentes reutilizáveis
* ✅ Props e composição
* ✅ props.children
* ✅ Dados em array com .map()
* ✅ Renderização condicional
* ✅ Identidade visual própria

### Componentes Implementados

* **Layout**: Estrutura comum da página usando props.children
* **Cabecalho**: Topo da loja com navegação, busca e categorias dinâmicas
* **Rodape**: Rodapé com informações do desenvolvedor
* **Vitrine**: Lista de produtos com integração API e filtros
* **ProdutoCard**: Card de produto (composição de Selo + Botao)
* **Carrossel**: Componente de carrossel automático de produtos
* **Botao**: Componente genérico de botão
* **Selo**: Etiqueta reutilizável (ex: "Frete Grátis")

## 📦 Instalação

```bash
git clone https://github.com/oberdangom35/TADS-store-oberdan.git
cd TADS-store-oberdan
npm install
```

## ▶️ Executar o Projeto

```bash
npm run dev
```

## 🎨 Identidade Visual

* **Cor Primária**: Azul (#2563eb)
* **Cor Secundária**: Azul Escuro (#1e40af)
* **Cor Destaque**: Verde (#10b981)
* **Layout**: Responsivo com grid adaptativo


## 🌐 Etapa 2 - Integração com API (Semana 13)

Nesta etapa, foi implementada a integração com a API DummyJSON e funcionalidades interativas:

* ✅ Integração com API DummyJSON
* ✅ Sistema de busca em tempo real
* ✅ Filtro por categorias dinâmicas
* ✅ Carrossel de produtos em destaque
* ✅ Estados de carregamento e erro
* ✅ Design responsivo (Desktop, Tablet, Mobile)
* ✅ Dropdown adaptativo de categorias

### Funcionalidades Implementadas

* **Busca Dinâmica**: Campo de busca que filtra produtos em tempo real
* **Categorias**: Sistema de categorias com dropdown "Mais" adaptativo por tamanho de tela
* **Carrossel**: Exibição rotativa de produtos em destaque (6 segundos por slide)
* **Responsividade**: Layout totalmente adaptável para diferentes dispositivos
* **Scroll Inteligente**: Navegação automática para resultados de busca com debounce

### 📱 Responsividade

O sistema adapta automaticamente o número de categorias visíveis baseado na largura da tela:

| Largura    | Categorias Visíveis |
| ---------- | ------------------- |
| ≥ 1200px   | 6 categorias        |
| 900-1199px | 5 categorias        |
| 700-899px  | 4 categorias        |
| 500-699px  | 3 categorias        |
| < 500px    | 2 categorias        |

* **Desktop**: Layout completo com todas as funcionalidades
* **Tablet**: Layout adaptado com categorias reduzidas
* **Mobile**: Interface otimizada com busca inline e categorias centralizadas


## 🌐 Etapa 3 - SPA com React Router (Semana 14)

Nesta etapa, foi implementada a navegação SPA (Single Page Application) com múltiplas páginas e rotas utilizando React Router DOM 6.28.0:

* ✅ React Router DOM (6.28.0) configurado
* ✅ Navegação sem recarregamento de página
* ✅ Página de detalhes do produto
* ✅ Página 404 personalizada
* ✅ Estados globais compartilhados entre páginas
* ✅ Busca persistente durante navegação

### Páginas Implementadas

* **Home (/)**: Vitrine principal com busca, filtros e carrossel de destaques
* **Detalhes do Produto (/produto/:id)**: Página completa com informações detalhadas do produto
* **Erro 404 (*)**: Página personalizada para rotas não encontradas

### Funcionalidades da Página de Detalhes

* **Layout em Grid**: 4 quadrantes no desktop (imagem, informações, detalhes, avaliações)
* **Galeria de Imagens**: Miniaturas clicáveis para navegar entre fotos do produto
* **Informações Completas**: Preço, desconto, marca, categoria, dimensões, garantia
* **Avaliações de Clientes**: Exibição de reviews com nome, rating e comentários
* **Selos Visuais**: Indicadores de frete grátis e desconto
* **Link de Retorno**: Navegação de volta para a loja

### Experiência SPA

* **Navegação Fluida**: Transições entre páginas sem reload
* **Estados Persistentes**: Busca e filtros mantidos ao navegar
* **Campo de Busca Global**: Funciona em qualquer página e redireciona para home com resultados
* **Layout Consistente**: Cabeçalho e rodapé presentes em todas as páginas

### 📱 Responsividade da Página de Detalhes

* **Desktop**: Grid de 4 quadrantes (2x2)
* **Tablet**: Layout adaptado com empilhamento
* **Mobile**: Visualização sequencial otimizada


## 🌐 Etapa 4 - Autenticação e Controle de Acesso (Semana 15)

Nesta etapa final, foi implementado um sistema completo de autenticação **REAL** utilizando a API DummyJSON, com Context API, rotas protegidas e gerenciamento de sessão:

### ✨ Funcionalidades Implementadas

* ✅ **AuthContext** com estado global de autenticação
* ✅ **Login Real via API DummyJSON** (`POST /auth/login`)
* ✅ **Carregamento completo de dados do usuário** da API DummyJSON
* ✅ **Persistência de sessão** no localStorage com tokens (accessToken e refreshToken)
* ✅ **Sistema de expiração de sessão** por inatividade (10 minutos)
* ✅ **Renovação automática de sessão** ao detectar atividade do usuário
* ✅ **Rotas protegidas** com componente RotaProtegida
* ✅ **Controle de visualização** dinâmico no cabeçalho (Entrar/Sair)
* ✅ **Logout seguro** com limpeza de sessão e redirecionamento

### 📄 Páginas de Autenticação e Conta

* **Login (/login)**: Autenticação real com API DummyJSON
* **Minha Conta (/minha-conta)**: Dados completos do usuário (nome, email, telefone, senha)
* **Meus Endereços (/meus-enderecos)**: Endereço do usuário da API DummyJSON
* **Meus Cartões (/meus-cartoes)**: Dados do cartão bancário do usuário (cardNumber, cardExpire, cardType)
* **Meus Pedidos (/meus-pedidos)**: Página informativa sobre funcionalidade de pedidos

Todas as páginas são **protegidas** e redirecionam para login se o usuário não estiver autenticado.

### 🔑 Credenciais de Teste (DummyJSON API)

O sistema utiliza usuários reais da API DummyJSON. Exemplos de credenciais válidas:

| Usuário      | Senha        | Nome Completo    |
| ------------ | ------------ | ---------------- |
| `emilys`     | `emilyspass` | Emily Johnson    |
| `michaelw`   | `michaelwpass` | Michael Williams |
| `sophiab`    | `sophiabpass` | Sophia Brown     |

**Mais usuários disponíveis em:** [DummyJSON Users](https://dummyjson.com/users)

### 🛒 Fluxo de Compra Completo (Carrinho → Checkout → Confirmação)

#### Carrinho (/carrinho)
* Visualização de produtos adicionados
* Controle de quantidade (+/-)
* Remoção de itens
* Cálculo automático de subtotal e total
* Indicação de frete grátis
* Botão "Continuar para Endereço"

#### Checkout - Etapa 1: Endereço (/checkout)
* **Duas opções de endereço:**
  * **Endereço Padrão**: Carregado automaticamente da API DummyJSON (usuário logado)
  * **Outro Endereço**: Formulário com integração à **API ViaCEP**
    * Busca automática de endereço ao digitar CEP
    * Preenchimento automático de rua, bairro, cidade e estado
    * Validação de campos obrigatórios
* Seleção persiste no localStorage ao navegar entre páginas

#### Checkout - Etapa 2: Pagamento (/checkout)
* **Dados do cartão carregados automaticamente** da API DummyJSON:
  * Número do cartão (cardNumber)
  * Nome completo do usuário
  * Validade (cardExpire)
  * CVV gerado aleatoriamente
* **Parcelamento em até 10x** sem juros
* Cálculo automático do valor das parcelas
* Método de pagamento: Cartão de Crédito

#### Confirmação (/confirmacao)
* Mensagem de sucesso da compra
* Limpeza automática do carrinho
* Informações sobre próximos passos
* Link para "Meus Pedidos"

### 🔄 Fluxo de Autenticação Completo

1. Usuário não logado tenta acessar página protegida (ex: `/minha-conta`)
2. **RotaProtegida** detecta ausência de autenticação
3. Redirecionamento automático para `/login`
4. Usuário insere credenciais válidas da DummyJSON
5. Sistema faz **POST** para `https://dummyjson.com/auth/login`
6. API retorna tokens (accessToken, refreshToken) e ID do usuário
7. Sistema busca dados completos do usuário em `https://dummyjson.com/users/{id}`
8. **Dados salvos no localStorage:**
   * Tokens de autenticação
   * Informações do usuário (nome, email, telefone, endereço, **dados bancários**)
   * Timestamp de expiração da sessão
9. Usuário redirecionado para página solicitada
10. **Cabeçalho atualiza** dinamicamente (mostra dropdown com nome e ícone de usuário)
11. **Timer de inatividade** inicia (10 minutos)
12. **Renovação automática** ao detectar atividade (mousedown, keydown, scroll, etc.)
13. **Logout** remove todos os dados da sessão e redireciona para home

### 🎨 Recursos Visuais e UX

* **Dropdown do usuário** no cabeçalho com:
  * Foto do perfil
  * Nome completo
  * Links rápidos (Minha Conta, Meus Endereços, Meus Cartões, Meus Pedidos)
  * Botão de Sair
* **Indicador visual** de página ativa no menu lateral
* **Campos desabilitados** para dados vindos da API (não editáveis)
* **Responsividade completa** em todas as páginas de conta
* **Menu lateral em mobile** mostra apenas ícones (otimizado para espaço)

### 🌐 APIs Utilizadas

1. **DummyJSON API** (Autenticação e Dados do Usuário)
   * `POST /auth/login` - Autenticação
   * `GET /users/{id}` - Dados completos do usuário
   * Dados carregados: nome, email, telefone, endereço, **dados bancários** (cardNumber, cardExpire, cardType)

2. **ViaCEP API** (Busca de Endereço)
   * `GET /{cep}/json` - Busca de endereço por CEP
   * Preenchimento automático no checkout

### 🔒 Segurança (Front-end)

**IMPORTANTE:** A autenticação implementada é para fins didáticos e de experiência do usuário. Em um sistema real de produção:
* Validação de credenciais deve ser no back-end
* Tokens devem ser armazenados de forma segura (httpOnly cookies)
* Comunicação deve ser via HTTPS
* Implementar refresh token rotation
* Adicionar proteção contra CSRF e XSS

O sistema atual demonstra o **fluxo completo de autenticação** e **gerenciamento de sessão** no front-end, preparando para integração futura com back-end real.

## 👨‍💻 Desenvolvedor

* **Instituição:** Instituto Federal do Espírito Santo - Campus Alegre
* **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas - EAD
* **Disciplina:** Desenvolvimento Front End II
* **Aluno:** Oberdan Covre Gomes
* **Matrícula:** 202502EADS0249