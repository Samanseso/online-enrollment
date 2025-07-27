import { useForm } from "@inertiajs/react";
import { SetStateAction } from 'react';
import { StudentForm } from '@/types';
import { Email } from "./email";
import { PhoneNumber } from "./phone-number";
import { Address } from "./address";
import { Barangay } from './barangay';
import { City } from "./city";
import { Program } from "./program";
import { YearLevel } from "./year-level";


type FormType = ReturnType<typeof useForm<Required<StudentForm>>>;
type SetDataType = FormType['setData'];

interface ContactDetailsProps {
    data: StudentForm;
    setData: SetDataType;
    errors: any;
    setErrors: React.Dispatch<SetStateAction<any>>;
}

export function AcademicDetails ({ data, setData, errors, setErrors }: ContactDetailsProps) {
    return (
        <div>
            <p className='mb-2 text-sm my-2 font-medium'>
                Academic Profile
            </p>
            
            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                    <Program 
                        error={errors?.program_id || ""}
                        value={data.program_id || ""}
                        setData={setData}
                        onChange={() => {
                            const newError = { ...errors, program_id: ""}
                            setErrors(newError);
                        }}/>
                </div>
                    <YearLevel
                        error={errors?.year_level || ""}
                        value={data.year_level || ""}
                        setData={setData}
                        onChange={() => {
                            const newError = { ...errors, year_level: ""}
                            setErrors(newError);
                        }}/>
            </div>
        </div>
    )
}