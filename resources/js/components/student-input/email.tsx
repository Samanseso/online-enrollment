import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface EmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}

export function Email ( props: EmailProps ) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="email"
                type="email"
                name="email"
                {...props}
                placeholder="sample@email.com"
            />

            <Label htmlFor="email" className="sr-only">
                Email
            </Label>
        </InputContainer>
    )
}