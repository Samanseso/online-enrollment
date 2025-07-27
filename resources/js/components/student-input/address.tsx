import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface AddressProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}


export function Address ( props: AddressProps ) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="address"
                type="text"
                name="address"
                {...props}
                placeholder="Address"
            />

            <Label htmlFor="address" className="sr-only">
                Address
            </Label>
        </InputContainer>
    )
}