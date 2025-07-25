import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Student } from "@/types";
import UserManagementLayout from '../../layouts/user_management/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/students',
    },
];

export default function Students() {
    const { students } = usePage<{ students: Student[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />

            <UserManagementLayout> 
                <div className="p-6">

                    <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Program</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                        <tr key={student.id} className="border-t">
                            <td className="px-4 py-2">{student.id}</td>
                            <td className="px-4 py-2">
                            {student.first_name} {student.middle_name} {student.last_name}
                            </td>
                            <td className="px-4 py-2">{student.email}</td>
                            <td className="px-4 py-2">{student.program_id}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </UserManagementLayout>
        </AppLayout>
    );
}