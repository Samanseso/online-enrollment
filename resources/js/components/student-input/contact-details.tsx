import { useForm } from "@inertiajs/react";
import { SetStateAction } from 'react';
import { StudentForm } from '@/types';
import { Email } from "./email";
import { PhoneNumber } from "./phone-number";
import { Address } from "./address";
import { Barangay } from './barangay';
import { City } from "./city";


type FormType = ReturnType<typeof useForm<Required<StudentForm>>>;
type SetDataType = FormType['setData'];

interface ContactDetailsProps {
    data: StudentForm;
    setData: SetDataType;
    errors: any;
    setErrors: React.Dispatch<SetStateAction<any>>;
}

export function ContactDetails ({ data, setData, errors, setErrors }: ContactDetailsProps) {
    return (
        <div>
            <p className='mb-2 text-sm my-2 font-medium'>
                Contact Information
            </p>
            
            <div className="grid grid-cols-2 gap-2">
                <Email
                    error={errors?.email || ""}
                    value={data.email || ""}
                    onChange={(e) => {
                        setData('email', e.target.value)
                        const newError = { ...errors, email: ""}
                        setErrors(newError);
                    }}/>

                <PhoneNumber
                    error={errors?.contact_number || ""}
                    value={data.contact_number || ""}
                    onChange={(e) => {
                        setData('contact_number', e.target.value)
                        const newError = { ...errors, contact_number: ""}
                        setErrors(newError);
                    }}/>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
                <Address
                    error={errors?.address || ""}
                    value={data.address || ""}
                    onChange={(e) => {
                        setData('address', e.target.value)
                        const newError = { ...errors, address: ""}
                        setErrors(newError);
                    }}/>

                <Barangay
                    error={errors?.barangay || ""}
                    value={data.barangay || ""}
                    onChange={(e) => {
                        setData('barangay', e.target.value)
                        const newError = { ...errors, barangay: ""}
                        setErrors(newError);
                    }}/>

                <City
                    error={errors?.city || ""}
                    value={data.city || ""}
                    onChange={(e) => {
                        setData('city', e.target.value)
                        const newError = { ...errors, city: ""}
                        setErrors(newError);
                    }}/>
            </div>
        </div>
    )
}