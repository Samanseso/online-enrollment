import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface FirstNameProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}

export function FirstName ( props: FirstNameProps) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="first_name"
                type="text"
                name="first_name"
                {...props}
                
                placeholder="First Name"
            />

            <Label htmlFor="first_name" className="sr-only">
                First Name
            </Label>
        </InputContainer>
    )
}