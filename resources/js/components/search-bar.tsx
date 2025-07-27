import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar(props: SearchBarProps) {
    return (
        <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
            </span>
            <Input
                id="search-bar"
                type="text"
                placeholder="Search here"
                className="pl-10"
                {...props}
            />
        </div>
    );
}