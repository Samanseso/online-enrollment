import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, NavCategory } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Bell, Users, BookOpenText, Presentation, SquareActivity, Banknote, FileClock, ChartLine } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavCategory[] = [
    {
        category: 'General',
        items: [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
            { title: 'Notifications', href: '/notifications', icon: Bell },
        ],
    },
    {
        category: 'Academic Management',
        items: [
            { title: 'User Management', href: '/user_management', icon: Users },
            { title: 'Program & Course Setup', href: '/programs-courses', icon: BookOpenText },
            { title: 'Section Management', href: '/sections', icon: Presentation },
            { title: 'Enrollment Tracker', href: '/enrollment-tracker', icon: SquareActivity },
        ],
    },
    {
        category: 'Finance',
            items: [
            { title: 'Payment Oversight', href: '/payments', icon: Banknote },
        ],
    },
    {
        category: 'Analytics & Logs',
            items: [
            { title: 'Reports & Analytics', href: '/reports', icon: ChartLine },
            { title: 'Audit Logs', href: '/audit-logs', icon: FileClock },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain categories={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/*<NavFooter items={footerNavItems} className="mt-auto" />)*/}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
