import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Faculty, PaginationType } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DeleteStudent } from "@/components/delete-student";
import CreateFaculty from "@/components/create-faculty";
import { Modal } from "@/components/modal";
import { useModal } from "@/components/context/modal-context";
import { DeleteFaculty } from "@/components/delete-faculty";

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
    const { props } = usePage<{ faculties: PaginationType<Faculty[]> }>();

    const [visibleColumns, setVisibleColumns] = useState<number[]>(
        JSON.parse(sessionStorage.getItem('visibleColumns') || '[]').length > 0
            ? JSON.parse(sessionStorage.getItem('visibleColumns') || '[]')
            : defaultColumns
    );
    

    const [faculties, setFaculty] = useState<Faculty[]>(props.faculties.data);
    const [filteredFaculties, setFilteredFaculties] = useState<Faculty[][]>(faculties.map(faculty => Object.values(faculty)).map(row => row.filter((_, index) => visibleColumns.includes(index))));
    const [searchInput, setSearchInput] = useState('');
    const [facultyToDelete, setFacultyToDelete] = useState<string>('');
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [selectedFaculty, setSelectedFaculty] = useState<string>('');

    const updateTable = (newfaculty: PaginationType<Faculty[]>) => {
            setFaculty(newfaculty.data);
        }

    const doDelete = (id: string) => {
        setIsOpenDeleteModal(true);
        setFacultyToDelete(id);
    };

    const { content  } = useModal()

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
            createComponent={<CreateFaculty updateTable={updateTable}/>}
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
                    doView={(id : string) => {}}
                />
                <DeleteFaculty faculty_id={facultyToDelete}  updateTable={updateTable} isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal}/>
                <Modal content={content}/>
            </UserManagementLayout>
        </AppLayout>
    );
}
