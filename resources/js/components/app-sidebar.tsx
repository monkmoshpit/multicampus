import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, GraduationCap, Users, Book, ListCheck, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';


import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
// Dropdown menu UI helpers are not used in this file
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { t } = useTranslation();
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const userRole = auth?.user?.role;

    const classroomItems: NavItem[] = [
        { title: t('classrooms'), href: '/classrooms', icon: Folder },
        { title: t('teachers'), href: '/teachers', icon: GraduationCap },
        { title: t('students'), href: '/students', icon: Users },
        { title: t('courses'), href: '/courses', icon: Book },
        { title: t('enrollments'), href: '/enrollments', icon: ListCheck },
        { title: t('activities'), href: '/calendar-activities', icon: LayoutGrid },
    ];

    const institutionItems: NavItem[] = [
        { title: t('dashboard'), href: '/dashboard', icon: LayoutGrid },
        { title: t('school_data'), href: '/institution', icon: Building },
    ];

    const filteredClassroomItems = classroomItems
        .filter((item) => {
            if (userRole === 'student') return [t('classrooms'), t('activities')].includes(item.title);
            if (userRole === 'teacher') return [t('classrooms'), t('students'), t('courses'), t('activities')].includes(item.title);
            return true;
        })
        .map((item) => {
            if (userRole === 'teacher' || userRole === 'student') {
                if (item.title === t('classrooms')) return { ...item, title: t('my_classes') };
                if (item.title === t('students')) return { ...item, title: t('my_students') };
                if (item.title === t('courses')) return { ...item, title: t('my_courses') };
            }
            return item;
        });

    if (userRole === 'student') {
        filteredClassroomItems.push(
            { title: t('my_grades'), href: '/grades', icon: BookOpen },
            { title: t('my_profile'), href: '/settings/profile', icon: Users },
        );
    }

    const filteredInstitutionItems = institutionItems.filter((item) => {
        if (userRole === 'student' || userRole === 'teacher') return item.title === t('dashboard');
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-accent/50 transition-colors">
                            <Link href={dashboard().url}>
                                <div className="flex aspect-square size-8 items-center justify-center bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
                                    <Building className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold font-['Inter'] tracking-tight text-lg">MultiCampus</span>
                                    <span className="truncate text-xs opacity-70">{t('academic_management')}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredClassroomItems} label={t('classroom_label')} />
                <NavMain items={filteredInstitutionItems} label={t('institution_label')} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
