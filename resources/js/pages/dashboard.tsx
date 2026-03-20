import { Head } from '@inertiajs/react';
import { BookOpen, Users, ListChecks, GraduationCap, Clock, TrendingUp, LayoutGrid, Folder, Book } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Props = {
    stats?: {
        label: string;
        value: string | number;
        icon: string;
        trend: string;
    }[];
    school_name?: string;
    role?: string;
    activities?: {
        id: string;
        description: string;
        created_at: string;
        user?: { name: string };
    }[];
};


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats = [], school_name, activities = [], role }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | MultiCampus" />
            <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto">
                <header className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700 ring-2 ring-orange-100 dark:bg-green-900/40 dark:text-green-400 dark:ring-orange-900/40">
                            <GraduationCap className="h-5 w-5" />
                        </span>
                        <h1 className="bg-gradient-to-r from-green-600 via-green-500 to-orange-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                            {school_name || 'MultiCampus'}
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        {role === 'tenant' ? "Welcome back! Here's an overview of your institution today." : 
                         role === 'teacher' ? "Hello! Here's how your classes and students are doing." :
                         "Welcome back! Check your classes and progress below."}
                    </p>
                </header>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat: any, index: number) => {
                        const Icon: any = {
                            GraduationCap,
                            Users,
                            BookOpen,
                            ListChecks,
                            Folder,
                            Book,
                            TrendingUp,
                            Clock
                        }[stat.icon] || LayoutGrid;


                        return (
                            <div key={index} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div className="z-10">
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <p className="mt-3 text-4xl font-bold tracking-tight text-foreground">{stat.value}</p>
                                    </div>
                                    <div className="z-10 rounded-xl bg-green-50 p-3 ring-1 ring-green-100/50 dark:bg-green-900/20 dark:ring-green-800/50">
                                        <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                                    {stat.trend.includes('+') ? <TrendingUp className="mr-1 h-4 w-4" /> : <Clock className="mr-1 h-4 w-4" />}
                                    <span>{stat.trend}</span>
                                </div>
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-50/50 blur-2xl transition-all group-hover:bg-green-100/50 dark:bg-green-900/10 dark:group-hover:bg-green-900/20"></div>
                            </div>
                        );
                    })}
                </div>


                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Activity Skeleton */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
                            <button className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">View all</button>
                        </div>
                        <div className="flex flex-col justify-between space-y-6">
                            {activities.length > 0 ? activities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4">
                                    <div className="relative mt-1 flex h-2 w-2 items-center justify-center">
                                        <div className="absolute h-full w-full animate-ping rounded-full bg-orange-400 opacity-20"></div>
                                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground">
                                            {activity.description}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {activity.user?.name ? `By ${activity.user.name} • ` : ''}
                                            {new Date(activity.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground">No recent activity found.</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions Skeleton */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted dark:hover:bg-muted/80">
                                <Users className="h-6 w-6 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">Add Student</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted dark:hover:bg-muted/80">
                                <GraduationCap className="h-6 w-6 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">Hire Teacher</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted dark:hover:bg-muted/80">
                                <BookOpen className="h-6 w-6 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">Create Course</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted dark:hover:bg-muted/80">
                                <ListChecks className="h-6 w-6 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">Manage Classes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
