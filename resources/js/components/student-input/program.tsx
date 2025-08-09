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

interface ProgramProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string;
    setData: SetDataType;
}

const programs = {
    1: "BS Computer Science",
    2: "BS Information Technology",
    3: "BS Software Engineering",
    4: "BS Information Systems",
    5: "BS Data Science",
    6: "BS Cybersecurity",
    7: "BS Computer Engineering",
    8: "BS Multimedia Arts",
    9: "BS Game Development",
    10: "BS Web Development"
};


export function Program ( props: ProgramProps ) {
    const [value, setValue] = useState(Object.keys(programs)[parseInt(sessionStorage.getItem("program") || "") ?? ""]);

    return (
        <InputContainer error={props.error}>
            <Select value={value} onValueChange={(val) => {
                props.setData('program_id', val);
                setValue(val)
                sessionStorage.setItem('program', val)
            }}>
                <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                </SelectTrigger>

                <SelectContent>
                    {Object.entries(programs).map(([id, program]) => (
                        <SelectItem key={id} value={id}>
                            {program}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </InputContainer>
    )
}