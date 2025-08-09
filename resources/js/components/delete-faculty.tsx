import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { Student, PaginationType, Faculty } from '@/types';



interface DeleteFacultyProps {
    faculty_id: any;
    isOpen: boolean;
    updateTable: (newStudents: PaginationType<Faculty[]>) => void;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useModal } from './context/modal-context';



export function DeleteFaculty ({ faculty_id, isOpen, setIsOpen, updateTable }: DeleteFacultyProps) {

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({});
    const { createModal } = useModal();

    const search = window.location.search;              
    const params = new URLSearchParams(search);
    const page = Number(params.get('page') ?? '1');

    const closeModal = () => {  
        setIsOpen(false);
        reset();
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        const page = 2;

        destroy(route('faculties.destroy', { faculty: faculty_id }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const data = {
                    open: true,
                    header: 'Faculty Deleted',  
                    message: `Faculty #${faculty_id} has been successfully deleted.`
                }
                createModal(data);
                if (page?.props?.faculties) {
                    updateTable(page.props.faculties as PaginationType<Faculty[]> );
                }
            },
            onError: (err) => console.log(err),
            onFinish: () => closeModal()
        });
    };

    

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                    <DialogDescription>
                        Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                        to confirm you would like to permanently delete your account.
                    </DialogDescription>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button variant="destructive" disabled={processing} asChild>
                                <button type="submit">Delete account</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
    )
}