import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/students',
    },
];

export default function StudentList() {
    const { students } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student List" />
            <div className="p-6">
                <h1 className="text-2xl mb-4">Student List</h1>

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
                    <tr key={student.StudentID} className="border-t">
                        <td className="px-4 py-2">{student.StudentID}</td>
                        <td className="px-4 py-2">
                        {student.FirstName} {student.MiddleName} {student.LastName}
                        </td>
                        <td className="px-4 py-2">{student.Email}</td>
                        <td className="px-4 py-2">{student.ProgramID}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </AppLayout>
    );
}