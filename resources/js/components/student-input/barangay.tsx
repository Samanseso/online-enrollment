import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface BarangayProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}


export function Barangay ( props: BarangayProps ) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="barangay"
                type="text"
                name="barangay"
                {...props}
                placeholder="Barangay"
            />

            <Label htmlFor="barangay" className="sr-only">
                Barangay
            </Label>
        </InputContainer>
    )
}