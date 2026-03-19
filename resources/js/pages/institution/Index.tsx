import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Building2, School, MapPin, Users, Mail, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Institution', href: '/institution' },
    { title: 'School Data', href: '/institution' },
];

export default function InstitutionData({ tenant, stats }: { tenant: any, stats: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Institution Data" />

            <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
                <header className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Institution Data
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        View and manage details about your educational institution.
                    </p>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Institution Card */}
                    <div className="md:col-span-2 rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border bg-muted/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <div className="h-20 w-20 rounded-xl bg-primary/10 text-primary flex flex-shrink-0 items-center justify-center">
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
                                    <Building2 className="h-4 w-4" /> Registration ID
                                </h3>
                                <p className="font-medium text-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                                    {tenant?.registration_id || 'ID-847293-EDU'}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <span className="h-4 w-4 flex items-center justify-center border-2 border-muted-foreground rounded-full text-[10px] font-bold">@</span>
                                    Institution Domain
                                </h3>
                                <p className="font-medium text-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                                    {tenant?.domain || 'academy.campusmanager.app'}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Official Email
                                </h3>
                                <p className="font-medium text-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                                    contact@{tenant?.domain || 'academy.campusmanager.app'}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> Support Line
                                </h3>
                                <p className="font-medium text-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                                    +1 (555) 019-2834
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary Card */}
                    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm flex flex-col">
                        <div className="p-4 border-b border-border bg-primary/5">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                Institution Overview
                            </h3>
                        </div>
                        <div className="p-4 flex-1 flex flex-col gap-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                                <span className="text-sm text-muted-foreground font-medium">Enrolled Students</span>
                                <span className="text-xl font-bold text-foreground">{stats?.students || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                                <span className="text-sm text-muted-foreground font-medium">Active Teachers</span>
                                <span className="text-xl font-bold text-foreground">{stats?.teachers || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                                <span className="text-sm text-muted-foreground font-medium">Offered Courses</span>
                                <span className="text-xl font-bold text-foreground">{stats?.courses || 0}</span>
                            </div>
                            <div className="mt-auto pt-4 border-t border-border">
                                <p className="text-xs text-muted-foreground text-center">
                                    Data synced in real-time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
