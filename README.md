<!-- Replace OWNER/REPO with your GitHub repository (e.g. guilherme/Multicampus) -->
[![CI](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![Tests](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![Lint](https://img.shields.io/badge/lint-passing-brightgreen)](https://github.com/monkmoshpit/multicampus)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

# Multicampus

Projeto de estudo full‑stack: Laravel (backend) + Inertia + React + TypeScript (frontend).

## Stack
- PHP 8.2+ / Laravel 12
- React 19 + Inertia
- TypeScript, Vite, Tailwind CSS
- MySQL (recomendado para dev/prod) — SQLite usado em testes/CI

## Requisitos
- PHP 8.2+
- Composer
- Node 18+ e npm
- MySQL (ou Docker Compose)

## Instruções rápidas (desenvolvimento local)

1. Copie o exemplo de ambiente e edite as variáveis:

```bash
cp .env.example .env
# editar .env (DB_CONNECTION=mysql, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD)
```

2. Instale dependências e gere a chave da aplicação:

```bash
composer install
php artisan key:generate
npm install
```

3. Inicie o banco de dados (MySQL):

Com Docker Compose (recomendado):

```bash
docker compose up -d
# ajustar .env para apontar para o serviço mysql (DB_HOST=mysql)
```

Ou crie manualmente o database MySQL apontado em `.env`.

4. Rode migrations e seeders:

```bash
php artisan migrate --seed
```

5. Inicie o frontend e o servidor Laravel:

```bash
npm run dev
php artisan serve
```

## Comandos úteis
- Checar tipos TypeScript: `npm run types`
- Lint/Format: `npm run lint` / `npm run format`
- Build do frontend: `npm run build`
- Testes PHP (Pest): `composer test` ou `php artisan test`

## Testes e qualidade
- O projeto usa Pest (compatível com PHPUnit). Existem testes de Feature cobrindo autenticação, multi‑tenancy, e configurações (`tests/Feature/*`).
- O CI roda verificações de tipos, lint e os testes PHP com SQLite em memória para rapidez.

Observação: ao rodar `composer test` localmente você pode ver falhas de estilo (Pint) — execute `pint --test` para listar problemas e `pint --parallel` / `pint --fix` (quando aplicável) para corrigir formatação automática.

## Filas (Queues)
- O sistema suporta filas (`config/queue.php`), com drivers `database`, `redis`, `sync`, etc.
- Em desenvolvimento o `composer`/scripts de dev invocam `php artisan queue:listen`. Em testes CI usamos `QUEUE_CONNECTION=sync`.

## O que explorei neste projeto
- Setup full‑stack com Laravel + Inertia + React + TypeScript
- Autenticação com Laravel Fortify e multi‑tenancy (`stancl/tenancy`)
- Ferramentas frontend: Vite, Tailwind, Radix UI
- Testes: Pest / PHPUnit e integração com CI
- Docker Compose para ambiente reproducível (MySQL + Redis)

## Recomendação de idioma
- Para candidaturas internacionais (vagas fora do Brasil) mantenha o README principal em inglês.
- Para vagas brasileiras, mantenha uma versão em Português. Opção recomendada: README em inglês + `README.pt.md` com tradução.

## Próximos passos sugeridos
1. Corrigir problemas de estilo apontados por `pint --test` (rodar `pint --parallel` / `pint --fix`).
2. Executar `composer test` (ou via Docker) para garantir que todos os testes passam.
3. Ajustar `.env.example` (já atualizado) para MySQL e instruções de Docker.
4. Substituir `OWNER/REPO` nas badges acima pelo caminho real do repositório e push para GitHub para exibir badges reais.

## Contribuição
- Faça forks e PRs com commits pequenos e descritivos.

## Licença
- MIT
