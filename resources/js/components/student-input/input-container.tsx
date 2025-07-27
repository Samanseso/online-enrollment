import { ReactNode } from "react";
import InputError from "../input-error";

export function InputContainer ({ error, children }: { error: string, children: ReactNode}) {
    
    return (
        <div className="flex flex-col space-y-1">
            {children}
            <InputError message={error} />
        </div>
    )
}