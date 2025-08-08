import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PaginationType } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';
import { Tab } from "@headlessui/react";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DeleteStudent } from "@/components/delete-student";
import { useModal } from "@/components/context/modal-context";
import { Modal } from "@/components/modal";
import CreateStudent from "@/components/create-student";
import { Pagination } from "@/components/pagination";
import { ViewStudent } from "@/components/view-student";

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
    3,
    7,
    12,
    13,
]

export default function Students() {
    const { props } = usePage<{ students: PaginationType<Student[]> }>();

    const [students, setStudents] = useState<Student[]>(props.students.data);
    const [visibleColumns, setVisibleColumns] = useState<number[]>(JSON.parse(sessionStorage.getItem('visibleColumns') || '[]').length > 0 ? JSON.parse(sessionStorage.getItem('visibleColumns') || '[]') : defaultColumns);
    const [filteredStudents, setFilteredStudents] = useState<Student[][]>(students.map(student => Object.values(student)).map(row => row.filter((_, index) => visibleColumns.includes(index))));
    const [searchInput, setSearchInput] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<string>('');
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false);

    const { content } = useModal();

    const doDelete = (id: string) => {
        setIsOpenDeleteModal(true);
        setSelectedStudent(id)
    }

    const doView = (id: string) => {
        setIsOpenViewModal(true);
        setSelectedStudent(id)
    }
    
    const updateTable = (newStudents: PaginationType<Student[]>) => {
        setStudents(newStudents.data);
    }


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
    }, [students, visibleColumns, searchInput])


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />
            <UserManagementLayout 
                setSearchInput={setSearchInput} 
                columns={tableColumns} 
                visibleColumns={visibleColumns} 
                setVisibleColumns={setVisibleColumns}
                createComponent={<CreateStudent updateTable={updateTable}/>}
            > 
                <DataTable
                    columns={tableColumns.filter((_, index) => visibleColumns.includes(index))}
                    data={filteredStudents}
                    searchInput={searchInput}
                    doDelete={doDelete}
                    doView={doView}
                />

                <Pagination data={props.students} />

                <DeleteStudent 
                    student_id={selectedStudent} 
                    isOpen={isOpenDeleteModal} 
                    setIsOpen={setIsOpenDeleteModal} 
                    updateTable={updateTable}/>
                
                <ViewStudent
                    student_id={selectedStudent}
                    isOpen={isOpenViewModal}
                    setIsOpen={setIsOpenViewModal}
                />
                
                <Modal content={content} />
            </UserManagementLayout>
        </AppLayout>
    );
}