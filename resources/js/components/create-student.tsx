import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';
import { ChevronsUpDown } from 'lucide-react';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StudentForm } from '@/types';
import { Select, SelectGroup } from './ui/select';
import { SelectContent, SelectItem, SelectTrigger } from '@radix-ui/react-select';
import { error } from 'console';
import { FirstName } from './student-input/first-name';
import { MiddleName } from './student-input/middle-name';
import { PersonalDetails } from './student-input/personal-details';
import { ContactDetails } from './student-input/contact-details';
import { AcademicDetails } from './student-input/academic-details';

export default function CreateStudent() {

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

    const closeModal = () => {};

    const [errors, setErrors] = useState<any>();

    const createStudent: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('students.create', ), {    
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: (err) => setErrors(err),                 
            onFinish: () => reset(),
        });

    };

    
    return (
        <div>
            <Dialog>
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
                                <PersonalDetails data={data} setData={setData} errors={errors} setErrors={setErrors}  />
                                <ContactDetails data={data} setData={setData} errors={errors} setErrors={setErrors}  />
                                <AcademicDetails data={data} setData={setData} errors={errors} setErrors={setErrors}  />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" className='cursor-pointer' onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="ghost" className='bg-blue-600 text-white hover:bg-blue-400 hover:text-white' disabled={processing} asChild>
                                    <button type="submit" className='cursor-pointer'>Create account</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
        </div>
    );
}
