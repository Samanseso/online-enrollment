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

type FormType = ReturnType<typeof useForm<Required<StudentForm>>>;
type SetDataType = FormType['setData'];

interface YearLevelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string;
    setData: SetDataType;
}

const levels = {
    1: "First Year",
    2: "Second Year",
    3: "Third Year",
    4: "Irregular",
};


export function YearLevel ( props: YearLevelProps ) {   
    const [value, setValue] = useState(Object.keys(levels)[parseInt(sessionStorage.getItem("level") || "") ?? ""]);

    return (
        <InputContainer error={props.error}>
            <Select value={value} onValueChange={(val) => {
                props.setData('year_level', val);
                setValue(val);
                sessionStorage.setItem("level", val);
            }}>
                <SelectTrigger className='cursor-pointer'>
                    <SelectValue placeholder="Year Level" />
                </SelectTrigger>

                <SelectContent>
                    {Object.entries(levels).map(([id, level]) => (
                        <SelectItem key={id} value={id} className='cursor-pointer'>
                            {level}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </InputContainer>
    )
}