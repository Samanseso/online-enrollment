import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Faculty, FacultyForm, PaginationType, Student, StudentForm } from '@/types';
import { FirstName } from './student-input/first-name';
import { useModal } from './context/modal-context';
import { LastName } from './student-input/last-name';


interface CreateFacultyProps {
    updateTable: (newfaculties: PaginationType<Faculty[]>) => void;
}

const PROGRESS_LENGTH = 3;

export default function CreateFaculty({ updateTable }: CreateFacultyProps) {

    const { data, setData, post, processing, reset, clearErrors } = useForm<Required<FacultyForm>>({
        first_name: '',
        last_name: '',
    });

    

    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [errors, setErrors] = useState<any>();
    const { createModal } = useModal();

    const closeModal = () => {
        setIsOpen(false);
        sessionStorage.removeItem("program");
        sessionStorage.removeItem("level");
        setProgress(0);
        reset();
    };

    const createStudent: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('faculties.create', ), {    
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
                        header: 'Faculty Created',  
                        message: `Faculty #${page.props.new_faculty} has been created.`
                    }
                    
                    createModal(data);

                    if (page.props.faculties) {
                        updateTable(page.props.faculties as PaginationType<Faculty[]>);
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
                <Button variant="outline">Add Faculty</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogTitle>Create Faculty</DialogTitle>
                <DialogDescription>
                    Fill in the details to create a new faculty account.
                </DialogDescription>
                <form className="space-y-6" onSubmit={createStudent}>
       
                    <div className="flex flex-col gap-5 mt-5 mb-15">
                        <FirstName 
                            error={errors?.first_name || ""}
                            value={data.first_name || ""}
                            onChange={(e) => {
                                setData('first_name', e.target.value)
                                const newError = { ...errors, first_name: ""}
                                setErrors(newError);
                            }}/>

                        <LastName 
                            error={errors?.last_name || ""}
                            value={data.last_name || ""}
                            onChange={(e) => {
                                setData('last_name', e.target.value)
                                const newError = { ...errors, last_name: ""}
                                setErrors(newError);
                            }}/>
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

                        
                    
                        <Button variant="ghost" className="bg-blue-600 text-white hover:bg-blue-400 hover:text-white cursor-pointer"
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
