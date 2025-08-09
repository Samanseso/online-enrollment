import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PaginationType, Student, StudentForm } from '@/types';
import { PersonalDetails } from './student-input/personal-details';
import { ContactDetails } from './student-input/contact-details';
import { AcademicDetails } from './student-input/academic-details';
import { useModal } from './context/modal-context';

interface CreateStudentProps {
    updateTable: (newStudents: PaginationType<Student[]>) => void;
}

const PROGRESS_LENGTH = 3;

export default function CreateStudent({ updateTable }: CreateStudentProps) {

    const { data, setData, post, processing, reset, clearErrors } = useForm<Required<StudentForm>>({
        first_name: '',
        last_name: '',
        middle_name: '',
        birth_date: '',
        gender: '',
        email: '',
        contact_number: '',
        address: '',
        barangay: '',
        city: '',
        program_id: '',
        year_level: '',
    });

    

    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [errors, setErrors] = useState<any>();
    const { createModal } = useModal();

    const progressComponents = [
        <PersonalDetails data={data} setData={setData} errors={errors} setErrors={setErrors}  />,
        <ContactDetails data={data} setData={setData} errors={errors} setErrors={setErrors}  />,
        <AcademicDetails data={data} setData={setData} errors={errors} setErrors={setErrors}  />
    ]

    const closeModal = () => {
        setIsOpen(false);
        sessionStorage.removeItem("program");
        sessionStorage.removeItem("level");
        setProgress(0);
        reset();
    };

    const createStudent: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('students.create', ), {    
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                console.log(page)
                if (page.props.hasNext) {
                    handleNext()
                }
                else {
                    setIsOpen(false);
                    const data = {
                        open: true,
                        header: 'Student Created',  
                        message: `Student #${page.props.new_student} has been created.`
                    }
                    
                    createModal(data);

                    if (page.props.students) {
                        updateTable(page.props.students as PaginationType<Student[]>);
                    }
                }
               
            },
            onError: (err) => {
                setErrors(err);
            },                 
            onFinish: () => {
                closeModal();
            },
        });

    };
    
    const handleNext = () => {
        if (progress < PROGRESS_LENGTH - 1) {
            setProgress(progress + 1);
        }
    }   

    const handlePrev = () => {
        if (progress > 0) {
            setProgress(progress - 1);
        }
    }




    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Student</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogTitle>Create Student</DialogTitle>
                <DialogDescription>
                    Fill in the details to create a new student account.
                </DialogDescription>
                <form className="space-y-6" onSubmit={createStudent}>
       
                    <div className="flex flex-col gap-5 mt-5 mb-15">
                        {progressComponents[progress]}
                    </div>

                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" className='cursor-pointer' onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="outline" className='cursor-pointer' disabled={progress === 0} asChild>
                            <button type="button" onClick={handlePrev}>Previous</button>
                        </Button>

                        <Button variant="ghost" className={
                                progress === PROGRESS_LENGTH - 1 ? "hidden" : 
                                "bg-blue-600 text-white hover:bg-blue-400 hover:text-white cursor-pointer"
                            } 
                            onClick={handleNext}
                            asChild
                        >
                            <button type="button">
                                Next
                            </button>
                        </Button>
                    
                        <Button variant="ghost" className={
                                progress === PROGRESS_LENGTH - 1 ? "bg-blue-600 text-white hover:bg-blue-400 hover:text-white cursor-pointer" : 
                                "hidden"
                            }  
                            disabled={processing} 
                            asChild
                        >
                            <button type="submit">
                                Create account
                            </button>
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
        
    );
}
