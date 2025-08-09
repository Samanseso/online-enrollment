
import { SetStateAction, useEffect, useState } from "react";
import deleteUser from "./delete-user";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "./ui/dialog"; 
import { Button } from "./ui/button";
import { useForm } from "@inertiajs/react";
import { Student } from "@/types";
import { PlaceholderPattern } from "./ui/placeholder-pattern";
import { ViewStudentPersonal } from "./view-student-personal";

import { Ellipsis } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { ToggleGroup } from "./ui/toggle-group";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import ViewStudentTabs from "./view-student-tabs";


interface ViewStudentProps {
    student_id: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}



export function ViewStudent({ student_id, isOpen, setIsOpen }: ViewStudentProps) {

    const [studentInfo, setStudentInfo] = useState<Student | null>(null)
    const [value, setValue] = useState<string>("")

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
        if (!isOpen) {
            setStudentInfo(null);
        }
        else {
            getStudent();
        }
    }, [isOpen]);
    
    const placeholder = 
        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border min-h-[45vh]">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
        
    
        
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="min-w-3xl">
                <DialogTitle className="hidden" />
                <DialogDescription className="hidden"/>

                <div>
                    <ViewStudentTabs className=""/>
                </div>

                <div className="min-h-[45vh]">
                    {studentInfo ? <ViewStudentPersonal student={studentInfo}/> : placeholder}
                </div>
                  
                <DialogFooter className="h-fit">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}