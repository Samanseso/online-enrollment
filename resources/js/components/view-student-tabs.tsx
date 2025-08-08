import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, GraduationCap, User } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';

export default function ViewStudentTabs({className = '' }: HTMLAttributes<HTMLDivElement>) {

    const [selected, setSelected] = useState("personal")

    const tabs: { value: string; icon: LucideIcon; label: string }[] = [
        { value: 'personal', icon: User, label: 'Personal' },
        { value: 'academic', icon: GraduationCap, label: 'Academic' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800')}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => {setSelected(value)}}
                    className={cn(
                        'flex items-center justify-center rounded-md px-3.5 py-1.5 transition-colors', className,
                        selected === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
