import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface MiddleNameProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}

export function MiddleName ( props: MiddleNameProps) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="middle_name"
                type="text"
                name="middle_name"
                {...props}

                placeholder="Middle Name"
            />

            <Label htmlFor="middle_name" className="sr-only">
                First Name
            </Label>
        </InputContainer>
    )
}