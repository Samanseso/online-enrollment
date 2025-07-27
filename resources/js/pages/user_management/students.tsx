import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { Tab } from "@headlessui/react";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";

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
    'Status',
    'Created At',
    'Updated At'
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

    const [visibleColumns, setVisibleColumns] = useState<number[]>(JSON.parse(sessionStorage.getItem('visibleColumns') || '[]').length > 0 ? JSON.parse(sessionStorage.getItem('visibleColumns') || '[]') : defaultColumns);
    const [filteredStudents, setFilteredStudents] = useState<any[][]>(students.map(student => Object.values(student)).map(row => row.filter((_, index) => visibleColumns.includes(index))));
    const [searchInput, setSearchInput] = useState('');


    useEffect(() => {
        sessionStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));

        const lowerSearchInput = searchInput.toLowerCase();
		const newFilteredStudents = students.map(student => 
            // Convert each student object's values to array and filter based on visible columns
            Object.values(student)).map(row => 
                row.filter((_, index) => 
                    visibleColumns.includes(index))).filter(row => {
                        // Check if any item in the row includes the search input
                        return row.some(item => 
                            item.toString().toLowerCase().includes(lowerSearchInput)
                        );
		});
		setFilteredStudents(newFilteredStudents);
    }, [visibleColumns, searchInput])



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />

            <UserManagementLayout setSearchInput={setSearchInput} columns={tableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns}> 
                <DataTable
                    columns={tableColumns.filter((_, index) => visibleColumns.includes(index))}
                    data={filteredStudents}
                    searchInput={searchInput}
                />
            </UserManagementLayout>
        </AppLayout>
    );
}