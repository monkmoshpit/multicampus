import { Head } from '@inertiajs/react';
import { Building2, School, MapPin, Users, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Tenant = {
    school_name?: string;
    address?: string;
    registration_id?: string;
    domain?: string;
};

export default function InstitutionData({ tenant, stats }: { tenant: Tenant | null, stats: { students?: number; teachers?: number; courses?: number } | null }) {
 const { t } = useTranslation();
 const breadcrumbs: BreadcrumbItem[] = [
  { title: t('institution_label'), href: '/institution' },
  { title: t('school_data'), href: '/institution' },
 ];

 return (
 <AppLayout breadcrumbs={breadcrumbs}>
 <Head title={t('institution_data')} />

 <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
 <header className="flex flex-col gap-1">
 <h1 className="text-3xl font-bold text-primary">
 {t('institution_data')}
 </h1>
 <p className="text-muted-foreground text-sm">
 {t('institution_data_desc')}
 </p>
 </header>

 <div className="grid gap-6 md:grid-cols-3">
 {/* Main Institution Card */}
 <div className="md:col-span-2 border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
 <div className="p-6 border-b border-border bg-muted/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
 <div className="h-20 w-20 bg-primary/10 text-primary flex flex-shrink-0 items-center justify-center">
 <School className="h-10 w-10" />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-foreground">
 {tenant?.school_name || 'Campus Manager Academy'}
 </h2>
 <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
 <MapPin className="h-4 w-4" />
 {tenant?.address || '123 Education Blvd, Knowledge City'}
 </p>
 </div>
 </div>

 <div className="p-6 grid gap-6 sm:grid-cols-2">
 <div className="space-y-2">
 <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
 <Building2 className="h-4 w-4" /> {t('registration_id')}
 </h3>
 <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
 {tenant?.registration_id || 'ID-847293-EDU'}
 </p>
 </div>
 <div className="space-y-2">
 <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
 <span className="h-4 w-4 flex items-center justify-center border-2 border-muted-foreground rounded-full text-[10px] font-bold">@</span>
 {t('institution_domain')}
 </h3>
 <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
 {tenant?.domain || 'academy.campusmanager.app'}
 </p>
 </div>
 <div className="space-y-2">
 <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
 <Mail className="h-4 w-4" /> {t('official_email')}
 </h3>
 <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
 contact@{tenant?.domain || 'academy.campusmanager.app'}
 </p>
 </div>
 <div className="space-y-2">
 <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
 <Phone className="h-4 w-4" /> {t('support_line')}
 </h3>
 <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
 +1 (555) 019-2834
 </p>
 </div>
 </div>
 </div>

 {/* Stats Summary Card */}
 <div className=" border border-border bg-card text-card-foreground shadow-sm flex flex-col">
 <div className="p-4 border-b border-border bg-primary/5">
 <h3 className="font-semibold text-foreground flex items-center gap-2">
 <Users className="h-4 w-4 text-primary" />
 {t('institution_overview')}
 </h3>
 </div>
 <div className="p-4 flex-1 flex flex-col gap-3">
 <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50">
 <span className="text-sm text-muted-foreground font-medium">{t('enrolled_students')}</span>
 <span className="text-xl font-bold text-foreground">{stats?.students || 0}</span>
 </div>
 <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50">
 <span className="text-sm text-muted-foreground font-medium">{t('active_teachers')}</span>
 <span className="text-xl font-bold text-foreground">{stats?.teachers || 0}</span>
 </div>
 <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50">
 <span className="text-sm text-muted-foreground font-medium">{t('offered_courses')}</span>
 <span className="text-xl font-bold text-foreground">{stats?.courses || 0}</span>
 </div>
 <div className="mt-auto pt-4 border-t border-border">
 <p className="text-xs text-muted-foreground text-center">
 {t('data_synced_real_time')}
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </AppLayout>
 );
}
