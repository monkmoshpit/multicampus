import { Link } from '@inertiajs/react';
import { GraduationCap, Users, Building } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

type Role = 'teacher' | 'student' | 'tenant';

const themes = {
    teacher: {
        bg: 'from-green-600 via-emerald-700 to-green-900',
        roleKey: 'teacher',
        icon: GraduationCap,
    },
    student: {
        bg: 'from-orange-600 via-orange-500 to-amber-700',
        roleKey: 'student',
        icon: Users,
    },
    tenant: {
        bg: 'from-blue-600 via-sky-700 to-blue-900',
        roleKey: 'tenant',
        icon: Building,
    }
};

function Typewriter({ text, duration = 800, delay = 0, onComplete }: { text: string; duration?: number; delay?: number; onComplete?: () => void }) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);
        const speed = text.length > 0 ? duration / text.length : 0;

        const startTimeout = setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    setIsComplete(true);
                    onComplete?.();
                }
            }, speed);
            return () => clearInterval(timer);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, duration, delay, onComplete]);

    return <span>{displayedText}{!isComplete && <span className="animate-pulse">|</span>}</span>;
}

interface AuthContentProps {
    role: Role;
    children: ReactNode;
    onRoleChange: (role: Role) => void;
    currentRole: Role;
    isFlooding: boolean;
    showTypewriter?: boolean;
    onTypewriterComplete?: () => void;
}

function AuthContent({ role, children, onRoleChange, currentRole, isFlooding, showTypewriter = false, onTypewriterComplete }: AuthContentProps) {
    const { t } = useTranslation();
    const theme = themes[role];

    return (
        <div className={`flex min-h-svh theme-${role} bg-background transition-none`}>
            {/* Left side - Branding */}
            <div className={`hidden flex-1 flex-col justify-between bg-gradient-to-br ${theme.bg} p-12 text-white lg:flex transition-all duration-500`}>
                <div>
                    <Link href={home()} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-lg ring-1 ring-white/30">
                            <AppLogoIcon className="size-7 fill-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter uppercase leading-none">MULTICAMPUS</span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mt-1">
                                {t('for_role_plural', { role: t(`${theme.roleKey}_plural`) })}
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="space-y-8">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300">
                        <theme.icon className="mr-2 h-4 w-4" />
                        {t('portal_for')} {t(`${theme.roleKey}_plural`)}
                    </div>
                    <h2 className="text-6xl font-extrabold leading-[1.1] tracking-tight transition-all duration-300 min-h-[140px]">
                        {showTypewriter ? <Typewriter text={t(`${theme.roleKey}_hero`)} duration={700} delay={100} onComplete={onTypewriterComplete} /> : t(`${theme.roleKey}_hero`)}
                    </h2>
                    <p className="max-w-md text-xl font-medium opacity-90 leading-relaxed transition-all duration-300">
                        {t('auth_subtitle')}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
                    <p className="text-sm font-medium opacity-60 uppercase tracking-widest">{t('copyright_simple', { year: new Date().getFullYear() })}</p>
                    <div className="flex gap-6 opacity-60">
                        <span className="text-sm cursor-help hover:opacity-100 transition-opacity underline decoration-white/30 underline-offset-4 uppercase">{t('privacy')}</span>
                        <span className="text-sm cursor-help hover:opacity-100 transition-opacity underline decoration-white/30 underline-offset-4 uppercase">{t('terms')}</span>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="relative flex flex-1 flex-col items-center justify-center gap-8 bg-background p-6 md:p-12 transition-none">
                <div className="w-full max-w-sm">
                    {/* Role Switcher Slider */}
                    <div className="mb-10 flex items-center justify-center p-1 rounded-2xl bg-muted/50 border border-border/50 backdrop-blur-sm shadow-inner overflow-hidden">
                        {(['teacher', 'student', 'tenant'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onRoleChange(r);
                                }}
                                className={`group relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 ${currentRole === r
                                        ? `bg-white dark:bg-zinc-800 text-primary shadow-lg ring-1 ring-black/5 dark:ring-white/10 scale-[1.02]`
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                disabled={isFlooding}
                            >
                                {r === 'teacher' && <GraduationCap className={`h-3.5 w-3.5 ${currentRole === r ? 'text-primary' : ''}`} />}
                                {r === 'student' && <Users className={`h-3.5 w-3.5 ${currentRole === r ? 'text-primary' : ''}`} />}
                                {r === 'tenant' && <Building className={`h-3.5 w-3.5 ${currentRole === r ? 'text-primary' : ''}`} />}
                                <span className="uppercase tracking-widest">{t(r)}</span>

                                {currentRole === r && (
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/20 transition-all duration-300" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-10">
                        {/* Mobile logo */}
                        <div className="flex flex-col items-center gap-6 lg:hidden">
                            <Link href={home()} className="flex flex-col items-center gap-3">
                                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.bg} shadow-lg transition-all duration-300`}>
                                    <AppLogoIcon className="size-8 fill-white" />
                                </div>
                                <span className="text-3xl font-black tracking-tighter text-foreground uppercase">MULTICAMPUS</span>
                            </Link>
                        </div>

                        {/* Form Container */}
                        <div className="rounded-3xl border border-border/60 bg-card/50 p-8 shadow-lg backdrop-blur-sm ring-1 ring-black/[0.02]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const initialRole = (queryParams.get('role') as Role) || 'tenant';

    const [activeRole, setActiveRole] = useState<Role>(initialRole);
    const [nextRole, setNextRole] = useState<Role | null>(null);
    const [isFlooding, setIsFlooding] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Initial theme setup
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('theme-teacher', 'theme-student', 'theme-tenant');
        root.classList.add(`theme-${initialRole}`);
    }, [initialRole]);

    const handleRoleChange = (role: Role) => {
        if (role === activeRole || isFlooding) return;

        setNextRole(role);
        setIsFlooding(true);
        setIsFadingOut(false);

        // Stage 1: Wash animation (ink flood) runs for 800ms
        setTimeout(() => {
            const root = document.documentElement;

            // Stage 2: Hand-off
            // 1. Update the base role AND global theme while still covered by overlay
            setActiveRole(role);
            root.classList.remove('theme-teacher', 'theme-student', 'theme-tenant');
            root.classList.add(`theme-${role}`);

            // 2. Wait for React to paint the base layer
            setTimeout(() => {
                // Stage 3: Smooth dissolve
                setIsFadingOut(true);

                // Final cleanup
                setTimeout(() => {
                    setIsFlooding(false);
                    setIsFadingOut(false);
                    setNextRole(null);
                }, 300); // Overlay fade duration
            }, 100);
        }, 800);
    };

    return (
        <div className="relative min-h-svh w-full overflow-hidden bg-background">
            {/* The Base Layer - Stays behind the wash */}
            <div className={`theme-${activeRole}`}>
                <AuthContent
                    role={activeRole}
                    onRoleChange={handleRoleChange}
                    currentRole={isFlooding && nextRole ? nextRole : activeRole}
                    isFlooding={isFlooding}
                >
                    {children}
                </AuthContent>
            </div>

            {/* The Ink Wash Overlay - Floods in with next theme */}
            {isFlooding && nextRole && (
                <div className={`theme-${nextRole} absolute inset-0 z-[100] pointer-events-none animate-ink-flood overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.3)] transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                    <AuthContent
                        role={nextRole}
                        onRoleChange={() => { }}
                        currentRole={nextRole}
                        isFlooding={isFlooding}
                        showTypewriter={true}
                    >
                        {children}
                    </AuthContent>
                </div>
            )}
        </div>
    );
}
