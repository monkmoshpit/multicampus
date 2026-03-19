import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, GraduationCap, Users, Book, ListCheck, Building, ChevronsUpDown } from 'lucide-react';
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
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                                        <Building className="size-4 text-white" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold font-['Inter'] tracking-tight">MultiCampus HS</span>
                                        <span className="truncate text-xs">Primary Branch</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start"
                                side="bottom"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">
                                    Tenants
                                </DropdownMenuLabel>
                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Building className="size-4" />
                                    </div>
                                    MultiCampus High School
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Building className="size-4" />
                                    </div>
                                    MultiCampus Elementary
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer text-blue-600">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <span className="text-lg font-bold">+</span>
                                    </div>
                                    Register New School
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={classroomItems} label="Classroom" />
                <NavMain items={institutionItems} label="Institution" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
