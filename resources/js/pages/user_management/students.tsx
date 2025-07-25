import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { Tab } from "@headlessui/react";
import { DataTable } from "@/components/data-table";
import { useState } from "react";

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

const defaultColumns = [
    0,
    1,
    2,
    7,
    13,
    14,
]



export default function Students() {
    const { students } = usePage<{ students: Student[] }>().props;

    const [visibleColumns, setVisibleColumns] = useState<number[]>(defaultColumns);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />

            <UserManagementLayout columns={tableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns}> 
                <DataTable
                    columns={tableColumns.filter((_, index) => visibleColumns.includes(index))}
                    data={students.map(student => Object.values(student)).map(row => row.filter((_, index) => visibleColumns.includes(index))) }
                />
            </UserManagementLayout>
        </AppLayout>
    );
}