# MultiCampus

[![CI](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/monkmoshpit/multicampus/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

> A modern, multi-tenant school management system built with Laravel 12, Inertia.js, React 19, and TypeScript.

## 📋 Overview

**MultiCampus** is a full-stack platform designed to manage educational institutions with a high focus on technical proficiency and scalability. It features a custom multi-tenancy implementation allowing completely isolated environments for different schools/institutions.

## 🚀 Key Features

- **Multi-Tenancy Architecture**: Complete data isolation between institutions using standard scoping and tenancy middleware.
- **Role-Based Portals**: Tailored experiences for **Administrators**, **Teachers**, and **Students**.
- **Modern Tech Stack**: Uses React 19 with Inertia.js for a SPA-like user experience.
- **Dynamic Localization**: Full support for English and Portuguese (i18next).
- **Quality Assured**: Fully typed with TypeScript and tested using the Pest PHP framework.

## 🛠️ Technical Highlights

- **Backend**: Laravel 12, PHP 8.2+, Multi-Tenancy (`stancl/tenancy`).
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, LucideIcons.
- **Testing**: Pest (Feature & Unit testing).
- **Design**: Premium UI with custom animations and role-based themes.

## ⚙️ Quick Start

1. **Environment**: `cp .env.example .env`
2. **Install**: `composer install && npm install`
3. **Database**: `php artisan migrate --seed`
4. **Dev**: `npm run dev` and `php artisan serve`

## 👨‍💻 Technical Journey

This project demonstrates:
- Advanced multi-tenant architecture implementation.
- Complex state management and routing with Inertia + React.
- Modern CSS practices with Tailwind 4.
- Automated testing workflows with CI.
