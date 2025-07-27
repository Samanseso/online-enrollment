import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputContainer } from './input-container';
import React from 'react';

interface CityProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string
}


export function City ( props: CityProps ) {
    return (
        <InputContainer error={props.error}>
            <Input
                id="city"
                type="text"
                name="city"
                {...props}
                placeholder="City"
            />

            <Label htmlFor="city" className="sr-only">
                City
            </Label>
        </InputContainer>
    )
}