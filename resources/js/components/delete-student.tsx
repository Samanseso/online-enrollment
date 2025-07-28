import { useForm } from '@inertiajs/react';
import { FormEventHandler, SetStateAction, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';





interface DeleteStudentProps {
    student_id: any;
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


export function DeleteStudent ({ student_id, isOpen, setIsOpen }: DeleteStudentProps) {

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({});
    
    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('students.destroy', student_id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: (err) => console.log(err),
            onFinish: () => {}
        });
    };

    const closeModal = () => {};

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogDescription>
                    Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                    to confirm you would like to permanently delete your account.
                </DialogDescription>
                <form className="space-y-6" onSubmit={deleteUser}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" asChild>
                            <button type="submit">Delete account</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}