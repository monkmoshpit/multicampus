MultiCampus
![CI](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
> Sistema moderno de gestão escolar multi-tenant, construído com Laravel 12, Inertia.js, React 19 e TypeScript.
---
📋 Visão Geral
MultiCampus é uma plataforma full-stack desenvolvida para gerenciar instituições de ensino com foco em arquitetura escalável e qualidade técnica. Implementa multi-tenancy customizado com isolamento completo de dados entre diferentes escolas e instituições — cada tenant opera em um ambiente totalmente independente.
---
🚀 Funcionalidades Principais
Arquitetura Multi-Tenant: Isolamento completo de dados entre instituições via middleware de tenancy e scoping customizado.
Portais por Papel: Experiências distintas para Administradores, Professores e Alunos.
Stack Moderno: React 19 com Inertia.js para uma experiência SPA sem abrir mão do backend Laravel.
Localização Dinâmica: Suporte completo a Português e Inglês via i18next.
Qualidade Garantida: Totalmente tipado com TypeScript e testado com o framework Pest.
---
🛠️ Stack Técnico
Back-End: Laravel 12, PHP 8.2+, Multi-Tenancy (`stancl/tenancy`)
Front-End: React 19, TypeScript, Vite, Tailwind CSS 4, LucideIcons
Testes: Pest — Feature & Unit
CI/CD: GitHub Actions
---
⚙️ Como Rodar Localmente
```bash
# 1. Configurar ambiente
cp .env.example .env

# 2. Instalar dependências
composer install && npm install

# 3. Banco de dados
php artisan migrate --seed

# 4. Iniciar
npm run dev
php artisan serve
```
---
👨‍💻 O que esse projeto demonstra
Implementação de arquitetura multi-tenant avançada com `stancl/tenancy`
Gerenciamento de estado complexo e roteamento com Inertia + React
Práticas modernas de CSS com Tailwind 4
Tipagem completa em TypeScript em toda a aplicação
Testes automatizados com CI integrado via GitHub Actions
