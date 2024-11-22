import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PageSelect(props) {
	const [pageLimit, setPagelimit] = useState(props.value);

	const handleChange = (event) => {
		setPagelimit(event.target.value);
		props.onChange(event.target.value);
	};

	const limits = [4, 8, 10, 20];

	return (
		<Box sx={{ width: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="page-limit-label">{pageLimit} per page</InputLabel>
				<Select
					labelId="page-limit-label"
					id="page-limit-select"
					value={pageLimit}
					label="Page Limit"
					onChange={handleChange}
				>
					{limits.map((number) => {
						return (
							<MenuItem key={number} value={number}>
								{number}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
}
