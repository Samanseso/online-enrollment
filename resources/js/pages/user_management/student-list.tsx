import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/students',
    },
];

export default function StudentList() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Student List</h1>
                {/* Add your student list content here */}
            </div>
        </AppLayout>
    );
}