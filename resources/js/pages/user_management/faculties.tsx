import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DeleteStudent } from "@/components/delete-student";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/faculties',
    },
];

const tableColumns = [
    'Id',
    'First Name',
    'Last Name',
    'Email',
    'Contact Number',
    'Department',
    
    
];

const defaultColumns = [
    0,
    1,
    2,
    3,
    7,
    12,
    13,
];

export default function Faculties() {
    const { faculties } = usePage<{ faculties: Student[] }>().props;

    const [visibleColumns, setVisibleColumns] = useState<number[]>(
        JSON.parse(sessionStorage.getItem('visibleColumns') || '[]').length > 0
            ? JSON.parse(sessionStorage.getItem('visibleColumns') || '[]')
            : defaultColumns
    );

    const [filteredFaculties, setFilteredFaculties] = useState<any[][]>(
        faculties
            .map(faculty => Object.values(faculty))
            .map(row => row.filter((_, index) => visibleColumns.includes(index)))
    );

    const [searchInput, setSearchInput] = useState('');
    const [studentToDelete, setStudentToDelete] = useState<string>('');
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    const doDelete = (id: string) => {
        setIsOpenDeleteModal(true);
        setStudentToDelete(id);
    };

    useEffect(() => {
        sessionStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));

        const lowerSearchInput = searchInput.toLowerCase();
        const newFilteredFaculties = faculties
            .map(faculty => Object.values(faculty))
            .map(row => row.filter((_, index) => visibleColumns.includes(index)))
            .filter(row =>
                row.some(item =>
                    item?.toString().toLowerCase().includes(lowerSearchInput)
                )
            );

        setFilteredFaculties(newFilteredFaculties);
    }, [visibleColumns, searchInput, faculties]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Faculty List" />

            <UserManagementLayout
                setSearchInput={setSearchInput}
                columns={tableColumns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
            >
                <DataTable
                    columns={tableColumns.filter((_, index) => visibleColumns.includes(index))}
                    data={filteredFaculties}
                    searchInput={searchInput}
                    doDelete={doDelete}
                />
                <DeleteStudent
                    student_id={studentToDelete}
                    isOpen={isOpenDeleteModal}
                    setIsOpen={setIsOpenDeleteModal}
                />
            </UserManagementLayout>
        </AppLayout>
    );
}
