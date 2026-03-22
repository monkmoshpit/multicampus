# Multicampus — Projeto (Resumo em Português)

Projeto de estudo que combina Laravel (backend) com Inertia + React + TypeScript (frontend).

<!-- Substitua OWNER/REPO pelo caminho do repositório no GitHub (ex.: guilherme/Multicampus) -->
[![CI](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![Tests](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![Lint](https://img.shields.io/badge/lint-passing-brightgreen)](https://github.com/monkmoshpit/multicampus)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Resumo rápido:
- PHP 8.2+, Laravel 12
- Frontend: React 19 + Inertia, TypeScript, Vite, Tailwind
- Testes: Pest (compatível com PHPUnit)
- Filas: suporta `database`/`redis` e o projeto usa `php artisan queue:listen` em dev

Instalação rápida:

```bash
cp .env.example .env
# ajustar variáveis do banco (DB_CONNECTION=mysql, DB_HOST, DB_DATABASE, etc.)
composer install
npm install
php artisan key:generate
php artisan migrate --seed
npm run dev
php artisan serve
```

Notas:
- Para demonstração/CI usamos SQLite em memória (mais rápido). Para desenvolvimento local recomendo MySQL (via Docker Compose).
- Verifique se `.env` não foi comitado.

Se quiser, posso traduzir o README principal inteiro para PT-BR ou manter apenas este resumo.
