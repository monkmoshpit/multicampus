import { Link, usePage } from '@inertiajs/react';

import { BookOpen, Folder, LayoutGrid, GraduationCap, Users, Book, ListCheck, Building } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const classroomItems: NavItem[] = [
    {
        title: 'Classrooms',
        href: '/classrooms',
        icon: Folder,
    },
    {
        title: 'Teachers',
        href: '/teachers',
        icon: GraduationCap,
    },
    {
        title: 'Students',
        href: '/students',
        icon: Users,
    },
    {
        title: 'Courses',
        href: '/courses',
        icon: Book,
    },
    {
        title: 'Enrollments',
        href: '/enrollments',
        icon: ListCheck,
    },
];

const institutionItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'School Data',
        href: '/institution',
        icon: Building,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth.user?.role;

    const filteredClassroomItems = classroomItems.filter((item) => {
        if (userRole === 'student') {
            return ['Classrooms'].includes(item.title);
        }
        if (userRole === 'teacher') {
            return ['Classrooms', 'Students', 'Courses'].includes(item.title);
        }
        return true; // Tenant sees everything
    }).map(item => {
        if (userRole === 'teacher' || userRole === 'student') {
            if (item.title === 'Classrooms') return { ...item, title: 'My Classes' };
            if (item.title === 'Students') return { ...item, title: 'My Students' };
            if (item.title === 'Courses') return { ...item, title: 'My Courses' };
        }
        return item;
    });

    if (userRole === 'student') {
        filteredClassroomItems.push(
            { title: 'My Grades', href: '#', icon: BookOpen },
            { title: 'My Profile', href: '/settings/profile', icon: Users }
        );
    }

    const filteredInstitutionItems = institutionItems.filter((item) => {
        if (userRole === 'student' || userRole === 'teacher') {
            return item.title === 'Dashboard';
        }
        return true; // Tenant sees everything
    });


    return (

        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="group cursor-default hover:bg-transparent">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 via-green-500 to-orange-500 text-white shadow-sm ring-1 ring-orange-500/20">
                                <Building className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold font-['Inter'] tracking-tight text-lg">MultiCampus</span>
                                <span className="truncate text-xs opacity-70">Academic Management</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>


            <SidebarContent>
                <NavMain items={filteredClassroomItems} label="Classroom" />
                <NavMain items={filteredInstitutionItems} label="Institution" />
            </SidebarContent>


            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
