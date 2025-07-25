import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { Tab } from "@headlessui/react";
import { DataTable } from "@/components/data-table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/students',
    },
];

const tableColumns = [
    'Id',
    'First Name',
    'Last Name',
    'Middle Name',
    'Birth Date',
    'Gender',
    'Email',
    'Contact Number',
    'Address',
    'Barangay',
    'City',
    'Program Id',
    'Year Level',
    'Status'
]


export default function Students() {
    const { students } = usePage<{ students: Student[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />

            <UserManagementLayout columns={tableColumns}> 
                <DataTable
                    columns={tableColumns}
                    data={students.map(student => Object.values(student))}
                />
            </UserManagementLayout>
        </AppLayout>
    );
}