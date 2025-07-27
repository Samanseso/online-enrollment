import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface LastNameProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}

export function LastName ( props: LastNameProps) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="last"
                type="text"
                name="last"
                {...props}
                
                placeholder="Last Name"
            />

            <Label htmlFor="last" className="sr-only">
                Last Name
            </Label>
        </InputContainer>
    )
}