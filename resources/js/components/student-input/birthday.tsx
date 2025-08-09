import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InputContainer } from "./input-container";

interface BirthdayProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: string;
}

export function Birthday ( props : BirthdayProps) {
    return (
        <InputContainer error={props.error}>
            <Label htmlFor="birthday" className="mb-2" >
                Birthday
            </Label>
            <Input 
                type="date"
                name="birthday"
                id="birthday"
                {...props}
            />
        </InputContainer>
    )
}