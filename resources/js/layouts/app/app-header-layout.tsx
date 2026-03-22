import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

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
