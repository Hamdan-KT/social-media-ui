/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import UserListItem from "./UserListItem";

function UserList({
	customButton,
	sx = {},
	onButtonClick = () => {},
	onClick,
	data = [],
	customButtonProps,
	actionButton = false,
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
				<UserListItem
					data={user}
					primaryText={user?.name}
					// secondaryText={secondaryText}
					customButtonProps={customButtonProps}
					actionButton={actionButton}
					onClick={onClick}
					onButtonClick={onButtonClick}
					customButton={customButton}
				/>
			))}
		</List>
	);
}

export default UserList;
