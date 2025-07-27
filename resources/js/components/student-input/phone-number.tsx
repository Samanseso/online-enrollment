import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface PhoneNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}


export function PhoneNumber ( props: PhoneNumberProps ) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="contact-number"
                type="phone"
                name="contact-number"
                {...props}
                placeholder="09XX-XXX-XXXX"
            />

            <Label htmlFor="contact-number" className="sr-only">
                Phone number
            </Label>
        </InputContainer>
    )
}