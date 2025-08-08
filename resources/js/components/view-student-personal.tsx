import { Student } from "@/types"
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

import { CircleUser, UserPen } from "lucide-react";
import { Separator } from "./ui/separator";

interface ViewStudentPersonalProps {
    student: Student;
}


export function ViewStudentPersonal ({ student } : ViewStudentPersonalProps) {
    return (
        <Card className="p-4">
            <CardContent className="px-0 py-0">
                <div className="flex justify-between items-center">
                    <div>
                        <CardHeader className="px-0 text font-bold">{student.first_name} {student.last_name}</CardHeader>
                        <CardDescription className="text-sm">{student.email}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline"><CircleUser /> View Profile</Button>
                        <Button variant="default"><UserPen />Edit</Button>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex text-dark text-black/55 text-sm space-x-2">
                    <p>Student Id : &nbsp;<span className="text-black font-bold">{student.student_id}</span></p>
                    <p>&middot;</p>
                    <p>Program : &nbsp;<span className="text-black font-bold">BS Computer Science</span></p>
                    <p>&middot;</p>
                    <p>Year Level : &nbsp;<span className="text-black font-bold">{student.year_level}</span></p>
                </div>
            </CardContent>
        </Card>
    )
}