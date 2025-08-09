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
            <Label htmlFor="last_name" className="mb-2">
                Last Name
            </Label>
            <Input
                id="last_name"
                type="text"
                name="last_name"
                {...props}
                
                placeholder="Dela Cruz"
            />
        </InputContainer>
    )
}