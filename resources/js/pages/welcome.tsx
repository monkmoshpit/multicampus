import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { GraduationCap, Users, Building, ShieldCheck, Zap, Laptop, ArrowRight, CheckCircle2, Moon, Sun, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    const { appearance, updateAppearance, resolvedAppearance } = useAppearance();
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Scroll Reveal Intersection Observer
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Back to Top Visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative overflow-hidden bg-background">
            <Head title="MultiCampus | Unified Educational Management" />

            <div className="relative z-10 flex min-h-screen flex-col items-center text-foreground">
                <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-6 py-4">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 outline-none group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg ring-1 ring-white/20 transition-transform group-hover:scale-110">
                                <AppLogoIcon className="size-6 fill-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase italic">MultiCampus</span>
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-6">
                            {/* Theme Toggle */}
                            <button
                                onClick={() => updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark')}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-foreground transition-all hover:bg-muted hover:scale-110 focus:outline-none"
                                title="Toggle Theme"
                            >
                                {resolvedAppearance === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            {auth.user ? (
                                <Link
                                    href={dashboard().url}
                                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-700 hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={login().url}
                                        className="hidden sm:block px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register().url}
                                        className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-all hover:bg-foreground/90 hover:scale-105"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="mt-24 flex w-full flex-col items-center">
                    {/* Hero Section */}
                    <section className="relative w-full px-6 py-24 text-center lg:py-40">
                        <div className="absolute inset-0 -top-20 z-0 overflow-hidden pointer-events-none">
                            <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-green-500/5 blur-[120px]"></div>
                        </div>

                        <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
                            <div className="reveal inline-flex items-center rounded-full border border-green-200/50 bg-green-50/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-700 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-400">
                                <span className="mr-2 flex h-2 w-2 animate-ping rounded-full bg-green-600"></span>
                                The Future of Academic Orchestration
                            </div>

                            <h1 className="reveal reveal-delay-1 text-7xl font-black leading-[1] tracking-tight sm:text-9xl uppercase">
                                Unified <br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent italic">
                                    Educational Reality.
                                </span>
                            </h1>

                            <p className="reveal reveal-delay-2 mx-auto max-w-2xl text-xl font-medium leading-relaxed text-muted-foreground sm:text-2xl">
                                MultiCampus bridges the gap between institutional power, teacher precision, and student potential in one seamless flow.
                            </p>

                            <div className="reveal reveal-delay-3 flex flex-col justify-center gap-4 sm:flex-row pt-4">
                                <Link
                                    href={register().url + "?role=tenant"}
                                    className="group flex items-center justify-center gap-3 rounded-full bg-green-600 px-12 py-6 text-xl font-black text-white shadow-2xl shadow-green-500/30 transition-all hover:scale-105 hover:bg-green-700"
                                >
                                    Deploy Your Institution
                                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                                </Link>
                                <button
                                    onClick={() => document.getElementById('personas')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="flex items-center justify-center gap-3 rounded-full bg-card px-12 py-6 text-xl font-bold text-foreground shadow-sm ring-1 ring-border transition-all hover:bg-muted"
                                >
                                    Explore Persona Views
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Persona Detailed Sections - Fix links here too */}
                    <section id="personas" className="w-full max-w-7xl px-6 py-32">
                        <div className="reveal mb-20 text-center space-y-3">
                            <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase italic">Tailored Perspectives</h2>
                            <p className="text-lg text-muted-foreground font-medium">Select your role to witness the MultiCampus transformation.</p>
                        </div>

                        <div className="grid gap-10 lg:grid-cols-3">
                            {/* Teacher Persona */}
                            <div className="reveal reveal-delay-1 group flex flex-col rounded-[2.5rem] border border-green-100/50 bg-green-50/20 p-10 transition-all hover:border-green-500/40 hover:shadow-[0_20px_60px_-15px_rgba(22,163,74,0.15)] dark:border-green-900/20 dark:bg-green-950/10">
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-green-600 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    <GraduationCap className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-3xl font-black leading-none uppercase italic">Educators</h3>
                                <p className="mb-8 text-base font-medium text-muted-foreground leading-relaxed">
                                    Focus on teaching. We'll handle the logistics with intelligent automation and real-time insights.
                                </p>
                                <ul className="mb-10 flex-1 space-y-4">
                                    {[
                                        'Automated Attendance Tracking',
                                        'Dynamic Grade Distribution',
                                        'Smart Homework Engine',
                                        'Direct Communication Hub'
                                    ].map((feat) => (
                                        <li key={feat} className="flex items-center gap-3 font-bold text-foreground/80 text-sm">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600/10">
                                                <CheckCircle2 className="h-3 w-3 text-green-600" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={login().url + "?role=teacher"}
                                    className="flex items-center justify-center rounded-xl bg-green-600 py-4 font-black text-white transition-all shadow-lg shadow-green-600/20 hover:bg-green-700 hover:scale-[1.02]"
                                >
                                    ACCESS TEACHER PORTAL
                                </Link>
                            </div>

                            {/* Student Persona */}
                            <div className="reveal reveal-delay-2 group flex flex-col rounded-[2.5rem] border border-orange-100/50 bg-orange-50/20 p-10 transition-all hover:border-orange-500/40 hover:shadow-[0_20px_60px_-15px_rgba(234,88,12,0.15)] dark:border-orange-900/20 dark:bg-orange-950/10">
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-orange-600 text-white shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-3xl font-black leading-none uppercase italic">Students</h3>
                                <p className="mb-8 text-base font-medium text-muted-foreground leading-relaxed">
                                    Own your academic path. A unified dashboard for your grades, classes, and future.
                                </p>
                                <ul className="mb-10 flex-1 space-y-4">
                                    {[
                                        'Academic Roadmap Visualizer',
                                        'Real-time Performance Metrics',
                                        'Instant Course Enrollment',
                                        'Centralized Resource Library'
                                    ].map((feat) => (
                                        <li key={feat} className="flex items-center gap-3 font-bold text-foreground/80 text-sm">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600/10">
                                                <CheckCircle2 className="h-3 w-3 text-orange-600" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={login().url + "?role=student"}
                                    className="flex items-center justify-center rounded-xl bg-orange-600 py-4 font-black text-white transition-all shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:scale-[1.02]"
                                >
                                    ACCESS STUDENT PORTAL
                                </Link>
                            </div>

                            {/* Tenant Persona */}
                            <div className="reveal reveal-delay-3 group flex flex-col rounded-[2.5rem] border border-blue-100/50 bg-blue-50/20 p-10 transition-all hover:border-blue-500/40 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] dark:border-blue-900/20 dark:bg-blue-950/10">
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-blue-600 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    <Building className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-3xl font-black leading-none uppercase italic">Institutions</h3>
                                <p className="mb-8 text-base font-medium text-muted-foreground leading-relaxed">
                                    The ultimate command center for modern education. Secure, scalable, and absolute.
                                </p>
                                <ul className="mb-10 flex-1 space-y-4">
                                    {[
                                        'Enterprise Multi-School Control',
                                        'Absolute Data Sovereignty',
                                        'Real-time Financial Analytics',
                                        'Institutional Lifecycle Management'
                                    ].map((feat) => (
                                        <li key={feat} className="flex items-center gap-3 font-bold text-foreground/80 text-sm">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/10">
                                                <CheckCircle2 className="h-3 w-3 text-blue-600" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={login().url + "?role=tenant"}
                                    className="flex items-center justify-center rounded-xl bg-blue-600 py-4 font-black text-white transition-all shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02]"
                                >
                                    ACCESS ADMIN PORTAL
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Features Carousel (Horizontal Scroll) - DOWNSIZED for minimalism */}
                    <div id="features" className="w-full bg-muted/30 py-32 mt-32 border-y border-border/50">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="reveal mb-16 text-center space-y-3">
                                <h2 className="text-3xl font-black tracking-tight sm:text-4xl uppercase italic">Technical Supremacy</h2>
                                <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">The architectural bedrock of the MultiCampus experience.</p>
                            </div>

                            <div className="flex overflow-x-auto pb-12 pt-4 hide-scrollbar snap-x snap-mandatory gap-8">
                                <div className="reveal reveal-delay-1 w-[300px] shrink-0 snap-center sm:w-[420px]">
                                    <div className="group h-full rounded-[2.5rem] border border-border bg-card p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-green-500/20">
                                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600/10 text-green-600 shadow-inner group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="h-7 w-7" />
                                        </div>
                                        <h3 className="mb-4 text-2xl font-black text-foreground uppercase italic leading-none">Total Isolation</h3>
                                        <p className="text-base leading-relaxed text-muted-foreground font-medium">Hardcore data partitioning ensures your institution resides in its own secure, untouchable digital fortress.</p>
                                    </div>
                                </div>

                                <div className="reveal reveal-delay-2 w-[300px] shrink-0 snap-center sm:w-[420px]">
                                    <div className="group h-full rounded-[2.5rem] border border-border bg-card p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500/20">
                                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600/10 text-orange-600 shadow-inner group-hover:scale-110 transition-transform">
                                            <Zap className="h-7 w-7" />
                                        </div>
                                        <h3 className="mb-4 text-2xl font-black text-foreground uppercase italic leading-none">Instant Flux</h3>
                                        <p className="text-base leading-relaxed text-muted-foreground font-medium">Experience zero-lag interactions. Our distribution engine delivers content at the speed of thought.</p>
                                    </div>
                                </div>

                                <div className="reveal reveal-delay-3 w-[300px] shrink-0 snap-center sm:w-[420px]">
                                    <div className="group h-full rounded-[2.5rem] border border-border bg-card p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/20">
                                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                                            <Laptop className="h-7 w-7" />
                                        </div>
                                        <h3 className="mb-4 text-2xl font-black text-foreground uppercase italic leading-none">Unified Core</h3>
                                        <p className="text-base leading-relaxed text-muted-foreground font-medium">A single, elegant design language that adapts intelligently to your specific institutional needs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <section className="reveal w-full max-w-6xl mx-auto px-6 py-40 text-center">
                        <div className="rounded-[4rem] bg-foreground text-background p-16 sm:p-24 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative z-10 space-y-10">
                                <h2 className="text-6xl font-black tracking-tight sm:text-8xl uppercase italic">Ready to Evolve?</h2>
                                <p className="text-xl font-medium sm:text-2xl text-background/70 max-w-3xl mx-auto italic">Join the global network of institutions redefining the academic standard.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                                    <Link href={register().url} className="bg-background text-foreground px-12 py-6 rounded-full font-black text-2xl transition-all hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                                        GET STARTED NOW
                                    </Link>
                                    <Link href={login().url} className="bg-white/10 text-background px-12 py-6 rounded-full font-black text-2xl backdrop-blur-md border border-white/20 transition-all hover:bg-white/20">
                                        OPERATIONAL LOGIN
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="w-full border-t border-border bg-card py-20 px-6">
                    <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
                        <Link href="/" className="flex items-center gap-4 transition-transform hover:scale-110 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background group-hover:bg-green-600 transition-colors">
                                <AppLogoIcon className="size-7 fill-current" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase italic">MultiCampus</span>
                        </Link>

                        <p className="text-xs font-black text-muted-foreground tracking-[0.3em] uppercase opacity-50">
                            © 2026 THE MULTICAMPUS NETWORK. DEPLOYED WORLDWIDE.
                        </p>

                        <div className="flex gap-10">
                            <Link href="/privacy" className="text-xs font-black text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-xs font-black text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors">Operational Terms</Link>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Floating Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-10 right-10 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${showBackToTop ? 'translate-y-0 opacity-100 pointer-events-auto shadow-green-500/20' : 'translate-y-20 opacity-0 pointer-events-none'
                    }`}
            >
                <ChevronUp className="h-8 w-8 animate-float" />
            </button>
        </div>
    );
}

