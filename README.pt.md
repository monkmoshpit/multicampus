# Multicampus — Projeto (Resumo em Português)
Projeto de estudo que combina Laravel (backend) com Inertia + React + TypeScript (frontend).
[![CI](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![Tests](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![Lint](https://img.shields.io/badge/lint-passing-brightgreen)](https://github.com/monkmoshpit/multicampus)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Resumo rápido:
- PHP 8.2+, Laravel 12
- Frontend: React 19 + Inertia, TypeScript, Vite, Tailwind
- Testes: Pest (compatível com PHPUnit)
- Filas: suporta `database`/`redis` e o projeto usa `php artisan queue:listen` em dev

## ⚙️ Instalação Rápida

1. **Clone o repositório** e entre na pasta do projeto.
2. **Setup de Ambiente**:
   ```bash
   cp .env.example .env
   ```
3. **Inicie a Infraestrutura (Docker)**:
   ```bash
   docker compose up -d
   ```
   *Este comando sobe automaticamente os containers do MySQL e Redis.*

4. **Instale as dependências e gere a chave**:
   ```bash
   composer install
   npm install
   php artisan key:generate
   ```

5. **Prepare o Banco de Dados**:
   ```bash
   php artisan migrate --seed
   ```
   *Nota: Se o terminal perguntar se deseja criar o banco de dados 'laravel', digite 'yes'.*

6. **Inicie o projeto**:
   ```bash
   npm run dev
   # Em outro terminal:
   php artisan serve
   ```
## 👨‍💻 Jornada Técnica

Este projeto demonstra:
- **Implementação avançada de arquitetura multi-tenant**.
- **Gerenciamento de estado complexo e roteamento** com Inertia + React.
- **Práticas modernas de CSS** com Tailwind 4.
- **Fluxos de testes automatizados** com CI.
