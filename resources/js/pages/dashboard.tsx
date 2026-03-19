import { Head } from '@inertiajs/react';
import { BookOpen, Users, ListChecks, GraduationCap, Clock, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Props = {
    stats?: {
        teachers: number;
        students: number;
        courses: number;
        enrollments: number;
    };
    school_name?: string;
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

export default function Dashboard({ stats = { teachers: 24, students: 450, courses: 18, enrollments: 1250 }, school_name, activities = [] }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | MultiCampus" />
            <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto">
                <header className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                            <GraduationCap className="h-5 w-5" />
                        </span>
                        <h1 className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-blue-400 dark:to-indigo-400">
                            {school_name || 'MultiCampus High School'}
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Welcome back! Here's an overview of your institution today.
                    </p>
                </header>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Teachers Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start justify-between">
                            <div className="z-10">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Teachers</p>
                                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stats.teachers}</p>
                            </div>
                            <div className="z-10 rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100/50 dark:bg-blue-900/20 dark:ring-blue-800/50">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span>+2 this month</span>
                        </div>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50/50 blur-2xl transition-all group-hover:bg-blue-100/50 dark:bg-blue-900/10 dark:group-hover:bg-blue-900/20"></div>
                    </div>

                    {/* Students Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start justify-between">
                            <div className="z-10">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Students</p>
                                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stats.students}</p>
                            </div>
                            <div className="z-10 rounded-xl bg-indigo-50 p-3 ring-1 ring-indigo-100/50 dark:bg-indigo-900/20 dark:ring-indigo-800/50">
                                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span>+15 this semester</span>
                        </div>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-50/50 blur-2xl transition-all group-hover:bg-indigo-100/50 dark:bg-indigo-900/10 dark:group-hover:bg-indigo-900/20"></div>
                    </div>

                    {/* Courses Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start justify-between">
                            <div className="z-10">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Courses</p>
                                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stats.courses}</p>
                            </div>
                            <div className="z-10 rounded-xl bg-purple-50 p-3 ring-1 ring-purple-100/50 dark:bg-purple-900/20 dark:ring-purple-800/50">
                                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Across 4 departments</span>
                        </div>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-50/50 blur-2xl transition-all group-hover:bg-purple-100/50 dark:bg-purple-900/10 dark:group-hover:bg-purple-900/20"></div>
                    </div>

                    {/* Enrollments Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start justify-between">
                            <div className="z-10">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Enrollments</p>
                                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stats.enrollments}</p>
                            </div>
                            <div className="z-10 rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100/50 dark:bg-emerald-900/20 dark:ring-emerald-800/50">
                                <ListChecks className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span>98% retention rate</span>
                        </div>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-50/50 blur-2xl transition-all group-hover:bg-emerald-100/50 dark:bg-emerald-900/10 dark:group-hover:bg-emerald-900/20"></div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Activity Skeleton */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">View all</button>
                        </div>
                        <div className="flex flex-col justify-between space-y-6">
                            {activities.length > 0 ? activities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4">
                                    <div className="relative mt-1 flex h-2 w-2 items-center justify-center">
                                        <div className="absolute h-full w-full animate-ping rounded-full bg-blue-400 opacity-20"></div>
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-900 dark:text-white">
                                            {activity.description}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            {activity.user?.name ? `By ${activity.user.name} • ` : ''}
                                            {new Date(activity.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400">No recent activity found.</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions Skeleton */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                                <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Add Student</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                                <GraduationCap className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Hire Teacher</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                                <BookOpen className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Create Course</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                                <ListChecks className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Manage Classes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
