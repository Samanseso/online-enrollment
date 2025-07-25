import { MenuItem } from "@headlessui/react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Label } from '@/components/ui/label';
import React from "react";


interface ColumnsMenuProps {
    columns: string[];
    visibleColumns: number[];
    setVisibleColumns: React.Dispatch<React.SetStateAction<number[]>>;
}

export function ColumnsMenu({ columns, visibleColumns, setVisibleColumns }: ColumnsMenuProps) {

    return (
        <>
            {columns.map((column, index) => {
                return (
                    <div key={index} className="flex items-center space-x-2 my-3">
                        <Checkbox
                            id={column}
                            name={column}
                            defaultChecked={visibleColumns.includes(index)}
                            onClick={() => {
                                setVisibleColumns((prev) => {
                                    if (prev.includes(index)) {
                                        return prev.filter(colIndex => colIndex !== index);
                                    } else {
                                        return [...prev, index];
                                    }
                                });
                            }}
                        />
                        <Label htmlFor={column}>{column}</Label>
                    </div>
                )
                
            })}
        </>
    );
} 