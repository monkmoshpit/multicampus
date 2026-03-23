# MultiCampus

[![CI](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

> Sistema moderno de gestão escolar multi-tenant, construído com Laravel 12, Inertia.js, React 19 e TypeScript.

## 📋 Visão Geral

**MultiCampus** é uma plataforma full-stack desenvolvida para gerenciar instituições de ensino com alto foco em proficiência técnica e escalabilidade. Possui uma implementação customizada de multi-tenancy que permite ambientes completamente isolados para diferentes escolas e instituições.

## 🚀 Funcionalidades Principais

- **Arquitetura Multi-Tenant**: Isolamento completo de dados entre instituições usando scoping padrão e middleware de tenancy.
- **Portais por Papel**: Experiências personalizadas para **Administradores**, **Professores** e **Alunos**.
- **Stack Moderno**: Usa React 19 com Inertia.js para uma experiência similar a SPA.
- **Localização Dinâmica**: Suporte completo a Inglês e Português (i18next).
- **Qualidade Garantida**: Totalmente tipado com TypeScript e testado com o framework Pest.

## 🛠️ Destaques Técnicos

- **Backend**: Laravel 12, PHP 8.2+, Multi-Tenancy (`stancl/tenancy`).
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, LucideIcons.
- **Testes**: Pest (testes de Feature & Unit).
- **Design**: UI premium com animações customizadas e temas por papel.

## ⚙️ Quick Start

1. **Ambiente**: `cp .env.example .env`
2. **Instalar**: `composer install && npm install`
3. **MySQl e Redis**: `docker compose up -d`
4. **Banco de dados**: `php artisan migrate --seed`
5. **Dev**: `npm run dev` e `php artisan serve`

## 👨‍💻 Jornada Técnica

Este projeto demonstra:

- Implementação avançada de arquitetura multi-tenant.
- Gerenciamento de estado complexo e roteamento com Inertia + React.
- Práticas modernas de CSS com Tailwind 4.
- Fluxos de testes automatizados com CI.
