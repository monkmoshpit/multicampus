import { Head } from '@inertiajs/react';
import {
    Users,
    GraduationCap,
    BookOpen,
    ListChecks,
    Folder,
    Book,
    Clock,
    TrendingUp,
} from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';

type Stat = {
    icon?: string;
    label: string;
    value: string | number;
    trend?: string;
};

type Activity = {
    id: string;
    description: string;
    user: { name: string };
    created_at: string;
};

export default function Dashboard({ stats, school_name, activities }: { stats: Stat[]; school_name?: string; activities: Activity[] }) {
    const { t, i18n } = useTranslation();

    return (
        <AppLayout>
            <Head title={t('dashboard')} />

            <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-extrabold tracking-tight text-primary uppercase">
                            {t('dashboard')}
                        </h1>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                            {t('welcome_back_to')} <span className="text-foreground font-bold">{school_name || t('the_platform')}</span>
                        </p>
                    </div>

                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat: Stat, index: number) => {
                        const iconMap: Record<string, React.ElementType> = {
                            Users: Users,
                            GraduationCap: GraduationCap,
                            BookOpen: BookOpen,
                            ListChecks: ListChecks,
                            Folder: Folder,
                            Book: Book,
                            Clock: Clock,
                            TrendingUp: TrendingUp,
                        };
                        const iconKey = String(stat.icon ?? '');
                        const Icon = iconMap[iconKey] ?? LayoutGrid;

                        return (
                            <div key={index} className="group relative overflow-hidden bg-card border border-border p-6 transition-all hover:border-primary/50">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-primary/5" />
                                <div className="relative space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-[9px] font-bold text-muted-foreground/30">{index + 1}</span>
                                    </div>
                                    <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t(stat.label)}</p>
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-3xl font-black tracking-tighter text-foreground">{stat.value}</h3>
                                            {stat.trend && <span className="text-[10px] font-bold text-emerald-500">{stat.trend}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-tight text-primary">
                                {t('institutional_activity').split(' ')[0]} <span className="text-foreground">{t('institutional_activity').split(' ')[1]}</span>
                            </h2>
                            <div className="h-1 w-20 bg-primary/20 rounded-full" />
                        </div>

                        <div className="space-y-4">
                            {activities.length > 0 ? activities.map((activity: Activity) => (
                                <div key={activity.id} className="relative pl-6 pb-6 border-l border-border last:pb-0 group">
                                    <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />
                                    <div className="bg-card border border-border p-4 transition-all hover:border-primary/30 group-hover:shadow-sm">
                                        <p className="text-sm font-bold text-foreground mb-1">{activity.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold">
                                                    {activity.user.name[0]}
                                                </div>
                                                <span className="text-[10px] font-medium text-muted-foreground uppercase">{activity.user.name}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-muted-foreground/60">{new Date(activity.created_at).toLocaleDateString(i18n.language)}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground">{t('no_recent_activity')}</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Access or Info panel could go here */}
                </div>
            </div>
        </AppLayout>
    );
}

const LayoutGrid = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);
