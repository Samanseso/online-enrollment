import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, type Registrar } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { Tab } from "@headlessui/react";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DeleteStudent } from "@/components/delete-student";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/registrar',
    },
];

const tableColumns = [
    'Id',
    'First Name',
    'Created At',
    'Updated At'
]

const defaultColumns = [
    0,
    1,
    2,
    3,
    7,
    12,
    13,
]

export default function Registrar() {
    const { registrars } = usePage<{ registrars: Registrar[] }>().props;

    const [visibleColumns, setVisibleColumns] = useState<number[]>(JSON.parse(sessionStorage.getItem('visibleColumns') || '[]').length > 0 ? JSON.parse(sessionStorage.getItem('visibleColumns') || '[]') : defaultColumns);
    const [filteredRegistrar, setFilteredRegistrar] = useState<any[][]>(registrars.map(registrar => Object.values(registrar)).map(row => row.filter((_, index) => visibleColumns.includes(index))));
    const [searchInput, setSearchInput] = useState('');
    const [registrarToDelete, setRegistrarToDelete] = useState<string>('')
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)


    const doDelete = (id: string) => {
        setIsOpenDeleteModal(true);
        setRegistrarToDelete(id)
    }
    


    

    useEffect(() => {
        sessionStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));

        const lowerSearchInput = searchInput.toLowerCase();
		const newFilteredRegistrars = registrars.map(registrar => 
            // Convert each student object's values to array and filter based on visible columns
            Object.values(registrar)).map(row => 
                row.filter((_, index) => 
                    visibleColumns.includes(index))).filter(row => {
                        // Check if any item in the row includes the search input
                        return row.some(item => 
                            item.toString().toLowerCase().includes(lowerSearchInput)
                        );
		});
		setFilteredRegistrar(newFilteredRegistrars);
    }, [visibleColumns, searchInput])



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />

            <UserManagementLayout setSearchInput={setSearchInput} columns={tableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns}> 
                <DataTable
                    columns={tableColumns.filter((_, index) => visibleColumns.includes(index))}
                    data={filteredRegistrar}
                    searchInput={searchInput}
                    doDelete={doDelete}
                />
                <DeleteStudent student_id={registrarToDelete} isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal} />
            </UserManagementLayout>
        </AppLayout>
    );<s></s>
}