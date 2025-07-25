

export function DataTable ({ columns = [], data = [] }: {columns: string[], data: any[][]}) {

	return (
		<div className="overflow-x-auto">
			<table className="">
				<thead>
					<tr>
					{columns.map((col) => (
						<th key={col} className="px-4 py-2 bg-gray-200 text-left text-sm whitespace-nowrap">
							{col}
						</th>
					))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, idx) => {
						return (
							<tr key={idx} className="border-b border-gray-200 hover:bg-gray-100 whitespace-nowrap">
								{row.map((item, idx2) => (
									<td key={idx2} className="px-4 py-2 text-sm">
										{item}
									</td>
								))}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	);
};


