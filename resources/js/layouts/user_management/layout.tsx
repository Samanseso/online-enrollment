import { Button } from '@/components/ui/button';
import { useState, type PropsWithChildren } from 'react';
import { type TabItem } from '@/types';
import { LargeTableTab, SmallTableTab } from '@/components/table-tab';
import { SearchBar } from '@/components/search-bar';
import { useIsMobile } from '@/hooks/use-mobile';

import { ChevronsUpDown } from 'lucide-react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { ColumnsMenu } from '@/components/columns-menu';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CreateStudent from '@/components/create-student';



const tabItems: TabItem[] = [
    {
        title: 'Student',
        href: '/user_management/students',
    },
    {
        title: 'Faculty',
        href: '/user_management/faculties',
    },
    {
        title: 'Registrar',
        href: '/user_management/registrars',
    },
    {
        title: 'Administrator',
        href: '/user_management/administrators',
    },
];


interface UserManagementLayoutProps {
    columns: string[]
    visibleColumns: number[];
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setVisibleColumns: React.Dispatch<React.SetStateAction<number[]>>;
}


export default function UserManagementLayout({ columns, children, visibleColumns, setSearchInput, setVisibleColumns }: PropsWithChildren<UserManagementLayoutProps>) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }


    const isMobile = useIsMobile();
    const cleanup = useMobileNavigation();

    
    


    const handleSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle search bar input change
        setSearchInput(event.target.value);
    }

    return (
        <div className="px-4 py-6">
            <div className='flex flex-col-reverse md:flex-row md:items-center justify-between mb-2 md:space-x-2'>
                <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                        {/* Tabs for large devices */}
                        <LargeTableTab tabItems={tabItems} />

                        {/* Tabs for small devices */}
                        <SmallTableTab tabItems={tabItems} />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' onClick={cleanup}>
                                    Columns
                                    <ChevronsUpDown className="ml-2 size-4" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent 
                                className="w-40 mt-1 p-2 rounded-xl border border-white/5 bg-white shadow"
                                align='start'
                            >
                                <ColumnsMenu columns={columns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <SearchBar onChange={handleSearchBarChange} />

                    <CreateStudent />
                </div>
            </div>

            <div className="w-full mt-4">
                <section className="w-full">{children}</section>
            </div>

        </div>
    );
}