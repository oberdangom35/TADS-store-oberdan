# TADS Store - Oberdan

**Versão Atual:** 1.3.17

Projeto Integrador desenvolvido como parte do curso TADS, implementando uma loja virtual moderna com React e Vite.

**Histórico de versões:**
- v1.1.x — Etapa 1 (Componentização)
- v1.2.x — Etapa 2 (Integração com API)
- v1.3.x — Etapa 3 (SPA com React Router)

## 📋 Sobre o Projeto

TADS Store é uma aplicação de e-commerce desenvolvida em etapas semanais, focando em boas práticas de desenvolvimento React, componentização e arquitetura escalável.

## �️ Tecnologias

* React 19.2.6
* React DOM 19.2.6
* React Router DOM 6.28.0
* Vite 8.0.12
* CSS3 (variáveis CSS customizadas)
* DummyJSON API (dados de produtos e categorias)

## � Etapa 1 - Componentização (Semana 12)

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

## 👨‍💻 Desenvolvedor

* **Instituição:** Instituto Federal do Espírito Santo - Campus Alegre
* **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas - EAD
* **Disciplina:** Desenvolvimento Front End II
* **Professor:** Cleziel Franzoni da Costa
* **Aluno:** Oberdan Covre Gomes
* **Matrícula:** 202502EADS0249