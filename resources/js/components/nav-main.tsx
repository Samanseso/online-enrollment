import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavCategory } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export function NavMain({ categories = [] }: { categories: NavCategory[] }) {
    const page = usePage();

    useEffect(() => {
        console.log('Sidebar open state:', page.props.sidebarOpen);
    }, [page.props.sidebarOpen]);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {categories.map((category) => (
                    <div key={category.category} className={page.props.sidebarOpen ? 'mb-2' : 'mb-0'}>
                        <SidebarGroupLabel>{category.category}</SidebarGroupLabel>
                        {category.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
