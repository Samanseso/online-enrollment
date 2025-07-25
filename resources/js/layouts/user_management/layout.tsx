import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type PropsWithChildren } from 'react';
import { type TabItem } from '@/types';
import { LargeTableTab, SmallTableTab } from '@/components/table-tab';
import { SearchBar } from '@/components/search-bar';
import { useIsMobile } from '@/hooks/use-mobile';

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

export default function UserManagementLayou({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const isMobile = useIsMobile();

    return (
        <div className="px-4 py-6">
            <div className='flex flex-col-reverse md:flex-row  justify-between mb-2'>
                <div className='mt-3 md:mt-0'>
                    {/* Tabs for large devices */}
                    <LargeTableTab tabItems={tabItems} />

                    {/* Tabs for small devices */}
                    <SmallTableTab tabItems={tabItems} />
                </div>

                <div className='flex items-center space-x-2'>
                    <SearchBar />

                    <Button
                        variant="outline"
                        className='cursor-pointer'
                    >
                        Add {isMobile ? '' : 'Student'}
                    </Button>
                </div>
            </div>
            <Separator />




            <div className="flex-1 md:max-w-2xl">
                <section className="max-w-xl space-y-12">{children}</section>
            </div>

        </div>
    );
}