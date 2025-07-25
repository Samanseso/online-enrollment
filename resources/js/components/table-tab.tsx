import { Button } from './ui/button';
import type { TabItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronsUpDown, PencilIcon, TrashIcon } from 'lucide-react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

function LargeTableTab({ tabItems = [] }: { tabItems: TabItem[] }) {
    const page = usePage();

    const currentPath = window.location.pathname;

    return (
        <div className='hidden md:flex items-center space-x-2'>
            {tabItems.map((tab) => (
                <Button
                    key={tab.title}
                    size="sm"
                    variant="ghost"
                    asChild
                    className={cn('w-full justify-start', {
                        'bg-muted': currentPath === tab.href,
                    })}
                >
                    <Link href={tab.href} prefetch>
                        {tab.title}
                    </Link>
                </Button>
            ))}
        </div>
    );
}

function SmallTableTab({ tabItems = [] }: { tabItems: TabItem[] }) {
    const page = usePage();
    const cleanup = useMobileNavigation();

    const currentPath = window.location.pathname;
    const currentTab = tabItems.find(tab => tab.href === currentPath) || tabItems[0];

    return (
        <div className='md:hidden flex items-center'>
            <Menu>
                <MenuButton
                    as={Button}
                    size="sm"
                    variant="ghost"
                    className="justify-between"
                    onClick={cleanup}
                >
                    {currentTab.title}
                    <ChevronsUpDown className="ml-2 size-4" />
                </MenuButton>
                <MenuItems 
                    transition
                    anchor="bottom start"
                    className="w-40 mt-1 p-2 rounded-xl border border-white/5 bg-white shadow"
                >
                    {tabItems.map((tab, index) => {
                        if (tab != currentTab) {
                            return (
                                <Button
                                    key={tab.title}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === tab.href,
                                    })}
                                >
                                    <Link
                                        href={tab.href}
                                        className={cn('block px-4 py-2 text-sm', {
                                            'bg-muted': currentPath === tab.href,
                                        })}
                                        prefetch
                                    >
                                        {tab.title}
                                    </Link>
                                </Button>
                            )
                        }
                    })}
                </MenuItems>
            </Menu>
        </div>
    )
}

export { LargeTableTab, SmallTableTab };


