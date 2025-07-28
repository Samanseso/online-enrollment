import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DataTableProps {
	columns: string[];
	data: any[][];
	searchInput: string;
	doDelete: (id: string) => void;
}

export function DataTable ({ columns, data, searchInput, doDelete }: DataTableProps) {

	const [filteredData, setFilteredData] = useState(data);
	const [selectedData, setSelectedData] = useState<number[]>([]);

	


	useEffect(() => {
		const lowerSearchInput = searchInput.toLowerCase();
		const newFilteredData = data.filter(row => {
			return row.some(item => 
				item.toString().toLowerCase().includes(lowerSearchInput)
			);
		});
		setFilteredData(newFilteredData);
	}, [data, searchInput]);

	const updatedSelectedData = (index: number) => {
		if (selectedData.includes(index)) {
			setSelectedData(selectedData => selectedData.filter(data => data !== index));
		}
		else {
			setSelectedData([...selectedData, index]);
		}
	}

	return (
		<div className="table-fixed w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="bg-muted">
						<th className="rounded-l-md"></th>
						{columns.map((col) => (
							<th key={col} className="px-4 py-2 text-left text-sm whitespace-nowrap">
								{col}
							</th>
						))}
						<th className="rounded-r-md">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((row, idx) => {
						return (
							<tr key={idx} className="border-b border-gray-200 hover:bg-secondary/30 dark:hover:bg-white/10 whitespace-nowrap">
								<td>
									<div className="flex items-center justify-center">
										<Checkbox onCheckedChange={() => updatedSelectedData(row[0])} />
									</div>
									
								</td>
								{row.map((item, idx2) => (
									<td key={idx2} className="px-4 py-2 text-sm">
										{item}
									</td>
								))}
								<td>
									<div className="flex items-center justify-center space-x-1">
										<Button variant="ghost" size="icon">
											<SquarePen className="size-4" color="blue" />
										</Button>
										<Button variant="ghost" size="icon" onClick={() => doDelete(row[0])}>
											<Trash2 className="size-4" color="red" />
										</Button>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	);
};


