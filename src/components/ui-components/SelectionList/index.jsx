/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import SelectionListItem from "./SelectionListItem";

function SelectionList({
	sx = {},
	onClick,
	data = [],
}) {
	const theme = useTheme();
	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: theme.palette.background.default,
				gap: "0.5rem",
				...sx,
			}}
		>
			{data?.map((user, index) => (
				<SelectionListItem
					data={user}
					primaryText={user?.name}
					onClick={onClick}
				/>
			))}
		</List>
	);
}

export default SelectionList;
