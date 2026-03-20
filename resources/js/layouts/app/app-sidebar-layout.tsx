import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AppSidebarLayout({
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
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
