import { InputContainer } from './input-container';
import React, { useState } from 'react';

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useForm } from '@inertiajs/react';
import { StudentForm } from '@/types';
import { Label } from '../ui/label';

type FormType = ReturnType<typeof useForm<Required<StudentForm>>>;
type SetDataType = FormType['setData'];

interface ProgramProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string;
    setData: SetDataType;
}

export function Gender ( props: ProgramProps ) {
    const [value, setValue] = useState("");

    return (
        <InputContainer error={props.error}>
            <Label htmlFor='gender' className='mb-2'>
                Gender
            </Label>
            <Select value={value} onValueChange={(val) => {
                props.setData('gender', val);
                setValue(val)
                sessionStorage.setItem('gender', val)
            }}>
                <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>  
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
        </InputContainer>
    )
}