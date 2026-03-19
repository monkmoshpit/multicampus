import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome | MultiCampus">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#f8fafc] p-6 text-slate-900 font-['Inter',sans-serif] lg:justify-center lg:p-8 dark:bg-slate-950 dark:text-slate-100">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                </svg>
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">MultiCampus</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                                >
                                    Access Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                                        >
                                            Register Institution
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-[335px] flex-col items-center justify-center pt-12 lg:max-w-6xl lg:pt-20">
                    <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-300">
                            <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                            The next generation school management platform
                        </div>
                        <h1 className="mx-auto mb-6 max-w-4xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 sm:text-7xl">
                            Empowering Education <br/> Everywhere.
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl">
                            A unified, multitenant ecosystem designed to handle students, teachers, courses, and enrollments with unparalleled ease and security.
                        </p>
                        
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href={register()}
                                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700"
                            >
                                Get Started Now
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-800"
                            >
                                View Features
                            </a>
                        </div>
                    </div>

                    <div className="mt-20 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                        <div className="rounded-2xl border border-slate-200/60 bg-white/40 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40">
                            <div className="relative aspect-[2/1] overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950">
                                <div className="absolute inset-0 flex flex-col">
                                    <div className="flex h-12 items-center gap-2 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-[#0a0a0a]">
                                        <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                        <div className="ml-4 h-5 w-64 rounded-md bg-slate-100 dark:bg-slate-800/50"></div>
                                    </div>
                                    <div className="flex flex-1 gap-6 p-6">
                                        <div className="hidden w-56 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex dark:border-slate-800 dark:bg-[#0a0a0a]">
                                            <div className="mb-4 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30"></div>
                                                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>
                                            </div>
                                            <div className="h-8 w-full rounded-md bg-blue-50 dark:bg-blue-900/20"></div>
                                            <div className="h-8 w-full rounded-md bg-slate-50 dark:bg-slate-800/30"></div>
                                            <div className="h-8 w-full rounded-md bg-slate-50 dark:bg-slate-800/30"></div>
                                            <div className="h-8 w-full rounded-md bg-slate-50 dark:bg-slate-800/30"></div>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-6">
                                            <div className="h-40 w-full rounded-xl border border-blue-100 bg-blue-50/50 shadow-sm dark:border-blue-900/30 dark:bg-blue-900/10"></div>
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                                <div className="h-32 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0a0a0a]"></div>
                                                <div className="h-32 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0a0a0a]"></div>
                                                <div className="h-32 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0a0a0a]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 to-transparent dark:from-slate-950/90"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-32 mb-20 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#0a0a0a]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Tenant Isolation</h3>
                            <p className="leading-relaxed text-slate-600 dark:text-slate-400">Robust data partitioning ensures each school's data remains private, secure, and fully isolated within the ecosystem.</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#0a0a0a]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Blazing Fast</h3>
                            <p className="leading-relaxed text-slate-600 dark:text-slate-400">Built on a modern stack with React, Inertia and Tailwind CSS for a seamless, instantaneous and responsive experience.</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#0a0a0a]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Extensible Design</h3>
                            <p className="leading-relaxed text-slate-600 dark:text-slate-400">Designed to be easily customizable, enabling schools to tailor the platform to their precise curriculum and administrative needs.</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
