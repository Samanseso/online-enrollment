import { StudentForm } from '@/types';
import { FirstName } from "./first-name";
import { MiddleName } from "./middle-name";
import { useForm } from "@inertiajs/react";
import { SetStateAction } from 'react';
import { LastName } from './last-name';


type FormType = ReturnType<typeof useForm<Required<StudentForm>>>;
type SetDataType = FormType['setData'];

interface PersonalDetailsProps {
    data: StudentForm;
    setData: SetDataType;
    errors: any;
    setErrors: React.Dispatch<SetStateAction<any>>;
}

export function PersonalDetails({ data, setData, errors, setErrors } : PersonalDetailsProps) {
    return (
        <div>
            <p className='mb-2 text-sm my-2 font-medium'>
                Personal Information
            </p> 
            
            <div className="grid grid-cols-3 gap-2">
                <FirstName 
                    error={errors?.first_name || ""}
                    value={data.first_name || ""}
                    onChange={(e) => {
                        setData('first_name', e.target.value)
                        const newError = { ...errors, first_name: ""}
                        setErrors(newError);
                    }}/>

                <MiddleName
                    error={errors?.middle_name || ""}
                    value={data.middle_name || ""}
                    onChange={(e) => {
                        setData('middle_name', e.target.value)
                        const newError = { ...errors, middle_name: ""}
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
        </div>
    )
}