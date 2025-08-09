
import { SetStateAction, useEffect, useState } from "react";
import deleteUser from "./delete-user";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "./ui/dialog"; 
import { Button } from "./ui/button";
import { useForm } from "@inertiajs/react";
import { Student } from "@/types";


interface ViewStudentProps {
    student_id: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}



export function ViewStudent({ student_id, isOpen, setIsOpen }: ViewStudentProps) {

    const [studentInfo, setStudentInfo] = useState<Student | null>(null)

    const { get, processing, reset, errors, clearErrors } = useForm({});
  
    const getStudent = async () => {
        get(route("students.retrieve", { student_id }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {setStudentInfo(res.props.view_student as Student)},
            onError: (err) => {console.log(err)},
            onFinish: () => reset(),
        });

    }

    useEffect(() => {
        if (student_id) {
            getStudent();
        }
    },[student_id]);

    useEffect(() => {
        if (!isOpen) {
            setStudentInfo(null);
        }
    }, [isOpen])

    

        
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogTitle>Student #{student_id}</DialogTitle>
                    <DialogDescription>
                        {studentInfo?.first_name}
                    </DialogDescription>
                    
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}