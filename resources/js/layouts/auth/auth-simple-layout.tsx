import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';
import { home } from '@/routes';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh">
            {/* Left side - Branding */}
            <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 text-white lg:flex">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                            <AppLogoIcon className="size-6 fill-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">MultiCampus</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">
                        Manage your school with ease
                    </h2>
                    <p className="text-lg text-blue-100">
                        A comprehensive platform to organize students, teachers, courses, and enrollments efficiently.
                    </p>
                    <ul className="space-y-3 text-sm text-blue-100">
                        <li className="flex items-center gap-3">
                            <span className="flex h-2 w-2 rounded-full bg-white" />
                            Centralized school data management
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-2 w-2 rounded-full bg-white" />
                            Real-time student and teacher tracking
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-2 w-2 rounded-full bg-white" />
                            Complete course and enrollment system
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-2 w-2 rounded-full bg-white" />
                            Secure multi-tenant architecture
                        </li>
                    </ul>
                </div>

                <p className="text-xs text-blue-200">© 2026 MultiCampus. All rights reserved.</p>
            </div>

            {/* Right side - Form */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-slate-50 to-slate-100 p-6 dark:from-slate-950 dark:to-slate-900 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        {/* Mobile logo */}
                        <div className="flex flex-col items-center gap-4 lg:hidden">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                                    <AppLogoIcon className="size-7 fill-white" />
                                </div>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">MultiCampus</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Desktop title */}
                        <div className="hidden flex-col items-center gap-3 lg:flex">
                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Form Container */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
