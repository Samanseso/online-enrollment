
export function ColumnsMenu({ columns }: { columns: string[] }) {
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <ul className="py-1">
                {columns.map((column) => (
                    <li key={column} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {column}
                    </li>
                ))}
            </ul>
        </div>
    );
} 