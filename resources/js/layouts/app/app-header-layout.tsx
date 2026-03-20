import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { auth } = usePage().props;
    const role = auth.user?.role || 'tenant';

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('theme-teacher', 'theme-student', 'theme-tenant');
        root.classList.add(`theme-${role}`);
    }, [role]);

    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">
                {children}
            </AppContent>
        </AppShell>
    );
}
